import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

interface CaseStudySectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  icon?: LucideIcon;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Consistent section shell for every case-study block.
 * Guarantees identical spacing, heading hierarchy and anchor behaviour
 * across all project pages (and any future ones).
 */
export function CaseStudySection({
  id,
  eyebrow,
  title,
  icon: Icon,
  description,
  className,
  children,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-24 border-t border-border/60 py-12 sm:py-16", className)}
    >
      <Reveal className="mb-8 flex flex-col gap-3">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
        ) : null}
        <div className="flex items-center gap-3">
          {Icon ? (
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {title}
          </h2>
        </div>
        {description ? (
          <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </Reveal>
      {children}
    </section>
  );
}
