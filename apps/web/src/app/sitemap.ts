import type { MetadataRoute } from "next";
import { locales, localizedPath } from "@/i18n/config";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const publicRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/guide", changeFrequency: "monthly", priority: 0.9 },
  { path: "/sponsors", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/license", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map(({ path, changeFrequency, priority }) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${siteUrl}${localizedPath(locale, path)}`;
    }
    languages["x-default"] = `${siteUrl}${localizedPath("en", path)}`;

    return {
      url: `${siteUrl}${localizedPath("en", path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    };
  });
}
