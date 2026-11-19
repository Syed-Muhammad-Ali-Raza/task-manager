import { serverApi } from "@/lib/server-api";
import { WorkspaceList } from "./workspace-list";

type Workspace = {
  id: string;
  name: string;
  description: string | null;
  boards: { id: string; name: string }[];
};

export default async function DashboardPage() {
  const workspaces = await serverApi<Workspace[]>("/api/workspaces");
  return <WorkspaceList initial={workspaces} />;
}
