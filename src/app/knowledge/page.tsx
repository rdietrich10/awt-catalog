import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { articles } from "@/data/articles";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description:
    "Educational articles, FAQ, protocols, and a glossary of therapeutic terms. Learn about advanced therapeutics, medication safety, reconstitution, and Medical Grade compounds.",
  alternates: { canonical: "/knowledge" },
};

export default function KnowledgePage() {
  const previewFaq = faqItems.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
        Knowledge Base
      </h1>
      <p className="text-body-sm text-brand-silver mb-8 max-w-2xl">
        Educational articles, FAQ, protocols, and a glossary of therapeutic terms.
      </p>

      <KnowledgeNav activeSection="articles" />

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-xl uppercase tracking-wider text-brand-white">
            Articles
          </h2>
          <Link
            href="/knowledge/articles"
            className="text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            View all articles
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/knowledge/articles/${a.slug}`}
              className="block border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors overflow-hidden"
            >
              <PlaceholderImage src={a.image} aspectRatio="4/3" label={a.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="p-4">
                <time
                  dateTime={a.dateUpdated}
                  className="block text-caption text-brand-silver-dim mb-2"
                >
                  {a.dateUpdated !== a.dateCreated ? "Updated " : ""}
                  {new Date(a.dateUpdated + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
                  {a.title}
                </h3>
                <p className="mt-2 text-caption text-brand-silver-dark line-clamp-2">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-xl uppercase tracking-wider text-brand-white">
            Frequently Asked Questions
          </h2>
          <Link
            href="/knowledge/faq"
            className="text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            View all FAQ
          </Link>
        </div>
        <div className="space-y-4">
          {previewFaq.map((item) => (
            <div key={item.id} className="border border-brand-border p-5">
              <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
                {item.question}
              </h3>
              <p className="mt-2 text-body-sm text-brand-silver">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
