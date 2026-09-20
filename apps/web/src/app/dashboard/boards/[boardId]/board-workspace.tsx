"use client";

import { FormEvent, useState } from "react";
import { BoardView } from "@/components/kanban/BoardView";
import { TaskDetail } from "@/components/kanban/TaskDetail";
import { apiCall } from "@/lib/api";
import type { KanbanTask } from "@/components/kanban/types";

type Board = {
  id: string;
  name: string;
  workspaceId?: string;
  workspaceName?: string;
  lists: { id: string; name: string; position: number }[];
  tasks: KanbanTask[];
};

export function BoardWorkspace({ initial }: { initial: Board }) {
  const [board, setBoard] = useState(initial);
  const [draft, setDraft] = useState<{ listId: string; title: string } | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  async function reload() {
    const data = await apiCall<Board>(`/api/boards/${board.id}`);
    setBoard(data);
  }

  async function addTask(event: FormEvent) {
    event.preventDefault();
    if (!draft?.title.trim()) return;
    try {
      await apiCall(`/api/boards/${board.id}/tasks`, {
        method: "POST",
        body: JSON.stringify({ title: draft.title.trim(), listId: draft.listId }),
      });
      setDraft(null);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add task");
    }
  }

  async function moveTask(taskId: string, listId: string) {
    try {
      await apiCall(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ listId }),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not move task");
      await reload();
    }
  }

  async function changeTask(taskId: string, patch: Partial<KanbanTask>) {
    try {
      await apiCall(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update task");
    }
  }

  const visibleTasks = board.tasks.filter((task) =>
    task.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col bg-[#f7f8f9]">
      <header className="border-b border-[#dcdfe4] bg-white px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-[#626f86]">Spaces / {board.workspaceName ?? "Workspace"}</p>
            <h1 className="text-[20px] font-semibold text-[#172b4d]">{board.name}</h1>
          </div>
          <button
            type="button"
            className="rounded-md bg-[#0c66e4] px-3 py-2 text-sm font-medium text-white"
            onClick={() => setDraft({ listId: board.lists[0]?.id ?? "", title: "" })}
          >
            + Create
          </button>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm">
          <span className="border-b-2 border-[#0c66e4] pb-2 font-medium text-[#0c66e4]">Board</span>
          <input
            className="ml-auto w-64 rounded-md border border-[#dcdfe4] bg-[#f7f8f9] px-3 py-1.5 text-sm"
            placeholder="Search board"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>
      {error ? <p className="px-6 pt-3 text-sm text-ember">{error}</p> : null}
      {draft ? (
        <form onSubmit={addTask} className="flex gap-2 px-6 py-3">
          <input
            autoFocus
            className="max-w-md flex-1 rounded-md border border-[#dcdfe4] bg-white px-3 py-2 text-sm"
            placeholder="What needs to be done?"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
          <button className="rounded-md bg-[#0c66e4] px-3 py-2 text-sm text-white">Create</button>
          <button type="button" className="text-sm text-[#626f86]" onClick={() => setDraft(null)}>
            Cancel
          </button>
        </form>
      ) : null}
      <div className="min-h-0 flex-1 px-4 pt-4">
        <BoardView
          tasks={visibleTasks}
          lists={board.lists}
          boardId={board.id}
          onMove={moveTask}
          onCreate={(listId) => setDraft({ listId, title: "" })}
          onOpen={setOpenTaskId}
          onChange={changeTask}
        />
      </div>
      {openTaskId ? (
        <TaskDetail taskId={openTaskId} onClose={() => setOpenTaskId(null)} onUpdated={() => void reload()} />
      ) : null}
    </div>
  );
}
