export type BoardList = { id: string; name: string; position: number };

export type KanbanTask = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  listId?: string;
  key?: string;
  assignee?: { name: string | null } | null;
  flagged?: boolean;
  labels?: string[];
  coverUrl?: string | null;
  parentId?: string | null;
};
