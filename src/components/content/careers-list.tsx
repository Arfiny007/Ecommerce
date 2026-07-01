import type { CareerRole } from "@/constants/content/company";
import { Button } from "@/components/ui/button";

interface CareersListProps {
  roles: CareerRole[];
}

export function CareersList({ roles }: CareersListProps) {
  return (
    <div className="space-y-4">
      {roles.map((role) => (
        <article
          key={role.id}
          className="rounded-[var(--radius-2xl)] border border-border-subtle p-6 md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="font-display text-xl font-light md:text-2xl">
                {role.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {role.department} · {role.location} · {role.type}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {role.description}
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0" asChild>
              <a href={`mailto:careers@finyfashions.com?subject=Application: ${role.title}`}>
                Apply
              </a>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
