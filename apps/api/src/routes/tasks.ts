import { Router } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { createTaskSchema, updateTaskSchema, commentSchema } from "@taskflow/shared";
import { prisma } from "../config/database.js";
import { authMiddleware, type AuthedRequest } from "../middleware/auth.js";
import { env } from "../config/env.js";
import { memory, nextIssueKey, statusFromListName } from "../store/memory.js";

const STATUS_POSITION: Record<string, number> = {
  todo: 0,
  in_progress: 1,
  done: 2,
};

function listIdForStatus(boardId: string, status: string) {
  const position = STATUS_POSITION[status];
  if (position === undefined) return undefined;
  return memory.lists.find((list) => list.boardId === boardId && list.position === position)?.id;
}

export const taskRouter = Router();
taskRouter.use(authMiddleware);

const uploadDir = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir, limits: { fileSize: 25 * 1024 * 1024 } });

taskRouter.get("/boards/:boardId", async (req: AuthedRequest, res, next) => {
  try {
    if (env.useMemory) {
      const board = memory.workspaces.flatMap((ws) => ws.boards).find((b) => b.id === req.params.boardId);
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }
      const workspace = memory.workspaces.find((ws) => ws.boards.some((item) => item.id === board.id));
      return res.json({
        ...board,
        workspaceId: workspace?.id,
        workspaceName: workspace?.name ?? "Workspace",
        lists: memory.lists.filter((l) => l.boardId === board.id).sort((a, b) => a.position - b.position),
        tasks: memory.tasks.filter((t) => t.boardId === board.id),
      });
    }
    const board = await prisma.board.findFirst({
      where: {
        id: req.params.boardId,
        workspace: { members: { some: { userId: req.user!.id } } },
      },
      include: {
        workspace: { select: { id: true, name: true } },
        lists: { orderBy: { position: "asc" } },
        tasks: { include: { assignee: true, creator: true }, orderBy: { createdAt: "asc" } },
      },
    });
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    return res.json({
      ...board,
      workspaceId: board.workspace.id,
      workspaceName: board.workspace.name,
    });
  } catch (error) {
    return next(error);
  }
});

taskRouter.post("/boards/:boardId/tasks", async (req: AuthedRequest, res, next) => {
  try {
    const body = createTaskSchema.parse(req.body);
    if (env.useMemory) {
      const list = memory.lists.find((item) => item.id === body.listId);
      const task = {
        id: memory.id(),
        boardId: req.params.boardId,
        listId: body.listId,
        title: body.title,
        description: body.description ?? null,
        createdBy: req.user!.id,
        assigneeId: body.assigneeId ?? req.user!.id,
        priority: body.priority ?? "medium",
        status: body.status ?? (list ? statusFromListName(list.name) : "todo"),
        key: nextIssueKey(),
        dueDate: null as Date | null,
        timeTrackingMinutes: 0,
        assignee: { id: req.user!.id, name: memory.user.name, email: req.user!.email },
        creator: { id: req.user!.id, name: memory.user.name, email: req.user!.email },
      };
      memory.tasks.push(task);
      return res.status(201).json(task);
    }
    const board = await prisma.board.findFirst({
      where: {
        id: req.params.boardId,
        workspace: { members: { some: { userId: req.user!.id } } },
      },
    });
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        listId: body.listId,
        boardId: board.id,
        createdBy: req.user!.id,
        priority: body.priority ?? "medium",
        status: body.status ?? "todo",
        assigneeId: body.assigneeId ?? null,
      },
      include: { assignee: true, creator: true },
    });
    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
});

