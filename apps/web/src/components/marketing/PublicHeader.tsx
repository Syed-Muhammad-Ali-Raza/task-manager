"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useI18n, useLocalizedPath } from "@/i18n/client";

export function PublicHeader() {
  const { dict } = useI18n();
  const lp = useLocalizedPath();

  return (
    <header className="border-b border-mist px-6 py-5 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link href={lp("/")} className="font-display text-2xl font-semibold">
          TaskFlow
        </Link>
        <nav aria-label={dict.common.publicNavigation} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href={lp("/guide")} className="text-flow">
            {dict.common.guide}
          </Link>
          <Link href={lp("/#preview")} className="hidden sm:inline">
            {dict.common.liveBoard}
          </Link>
          <Link href={lp("/sponsors")} className="hidden md:inline">
            {dict.common.sponsors}
          </Link>
          <Link href={lp("/login")}>{dict.common.signIn}</Link>
          <Link href={lp("/login")} className="bg-ink px-4 py-2 text-paper">
            {dict.common.openTheProduct}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
