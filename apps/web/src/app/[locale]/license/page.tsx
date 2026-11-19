import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/marketing/PublicPageShell";
import { hasLocale, localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedAlternates, localizedOpenGraph } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: string }> };

const licenseText = `MIT License

Copyright (c) 2026 Syed Ali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return {
    title: dict.license.title,
    description: dict.license.metaDescription,
    alternates: localizedAlternates(locale, "/license"),
    openGraph: localizedOpenGraph(
      locale,
      "/license",
      dict.license.title,
      dict.license.metaDescription,
    ),
  };
}

export default async function LicensePage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const l = dict.license;
  const href = (path: string) => localizedPath(locale, path);

  return (
    <PublicPageShell eyebrow={l.eyebrow} title={l.title} description={l.pageDescription}>
      <section aria-labelledby="license-text">
        <h2 id="license-text" className="font-display text-2xl">
          {l.fullTextTitle}
        </h2>
        <pre className="mt-5 overflow-x-auto border border-mist bg-white p-5 text-sm leading-relaxed">
          <code className="whitespace-pre-wrap">{licenseText}</code>
        </pre>
      </section>

      <section aria-labelledby="license-scope">
        <h2 id="license-scope" className="font-display text-2xl">
          {l.scopeTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">{l.scopeBody}</p>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          <li><Link href={href("/terms")} className="inline-block border border-ink px-4 py-2">{dict.common.termsOfService}</Link></li>
          <li><Link href={href("/privacy")} className="inline-block border border-ink px-4 py-2">{dict.common.privacyPolicy}</Link></li>
          <li><Link href={href("/sponsors")} className="inline-block border border-ink px-4 py-2">{dict.common.sponsors}</Link></li>
        </ul>
      </section>
    </PublicPageShell>
  );
}
