"use client";

import { FormEvent, useEffect, useState } from "react";
import { useI18n, useLocalizedPath } from "@/i18n/client";
import { apiCall } from "@/lib/api";

type Member = { userId: string; role: string; name: string | null; email: string };
type Invite = { id: string; email: string; role: string; token: string };
type Workspace = { id: string; name: string };

export default function TeamPage() {
  const { dict } = useI18n();
  const lp = useLocalizedPath();
  const d = dict.dashboard;
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [workspaceId, setWorkspaceId] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");

  const roleLabel = (value: string) =>
    d.roles[value as keyof typeof d.roles] ?? value;

  async function load(id: string) {
    const data = await apiCall<{ members: Member[]; invitations: Invite[] }>(`/api/workspaces/${id}/members`);
    setMembers(data.members);
    setInvites(data.invitations);
  }

  useEffect(() => {
    apiCall<Workspace[]>("/api/workspaces")
      .then(async (items) => {
        setWorkspaces(items);
        const preferred = items[0];
        if (!preferred) return;
        setWorkspaceId(preferred.id);
        await load(preferred.id);
      })
      .catch((err) => setError(err instanceof Error ? err.message : d.couldNotLoadPeople));
  }, [d.couldNotLoadPeople]);

  async function invite(event: FormEvent) {
    event.preventDefault();
    setError("");
    setInviteLink("");
    try {
      const created = await apiCall<{ inviteLink: string }>(`/api/workspaces/${workspaceId}/invitations`, {
        method: "POST",
        body: JSON.stringify({ email, role, workspaceId }),
      });
      setEmail("");
      setInviteLink(created.inviteLink);
      await load(workspaceId);
    } catch (err) {
      setError(err instanceof Error ? err.message : d.couldNotSendInvite);
    }
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-4xl">{d.peopleTitle}</h1>
      <p className="mt-2 max-w-xl text-ink/70">{d.peopleHint}</p>
      {workspaces.length > 1 ? (
        <label className="mt-4 block max-w-md text-sm">
          {d.workspaceLabel}
          <select
            className="mt-1 w-full border border-mist bg-white px-3 py-2"
            value={workspaceId}
            onChange={(event) => {
              const id = event.target.value;
              setWorkspaceId(id);
              void load(id);
            }}
          >
            {workspaces.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="mt-4 text-sm text-ink/60">{workspaces[0]?.name}</p>
      )}

      <form onSubmit={invite} className="mt-8 max-w-md border border-mist bg-white p-4">
        <label className="block text-sm">
          {dict.common.email}
          <input
            className="mt-1 w-full border border-mist px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="mt-3 block text-sm">
          {dict.common.role}
          <select
            className="mt-1 w-full border border-mist px-3 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">{d.roles.member}</option>
            <option value="admin">{d.roles.admin}</option>
            <option value="viewer">{d.roles.viewer}</option>
          </select>
        </label>
        <button className="mt-4 w-full bg-ink py-2 text-paper">{d.sendInvitation}</button>
        {error ? <p className="mt-3 text-sm text-ember">{error}</p> : null}
        {inviteLink ? (
          <p className="mt-3 break-all text-sm text-flow">
            {d.inviteLink} <a href={inviteLink}>{inviteLink}</a>
          </p>
        ) : null}
      </form>

      <h2 className="mt-10 font-display text-2xl">{d.currentMembers}</h2>
      <ul className="mt-4 divide-y divide-mist border border-mist bg-white">
        {members.map((member) => (
          <li key={member.userId} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-ink/60">{member.email}</p>
            </div>
            <span className="text-sm">{roleLabel(member.role)}</span>
          </li>
        ))}
      </ul>

      {invites.length > 0 ? (
        <>
          <h2 className="mt-10 font-display text-2xl">{d.pendingInvites}</h2>
          <ul className="mt-4 divide-y divide-mist border border-mist bg-white">
            {invites.map((inviteItem) => (
              <li key={inviteItem.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>
                  {inviteItem.email} · {roleLabel(inviteItem.role)}
                </span>
                <a className="text-flow" href={lp(`/invite/${inviteItem.token}`)}>
                  {d.openLink}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
