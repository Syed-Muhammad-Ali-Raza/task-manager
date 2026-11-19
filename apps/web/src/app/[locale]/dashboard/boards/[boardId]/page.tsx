import { serverApi } from "@/lib/server-api";
import { BoardWorkspace } from "./board-workspace";
import type { KanbanTask } from "@/components/kanban/types";

type Board = {
  id: string;
  name: string;
  workspaceId?: string;
  workspaceName?: string;
  lists: { id: string; name: string; position: number }[];
  tasks: KanbanTask[];
};

export default async function BoardPage(props: PageProps<'/[locale]/dashboard/boards/[boardId]'>) {
  const { boardId } = await props.params;
  const board = await serverApi<Board>(`/api/boards/${boardId}`);
  return <BoardWorkspace initial={board} />;
}
