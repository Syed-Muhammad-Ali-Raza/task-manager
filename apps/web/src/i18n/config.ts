export const locales = ["en", "ru", "es", "ar", "hi", "fr", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookie = "tf_locale";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  es: "Español",
  ar: "العربية",
  hi: "हिन्दी",
  fr: "Français",
  de: "Deutsch",
};

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ru: "ltr",
  es: "ltr",
  ar: "rtl",
  hi: "ltr",
  fr: "ltr",
  de: "ltr",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localizedPath(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const preferences = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase() ?? "")
    .filter(Boolean);

  for (const preference of preferences) {
    const exact = locales.find((locale) => locale === preference);
    if (exact) return exact;

    const base = preference.split("-")[0];
    const baseMatch = locales.find((locale) => locale === base);
    if (baseMatch) return baseMatch;
  }

  return defaultLocale;
}
