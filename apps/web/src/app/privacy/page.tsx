import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/components/marketing/PublicPageShell";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const title = "Privacy policy";
const description =
  "What TaskFlow stores, why it stores it, where data lives, and how to request deletion of a hosted demo account.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${title} | TaskFlow`,
    description,
    url: `${siteUrl}/privacy`,
    type: "website",
  },
};

const categories = [
  {
    name: "Account details",
    examples: "Name, email address, password hash, workspace role",
    reason: "Sign you in and decide what you can access.",
  },
  {
    name: "Workspace content",
    examples: "Workspaces, boards, lists, tasks, comments, invitations",
    reason: "Provide the core task-management features.",
  },
  {
    name: "Session data",
    examples: "An httpOnly tf_access cookie containing a signed JWT",
    reason: "Keep you signed in without exposing the token to JavaScript.",
  },
  {
    name: "Technical data",
    examples: "IP address and request metadata",
    reason: "Apply rate limits, protect the API, and diagnose failures.",
  },
];

export default function PrivacyPage() {
  return (
    <PublicPageShell
      eyebrow="Legal"
      title={title}
      description="Effective date: November 19, 2026. TaskFlow is a portfolio demo operated by Syed Ali. This policy explains what the app stores and why."
    >
      <section aria-labelledby="what-we-store">
        <h2 id="what-we-store" className="font-display text-2xl">
          What we store
        </h2>
        <div className="mt-5 overflow-x-auto border border-mist bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Categories of data TaskFlow stores and why</caption>
            <thead className="border-b border-mist bg-paper/60">
              <tr>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">Examples</th>
                <th scope="col" className="px-4 py-3">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist">
              {categories.map((item) => (
                <tr key={item.name}>
                  <th scope="row" className="px-4 py-3 font-medium">{item.name}</th>
                  <td className="px-4 py-3 text-ink/70">{item.examples}</td>
                  <td className="px-4 py-3 text-ink/70">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          Passwords are hashed before storage. TaskFlow does not store raw JWTs in localStorage and
          does not set advertising or third-party analytics cookies.
        </p>
      </section>

      <section aria-labelledby="where-data-lives">
        <h2 id="where-data-lives" className="font-display text-2xl">
          Where data lives
        </h2>
        <ul className="mt-4 space-y-3 text-ink/75">
          <li>
            <strong>Local demo mode:</strong> the API uses an in-memory store. Data disappears when
            the API process restarts.
          </li>
          <li>
            <strong>Hosted demo:</strong> application data is stored in Neon Postgres. The Next.js
            app and API run on Vercel, which may process infrastructure logs under their own policies.
          </li>
        </ul>
      </section>

      <section aria-labelledby="how-we-use-data">
        <h2 id="how-we-use-data" className="font-display text-2xl">
          How we use data
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          We use this information only to operate the app, keep it secure, and respond to support
          requests. We do not sell personal data and we do not use workspace content for advertising.
        </p>
      </section>

      <section aria-labelledby="sharing-retention">
        <h2 id="sharing-retention" className="font-display text-2xl">
          Sharing and retention
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          TaskFlow does not intentionally share workspace content with third parties. Hosting
          providers process data on our behalf to run the service. Local in-memory data is temporary;
          hosted data remains until you delete it or an inactive demo workspace is removed.
        </p>
      </section>

      <section aria-labelledby="security-privacy">
        <h2 id="security-privacy" className="font-display text-2xl">
          Security and your choices
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          Access checks happen in the Express API, including workspace membership and role checks.
          Account responses use <code>Cache-Control: no-store</code>. You can sign out, delete content
          you created, or request deletion of a hosted demo account.
        </p>
        <p className="mt-3 leading-relaxed text-ink/75">
          TaskFlow is not directed at children under 13. Do not submit sensitive, confidential, or
          production-critical data to the demo.
        </p>
      </section>

      <section aria-labelledby="privacy-changes-contact">
        <h2 id="privacy-changes-contact" className="font-display text-2xl">
          Changes and contact
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          We may update this policy when the app changes; the effective date above identifies the
          current version. Questions or deletion requests:{" "}
          <a href="mailto:syed.ali@taskflow.dev" className="text-flow underline">
            syed.ali@taskflow.dev
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-ink/60">
          The repository source is licensed under the MIT License. See{" "}
          <Link href="/terms" className="text-flow underline">terms of service</Link> and{" "}
          <Link href="/license" className="text-flow underline">MIT license</Link>.
        </p>
      </section>
    </PublicPageShell>
  );
}
