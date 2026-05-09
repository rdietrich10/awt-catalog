import type { MetadataRoute } from "next";

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelUrl ? `https://${vercelUrl}` : "https://localhost:3000");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
