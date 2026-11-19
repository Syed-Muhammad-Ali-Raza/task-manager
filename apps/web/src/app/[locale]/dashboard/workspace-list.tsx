"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n, useLocalizedPath } from "@/i18n/client";
import { apiCall } from "@/lib/api";

type Workspace = {
  id: string;
  name: string;
  description: string | null;
  boards: { id: string; name: string }[];
};

export function WorkspaceList({ initial }: { initial: Workspace[] }) {
  const { dict } = useI18n();
  const lp = useLocalizedPath();
  const d = dict.dashboard;
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState(initial);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  async function createWorkspace(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const workspace = await apiCall<Workspace>("/api/workspaces", {
        method: "POST",
        body: JSON.stringify({ name: name.trim() }),
      });
      setName("");
      setWorkspaces((current) => [workspace, ...current]);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : d.couldNotCreateWorkspace);
    } finally {
      setSubmitting(false);
    }
  }

  async function saveName(id: string) {
    setError("");
    try {
      const updated = await apiCall<Workspace>(`/api/workspaces/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: editName.trim() }),
      });
      setWorkspaces((current) => current.map((item) => (item.id === id ? { ...item, name: updated.name } : item)));
      setEditingId(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : d.couldNotRenameWorkspace);
    }
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold">{d.workspacesTitle}</h1>
      <p className="mt-2 max-w-xl text-sm text-[#44546f]">{d.workspacesHint}</p>
      {error ? <p className="mt-3 text-sm text-ember">{error}</p> : null}

      <form onSubmit={createWorkspace} className="mt-8 flex max-w-lg gap-2">
        <input
          className="flex-1 rounded-md border border-[#dcdfe4] bg-white px-3 py-2"
          placeholder={d.newWorkspacePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
        />
        <button disabled={submitting} className="rounded-md bg-[#0c66e4] px-4 py-2 text-white disabled:opacity-60">
          {dict.common.create}
        </button>
      </form>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {workspaces.map((workspace) => {
          const board = workspace.boards?.[0];
          const editing = editingId === workspace.id;
          return (
            <li key={workspace.id} className="rounded-xl border border-[#dcdfe4] bg-white p-5">
              {editing ? (
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void saveName(workspace.id);
                  }}
                >
                  <input
                    className="flex-1 rounded-md border border-[#dcdfe4] px-2 py-1"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    minLength={2}
                    required
                    autoFocus
                  />
                  <button className="text-sm text-[#0c66e4]" type="submit">
                    {dict.common.save}
                  </button>
                  <button className="text-sm text-[#626f86]" type="button" onClick={() => setEditingId(null)}>
                    {dict.common.cancel}
                  </button>
                </form>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold">{workspace.name}</h2>
                  <button
                    type="button"
                    className="text-sm text-[#0c66e4]"
                    onClick={() => {
                      setEditingId(workspace.id);
                      setEditName(workspace.name);
                    }}
                  >
                    {d.rename}
                  </button>
                </div>
              )}
              <p className="mt-1 text-sm text-[#626f86]">{workspace.description ?? d.noDescription}</p>
              {board ? (
                <Link href={lp(`/dashboard/boards/${board.id}`)} className="mt-4 inline-block text-sm text-[#0c66e4]">
                  {d.openBoard}
                </Link>
              ) : (
                <p className="mt-4 text-sm text-[#626f86]">{d.noBoard}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
