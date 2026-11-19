"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useI18n, useLocalizedPath } from "@/i18n/client";
import { loginRequest } from "@/lib/api";

export default function LoginPage() {
  const { dict } = useI18n();
  const lp = useLocalizedPath();
  const router = useRouter();
  const [email, setEmail] = useState("syed.ali@taskflow.dev");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginRequest(email, password);
      router.push(lp("/dashboard"));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.common.couldNotSignIn);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md border border-mist bg-white p-8">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
        <h1 className="mt-4 font-display text-3xl">{dict.login.heading}</h1>
        <p className="mt-2 text-sm text-ink/65">{dict.login.subheading}</p>
        <label className="mt-6 block text-sm">
          {dict.common.email}
          <input
            className="mt-1 w-full border border-mist px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="mt-4 block text-sm">
          {dict.common.password}
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
        <button disabled={loading} className="mt-6 w-full bg-ink py-2.5 text-paper disabled:opacity-60">
          {loading ? dict.login.submitting : dict.common.signIn}
        </button>
      </form>
    </main>
  );
}
