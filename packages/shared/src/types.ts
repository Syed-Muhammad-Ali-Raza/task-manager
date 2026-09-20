export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in_progress" | "done";
export type PlanId = "free" | "pro" | "enterprise";

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Board {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
}

export interface Task {
  id: string;
  boardId: string;
  listId: string;
  title: string;
  description: string | null;
  createdBy: string;
  assigneeId: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  timeTrackingMinutes: number;
}
