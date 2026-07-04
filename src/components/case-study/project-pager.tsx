import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";

export function ProjectPager({
  prev,
  next,
}: {
  prev?: CaseStudy;
  next?: CaseStudy;
}) {
  return (
    <nav
      aria-label="Project navigation"
      className="grid gap-4 border-t border-border/60 py-12 sm:grid-cols-2"
    >
      {prev ? (
        <a
          href={`/projects/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous project
          </span>
          <span className="font-semibold">{prev.title}</span>
        </a>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <a
          href={`/projects/${next.slug}`}
          className="group flex flex-col items-end gap-1 rounded-2xl border border-border bg-card p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:col-start-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            Next project
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="font-semibold">{next.title}</span>
        </a>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
