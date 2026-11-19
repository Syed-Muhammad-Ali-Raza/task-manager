"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BoardView } from "@/components/kanban/BoardView";
import { PublicFooter } from "@/components/marketing/PublicFooter";
import type { KanbanTask } from "@/components/kanban/types";

const lists = [
  { id: "todo", name: "Ready", position: 0 },
  { id: "in_progress", name: "In motion", position: 1 },
  { id: "done", name: "Shipped", position: 2 },
];

const seed: KanbanTask[] = [
  {
    id: "p1",
    title: "Write launch notes",
    description: null,
    status: "todo",
    priority: "high",
    key: "TF-101",
    listId: "todo",
    labels: ["launch"],
    assignee: { name: "Syed Ali" },
  },
  {
    id: "p2",
    title: "Wire workspace roles",
    description: null,
    status: "in_progress",
    priority: "medium",
    key: "TF-102",
    listId: "in_progress",
    labels: ["auth"],
    assignee: { name: "Sara Khan" },
  },
  {
    id: "p3",
    title: "Seed demo workspace",
    description: null,
    status: "done",
    priority: "low",
    key: "TF-103",
    listId: "done",
    assignee: { name: "Syed Ali" },
  },
  {
    id: "p4",
    title: "Polish board overflow menus",
    description: null,
    status: "todo",
    priority: "urgent",
    key: "TF-104",
    listId: "todo",
    labels: ["ui"],
    flagged: true,
    assignee: { name: "Sara Khan" },
  },
];

const tabs = [
  {
    id: "board",
    title: "Boards that feel like work",
    body: "Columns, priorities, flags, and a full card menu — drag a card in the live preview.",
  },
  {
    id: "auth",
    title: "Session that survives refresh",
    body: "httpOnly cookies via a Next.js BFF. No tokens in localStorage. SSR reads the same session.",
  },
  {
    id: "team",
    title: "People and spaces",
    body: "Workspaces, unique names, invites, and roles. Rename once and it follows the sidebar and board.",
  },
];

export function LandingExperience() {
  const [tasks, setTasks] = useState(seed);
  const [tab, setTab] = useState(tabs[0].id);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });

  const active = useMemo(() => tabs.find((item) => item.id === tab) ?? tabs[0], [tab]);
  const shipped = tasks.filter((task) => task.listId === "done").length;

  return (
    <main
      className="relative overflow-hidden"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpotlight({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(700px circle at ${spotlight.x}% ${spotlight.y}%, rgba(20,108,120,0.18), transparent 45%)`,
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <p className="font-display text-2xl font-semibold">TaskFlow</p>
        <nav aria-label="Public navigation" className="flex items-center gap-4 text-sm">
          <Link href="/guide" className="text-flow">
            Guide
          </Link>
          <a href="#preview" className="hidden sm:inline">
            Live board
          </a>
          <a href="#stack" className="hidden sm:inline">
            Stack
          </a>
          <Link href="/sponsors" className="hidden lg:inline">
            Sponsors
          </Link>
          <Link href="/login">Sign in</Link>
          <Link href="/login" className="bg-ink px-4 py-2 text-paper">
            Open the product
          </Link>
        </nav>
      </header>

      <section className="relative z-10 grid gap-10 px-6 pb-16 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:px-10 md:pt-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-flow">Collaborative SaaS · portfolio build</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
            Keep the work moving, not the meetings.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            A production-shaped board: Next.js App Router, Express, PostgreSQL, cookie sessions, and a Jira-style
            workspace you can actually ship from.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login" className="bg-flow px-5 py-3 text-white">
              Try as Syed Ali
            </Link>
            <a href="#preview" className="border border-ink px-5 py-3">
              Drag the demo board
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-ink/50">Cards in preview</dt>
              <dd className="font-display text-2xl">{tasks.length}</dd>
            </div>
            <div>
              <dt className="text-ink/50">Shipped</dt>
              <dd className="font-display text-2xl">{shipped}</dd>
            </div>
            <div>
              <dt className="text-ink/50">Session</dt>
              <dd className="font-display text-2xl">Cookie</dd>
            </div>
          </dl>
        </div>

        <div id="preview" className="rounded-2xl border border-mist bg-white/80 p-4 shadow-xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between text-sm text-ink/60">
            <span>Launch board · drag cards between columns</span>
            <button type="button" className="text-flow" onClick={() => setTasks(seed)}>
              Reset
            </button>
          </div>
          <BoardView
            tasks={tasks}
            lists={lists}
            onMove={(taskId, listId) => {
              setTasks((current) =>
                current.map((task) => (task.id === taskId ? { ...task, listId, status: listId } : task)),
              );
            }}
            onChange={(taskId, patch) => {
              setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, ...patch } : task)));
            }}
          />
        </div>
      </section>

      <section className="relative z-10 border-t border-mist px-6 py-12 md:px-10">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`rounded-full px-4 py-2 text-sm ${tab === item.id ? "bg-ink text-paper" : "border border-mist bg-white"}`}
              onClick={() => setTab(item.id)}
            >
              {item.title.split(" ")[0]}
            </button>
          ))}
        </div>
        <h2 className="mt-6 font-display text-3xl">{active.title}</h2>
        <p className="mt-3 max-w-2xl text-ink/70">{active.body}</p>
      </section>

      <section id="stack" className="relative z-10 border-t border-mist px-6 py-12 md:px-10">
        <h2 className="font-display text-3xl">What this build proves</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          <li className="border border-mist bg-white p-5">
            <h3 className="font-medium">Monorepo split</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              `apps/web` and `apps/api` share types, so the UI and API can grow independently.
            </p>
          </li>
          <li className="border border-mist bg-white p-5">
            <h3 className="font-medium">Real data model</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Workspaces, roles, boards, lists, comments, and attachments — not a single todo table.
            </p>
          </li>
          <li className="border border-mist bg-white p-5">
            <h3 className="font-medium">Production habits</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Helmet, Zod, httpOnly cookies, SSR with no-store, unique workspace names, and a health check.
            </p>
          </li>
        </ul>
      </section>

      <section className="relative z-10 border-t border-mist px-6 py-12 md:px-10">
        <h2 className="font-display text-3xl">New here? Get a guided tour.</h2>
        <p className="mt-2 max-w-lg text-ink/70">
          Follow the first-time guide to sign in, create a task, move it across the board, and invite a teammate.
        </p>
        <Link href="/guide" className="mt-6 inline-block bg-ink px-5 py-3 text-paper">
          Open the 10-minute guide
        </Link>
      </section>
      <PublicFooter />
    </main>
  );
}
