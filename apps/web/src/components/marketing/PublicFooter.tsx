"use client";

import Link from "next/link";
import { useI18n, useLocalizedPath } from "@/i18n/client";

export function PublicFooter() {
  const { dict } = useI18n();
  const lp = useLocalizedPath();

  return (
    <footer className="border-t border-mist px-6 py-10 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">TaskFlow</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">{dict.footer.tagline}</p>
        </div>
        <nav aria-label={dict.common.productLinks}>
          <h2 className="text-sm font-semibold uppercase tracking-wide">{dict.common.product}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            <li><Link href={lp("/")} className="hover:text-flow">{dict.common.overview}</Link></li>
            <li><Link href={lp("/#preview")} className="hover:text-flow">{dict.common.liveBoard}</Link></li>
            <li><Link href={lp("/guide")} className="hover:text-flow">{dict.common.firstTimeGuide}</Link></li>
            <li><Link href={lp("/login")} className="hover:text-flow">{dict.common.signIn}</Link></li>
          </ul>
        </nav>
        <nav aria-label={dict.common.projectLinks}>
          <h2 className="text-sm font-semibold uppercase tracking-wide">{dict.common.project}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            <li><Link href={lp("/sponsors")} className="hover:text-flow">{dict.common.sponsors}</Link></li>
            <li><Link href={lp("/privacy")} className="hover:text-flow">{dict.common.privacyPolicy}</Link></li>
            <li><Link href={lp("/terms")} className="hover:text-flow">{dict.common.termsOfService}</Link></li>
            <li><Link href={lp("/license")} className="hover:text-flow">{dict.common.mitLicense}</Link></li>
            <li>
              <a href="https://github.com/Syed-Muhammad-Ali-Raza/task-manager" className="hover:text-flow">
                {dict.common.sourceOnGitHub}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-ink/50">{dict.common.copyright}</p>
    </footer>
  );
}
