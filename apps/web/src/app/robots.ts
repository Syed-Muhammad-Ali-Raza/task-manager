import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const privateRoutes = ["/api/", "/login"];
for (const locale of locales) {
  privateRoutes.push(`/${locale}/dashboard`, `/${locale}/invite/`, `/${locale}/login`);
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privateRoutes,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
