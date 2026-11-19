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
    title: dict.privacy.title,
    description: dict.privacy.metaDescription,
    alternates: localizedAlternates(locale, "/privacy"),
    openGraph: localizedOpenGraph(
      locale,
      "/privacy",
      dict.privacy.title,
      dict.privacy.metaDescription,
    ),
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const p = dict.privacy;
  const href = (path: string) => localizedPath(locale, path);

  return (
    <PublicPageShell eyebrow={p.eyebrow} title={p.title} description={p.pageDescription}>
      <section aria-labelledby="what-we-store">
        <h2 id="what-we-store" className="font-display text-2xl">
          {p.whatWeStore}
        </h2>
        <div className="mt-5 overflow-x-auto border border-mist bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{p.caption}</caption>
            <thead className="border-b border-mist bg-paper/60">
              <tr>
                <th scope="col" className="px-4 py-3">{p.tableCategory}</th>
                <th scope="col" className="px-4 py-3">{p.tableExamples}</th>
                <th scope="col" className="px-4 py-3">{p.tableWhy}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist">
              {p.categories.map((item) => (
                <tr key={item.name}>
                  <th scope="row" className="px-4 py-3 font-medium">{item.name}</th>
                  <td className="px-4 py-3 text-ink/70">{item.examples}</td>
                  <td className="px-4 py-3 text-ink/70">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">{p.passwordsNote}</p>
      </section>

      <section aria-labelledby="where-data-lives">
        <h2 id="where-data-lives" className="font-display text-2xl">
          {p.whereDataLives}
        </h2>
        <ul className="mt-4 space-y-3 text-ink/75">
          <li>{p.localMode}</li>
          <li>{p.hostedMode}</li>
        </ul>
      </section>

      <section aria-labelledby="how-we-use-data">
        <h2 id="how-we-use-data" className="font-display text-2xl">
          {p.howWeUseData}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">{p.howWeUseDataBody}</p>
      </section>

      <section aria-labelledby="sharing-retention">
        <h2 id="sharing-retention" className="font-display text-2xl">
          {p.sharingRetention}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">{p.sharingRetentionBody}</p>
      </section>

      <section aria-labelledby="security-privacy">
        <h2 id="security-privacy" className="font-display text-2xl">
          {p.securityChoices}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">{p.securityBody}</p>
        <p className="mt-3 leading-relaxed text-ink/75">{p.childrenBody}</p>
      </section>

      <section aria-labelledby="privacy-changes-contact">
        <h2 id="privacy-changes-contact" className="font-display text-2xl">
          {p.changesContact}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">{p.changesBody}</p>
        <p className="mt-3 text-sm text-ink/60">
          <Link href={href("/terms")} className="text-flow underline">
            {dict.common.termsOfService}
          </Link>
          {" · "}
          <Link href={href("/license")} className="text-flow underline">
            {dict.common.mitLicense}
          </Link>
        </p>
      </section>
    </PublicPageShell>
  );
}
