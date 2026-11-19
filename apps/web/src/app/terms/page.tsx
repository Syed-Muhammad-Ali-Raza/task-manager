import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/components/marketing/PublicPageShell";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const title = "Terms of service";
const description =
  "Plain-language rules for using the TaskFlow hosted demo and public website, plus how the MIT license applies to the source code.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `${title} | TaskFlow`,
    description,
    url: `${siteUrl}/terms`,
    type: "website",
  },
};

const sections = [
  {
    id: "who-runs-this",
    title: "Who runs this",
    body: "TaskFlow is a portfolio project operated by Syed Ali. It is provided for demonstration, evaluation, and learning. It is not a commercial service and is not intended for production-critical work.",
  },
  {
    id: "using-the-demo",
    title: "Using the demo",
    body: "You may use the demo only if you are at least 13 years old, use accurate account information, respect other users and their workspaces, and comply with applicable law. The shared demo account and seeded content are public examples. Do not enter passwords, secrets, personal data, or confidential business information.",
  },
  {
    id: "accounts",
    title: "Accounts and security",
    body: "Keep your credentials private and sign out when you are finished. TaskFlow stores sessions in an httpOnly cookie and applies server-side membership and role checks. You are responsible for activity that happens with your account. Report suspected unauthorized access to syed.ali@taskflow.dev.",
  },
  {
    id: "your-content",
    title: "Your content",
    body: "You keep ownership of content you create in TaskFlow. By submitting content, you grant the operator a limited, non-exclusive license to store and display it only to run the demo. Do not submit content you do not have the right to share. Content may be removed if it is abusive, unlawful, or puts the demo at risk.",
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: "Do not probe, scan, or attack the app, API, database, or hosting providers; bypass authentication, roles, rate limits, or workspace checks; scrape private routes or overwhelm the service; upload malware, spam, phishing material, or infringing content; impersonate another person; or use the demo for illegal activity.",
  },
  {
    id: "availability",
    title: "Availability and changes",
    body: "The demo may be unavailable, reset, changed, or discontinued at any time. Local in-memory data resets when the API restarts, and hosted data may be deleted during maintenance. We may update these terms; the effective date above shows the current version.",
  },
  {
    id: "open-source",
    title: "Open-source license",
    body: "The repository source code is licensed under the MIT License. That license allows you to copy, modify, and distribute the code, subject to its copyright notice. It does not grant access to hosted accounts, credentials, or private data.",
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: "The hosted app uses Vercel for hosting and Neon for the database. Your use of those services is also subject to their terms and privacy policies. TaskFlow does not set advertising cookies.",
  },
  {
    id: "disclaimer",
    title: "Disclaimer and liability",
    body: "The software and hosted demo are provided “as is” and “as available,” without warranties of any kind. To the maximum extent permitted by law, the operator is not liable for indirect, incidental, special, consequential, or punitive damages, or for lost data, profits, or use arising from the demo, even if advised of the possibility of such damages.",
  },
  {
    id: "termination",
    title: "Termination and contact",
    body: "We may suspend or terminate access for conduct that violates these terms or threatens the service. You may stop using the demo at any time and request deletion of your hosted account. Questions: syed.ali@taskflow.dev.",
  },
];

export default function TermsPage() {
  return (
    <PublicPageShell
      eyebrow="Legal"
      title={title}
      description="Effective date: November 19, 2026. These terms govern use of the TaskFlow hosted demo and public website. The source code is separately licensed under the MIT License."
    >
      <nav aria-label="On this page" className="border border-mist bg-white p-5 text-sm">
        <h2 className="font-semibold">On this page</h2>
        <ol className="mt-3 grid gap-2 md:grid-cols-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-flow underline">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id} className="font-display text-2xl">
            {section.title}
          </h2>
          <p className="mt-3 leading-relaxed text-ink/75">{section.body}</p>
        </section>
      ))}

      <section aria-labelledby="related-policies">
        <h2 id="related-policies" className="font-display text-2xl">
          Related policies
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          <li><Link href="/privacy" className="inline-block border border-ink px-4 py-2">Privacy policy</Link></li>
          <li><Link href="/license" className="inline-block border border-ink px-4 py-2">MIT license</Link></li>
          <li><Link href="/guide" className="inline-block border border-ink px-4 py-2">First-time guide</Link></li>
        </ul>
      </section>
    </PublicPageShell>
  );
}
