import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/components/marketing/PublicPageShell";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const title = "MIT license";
const description =
  "TaskFlow source code is released under the MIT License by Syed Ali. Read the full license text and related policies.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/license" },
  openGraph: {
    title: `${title} | TaskFlow`,
    description,
    url: `${siteUrl}/license`,
    type: "website",
  },
};

const licenseText = `MIT License

Copyright (c) 2026 Syed Ali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default function LicensePage() {
  return (
    <PublicPageShell
      eyebrow="Open source"
      title={title}
      description="The source code is free to use, copy, modify, and distribute under the terms below. The hosted demo is also subject to the terms and privacy policy."
    >
      <section aria-labelledby="license-text">
        <h2 id="license-text" className="font-display text-2xl">
          Full license text
        </h2>
        <pre className="mt-5 overflow-x-auto border border-mist bg-white p-5 text-sm leading-relaxed">
          <code className="whitespace-pre-wrap">{licenseText}</code>
        </pre>
      </section>

      <section aria-labelledby="license-scope">
        <h2 id="license-scope" className="font-display text-2xl">
          What this covers
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          The MIT License applies to the repository source code. It does not grant access to hosted
          accounts, credentials, or private data. The canonical copy lives in the repository root as
          <code> LICENSE</code>.
        </p>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          <li><Link href="/terms" className="inline-block border border-ink px-4 py-2">Terms of service</Link></li>
          <li><Link href="/privacy" className="inline-block border border-ink px-4 py-2">Privacy policy</Link></li>
          <li><Link href="/sponsors" className="inline-block border border-ink px-4 py-2">Sponsors</Link></li>
        </ul>
      </section>
    </PublicPageShell>
  );
}
