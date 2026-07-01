import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/constants/content/journal";
import { Caption, Subheading } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JournalPreviewProps {
  limit?: number;
  className?: string;
  showHeader?: boolean;
}

export function JournalPreview({ limit = 3, className, showHeader = true }: JournalPreviewProps) {
  const articles = JOURNAL_ARTICLES.slice(0, limit);
  const [featured, ...rest] = articles;

  return (
    <div className={className}>
      {showHeader && (
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-editorial text-muted-foreground">
              From the Journal
            </p>
            <h2 className="mt-2 font-display text-3xl font-light md:text-4xl">
              Essays &amp; Stories
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/journal">
              Read All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        {featured && (
          <Link
            href={`/journal/${featured.slug}`}
            className="group relative overflow-hidden rounded-[var(--radius-2xl)] lg:col-span-7"
          >
            <div className="relative aspect-[16/10] lg:aspect-[4/3]">
              <Image
                src={`https://images.unsplash.com/${featured.image}?w=900&q=85&auto=format&fit=crop`}
                alt={featured.title}
                fill
                className="image-hover-zoom"
                sizes="60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <Caption className="text-background/70">{featured.category}</Caption>
                <Subheading as="h3" className="mt-2 text-background">
                  {featured.title}
                </Subheading>
                <p className="mt-2 line-clamp-2 text-sm text-background/80">
                  {featured.excerpt}
                </p>
              </div>
            </div>
          </Link>
        )}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group flex gap-4 rounded-[var(--radius-xl)] border border-border-subtle p-4 transition-luxury hover:border-border"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src={`https://images.unsplash.com/${article.image}?w=200&q=80&auto=format&fit=crop`}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <Caption>{article.readTime}</Caption>
                <p className="mt-1 line-clamp-2 text-sm font-medium group-hover:text-muted-foreground">
                  {article.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
