import type { Metadata } from "next";
import { LandingExperience } from "@/components/marketing/LandingExperience";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Collaborative task management that keeps work moving",
  description:
    "TaskFlow gives teams Jira-style boards, workspaces, roles, comments, and secure httpOnly cookie sessions without the meeting overhead.",
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "TaskFlow",
      description:
        "Collaborative task management with Jira-style boards, workspaces, and secure sessions.",
      inLanguage: "en-US",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "TaskFlow",
      url: siteUrl,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "TaskFlow",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "TaskFlow is a collaborative task manager with kanban boards, workspace roles, comments, attachments, and httpOnly cookie sessions.",
      url: siteUrl,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Kanban boards with drag and drop",
        "Workspaces and member roles",
        "Task comments and attachments",
        "httpOnly cookie sessions",
        "Server-rendered dashboard",
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingExperience />
    </>
  );
}
