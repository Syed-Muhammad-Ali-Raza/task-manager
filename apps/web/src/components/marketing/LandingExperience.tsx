"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BoardView } from "@/components/kanban/BoardView";
import { PublicFooter } from "@/components/marketing/PublicFooter";
import { PublicHeader } from "@/components/marketing/PublicHeader";
import type { KanbanTask } from "@/components/kanban/types";
import { useI18n, useLocalizedPath } from "@/i18n/client";

export function LandingExperience() {
  const { dict } = useI18n();
  const lp = useLocalizedPath();

  const seedLists = useMemo(
    () => dict.landing.seedLists.map((list, index) => ({ ...list, position: index })),
    [dict.landing.seedLists],
  );

  const seed = useMemo<KanbanTask[]>(
    () => [
      {
        id: "p1",
        title: dict.landing.seedTasks[0].title,
        description: null,
        status: "todo",
        priority: "high",
        key: "TF-101",
        listId: "todo",
        labels: [dict.landing.seedTasks[0].label],
        assignee: { name: "Syed Ali" },
      },
      {
        id: "p2",
        title: dict.landing.seedTasks[1].title,
        description: null,
        status: "in_progress",
        priority: "medium",
        key: "TF-102",
        listId: "in_progress",
        labels: [dict.landing.seedTasks[1].label],
        assignee: { name: "Sara Khan" },
      },
      {
        id: "p3",
        title: dict.landing.seedTasks[2].title,
        description: null,
        status: "done",
        priority: "low",
        key: "TF-103",
        listId: "done",
        labels: [dict.landing.seedTasks[2].label],
        assignee: { name: "Syed Ali" },
      },
      {
        id: "p4",
        title: dict.landing.seedTasks[3].title,
        description: null,
        status: "todo",
        priority: "urgent",
        key: "TF-104",
        listId: "todo",
        labels: [dict.landing.seedTasks[3].label],
        flagged: true,
        assignee: { name: "Sara Khan" },
      },
    ],
    [dict.landing.seedTasks],
  );

  const [tasks, setTasks] = useState(seed);
  const [tab, setTab] = useState(dict.landing.tabs[0].id);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });

  const active = useMemo(
    () => dict.landing.tabs.find((item) => item.id === tab) ?? dict.landing.tabs[0],
    [dict.landing.tabs, tab],
  );
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

      <div className="relative z-10">
        <PublicHeader />
      </div>

      <section className="relative z-10 grid gap-10 px-6 pb-16 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:px-10 md:pt-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-flow">
            {dict.landing.heroEyebrow}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
            {dict.landing.heroTitle}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            {dict.landing.heroBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={lp("/login")} className="bg-flow px-5 py-3 text-white">
              {dict.landing.heroPrimary}
            </Link>
            <a href="#preview" className="border border-ink px-5 py-3">
              {dict.landing.heroSecondary}
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-ink/50">{dict.landing.statCards}</dt>
              <dd className="font-display text-2xl">{tasks.length}</dd>
            </div>
            <div>
              <dt className="text-ink/50">{dict.landing.statShipped}</dt>
              <dd className="font-display text-2xl">{shipped}</dd>
            </div>
            <div>
              <dt className="text-ink/50">{dict.landing.statSession}</dt>
              <dd className="font-display text-2xl">{dict.landing.statCookie}</dd>
            </div>
          </dl>
        </div>

        <div id="preview" className="rounded-2xl border border-mist bg-white/80 p-4 shadow-xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between text-sm text-ink/60">
            <span>{dict.landing.previewHint}</span>
            <button type="button" className="text-flow" onClick={() => setTasks(seed)}>
              {dict.landing.reset}
            </button>
          </div>
          <BoardView
            tasks={tasks}
            lists={seedLists}
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
          {dict.landing.tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`rounded-full px-4 py-2 text-sm ${tab === item.id ? "bg-ink text-paper" : "border border-mist bg-white"}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <h2 className="mt-6 font-display text-3xl">{active.title}</h2>
        <p className="mt-3 max-w-2xl text-ink/70">{active.body}</p>
      </section>

      <section id="stack" className="relative z-10 border-t border-mist px-6 py-12 md:px-10">
        <h2 className="font-display text-3xl">{dict.landing.stackTitle}</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {dict.landing.stack.map((item) => (
            <li key={item.title} className="border border-mist bg-white p-5">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative z-10 border-t border-mist px-6 py-12 md:px-10">
        <h2 className="font-display text-3xl">{dict.landing.guideCtaTitle}</h2>
        <p className="mt-2 max-w-lg text-ink/70">{dict.landing.guideCtaBody}</p>
        <Link href={lp("/guide")} className="mt-6 inline-block bg-ink px-5 py-3 text-paper">
          {dict.landing.guideCtaButton}
        </Link>
      </section>
      <div className="relative z-10">
        <PublicFooter />
      </div>
    </main>
  );
}
