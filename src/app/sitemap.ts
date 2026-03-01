import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/knowledge`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/knowledge/articles`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/knowledge/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/knowledge/protocols`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/knowledge/glossary`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/how-it-works`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/quality-control`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/policies`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/brand`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/accessibility`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/categories/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/knowledge/articles/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...articleRoutes];
}
