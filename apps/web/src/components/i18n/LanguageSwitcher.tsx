"use client";

import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/i18n/client";
import {
  locales,
  localeCookie,
  localeNames,
  localizedPath,
  type Locale,
} from "@/i18n/config";

export function LanguageSwitcher() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    document.cookie = `${localeCookie}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    const withoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
    router.push(localizedPath(nextLocale, withoutLocale));
    router.refresh();
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">{dict.common.language}</span>
      <select
        aria-label={dict.common.language}
        className="border border-mist bg-white px-2 py-1 text-sm"
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeNames[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
