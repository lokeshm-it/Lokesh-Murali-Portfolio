import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  Gauge,
  Lock,
  Clock,
  Activity,
  BadgeCheck,
  CheckCircle2,
  FileDown,
  FileText,
  FileCode,
  BookOpen,
  Star,
  GitFork,
  ArrowUpRight,
} from "lucide-react";
import type {
  KpiCard,
  KpiIcon,
  TechStackItem,
  SpecItem,
  ValidationItem,
  Challenge,
  BlogArticle,
  CaseStudy,
} from "@/lib/case-studies";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/brand-icons";
import { cn } from "@/lib/utils";

const kpiIconMap: Record<KpiIcon, LucideIcon> = {
  shield: ShieldCheck,
  compliance: BadgeCheck,
  zerotrust: Lock,
  efficiency: Gauge,
  risk: ShieldAlert,
  identity: Fingerprint,
  clock: Clock,
  activity: Activity,
};

/* KPI / Business Impact cards */
export function KpiCards({ items }: { items: KpiCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((kpi) => {
        const Icon = kpiIconMap[kpi.icon];
        return (
          <div
            key={kpi.label}
            className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 text-lg font-bold tracking-tight">{kpi.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{kpi.label}</p>
          </div>
        );
      })}
    </div>
  );
}

/* Technology stack cards */
export function TechStackGrid({ items }: { items: TechStackItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((tech) => (
        <div
          key={tech.name}
          className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        >
          <h3 className="text-base font-semibold">{tech.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {tech.description}
          </p>
        </div>
      ))}
    </div>
  );
}

/* Lab environment spec list */
export function SpecList({ items }: { items: SpecItem[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
      {items.map((spec) => (
        <div key={spec.label} className="bg-card p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {spec.label}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground/90">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* Validation checklist */
export function ValidationChecklist({ items }: { items: ValidationItem[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((v) => (
        <li
          key={v.item}
          className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
          <div>
            <p className="text-sm font-semibold">{v.item}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{v.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* Challenges */
export function ChallengeList({ items }: { items: Challenge[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((c) => (
        <div key={c.title} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 text-base font-semibold">
            <ShieldAlert className="size-4 text-amber-500" />
            {c.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {c.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

/* Simple prose list (lessons learned) */
export function InsightList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground/85"
        >
          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <BadgeCheck className="size-3.5" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* Skill badges */
export function SkillBadges({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((skill) => (
        <span
          key={skill}
          className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm font-medium text-foreground/80"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

/* Related certifications, highlighting the ones this project maps to */
export function RelatedCerts({
  all,
  highlighted,
}: {
  all: string[];
  highlighted: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {all.map((cert) => {
        const active = highlighted.includes(cert);
        return (
          <span
            key={cert}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
              active
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground"
            )}
          >
            {active ? <BadgeCheck className="size-4" /> : null}
            {cert}
          </span>
        );
      })}
    </div>
  );
}

/* Related blog articles — live TechCertGuide posts */
export function BlogCards({ items }: { items: BlogArticle[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((a) => (
        <a
          key={a.url}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="flex items-center gap-1 text-sm font-semibold">
              <span className="truncate">{a.title}</span>
              <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
            <p className="mt-1.5 text-[11px] font-medium text-primary/70">
              techcertguide.blog
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

/* GitHub repository preview */
export function RepoPreview({ repo }: { repo: CaseStudy["repo"] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-foreground text-background">
          <GithubIcon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-mono text-sm font-semibold">{repo.name}</h3>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Public
            </span>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{repo.description}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" /> —
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork className="size-3.5" /> —
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild size="sm">
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="size-4" />
            View Repository
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <FileText className="size-4" />
            README
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <BookOpen className="size-4" />
            Documentation
          </a>
        </Button>
      </div>
    </div>
  );
}

/* Download center */
const downloadIconMap: Record<string, LucideIcon> = {
  PDF: FileText,
  ZIP: FileCode,
  DOC: FileText,
};

export function DownloadCenter({
  items,
}: {
  items: { label: string; type: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((d) => {
        const Icon = downloadIconMap[d.type] ?? FileDown;
        return (
          <div
            key={d.label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{d.label}</p>
              <p className="text-xs text-muted-foreground">
                {d.type} · Available soon
              </p>
            </div>
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground"
            >
              <FileDown className="size-4" />
            </span>
          </div>
        );
      })}
    </div>
  );
}
