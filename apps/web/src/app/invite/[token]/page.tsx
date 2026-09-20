"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiCall, joinInviteRequest } from "@/lib/api";

type InviteInfo = { email: string; role: string; workspaceName: string };

export default function InvitePage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [info, setInfo] = useState<InviteInfo | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiCall<InviteInfo>(`/api/invitations/${params.token}`)
      .then(setInfo)
      .catch((err) => setError(err instanceof Error ? err.message : "Invalid invitation"));
  }, [params.token]);

  async function join(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await joinInviteRequest(params.token, name, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={join} className="w-full max-w-md border border-mist bg-white p-8">
        <h1 className="font-display text-3xl">Join {info?.workspaceName ?? "the workspace"}</h1>
        <p className="mt-2 text-sm text-ink/65">
          Invited as {info?.email ?? "…"} ({info?.role ?? "member"}).
        </p>
        <label className="mt-6 block text-sm">
          Your name
          <input
            className="mt-1 w-full border border-mist px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />
        </label>
        <label className="mt-4 block text-sm">
          Choose a password
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
          {loading ? "Joining…" : "Join workspace"}
        </button>
      </form>
    </main>
  );
}
