"use client";

import { useEffect, useMemo, useState } from "react";
import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { useI18n } from "@/i18n/client";
import { ColumnDrop, TaskCard } from "./TaskCard";
import type { BoardList, KanbanTask } from "./types";

export type { BoardList, KanbanTask };

export function BoardView({
  tasks,
  lists,
  boardId,
  onMove,
  onCreate,
  onOpen,
  onChange,
}: {
  tasks: KanbanTask[];
  lists?: BoardList[];
  boardId?: string;
  onMove?: (taskId: string, listId: string) => void;
  onCreate?: (listId: string) => void;
  onOpen?: (taskId: string) => void;
  onChange?: (taskId: string, patch: Partial<KanbanTask>) => void;
}) {
  const { dict } = useI18n();
  const [localTasks, setLocalTasks] = useState(tasks);
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);
  const display = onMove ? localTasks : tasks;

  const fallbackColumns = useMemo(
    () =>
      dict.dashboard.board.defaultColumns.map((column) => ({
        id: column.id,
        key: column.id,
        label: column.name,
      })),
    [dict.dashboard.board.defaultColumns],
  );

  const columns = lists?.length
    ? [...lists].sort((a, b) => a.position - b.position).map((list) => ({
        id: list.id,
        key: list.id,
        label: list.name,
      }))
    : fallbackColumns;

  const grouped = useMemo(() => {
    const buckets: Record<string, KanbanTask[]> = {};
    for (const column of columns) buckets[column.id] = [];
    for (const task of display) {
      const bucket = lists?.length ? task.listId : task.status;
      if (bucket && buckets[bucket]) buckets[bucket].push(task);
      else if (buckets[columns[0].id]) buckets[columns[0].id].push(task);
    }
    return buckets;
  }, [columns, display, lists]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  );

  function handleDragEnd(event: DragEndEvent) {
    const over = event.over;
    const taskId = String(event.active.id);
    if (!over || !onMove) return;
    const listId = (over.data.current?.listId as string | undefined) ?? String(over.id);
    if (!columns.some((column) => column.id === listId)) return;
    setLocalTasks((current) => current.map((task) => (task.id === taskId ? { ...task, listId, status: listId } : task)));
    onMove(taskId, listId);
  }

  const board = (
    <div className="flex h-full gap-3 overflow-x-auto pb-4">
      {columns.map((column) => (
        <ColumnDrop
          key={column.id}
          listId={column.id}
          status={column.key}
          label={column.label}
          count={grouped[column.id]?.length ?? 0}
          onCreate={onCreate}
        >
          {(grouped[column.id] ?? []).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              draggable={Boolean(onMove)}
              lists={lists}
              tasks={display}
              boardId={boardId}
              onOpen={() => onOpen?.(task.id)}
              onChange={(patch) => onChange?.(task.id, patch)}
            />
          ))}
        </ColumnDrop>
      ))}
    </div>
  );

  if (!onMove) {
    return board;
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      {board}
    </DndContext>
  );
}
