import { cn } from "@/lib/utils";

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "prose-luxury space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-light [&_h3]:text-foreground [&_h3]:md:text-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

interface PolicySectionProps {
  title: string;
  body: string;
}

export function PolicySection({ title, body }: PolicySectionProps) {
  return (
    <section className="border-b border-border-subtle py-8 last:border-0">
      <h3 className="font-display text-xl font-light text-foreground md:text-2xl">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        {body}
      </p>
    </section>
  );
}

interface PolicyPageContentProps {
  sections: { title: string; body: string }[];
  lastUpdated?: string;
}

export function PolicyPageContent({ sections, lastUpdated }: PolicyPageContentProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {lastUpdated && (
        <p className="mb-8 text-xs uppercase tracking-editorial text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      )}
      {sections.map((section) => (
        <PolicySection key={section.title} title={section.title} body={section.body} />
      ))}
    </div>
  );
}
