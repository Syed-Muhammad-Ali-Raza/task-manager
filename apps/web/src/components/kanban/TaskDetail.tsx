"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { apiCall, uploadFile } from "@/lib/api";
import type { KanbanTask } from "./types";

type Comment = {
  id: string;
  body: string;
  createdAt: string;
  author: { name: string | null; email: string };
};

type Attachment = {
  id: string;
  name: string;
  mimeType: string;
  url: string;
  size: number;
};

type TaskDetailData = KanbanTask & {
  comments: Comment[];
  attachments: Attachment[];
};

const priorities = ["low", "medium", "high", "urgent"] as const;

export function TaskDetail({ taskId, onClose, onUpdated }: { taskId: string; onClose: () => void; onUpdated: () => void }) {
  const [task, setTask] = useState<TaskDetailData | null>(null);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const data = await apiCall<TaskDetailData>(`/api/tasks/${taskId}`);
    setTask(data);
    setDescription(data.description ?? "");
  }, [taskId]);

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Could not load task"));
  }, [load]);

  async function saveDescription() {
    setSaving(true);
    try {
      await apiCall(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ description }),
      });
      await load();
      onUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  async function savePriority(priority: string) {
    await apiCall(`/api/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ priority }) });
    await load();
    onUpdated();
  }

  async function addComment(event: FormEvent) {
    event.preventDefault();
    await apiCall(`/api/tasks/${taskId}/comments`, {
      method: "POST",
      body: JSON.stringify({ body: comment }),
    });
    setComment("");
    await load();
  }

  async function addFiles(files: FileList | null, asCover = false) {
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      await uploadFile(`/api/tasks/${taskId}/attachments`, file, asCover ? { asCover: "true" } : undefined);
    }
    await load();
    onUpdated();
  }

  if (!task) {
    return (
      <div className="fixed inset-0 z-40 flex justify-end bg-black/30">
        <aside className="h-full w-full max-w-xl bg-white p-6">{error || "Loading…"}</aside>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30" onClick={onClose}>
      <aside className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] text-[#626f86]">{task.key}</p>
            <h2 className="mt-1 text-xl font-semibold text-[#172b4d]">{task.title}</h2>
          </div>
          <button type="button" className="text-[#626f86]" onClick={onClose}>
            Close
          </button>
        </div>

        <label className="mt-5 block text-[12px] font-semibold uppercase text-[#626f86]">
          Priority
          <select
            className="mt-1 w-full rounded-md border border-[#dcdfe4] px-3 py-2 text-sm capitalize"
            value={task.priority}
            onChange={(event) => savePriority(event.target.value)}
          >
            {priorities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-5 block text-[12px] font-semibold uppercase text-[#626f86]">
          Description
          <textarea
            className="mt-1 min-h-28 w-full rounded-md border border-[#dcdfe4] px-3 py-2 text-sm"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add a description…"
          />
        </label>
        <button
          type="button"
          disabled={saving}
          className="mt-2 rounded-md bg-[#0c66e4] px-3 py-1.5 text-sm text-white disabled:opacity-60"
          onClick={() => void saveDescription()}
        >
          Save description
        </button>

        <section className="mt-8">
          <h3 className="text-[12px] font-semibold uppercase text-[#626f86]">Attachments</h3>
          <p className="mt-1 text-[12px] text-[#626f86]">Images, PDF, video, or any file for reference.</p>
          <input
            className="mt-2 block text-sm"
            type="file"
            multiple
            accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.zip"
            onChange={(event) => void addFiles(event.target.files)}
          />
          <ul className="mt-3 space-y-3">
            {task.attachments.map((file) => (
              <li key={file.id} className="rounded-md border border-[#dcdfe4] p-2">
                {file.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/proxy${file.url}`} alt={file.name} className="max-h-48 w-full rounded object-contain" />
                ) : file.mimeType.startsWith("video/") ? (
                  <video src={`/api/proxy${file.url}`} controls className="max-h-48 w-full" />
                ) : (
                  <a className="text-sm text-[#0c66e4]" href={`/api/proxy${file.url}`} target="_blank" rel="noreferrer">
                    {file.name} {file.mimeType.includes("pdf") ? "(PDF)" : ""}
                  </a>
                )}
                <p className="mt-1 text-[11px] text-[#626f86]">{file.name}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-[12px] font-semibold uppercase text-[#626f86]">Comments</h3>
          <ul className="mt-3 space-y-3">
            {task.comments.map((item) => (
              <li key={item.id} className="rounded-md bg-[#f7f8f9] p-3">
                <p className="text-[12px] font-medium text-[#172b4d]">
                  {item.author.name}{" "}
                  <span className="font-normal text-[#626f86]">{new Date(item.createdAt).toLocaleString()}</span>
                </p>
                <p className="mt-1 text-sm text-[#172b4d]">{item.body}</p>
              </li>
            ))}
          </ul>
          <form onSubmit={addComment} className="mt-3">
            <textarea
              className="w-full rounded-md border border-[#dcdfe4] px-3 py-2 text-sm"
              placeholder="Comment on this work item"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              required
            />
            <button className="mt-2 rounded-md bg-[#0c66e4] px-3 py-1.5 text-sm text-white">Comment</button>
          </form>
        </section>
        {error ? <p className="mt-3 text-sm text-[#c9372c]">{error}</p> : null}
      </aside>
    </div>
  );
}
