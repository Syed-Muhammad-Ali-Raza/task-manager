import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-mist px-6 py-10 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">TaskFlow</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
            A collaborative task manager built with Next.js, Express, and PostgreSQL.
          </p>
        </div>
        <nav aria-label="Product links">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Product</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            <li><Link href="/" className="hover:text-flow">Overview</Link></li>
            <li><Link href="/#preview" className="hover:text-flow">Live board</Link></li>
            <li><Link href="/guide" className="hover:text-flow">First-time guide</Link></li>
            <li><Link href="/login" className="hover:text-flow">Sign in</Link></li>
          </ul>
        </nav>
        <nav aria-label="Project links">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Project</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            <li><Link href="/sponsors" className="hover:text-flow">Sponsors</Link></li>
            <li><Link href="/privacy" className="hover:text-flow">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-flow">Terms of service</Link></li>
            <li><Link href="/license" className="hover:text-flow">MIT license</Link></li>
            <li>
              <a href="https://github.com/Syed-Muhammad-Ali-Raza/task-manager" className="hover:text-flow">
                Source on GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-ink/50">
        © 2026 Syed Ali. Source code released under the MIT License.
      </p>
    </footer>
  );
}
