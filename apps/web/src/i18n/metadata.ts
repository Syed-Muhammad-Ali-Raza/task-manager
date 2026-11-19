import type { Metadata } from "next";
import { locales, localizedPath, type Locale } from "@/i18n/config";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export function localizedAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};

  for (const item of locales) {
    languages[item] = `${siteUrl}${localizedPath(item, path)}`;
  }
  languages["x-default"] = `${siteUrl}${localizedPath("en", path)}`;

  return {
    canonical: `${siteUrl}${localizedPath(locale, path)}`,
    languages,
  };
}

export function localizedOpenGraph(locale: Locale, path: string, title: string, description: string) {
  return {
    title,
    description,
    url: `${siteUrl}${localizedPath(locale, path)}`,
    locale: locale === "en" ? "en_US" : `${locale}_${locale.toUpperCase()}`,
    type: "website" as const,
  };
}
