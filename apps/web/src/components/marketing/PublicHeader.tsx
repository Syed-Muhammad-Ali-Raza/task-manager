import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="border-b border-mist px-6 py-5 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link href="/" className="font-display text-2xl font-semibold">
          TaskFlow
        </Link>
        <nav aria-label="Public navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href="/guide" className="text-flow">
            Guide
          </Link>
          <Link href="/#preview" className="hidden sm:inline">
            Live board
          </Link>
          <Link href="/sponsors" className="hidden md:inline">
            Sponsors
          </Link>
          <Link href="/login">Sign in</Link>
          <Link href="/login" className="bg-ink px-4 py-2 text-paper">
            Open the product
          </Link>
        </nav>
      </div>
    </header>
  );
}
