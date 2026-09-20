"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { BoardList, KanbanTask } from "./types";

type Props = {
  task: KanbanTask;
  lists: BoardList[];
  tasks: KanbanTask[];
  boardId?: string;
  onOpen: () => void;
  onChange: (patch: Partial<KanbanTask>) => void;
};

type Flyout = "move" | "status" | "parent" | "labels" | "confluence" | null;

export function TaskCardMenu({ task, lists, tasks, boardId, onOpen, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [flyout, setFlyout] = useState<Flyout>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, flyLeft: false });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function place() {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = 232;
    const maxHeight = Math.min(380, window.innerHeight - 16);
    let left = rect.right - width;
    let top = rect.bottom + 6;
    if (left < 8) left = 8;
    if (left + width > window.innerWidth - 8) left = Math.max(8, window.innerWidth - width - 8);
    if (top + 220 > window.innerHeight) {
      top = Math.max(8, rect.top - Math.min(maxHeight, 320));
    }
    const flyLeft = left + width + 220 > window.innerWidth;
    setCoords({ top, left, flyLeft });
  }

  useLayoutEffect(() => {
    if (!open) return;
    place();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
      setFlyout(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setFlyout(null);
      }
    }
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setOpen(false);
    setFlyout(null);
  }

  const link = typeof window === "undefined"
    ? ""
    : `${window.location.origin}/dashboard/boards/${boardId ?? task.listId}?task=${task.id}`;

  const flyoutClass = `absolute top-0 w-56 max-h-[min(320px,70vh)] overflow-y-auto rounded-lg bg-white py-1 shadow-xl ring-1 ring-black/10 ${
    coords.flyLeft ? "right-full mr-1" : "left-full ml-1"
  }`;

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          role="menu"
          className="fixed z-[10000] max-h-[min(380px,calc(100vh-16px))] w-[232px] overflow-y-auto rounded-lg bg-white py-1 text-[13px] text-[#172b4d] shadow-[0_8px_24px_rgba(9,30,66,0.25)] ring-1 ring-black/10"
          style={{ top: coords.top, left: coords.left }}
        >
          <MenuRow label="Move work item" hasChild onHover={() => setFlyout("move")} onClick={() => setFlyout("move")} />
          <MenuRow
            label="Change status"
            hasChild
            onHover={() => setFlyout("status")}
            onClick={() => setFlyout("status")}
          />
          <MenuRow label="Copy link" onHover={() => setFlyout(null)} onClick={() => void copy(link)} />
          <MenuRow label="Copy key" onHover={() => setFlyout(null)} onClick={() => void copy(task.key ?? task.id)} />
          <Divider />
          <MenuRow
            label="Link Confluence page"
            hasChild
            onHover={() => setFlyout("confluence")}
            onClick={() => setFlyout("confluence")}
          />
          <MenuRow
            label="Link work item"
            hasChild
            onHover={() => setFlyout("parent")}
            onClick={() => setFlyout("parent")}
          />
          <MenuRow
            label="Change parent"
            hasChild
            onHover={() => setFlyout("parent")}
            onClick={() => setFlyout("parent")}
          />
          <MenuRow
            label="Select cover"
            onHover={() => setFlyout(null)}
            onClick={() => {
              onOpen();
              setOpen(false);
            }}
          />
          <MenuRow label="Edit labels" hasChild onHover={() => setFlyout("labels")} onClick={() => setFlyout("labels")} />
          <MenuRow
            label={task.flagged ? "Remove flag" : "Add flag"}
            onHover={() => setFlyout(null)}
            onClick={() => {
              onChange({ flagged: !task.flagged });
              setOpen(false);
            }}
          />
          {(flyout === "move" || flyout === "status") && (
            <div className={flyoutClass}>
              {lists.map((list) => (
                <button
                  key={list.id}
                  type="button"
                  className="block w-full px-3 py-2 text-left hover:bg-[#f1f2f4]"
                  onClick={() => {
                    onChange({ listId: list.id });
                    setOpen(false);
                    setFlyout(null);
                  }}
                >
                  {list.name}
                  {task.listId === list.id ? <span className="float-right text-[#0c66e4]">✓</span> : null}
                </button>
              ))}
            </div>
          )}
          {flyout === "parent" && (
            <div className={flyoutClass}>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left hover:bg-[#f1f2f4]"
                onClick={() => {
                  onChange({ parentId: null });
                  setOpen(false);
                }}
              >
                No parent
              </button>
              {tasks
                .filter((item) => item.id !== task.id)
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="block w-full px-3 py-2 text-left hover:bg-[#f1f2f4]"
                    onClick={() => {
                      onChange({ parentId: item.id });
                      setOpen(false);
                    }}
                  >
                    {item.key} {item.title}
                  </button>
                ))}
            </div>
          )}
          {flyout === "labels" && (
            <div className={flyoutClass}>
              {["bug", "feature", "chatbot", "qa"].map((label) => {
                const selected = task.labels?.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-[#f1f2f4]"
                    onClick={() => {
                      const next = selected
                        ? (task.labels ?? []).filter((item) => item !== label)
                        : [...(task.labels ?? []), label];
                      onChange({ labels: next });
                    }}
                  >
                    {label}
                    {selected ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          )}
          {flyout === "confluence" && (
            <div className={flyoutClass}>
              <p className="px-3 py-2 text-[12px] text-[#626f86]">Paste a Confluence URL to attach it to this work item.</p>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left hover:bg-[#f1f2f4]"
                onClick={() => void copy("https://confluence.example/wiki/spaces/TF")}
              >
                Copy sample page link
              </button>
            </div>
          )}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[#44546f] hover:bg-[#091e420f]"
        aria-label="More actions"
        aria-expanded={open}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
          setFlyout(null);
        }}
      >
        ···
      </button>
      {menu}
    </>
  );
}

function Divider() {
  return <div className="my-1 border-t border-[#dcdfe4]" />;
}

function MenuRow({
  label,
  hasChild,
  onClick,
  onHover,
}: {
  label: string;
  hasChild?: boolean;
  onClick: () => void;
  onHover: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-[#f1f2f4]"
      onMouseEnter={onHover}
      onClick={onClick}
    >
      {label}
      {hasChild ? <span className="text-[#626f86]">›</span> : null}
    </button>
  );
}
