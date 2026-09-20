import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(80),
  description: z.string().max(280).optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  description: z.string().max(280).nullable().optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().max(4000).optional(),
  listId: z.string().min(1),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  assigneeId: z.string().nullable().optional(),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  dueDate: z.string().datetime().nullable().optional(),
  flagged: z.boolean().optional(),
  labels: z.array(z.string().min(1).max(32)).optional(),
  coverUrl: z.string().nullable().optional(),
  parentId: z.string().nullable().optional(),
});

export const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "member", "viewer"]),
  workspaceId: z.string().min(1),
});

export const commentSchema = z.object({
  body: z.string().min(1).max(4000),
});

export const joinInviteSchema = z.object({
  name: z.string().min(2).max(80),
  password: z.string().min(8),
});
