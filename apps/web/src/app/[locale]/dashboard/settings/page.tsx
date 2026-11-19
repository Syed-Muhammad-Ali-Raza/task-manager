"use client";

import { useI18n } from "@/i18n/client";

export default function SettingsPage() {
  const { dict } = useI18n();
  const d = dict.dashboard;

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-4xl">{d.billingTitle}</h1>
      <p className="mt-2 max-w-xl text-ink/70">{d.billingHint}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {d.plans.map((plan) => (
          <article key={plan.name} className="border border-mist bg-white p-5">
            <h2 className="font-display text-2xl">{plan.name}</h2>
            <p className="mt-2 font-display text-4xl">{plan.price}</p>
            <p className="mt-3 text-sm text-ink/65">{plan.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
