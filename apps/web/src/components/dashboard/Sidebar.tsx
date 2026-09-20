"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutRequest } from "@/lib/api";
import type { SessionUser } from "@/lib/session-user";

type Space = {
  id: string;
  name: string;
  boards: { id: string; name: string }[];
};

export function Sidebar({ user, spaces }: { user: SessionUser; spaces: Space[] }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-[#dcdfe4] bg-white px-3 py-4 text-[#172b4d]">
      <Link href="/dashboard" className="px-2 text-lg font-semibold tracking-tight">
        TaskFlow
      </Link>
      <p className="mt-4 px-2 text-[11px] font-semibold uppercase tracking-wide text-[#626f86]">Spaces</p>
      <nav className="mt-1 flex flex-col gap-0.5">
        {spaces.map((space) => {
          const board = space.boards?.[0];
          const href = board ? `/dashboard/boards/${board.id}` : "/dashboard";
          const active = board ? pathname.includes(board.id) : false;
          return (
            <Link
              key={space.id}
              href={href}
              className={`rounded-md px-2 py-1.5 text-[13px] ${active ? "bg-[#e9f2ff] font-medium text-[#0c66e4]" : "hover:bg-[#f1f2f4]"}`}
            >
              {space.name}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/dashboard"
        className={`mt-4 rounded-md px-2 py-1.5 text-[13px] ${pathname === "/dashboard" ? "bg-[#e9f2ff] text-[#0c66e4]" : "hover:bg-[#f1f2f4]"}`}
      >
        All workspaces
      </Link>
      <Link href="/dashboard/team" className="rounded-md px-2 py-1.5 text-[13px] hover:bg-[#f1f2f4]">
        People
      </Link>
      <Link href="/dashboard/settings" className="rounded-md px-2 py-1.5 text-[13px] hover:bg-[#f1f2f4]">
        Billing
      </Link>
      <div className="mt-auto px-2 pt-4">
        <p className="text-[13px] font-medium">{user.name}</p>
        <p className="text-[11px] text-[#626f86]">{user.email}</p>
        <button
          className="mt-2 text-[13px] text-[#626f86] hover:text-[#172b4d]"
          onClick={async () => {
            await logoutRequest();
            router.push("/login");
            router.refresh();
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
