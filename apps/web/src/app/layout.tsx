import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TaskFlow — Work that keeps moving",
    template: "%s | TaskFlow",
  },
  description:
    "Collaborative task management with Jira-style boards, workspace roles, and cookie-based sessions. Built with Next.js and Express.",
  applicationName: "TaskFlow",
  keywords: [
    "task management",
    "collaborative boards",
    "kanban",
    "project management",
    "team workspace",
    "SaaS",
  ],
  authors: [{ name: "Syed Ali" }],
  creator: "Syed Ali",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "TaskFlow",
    locale: "en_US",
    title: "TaskFlow — Work that keeps moving",
    description:
      "Plan work on Jira-style boards with real workspaces, roles, and secure sessions.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow — Work that keeps moving",
    description: "Collaborative boards for teams who ship together.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f8f9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
