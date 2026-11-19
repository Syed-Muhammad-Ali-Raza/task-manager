import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("@/i18n/dictionaries/en"),
  ru: () => import("@/i18n/dictionaries/ru"),
  es: () => import("@/i18n/dictionaries/es"),
  ar: () => import("@/i18n/dictionaries/ar"),
  hi: () => import("@/i18n/dictionaries/hi"),
  fr: () => import("@/i18n/dictionaries/fr"),
  de: () => import("@/i18n/dictionaries/de"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await loaders[locale]()).default;
}
