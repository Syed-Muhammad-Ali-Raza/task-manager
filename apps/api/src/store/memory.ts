import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

function id() {
  return randomBytes(8).toString("hex");
}

const passwordHash = bcrypt.hashSync("demo1234", 8);

export type MemoryUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  image: string | null;
};

const user: MemoryUser = {
  id: "user_demo",
  email: "syed.ali@taskflow.dev",
  name: "Syed Ali",
  password: passwordHash,
  image: null,
};

const lists = [
  { id: "list_pending", boardId: "board_launch", name: "Pending Tasks", position: 0 },
  { id: "list_bugs", boardId: "board_launch", name: "Pending Bugs", position: 1 },
  { id: "list_features", boardId: "board_launch", name: "Features", position: 2 },
  { id: "list_doing", boardId: "board_launch", name: "In Progress", position: 3 },
  { id: "list_qa", boardId: "board_launch", name: "QA", position: 4 },
];

const teammate: MemoryUser = {
  id: "user_sara",
  email: "sara.khan@taskflow.dev",
  name: "Sara Khan",
  password: passwordHash,
  image: null,
};

const sa = { id: user.id, name: user.name, email: user.email };
const sara = { id: teammate.id, name: teammate.name, email: teammate.email };

const tasks = [
  {
    id: "task_1",
    boardId: "board_launch",
    listId: "list_pending",
    title: "Create basic AI chat bot for the contact page",
    description:
      "Build a contact-page assistant that answers FAQs, captures the visitor email, and hands off to a human when confidence is low.",
    createdBy: user.id,
    assigneeId: user.id,
    priority: "medium",
    status: "todo",
    key: "TF-222",
    dueDate: null as Date | null,
    timeTrackingMinutes: 0,
    flagged: false,
    labels: ["chatbot"],
    coverUrl: null as string | null,
    parentId: null as string | null,
    assignee: sa,
    creator: sa,
  },
  {
    id: "task_1b",
    boardId: "board_launch",
    listId: "list_pending",
    title: "Create basic AI based help for home page",
    description: "Add an in-product help drawer that searches docs and suggested replies.",
    createdBy: user.id,
    assigneeId: user.id,
    priority: "medium",
    status: "todo",
    key: "TF-220",
    dueDate: null,
    timeTrackingMinutes: 0,
    assignee: sa,
    creator: sa,
  },
  {
    id: "task_2",
    boardId: "board_launch",
    listId: "list_bugs",
    title: "Surveys in QA are not coming through in the right language",
    description: "Arabic and Urdu survey packs render in English in the QA workspace.",
    createdBy: user.id,
    assigneeId: user.id,
    priority: "high",
    status: "todo",
    key: "TF-245",
    dueDate: null,
    timeTrackingMinutes: 0,
    assignee: sa,
    creator: sa,
  },
  {
    id: "task_3",
    boardId: "board_launch",
    listId: "list_features",
    title: "Purchase numbers for QA accounts",
    description: null,
    createdBy: user.id,
    assigneeId: user.id,
    priority: "low",
    status: "todo",
    key: "TF-246",
    dueDate: null,
    timeTrackingMinutes: 0,
    assignee: sa,
    creator: sa,
  },
  {
    id: "task_4",
    boardId: "board_launch",
    listId: "list_doing",
    title: "Recording quality is not good",
    description: null,
    createdBy: user.id,
    assigneeId: user.id,
    priority: "high",
    status: "in_progress",
    key: "TF-159",
    dueDate: null,
    timeTrackingMinutes: 0,
    assignee: sa,
    creator: sa,
  },
  {
    id: "task_5",
    boardId: "board_launch",
    listId: "list_qa",
    title: "Updated number and behaviour checks",
    description: null,
    createdBy: user.id,
    assigneeId: user.id,
    priority: "medium",
    status: "done",
    key: "TF-203",
    dueDate: null,
    timeTrackingMinutes: 0,
    assignee: sa,
    creator: sa,
  },
];

const workspaces = [
  {
    id: "ws_northwind",
    name: "Northwind Studio",
    slug: "northwind-studio",
    description: "Product, design, and launch work in one place.",
    members: [
      { userId: user.id, role: "owner" },
      { userId: teammate.id, role: "member" },
    ],
    boards: [{ id: "board_launch", name: "Launch board", workspaceId: "ws_northwind" }],
  },
];

const comments = [
  {
    id: "c1",
    taskId: "task_1",
    userId: teammate.id,
    author: sara,
    body: "I started the FAQ intents. Need the contact form field list from design.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "c2",
    taskId: "task_1",
    userId: user.id,
    author: sa,
    body: "Use the same copy as the help center. I will attach the flow PDF.",
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: "c3",
    taskId: "task_2",
    userId: teammate.id,
    author: sara,
    body: "Reproduced on Arabic locale. Looks like the template pack is English-only.",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
];

const attachments: Array<{
  id: string;
  taskId: string;
  name: string;
  mimeType: string;
  url: string;
  size: number;
}> = [];

const invitations: Array<{
  id: string;
  workspaceId: string;
  email: string;
  role: string;
  token: string;
  expiresAt: Date;
  createdBy: string;
}> = [];

export const memory = {
  user,
  users: [user, teammate] as MemoryUser[],
  lists,
  tasks,
  workspaces,
  invitations,
  comments,
  attachments,
  id,
};

export const DEFAULT_BOARD_LISTS = ["Pending Tasks", "Pending Bugs", "Features", "In Progress", "QA"];

export function nextIssueKey() {
  return `TF-${200 + memory.tasks.length}`;
}

export function workspaceNameTaken(userId: string, name: string, exceptId?: string) {
  const normalized = name.trim().toLowerCase();
  return memory.workspaces.some(
    (ws) =>
      ws.id !== exceptId &&
      ws.members.some((member) => member.userId === userId) &&
      ws.name.trim().toLowerCase() === normalized,
  );
}

export function statusFromListName(name: string) {
  const value = name.toLowerCase();
  if (value.includes("progress")) return "in_progress";
  if (value.includes("qa") || value.includes("done")) return "done";
  return "todo";
}

export function publicUser(u: MemoryUser) {
  return { id: u.id, email: u.email, name: u.name, image: u.image };
}

export function findUserByEmail(email: string) {
  const lowered = email.toLowerCase();
  if (lowered === "demo@taskflow.dev") {
    return memory.users.find((item) => item.id === user.id);
  }
  return memory.users.find((item) => item.email.toLowerCase() === lowered);
}
