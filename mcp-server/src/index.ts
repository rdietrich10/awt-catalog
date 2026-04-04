#!/usr/bin/env node
/**
 * AW Therapeutics Catalog MCP Server
 *
 * Exposes the peptide catalog data (products, categories, articles, FAQ,
 * glossary, protocols) as MCP tools so AI assistants can query the catalog.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ── Data imports (resolved via tsconfig @/ path alias → ../src/) ────────────
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import { faqItems } from "@/data/faq";
import { glossaryTerms } from "@/data/glossary";
import { protocolSections } from "@/data/protocols";
import type { Product } from "@/types/index";

// ── Helpers ──────────────────────────────────────────────────────────────────

function productSummary(p: Product) {
  return {
    slug: p.slug,
    name: p.name,
    genericName: p.genericName,
    category: p.category,
    categorySlug: p.categorySlug,
    shortDescription: p.shortDescription,
    medicationClass: p.medicationClass,
    administrationRoute: p.administrationRoute,
    isBlend: p.isBlend,
    featured: p.featured,
    price: p.price,
    membershipPrice: p.membershipPrice,
    variants: p.variants,
  };
}

function searchText(query: string, text: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

// ── Server setup ─────────────────────────────────────────────────────────────

const server = new Server(
  { name: "awt-catalog", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// ── Tool definitions ─────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_products",
      description:
        "List all products in the AW Therapeutics catalog. Optionally filter by category slug.",
      inputSchema: {
        type: "object",
        properties: {
          categorySlug: {
            type: "string",
            description:
              "Filter by category slug (e.g. 'weight-management', 'healing-tissue-recovery'). Omit to return all products.",
          },
          featuredOnly: {
            type: "boolean",
            description: "If true, return only featured products.",
          },
        },
      },
    },
    {
      name: "get_product",
      description:
        "Get full details for a specific product including variants, pricing, key benefits, clinical notes, and IFU data.",
      inputSchema: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "The product slug (e.g. 'semaglutide', 'bpc-157').",
          },
        },
        required: ["slug"],
      },
    },
    {
      name: "list_categories",
      description: "List all product categories in the catalog.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "search_catalog",
      description:
        "Full-text search across products, articles, FAQ, and glossary. Returns matching items from each section.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query string.",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "list_articles",
      description: "List all educational articles in the Knowledge Center.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "get_article",
      description: "Get the full content of a Knowledge Center article by slug.",
      inputSchema: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "The article slug.",
          },
        },
        required: ["slug"],
      },
    },
    {
      name: "list_faq",
      description: "List all frequently asked questions and answers.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "list_glossary",
      description:
        "List glossary terms. Optionally filter by a search query.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Optional search string to filter terms by name or definition.",
          },
        },
      },
    },
    {
      name: "list_protocols",
      description: "List all protocol / administration guide sections.",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

// ── Tool handlers ────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const input = (args ?? {}) as Record<string, unknown>;

  switch (name) {
    case "list_products": {
      let result = products;
      if (typeof input.categorySlug === "string") {
        result = result.filter((p) => p.categorySlug === input.categorySlug);
      }
      if (input.featuredOnly === true) {
        result = result.filter((p) => p.featured);
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result.map(productSummary), null, 2),
          },
        ],
      };
    }

    case "get_product": {
      const slug = input.slug as string;
      const product = products.find((p) => p.slug === slug);
      if (!product) {
        return {
          content: [
            {
              type: "text",
              text: `Product not found: ${slug}. Use list_products to see available slugs.`,
            },
          ],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      };
    }

    case "list_categories": {
      return {
        content: [
          { type: "text", text: JSON.stringify(categories, null, 2) },
        ],
      };
    }

    case "search_catalog": {
      const query = input.query as string;

      const matchedProducts = products
        .filter(
          (p) =>
            searchText(query, p.name) ||
            searchText(query, p.genericName) ||
            searchText(query, p.shortDescription) ||
            searchText(query, p.fullDescription) ||
            searchText(query, p.category) ||
            searchText(query, p.medicationClass) ||
            p.keyBenefits.some((b) => searchText(query, b))
        )
        .map(productSummary);

      const matchedArticles = articles
        .filter(
          (a) =>
            searchText(query, a.title) ||
            searchText(query, a.excerpt) ||
            searchText(query, a.content)
        )
        .map(({ slug, title, excerpt, dateUpdated }) => ({
          slug,
          title,
          excerpt,
          dateUpdated,
        }));

      const matchedFaq = faqItems.filter(
        (f) =>
          searchText(query, f.question) || searchText(query, f.answer)
      );

      const matchedGlossary = glossaryTerms.filter(
        (g) =>
          searchText(query, g.term) || searchText(query, g.definition)
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                query,
                products: matchedProducts,
                articles: matchedArticles,
                faq: matchedFaq,
                glossary: matchedGlossary,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "list_articles": {
      const summaries = articles.map(
        ({ slug, title, excerpt, dateCreated, dateUpdated, image }) => ({
          slug,
          title,
          excerpt,
          dateCreated,
          dateUpdated,
          image,
        })
      );
      return {
        content: [{ type: "text", text: JSON.stringify(summaries, null, 2) }],
      };
    }

    case "get_article": {
      const slug = input.slug as string;
      const article = articles.find((a) => a.slug === slug);
      if (!article) {
        return {
          content: [
            {
              type: "text",
              text: `Article not found: ${slug}. Use list_articles to see available slugs.`,
            },
          ],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(article, null, 2) }],
      };
    }

    case "list_faq": {
      return {
        content: [{ type: "text", text: JSON.stringify(faqItems, null, 2) }],
      };
    }

    case "list_glossary": {
      let result = glossaryTerms;
      if (typeof input.query === "string" && input.query.trim()) {
        result = glossaryTerms.filter(
          (g) =>
            searchText(input.query as string, g.term) ||
            searchText(input.query as string, g.definition)
        );
      }
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }

    case "list_protocols": {
      return {
        content: [
          { type: "text", text: JSON.stringify(protocolSections, null, 2) },
        ],
      };
    }

    default:
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
  }
});

// ── Start ────────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("AWT Catalog MCP server running on stdio\n");
}

main().catch((err) => {
  process.stderr.write(`Fatal error: ${err}\n`);
  process.exit(1);
});
