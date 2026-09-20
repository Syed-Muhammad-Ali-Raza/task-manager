import { Sidebar } from "@/components/dashboard/Sidebar";
import { getSessionUser, serverApi } from "@/lib/server-api";

export const dynamic = "force-dynamic";

type Space = {
  id: string;
  name: string;
  boards: { id: string; name: string }[];
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, spaces] = await Promise.all([getSessionUser(), serverApi<Space[]>("/api/workspaces")]);

  return (
    <div className="flex min-h-screen bg-[#f7f8f9] text-[#172b4d]">
      <Sidebar user={user} spaces={spaces} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
