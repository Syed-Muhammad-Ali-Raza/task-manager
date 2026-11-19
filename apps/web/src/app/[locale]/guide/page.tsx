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
    title: dict.guide.title,
    description: dict.guide.metaDescription,
    alternates: localizedAlternates(locale, "/guide"),
    openGraph: localizedOpenGraph(
      locale,
      "/guide",
      dict.guide.title,
      dict.guide.metaDescription,
    ),
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const g = dict.guide;
  const href = (path: string) => localizedPath(locale, path);

  return (
    <PublicPageShell eyebrow={g.eyebrow} title={g.pageTitle} description={g.metaDescription}>
      <section aria-labelledby="before-you-begin">
        <h2 id="before-you-begin" className="font-display text-2xl">
          {g.beforeTitle}
        </h2>
        <p className="mt-3 text-ink/75">{g.beforeBody}</p>
        <Link href={href("/login")} className="mt-5 inline-block bg-flow px-5 py-3 text-white">
          {g.openDemo}
        </Link>
      </section>

      <section aria-labelledby="tour">
        <h2 id="tour" className="font-display text-2xl">
          {g.tourTitle}
        </h2>
        <ol className="mt-6 space-y-5">
          {g.steps.map((step, index) => (
            <li key={step.title} className="border border-mist bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-flow">
                {g.stepPrefix} {index + 1}
              </p>
              <h3 className="mt-2 font-display text-xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{step.body}</p>
              <p className="mt-3 border-l-2 border-flow pl-3 text-sm text-ink/60">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="troubleshooting">
        <h2 id="troubleshooting" className="font-display text-2xl">
          {g.troubleshootingTitle}
        </h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {g.troubleshooting.map((item) => (
            <div key={item.question} className="border border-mist bg-white p-5">
              <dt className="font-medium">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink/70">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="next-steps">
        <h2 id="next-steps" className="font-display text-2xl">
          {g.exploreTitle}
        </h2>
        <ul className="mt-5 flex flex-wrap gap-3 text-sm">
          <li><Link href={href("/#stack")} className="inline-block border border-ink px-4 py-2">{g.seeStack}</Link></li>
          <li><Link href={href("/privacy")} className="inline-block border border-ink px-4 py-2">{g.readPrivacy}</Link></li>
          <li><Link href={href("/terms")} className="inline-block border border-ink px-4 py-2">{g.readTerms}</Link></li>
          <li><Link href={href("/sponsors")} className="inline-block border border-ink px-4 py-2">{g.supportProject}</Link></li>
        </ul>
      </section>
    </PublicPageShell>
  );
}
