import { PublicFooter } from "@/components/marketing/PublicFooter";
import { PublicHeader } from "@/components/marketing/PublicHeader";

type PublicPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PublicPageShell({ eyebrow, title, description, children }: PublicPageShellProps) {
  return (
    <main className="min-h-screen">
      <PublicHeader />
      <article className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-flow">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">{description}</p>
        <div className="mt-10 space-y-12">{children}</div>
      </article>
      <PublicFooter />
    </main>
  );
}
