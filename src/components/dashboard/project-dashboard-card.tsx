"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Gauge,
  ServerCog,
  FlaskConical,
  Clock,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  Award,
  Layers,
} from "lucide-react";
import type { ProjectIndexItem } from "@/lib/projects-index";
import type { FilterDimension } from "@/components/dashboard/filter-panel";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/brand-icons";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  Completed: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
  "In Progress": "bg-primary/12 text-primary",
  Planned: "bg-amber-500/12 text-amber-600 dark:text-amber-400",
};

interface CardProps {
  item: ProjectIndexItem;
  onToggle: (dimension: FilterDimension, value: string) => void;
  activeTechnologies: string[];
  activeCertifications: string[];
}

export function ProjectDashboardCard({
  item,
  onToggle,
  activeTechnologies,
  activeCertifications,
}: CardProps) {
  const isProd = item.deployment === "Production";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Hero image placeholder */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <ShieldCheck className="size-14 text-primary/40 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur",
              statusStyle[item.status]
            )}
          >
            {item.status}
          </span>
        </div>
        <span
          className={cn(
            "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-semibold backdrop-blur",
            isProd ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
          )}
        >
          {isProd ? <ServerCog className="size-3.5" /> : <FlaskConical className="size-3.5" />}
          {item.deployment}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {item.category}
        </span>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{item.title}</h3>

        {/* Difficulty + time */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5" />
            {item.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {item.implementationTime}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {item.summary}
        </p>

        {/* Related technologies */}
        <MetaRow icon={Layers} label="Technologies">
          {item.technologies.map((t) => (
            <FilterChip
              key={t}
              label={t}
              active={activeTechnologies.includes(t)}
              onClick={() => onToggle("technologies", t)}
            />
          ))}
        </MetaRow>

        {/* Related certifications */}
        {item.certifications.length ? (
          <MetaRow icon={Award} label="Certifications">
            {item.certifications.map((c) => (
              <FilterChip
                key={c}
                label={c}
                variant="cert"
                active={activeCertifications.includes(c)}
                onClick={() => onToggle("certifications", c)}
              />
            ))}
          </MetaRow>
        ) : null}

        {/* Skills */}
        <MetaRow icon={Sparkles} label="Skills">
          {item.skills.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </MetaRow>

        {/* Related articles hint */}
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <BookOpen className="size-3.5" />
          {item.blogCount} related article{item.blogCount === 1 ? "" : "s"}
        </p>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          <Button asChild size="sm">
            <Link href={`/projects/${item.slug}`}>
              Case Study
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={item.repoUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function MetaRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Layers;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  variant = "tech",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: "tech" | "cert";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={`Filter by ${label}`}
      className={cn(
        "rounded-md border px-2 py-0.5 text-[11px] font-medium transition-all duration-200",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : variant === "cert"
            ? "border-primary/25 bg-primary/8 text-primary hover:border-primary/50"
            : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
