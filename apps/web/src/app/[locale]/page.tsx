import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingExperience } from "@/components/marketing/LandingExperience";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedAlternates, localizedOpenGraph } from "@/i18n/metadata";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const dict = await getDictionary(locale);
  const title = dict.landing.heroTitle;
  const description = dict.landing.heroBody;

  return {
    title,
    description,
    alternates: localizedAlternates(locale, "/"),
    openGraph: localizedOpenGraph(locale, "/", title, description),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/${locale}/#website`,
        url: `${siteUrl}/${locale}`,
        name: "TaskFlow",
        description: dict.landing.heroBody,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/${locale}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/${locale}/#organization`,
        name: "TaskFlow",
        url: `${siteUrl}/${locale}`,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/${locale}/#software`,
        name: "TaskFlow",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: dict.landing.heroBody,
        url: `${siteUrl}/${locale}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          dict.landing.tabs[0].title,
          dict.landing.stack[0].title,
          dict.landing.stack[1].title,
          dict.landing.stack[2].title,
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingExperience />
    </>
  );
}
