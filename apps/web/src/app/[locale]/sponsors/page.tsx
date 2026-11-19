import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/marketing/PublicPageShell";
import { hasLocale, localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedAlternates, localizedOpenGraph } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return {
    title: dict.sponsors.title,
    description: dict.sponsors.metaDescription,
    alternates: localizedAlternates(locale, "/sponsors"),
    openGraph: localizedOpenGraph(
      locale,
      "/sponsors",
      dict.sponsors.title,
      dict.sponsors.metaDescription,
    ),
  };
}

export default async function SponsorsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const s = dict.sponsors;
  const href = (path: string) => localizedPath(locale, path);

  return (
    <PublicPageShell eyebrow={s.eyebrow} title={s.title} description={s.pageDescription}>
      <section aria-labelledby="why-support">
        <h2 id="why-support" className="font-display text-2xl">
          {s.whyTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">{s.whyBody}</p>
        <a
          href="https://github.com/sponsors/Syed-Muhammad-Ali-Raza"
          className="mt-5 inline-block bg-flow px-5 py-3 text-white"
        >
          {s.sponsorButton}
        </a>
      </section>

      <section aria-labelledby="ways-to-help">
        <h2 id="ways-to-help" className="font-display text-2xl">
          {s.waysTitle}
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {s.options.map((option) => (
            <li key={option.title} className="border border-mist bg-white p-5">
              <h3 className="font-medium">{option.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{option.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="current-sponsors">
        <h2 id="current-sponsors" className="font-display text-2xl">
          {s.currentTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">{s.currentBody}</p>
      </section>

      <section aria-labelledby="sponsor-teams">
        <h2 id="sponsor-teams" className="font-display text-2xl">
          {s.teamsTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">{s.teamsBody}</p>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          <li><Link href={href("/guide")} className="inline-block border border-ink px-4 py-2">{s.followGuide}</Link></li>
          <li>
            <a
              href="https://github.com/Syed-Muhammad-Ali-Raza/task-manager/blob/main/docs/DEPLOY_FREE.md"
              className="inline-block border border-ink px-4 py-2"
            >
              {s.deploymentGuide}
            </a>
          </li>
          <li><Link href={href("/license")} className="inline-block border border-ink px-4 py-2">{dict.common.mitLicense}</Link></li>
        </ul>
      </section>
    </PublicPageShell>
  );
}
