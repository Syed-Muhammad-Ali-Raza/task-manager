const plans = [
  { id: "free", name: "Free", price: "$0", note: "One workspace, core board." },
  { id: "pro", name: "Pro", price: "$9", note: "More seats. Stripe checkout next." },
  { id: "enterprise", name: "Enterprise", price: "$99", note: "SSO and audit trail later." },
];

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-4xl">Billing</h1>
      <p className="mt-2 max-w-xl text-ink/70">
        Plans are shown for the portfolio story. Test-mode Stripe can attach without changing this layout.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.id} className="border border-mist bg-white p-5">
            <h2 className="font-display text-2xl">{plan.name}</h2>
            <p className="mt-2 font-display text-4xl">{plan.price}</p>
            <p className="mt-3 text-sm text-ink/65">{plan.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
