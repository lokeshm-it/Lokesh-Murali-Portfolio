import * as React from "react";
import Link from "next/link";
import {
  Gauge,
  Layers,
  ServerCog,
  FlaskConical,
  Clock,
  Award,
  ArrowLeft,
} from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/brand-icons";
import { cn } from "@/lib/utils";

export function CaseStudyHero({ study }: { study: CaseStudy }) {
  const isProd = study.deployment === "Production";
  const meta = [
    { icon: Gauge, label: "Difficulty", value: study.difficulty },
    { icon: Layers, label: "Environment", value: study.environment },
    {
      icon: isProd ? ServerCog : FlaskConical,
      label: "Deployment",
      value: study.deployment,
    },
    { icon: Clock, label: "Est. Implementation", value: study.implementationTime },
  ];

  return (
    <header className="relative overflow-hidden border-b border-border/60">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-50 mask-fade-b" />
        <div className="absolute left-1/2 top-0 h-[30rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[22rem] w-[22rem] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="container pb-14 pt-28 sm:pt-32">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {study.category}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
              isProd
                ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/12 text-amber-600 dark:text-amber-400"
            )}
          >
            {isProd ? (
              <ServerCog className="size-3.5" />
            ) : (
              <FlaskConical className="size-3.5" />
            )}
            {study.deployment}
          </span>
        </div>

        <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {study.tagline}
        </p>

        {/* Tech badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {study.badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Meta grid */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur"
            >
              <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <m.icon className="size-3.5" />
                {m.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground/90">
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications + CTAs */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Award className="size-4" />
              Related certifications:
            </span>
            {study.certifications.map((c) => (
              <span
                key={c}
                className="rounded-md border border-primary/25 bg-primary/8 px-2 py-0.5 text-xs font-semibold text-primary"
              >
                {c}
              </span>
            ))}
          </div>
          <Button asChild size="sm" variant="outline">
            <a href={study.repo.url} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
