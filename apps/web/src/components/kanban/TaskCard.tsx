"use client";

import type { ReactNode } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { TaskCardMenu } from "./TaskCardMenu";
import type { BoardList, KanbanTask } from "./types";

export type { BoardList, KanbanTask };

const priorityStyle: Record<string, string> = {
  urgent: "text-[#c9372c]",
  high: "text-[#c9372c]",
  medium: "text-[#e2b203]",
  low: "text-[#22a06b]",
};

function initials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TaskCard({
  task,
  draggable = false,
  lists = [],
  tasks = [],
  boardId,
  onOpen,
  onChange,
}: {
  task: KanbanTask;
  draggable?: boolean;
  lists?: BoardList[];
  tasks?: KanbanTask[];
  boardId?: string;
  onOpen?: () => void;
  onChange?: (patch: Partial<KanbanTask>) => void;
}) {
  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { listId: task.listId, status: task.status },
    disabled: !draggable,
  });
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `task-${task.id}`,
    data: { listId: task.listId, status: task.status },
  });

  function setNodeRef(node: HTMLElement | null) {
    setDragRef(node);
    setDropRef(node);
  }

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  return (
    <article
      ref={draggable ? setNodeRef : undefined}
      style={style}
      className={`group relative rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5 ${isDragging ? "opacity-60" : ""} ${isOver ? "ring-[#0c66e4]" : ""} ${task.flagged ? "ring-1 ring-[#c9372c]" : ""}`}
    >
      {task.coverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/api/proxy${task.coverUrl}`} alt="" className="mb-2 h-20 w-full rounded-md object-cover" />
      ) : null}
      <div className="flex items-start gap-1">
        <button
          type="button"
          className="min-w-0 flex-1 text-left"
          onClick={() => onOpen?.()}
        >
          <h4 className="text-[13px] font-medium leading-snug text-[#172b4d]">{task.title}</h4>
        </button>
        {onChange && lists.length ? (
          <div>
            <TaskCardMenu
              task={task}
              lists={lists}
              tasks={tasks}
              boardId={boardId}
              onOpen={() => onOpen?.()}
              onChange={onChange}
            />
          </div>
        ) : null}
      </div>
      {task.labels && task.labels.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {task.labels.map((label) => (
            <span key={label} className="rounded bg-[#e9f2ff] px-1.5 py-0.5 text-[11px] text-[#0c66e4]">
              {label}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-[12px] text-[#626f86]">
          <span className={`text-[12px] font-bold ${priorityStyle[task.priority] ?? "text-[#44546f]"}`}>
            {task.priority === "high" || task.priority === "urgent" ? "↑↑" : task.priority === "low" ? "=" : "↑"}
          </span>
          {task.key ?? task.id.slice(0, 6).toUpperCase()}
        </span>
        <span className="flex items-center gap-2">
          {draggable ? (
            <span
              className="cursor-grab text-[#626f86] active:cursor-grabbing"
              {...listeners}
              {...attributes}
              aria-label="Drag"
            >
              ⋮⋮
            </span>
          ) : null}
          <span
            title={task.assignee?.name ?? "Unassigned"}
            className="grid h-6 w-6 place-items-center rounded-full bg-[#0c66e4] text-[10px] font-semibold text-white"
          >
            {initials(task.assignee?.name)}
          </span>
        </span>
      </div>
    </article>
  );
}

export function ColumnDrop({
  listId,
  status,
  label,
  count,
  children,
  onCreate,
}: {
  listId: string;
  status: string;
  label: string;
  count: number;
  children: ReactNode;
  onCreate?: (listId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: listId, data: { listId, status } });
  return (
    <section
      ref={setNodeRef}
      className={`flex w-[260px] shrink-0 flex-col rounded-xl ${isOver ? "bg-[#d6e6ff]" : "bg-[#f1f2f4]"}`}
    >
      <header className="flex items-center justify-between px-3 pb-1 pt-3">
        <h3 className="text-[14px] font-semibold text-[#172b4d]">{label}</h3>
        <span className="text-[12px] text-[#626f86]">{count}</span>
      </header>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-visible px-2 pb-2">{children}</div>
      {onCreate ? (
        <button
          type="button"
          className="mx-2 mb-2 rounded-md px-2 py-1.5 text-left text-[14px] text-[#44546f] hover:bg-black/5"
          onClick={() => onCreate(listId)}
        >
          + Create
        </button>
      ) : null}
    </section>
  );
}
