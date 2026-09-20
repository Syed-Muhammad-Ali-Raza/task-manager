declare module "@taskflow/shared" {
  import { z } from "zod";
  export const loginSchema: z.ZodType<{ email: string; password: string }>;
  export const createWorkspaceSchema: z.ZodType<{ name: string; description?: string }>;
  export const updateWorkspaceSchema: z.ZodType<{ name?: string; description?: string | null }>;
  export const createTaskSchema: z.ZodType<{
    title: string;
    description?: string;
    listId: string;
    priority?: "low" | "medium" | "high" | "urgent";
    status?: "todo" | "in_progress" | "done";
    assigneeId?: string | null;
  }>;
  export const updateTaskSchema: z.ZodType<Record<string, unknown>>;
  export const inviteSchema: z.ZodType<{ email: string; role: "admin" | "member" | "viewer"; workspaceId: string }>;
  export const joinInviteSchema: z.ZodType<{ name: string; password: string }>;
  export const commentSchema: z.ZodType<{ body: string }>;
}