taskRouter.patch("/tasks/:id", async (req: AuthedRequest, res, next) => {
  try {
    const body = updateTaskSchema.parse(req.body);
    if (env.useMemory) {
      const task = memory.tasks.find((t) => t.id === req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      Object.assign(task, body);
      if (body.listId) {
        task.listId = body.listId;
        const list = memory.lists.find((item) => item.id === body.listId);
        if (list) task.status = statusFromListName(list.name);
      } else if (body.status) {
        const listId = listIdForStatus(task.boardId, body.status);
        if (listId) task.listId = listId;
      }
      return res.json(task);
    }
    const existing = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        board: { workspace: { members: { some: { userId: req.user!.id } } } },
      },
    });
    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }
    let listId = body.listId;
    if (body.status && !listId) {
      const lists = await prisma.list.findMany({ where: { boardId: existing.boardId }, orderBy: { position: "asc" } });
      const position = STATUS_POSITION[body.status];
      listId = lists[position]?.id;
    }
    const { flagged, labels, coverUrl, parentId, ...rest } = body as typeof body & {
      flagged?: boolean;
      labels?: string[];
      coverUrl?: string | null;
      parentId?: string | null;
    };
    const task = await prisma.task.update({
      where: { id: existing.id },
      data: {
        title: rest.title,
        description: rest.description,
        listId,
        priority: rest.priority,
        status: rest.status,
        assigneeId: rest.assigneeId,
        dueDate: rest.dueDate === undefined ? undefined : rest.dueDate ? new Date(rest.dueDate as string) : null,
      },
      include: { assignee: true, creator: true },
    });
    return res.json(task);
  } catch (error) {
    return next(error);
  }
});

function hydrateTask(task: (typeof memory.tasks)[number]) {
  return {
    ...task,
    flagged: Boolean("flagged" in task && task.flagged),
    labels: ("labels" in task && Array.isArray(task.labels) ? task.labels : []) as string[],
    coverUrl: ("coverUrl" in task ? task.coverUrl : null) as string | null,
    parentId: ("parentId" in task ? task.parentId : null) as string | null,
    comments: memory.comments.filter((item) => item.taskId === task.id),
    attachments: memory.attachments.filter((item) => item.taskId === task.id),
  };
}

taskRouter.get("/tasks/:id", async (req: AuthedRequest, res, next) => {
  try {
    if (env.useMemory) {
      const task = memory.tasks.find((item) => item.id === req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      return res.json(hydrateTask(task));
    }
    const task = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        board: { workspace: { members: { some: { userId: req.user!.id } } } },
      },
      include: { assignee: true, creator: true },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json({ ...task, comments: [], attachments: [], flagged: false, labels: [], coverUrl: null, parentId: null });
  } catch (error) {
    return next(error);
  }
});

taskRouter.post("/tasks/:id/comments", async (req: AuthedRequest, res, next) => {
  try {
    const { body } = commentSchema.parse(req.body);
    if (env.useMemory) {
      const task = memory.tasks.find((item) => item.id === req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      const author = memory.users.find((item) => item.id === req.user!.id);
      const comment = {
        id: memory.id(),
        taskId: task.id,
        userId: req.user!.id,
        author: { id: req.user!.id, name: author?.name ?? "Member", email: req.user!.email },
        body,
        createdAt: new Date().toISOString(),
      };
      memory.comments.push(comment);
      return res.status(201).json(comment);
    }
    return res.status(501).json({ error: "Comments require the in-memory demo or a comments table" });
  } catch (error) {
    return next(error);
  }
});

taskRouter.post("/tasks/:id/attachments", upload.single("file"), async (req: AuthedRequest, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Choose an image, PDF, video, or file" });
    }
    if (env.useMemory) {
      const task = memory.tasks.find((item) => item.id === req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      const attachment = {
        id: memory.id(),
        taskId: task.id,
        name: file.originalname,
        mimeType: file.mimetype,
        url: `/uploads/${file.filename}`,
        size: file.size,
      };
      memory.attachments.push(attachment);
      if (req.body.asCover === "true" && file.mimetype.startsWith("image/")) {
        (task as { coverUrl?: string }).coverUrl = attachment.url;
      }
      return res.status(201).json(attachment);
    }
    return res.status(501).json({ error: "Attachments require the in-memory demo or an attachments table" });
  } catch (error) {
    return next(error);
  }
});


