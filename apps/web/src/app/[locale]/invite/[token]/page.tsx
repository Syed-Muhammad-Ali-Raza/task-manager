"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useI18n, useLocalizedPath } from "@/i18n/client";
import { apiCall, joinInviteRequest } from "@/lib/api";

type InviteInfo = { email: string; role: string; workspaceName: string };

export default function InvitePage() {
  const { dict } = useI18n();
  const lp = useLocalizedPath();
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [info, setInfo] = useState<InviteInfo | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const i = dict.dashboard.invite;

  useEffect(() => {
    apiCall<InviteInfo>(`/api/invitations/${params.token}`)
      .then(setInfo)
      .catch((err) => setError(err instanceof Error ? err.message : i.invalidInvitation));
  }, [params.token, i.invalidInvitation]);

  async function join(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await joinInviteRequest(params.token, name, password);
      router.push(lp("/dashboard"));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : i.couldNotJoin);
    } finally {
      setLoading(false);
    }
  }

  const role = info?.role
    ? dict.dashboard.roles[info.role as keyof typeof dict.dashboard.roles] ?? info.role
    : i.fallbackRole;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={join} className="w-full max-w-md border border-mist bg-white p-8">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
        <h1 className="mt-4 font-display text-3xl">
          {i.joinPrefix} {info?.workspaceName ?? i.fallbackWorkspace}
        </h1>
        <p className="mt-2 text-sm text-ink/65">
          {i.invitedAsPrefix} {info?.email ?? "…"} ({role}).
        </p>
        <label className="mt-6 block text-sm">
          {i.yourName}
          <input
            className="mt-1 w-full border border-mist px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />
        </label>
        <label className="mt-4 block text-sm">
          {i.choosePassword}
          <input
            className="mt-1 w-full border border-mist px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>
        {error ? <p className="mt-3 text-sm text-ember">{error}</p> : null}
        <button disabled={loading || !info} className="mt-6 w-full bg-ink py-2.5 text-paper disabled:opacity-60">
          {loading ? i.joining : i.joinWorkspace}
        </button>
      </form>
    </main>
  );
}
