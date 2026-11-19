import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getSessionUser, serverApi } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return {
    title: dict.dashboard.title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

type Space = {
  id: string;
  name: string;
  boards: { id: string; name: string }[];
};

export default async function DashboardLayout(props: LayoutProps<'/[locale]/dashboard'>) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();

  const [user, spaces] = await Promise.all([getSessionUser(), serverApi<Space[]>("/api/workspaces")]);

  return (
    <div className="flex min-h-screen bg-[#f7f8f9] text-[#172b4d]">
      <Sidebar user={user} spaces={spaces} />
      <div className="min-w-0 flex-1">{props.children}</div>
    </div>
  );
}
