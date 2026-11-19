import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedAlternates } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return {
    title: dict.login.title,
    description: dict.login.metaDescription,
    alternates: localizedAlternates(locale, "/login"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function LoginLayout(props: LayoutProps<'/[locale]/login'>) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  return props.children;
}
