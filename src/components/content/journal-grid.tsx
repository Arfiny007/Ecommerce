import Link from "next/link";
import Image from "next/image";
import type { JournalArticle } from "@/constants/content/journal";
import { Caption, Subheading } from "@/components/common/typography";

interface JournalGridProps {
  articles: JournalArticle[];
}

export function JournalGrid({ articles }: JournalGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/journal/${article.slug}`}
          className="group overflow-hidden rounded-[var(--radius-2xl)] border border-border-subtle bg-surface transition-luxury hover:border-border"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={`https://images.unsplash.com/${article.image}?w=600&q=85&auto=format&fit=crop`}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="p-6">
            <Caption>{article.category} · {article.readTime}</Caption>
            <Subheading as="h3" className="mt-2 text-lg group-hover:text-foreground">
              {article.title}
            </Subheading>
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {article.excerpt}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {article.author} · {article.date}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
