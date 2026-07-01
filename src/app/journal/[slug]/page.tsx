import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPageHero } from "@/components/content/content-page-hero";
import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { Caption } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { getJournalArticle, getJournalSlugs } from "@/constants/content/journal";
import { createPageMetadata } from "@/lib/metadata";

interface JournalArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return {};
  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/journal/${slug}`,
    type: "article",
  });
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) notFound();

  return (
    <>
      <ContentPageHero eyebrow={article.category} title={article.title} size="narrow">
        <Caption className="mt-4 text-foreground/70">
          {article.author} · {article.date} · {article.readTime}
        </Caption>
      </ContentPageHero>
      <Section spacing="md">
        <Container size="narrow">
          <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-[var(--radius-2xl)]">
            <Image
              src={`https://images.unsplash.com/${article.image}?w=1200&q=85&auto=format&fit=crop`}
              alt={article.title}
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
          </div>
          <div className="space-y-6">
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-16 border-t border-border-subtle pt-8">
            <Button variant="outline" asChild>
              <Link href="/journal">← Back to Journal</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
