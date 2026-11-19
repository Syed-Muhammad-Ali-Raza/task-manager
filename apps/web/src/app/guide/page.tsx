import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/components/marketing/PublicPageShell";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const title = "First-time guide";
const description =
  "A ten-minute walkthrough of TaskFlow: sign in, open a workspace, create and move a task, invite a teammate, and sign out.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guide" },
  openGraph: {
    title: `${title} | TaskFlow`,
    description,
    url: `${siteUrl}/guide`,
    type: "website",
  },
};

const steps = [
  {
    title: "Sign in with the demo account",
    body: "Open the sign-in page and use the seeded account. TaskFlow saves the session in an httpOnly cookie, so no token is written to browser storage.",
    detail: "Email: syed.ali@taskflow.dev · Password: demo1234",
  },
  {
    title: "Open your workspace",
    body: "The dashboard lists workspaces. Open TaskFlow Demo to see the seeded board. A workspace is the security boundary for boards, members, and invitations.",
    detail: "Optional: create another workspace with a unique name, or rename an existing card inline.",
  },
  {
    title: "Explore the board",
    body: "The board has three lists: Ready, In motion, and Shipped. Use Search board to filter cards by title, and the sidebar to switch boards.",
    detail: "The home page has an interactive preview if you want to try dragging before signing in.",
  },
  {
    title: "Create a task",
    body: "Choose + Create in the board header, type a short title, and press Create. Open the card to add a description, priority, assignee, labels, or a comment.",
    detail: "Every change is saved through the Express API, not only in local browser state.",
  },
  {
    title: "Move work forward",
    body: "Drag the card into In motion, add a comment with the next action, and move it to Shipped when it is done. Drag and drop is keyboard-friendly.",
    detail: "Task detail updates are validated with the same shared schemas the API uses.",
  },
  {
    title: "Invite a teammate",
    body: "Open People from the sidebar, choose a workspace, enter an email, and pick member, admin, or viewer. Send the invitation, then copy the generated invite link.",
    detail: "Roles and workspace membership are enforced by the API, not by the Next.js proxy.",
  },
  {
    title: "Check settings and sign out",
    body: "Visit Billing/Settings to see the demo settings surface, then sign out from the sidebar. Sign back in to confirm the cookie-based session flow.",
    detail: "That completes the tour. You now know the core TaskFlow workflow.",
  },
];

const troubleshooting = [
  {
    question: "The demo password does not work",
    answer: "Use exactly demo1234. The hosted demo and local in-memory mode use the same seeded account.",
  },
  {
    question: "My local data disappeared",
    answer: "In-memory mode resets when the API restarts. This is expected for local demonstration mode.",
  },
  {
    question: "A request returned 429",
    answer: "Rate limiting is active. Wait a moment and try again.",
  },
  {
    question: "A workspace name was rejected",
    answer: "Workspace names must be unique. Rename the existing workspace instead of creating a duplicate.",
  },
];

export default function GuidePage() {
  return (
    <PublicPageShell eyebrow="Start here" title="Your first 10 minutes in TaskFlow" description={description}>
      <section aria-labelledby="before-you-begin">
        <h2 id="before-you-begin" className="font-display text-2xl">
          Before you begin
        </h2>
        <p className="mt-3 text-ink/75">
          The demo is free and needs no credit card. Use it for evaluation only; do not put sensitive
          information in a task, comment, or invitation.
        </p>
        <Link href="/login" className="mt-5 inline-block bg-flow px-5 py-3 text-white">
          Open the demo
        </Link>
      </section>

      <section aria-labelledby="tour">
        <h2 id="tour" className="font-display text-2xl">
          The guided tour
        </h2>
        <ol className="mt-6 space-y-5">
          {steps.map((step, index) => (
            <li key={step.title} className="border border-mist bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-flow">Step {index + 1}</p>
              <h3 className="mt-2 font-display text-xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{step.body}</p>
              <p className="mt-3 border-l-2 border-flow pl-3 text-sm text-ink/60">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="troubleshooting">
        <h2 id="troubleshooting" className="font-display text-2xl">
          If something looks wrong
        </h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {troubleshooting.map((item) => (
            <div key={item.question} className="border border-mist bg-white p-5">
              <dt className="font-medium">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink/70">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="next-steps">
        <h2 id="next-steps" className="font-display text-2xl">
          Keep exploring
        </h2>
        <ul className="mt-5 flex flex-wrap gap-3 text-sm">
          <li><Link href="/#stack" className="inline-block border border-ink px-4 py-2">See the stack</Link></li>
          <li><Link href="/privacy" className="inline-block border border-ink px-4 py-2">Read the privacy policy</Link></li>
          <li><Link href="/terms" className="inline-block border border-ink px-4 py-2">Read the terms</Link></li>
          <li><Link href="/sponsors" className="inline-block border border-ink px-4 py-2">Support the project</Link></li>
        </ul>
      </section>
    </PublicPageShell>
  );
}
