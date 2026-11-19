import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/components/marketing/PublicPageShell";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const title = "Sponsors and support";
const description =
  "TaskFlow is free and open source under the MIT License. Learn how to support the project through GitHub Sponsors, issues, reviews, and documentation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sponsors" },
  openGraph: {
    title: `${title} | TaskFlow`,
    description,
    url: `${siteUrl}/sponsors`,
    type: "website",
  },
};

const supportOptions = [
  {
    title: "Star and share",
    body: "Star the repository and send it to someone learning Next.js, Express, or full-stack architecture.",
  },
  {
    title: "Report a clear bug",
    body: "Open an issue with steps to reproduce, expected behavior, and what you saw instead.",
  },
  {
    title: "Review or improve",
    body: "Review a pull request, tighten an accessibility detail, add a test, or clarify the docs.",
  },
  {
    title: "Sponsor the maintainer",
    body: "Use GitHub Sponsors if you want to support ongoing hosting and maintenance financially.",
  },
];

export default function SponsorsPage() {
  return (
    <PublicPageShell
      eyebrow="Community"
      title={title}
      description="TaskFlow is free and open source under the MIT License. The demo is self-funded for learning and portfolio purposes."
    >
      <section aria-labelledby="why-support">
        <h2 id="why-support" className="font-display text-2xl">
          Why support matters
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          Sponsorship helps keep the demo online and the documentation useful. It is entirely
          optional: the code, guides, privacy policy, and terms remain free to read, use, fork, and
          improve.
        </p>
        <a
          href="https://github.com/sponsors/Syed-Muhammad-Ali-Raza"
          className="mt-5 inline-block bg-flow px-5 py-3 text-white"
        >
          Sponsor on GitHub
        </a>
      </section>

      <section aria-labelledby="ways-to-help">
        <h2 id="ways-to-help" className="font-display text-2xl">
          Ways to help
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {supportOptions.map((option) => (
            <li key={option.title} className="border border-mist bg-white p-5">
              <h3 className="font-medium">{option.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{option.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="current-sponsors">
        <h2 id="current-sponsors" className="font-display text-2xl">
          Current sponsors
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          No sponsors are listed yet. To be acknowledged here, use the GitHub Sponsors link above or
          email <a href="mailto:syed.ali@taskflow.dev" className="text-flow underline">syed.ali@taskflow.dev</a>.
        </p>
      </section>

      <section aria-labelledby="sponsor-teams">
        <h2 id="sponsor-teams" className="font-display text-2xl">
          For teams
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          TaskFlow is a demo, not a managed service. For production work, fork the repository, deploy
          it to your own Vercel and Neon accounts, and maintain your own data and security controls.
        </p>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          <li>
            <Link href="/guide" className="inline-block border border-ink px-4 py-2">
              Follow the guide
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/Syed-Muhammad-Ali-Raza/task-manager/blob/main/docs/DEPLOY_FREE.md"
              className="inline-block border border-ink px-4 py-2"
            >
              Free deployment guide
            </a>
          </li>
          <li>
            <Link href="/license" className="inline-block border border-ink px-4 py-2">
              MIT license
            </Link>
          </li>
        </ul>
      </section>
    </PublicPageShell>
  );
}
