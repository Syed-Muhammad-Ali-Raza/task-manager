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
    title: dict.terms.title,
    description: dict.terms.metaDescription,
    alternates: localizedAlternates(locale, "/terms"),
    openGraph: localizedOpenGraph(
      locale,
      "/terms",
      dict.terms.title,
      dict.terms.metaDescription,
    ),
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.terms;
  const href = (path: string) => localizedPath(locale, path);

  return (
    <PublicPageShell eyebrow={t.eyebrow} title={t.title} description={t.pageDescription}>
      <nav aria-label={t.onThisPage} className="border border-mist bg-white p-5 text-sm">
        <h2 className="font-semibold">{t.onThisPage}</h2>
        <ol className="mt-3 grid gap-2 md:grid-cols-2">
          {t.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-flow underline">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {t.sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id} className="font-display text-2xl">
            {section.title}
          </h2>
          <p className="mt-3 leading-relaxed text-ink/75">{section.body}</p>
        </section>
      ))}

      <section aria-labelledby="related-policies">
        <h2 id="related-policies" className="font-display text-2xl">
          {t.relatedPolicies}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          <li><Link href={href("/privacy")} className="inline-block border border-ink px-4 py-2">{dict.common.privacyPolicy}</Link></li>
          <li><Link href={href("/license")} className="inline-block border border-ink px-4 py-2">{dict.common.mitLicense}</Link></li>
          <li><Link href={href("/guide")} className="inline-block border border-ink px-4 py-2">{dict.common.firstTimeGuide}</Link></li>
        </ul>
      </section>
    </PublicPageShell>
  );
}
