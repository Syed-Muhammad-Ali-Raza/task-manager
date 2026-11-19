import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/i18n/client";
import { hasLocale, localeDirections, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedAlternates, localizedOpenGraph } from "@/i18n/metadata";
import "../globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f8f9",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const dict = await getDictionary(locale);
  const title = dict.landing.heroTitle;
  const description = dict.landing.heroBody;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${title} | TaskFlow`,
      template: "%s | TaskFlow",
    },
    description,
    applicationName: "TaskFlow",
    keywords: [
      "task management",
      "collaborative boards",
      "kanban",
      "project management",
      "team workspace",
      "SaaS",
    ],
    authors: [{ name: "Syed Ali" }],
    creator: "Syed Ali",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/icon.svg",
      apple: "/icon.svg",
    },
    alternates: localizedAlternates(locale, "/"),
    openGraph: localizedOpenGraph(locale, "/", title, description),
    twitter: {
      card: "summary_large_image",
      title: `${title} | TaskFlow`,
      description,
    },
  };
}

export default async function RootLayout(props: LayoutProps<'/[locale]'>) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={localeDirections[locale]}>
      <body className="font-sans antialiased">
        <I18nProvider locale={locale} dict={dict}>
          {props.children}
        </I18nProvider>
      </body>
    </html>
  );
}
