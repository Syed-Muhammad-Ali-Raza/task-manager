import { Router } from "express";
import { createWorkspaceSchema, updateWorkspaceSchema } from "@taskflow/shared";
import { prisma } from "../config/database.js";
import { authMiddleware, type AuthedRequest } from "../middleware/auth.js";
import { env } from "../config/env.js";
import { DEFAULT_BOARD_LISTS, memory, workspaceNameTaken } from "../store/memory.js";

export const workspaceRouter = Router();
workspaceRouter.use(authMiddleware);

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

workspaceRouter.get("/", async (req: AuthedRequest, res, next) => {
  try {
    if (env.useMemory) {
      return res.json(memory.workspaces.filter((ws) => ws.members.some((m) => m.userId === req.user!.id)));
    }
    const workspaces = await prisma.workspace.findMany({
      where: { members: { some: { userId: req.user!.id } } },
      include: { boards: true, members: true },
      orderBy: { createdAt: "desc" },
    });
    return res.json(workspaces);
  } catch (error) {
    return next(error);
  }
});

workspaceRouter.post("/", async (req: AuthedRequest, res, next) => {
  try {
    const body = createWorkspaceSchema.parse(req.body);
    const name = normalizeName(body.name);
    if (env.useMemory) {
      if (workspaceNameTaken(req.user!.id, name)) {
        return res.status(409).json({ error: "You already have a workspace with this name" });
      }
      const wsId = memory.id();
      const boardId = memory.id();
      const workspace = {
        id: wsId,
        name,
        slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${wsId}`,
        description: body.description ?? null,
        members: [{ userId: req.user!.id, role: "owner" }],
        boards: [{ id: boardId, name: "Board", workspaceId: wsId }],
      };
      memory.workspaces.unshift(workspace);
      DEFAULT_BOARD_LISTS.forEach((listName, position) => {
        memory.lists.push({ id: memory.id(), boardId, name: listName, position });
      });
      return res.status(201).json(workspace);
    }
    const existing = await prisma.workspace.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        members: { some: { userId: req.user!.id } },
      },
    });
    if (existing) {
      return res.status(409).json({ error: "You already have a workspace with this name" });
    }
    const slugBase = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const slug = `${slugBase}-${Date.now().toString(36)}`;
    const workspace = await prisma.workspace.create({
      data: {
        name,
        description: body.description,
        slug,
        members: { create: { userId: req.user!.id, role: "owner" } },
        boards: {
          create: {
            name: "Board",
            lists: {
              create: DEFAULT_BOARD_LISTS.map((listName, position) => ({ name: listName, position })),
            },
          },
        },
      },
      include: { boards: true },
    });
    return res.status(201).json(workspace);
  } catch (error) {
    return next(error);
  }
});

workspaceRouter.patch("/:id", async (req: AuthedRequest, res, next) => {
  try {
    const body = updateWorkspaceSchema.parse(req.body);
    const name = body.name ? normalizeName(body.name) : undefined;
    if (env.useMemory) {
      const workspace = memory.workspaces.find(
        (ws) => ws.id === req.params.id && ws.members.some((m) => m.userId === req.user!.id),
      );
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }
      const actor = workspace.members.find((m) => m.userId === req.user!.id);
      if (actor?.role !== "owner" && actor?.role !== "admin") {
        return res.status(403).json({ error: "Only owners and admins can rename a workspace" });
      }
      if (name && workspaceNameTaken(req.user!.id, name, workspace.id)) {
        return res.status(409).json({ error: "You already have a workspace with this name" });
      }
      if (name) workspace.name = name;
      if (body.description !== undefined) workspace.description = body.description;
      return res.json(workspace);
    }
    const membership = await prisma.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId: req.params.id, userId: req.user!.id } },
    });
    if (!membership) {
      return res.status(404).json({ error: "Workspace not found" });
    }
    if (membership.role !== "owner" && membership.role !== "admin") {
      return res.status(403).json({ error: "Only owners and admins can rename a workspace" });
    }
    if (name) {
      const clash = await prisma.workspace.findFirst({
        where: {
          id: { not: req.params.id },
          name: { equals: name, mode: "insensitive" },
          members: { some: { userId: req.user!.id } },
        },
      });
      if (clash) {
        return res.status(409).json({ error: "You already have a workspace with this name" });
      }
    }
    const workspace = await prisma.workspace.update({
      where: { id: req.params.id },
      data: {
        ...(name ? { name } : {}),
        ...(body.description !== undefined ? { description: body.description } : {}),
      },
      include: { boards: true },
    });
    return res.json(workspace);
  } catch (error) {
    return next(error);
  }
});
