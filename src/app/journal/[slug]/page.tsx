import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Eyebrow, Heading } from "@/components/common/typography";
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
      <div className="border-b border-border-subtle bg-surface-muted pt-24 pb-10 md:pt-32 md:pb-14">
        <Container size="narrow">
          <Eyebrow>{article.category}</Eyebrow>
          <Heading className="mt-3">{article.title}</Heading>
          <p className="mt-4 text-sm text-muted-foreground">
            {article.author} · {article.date} · {article.readTime}
          </p>
        </Container>
      </div>
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
