"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Target,
  Gauge,
  Layers,
  ServerCog,
  FlaskConical,
  Award,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects, type Project } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/brand-icons";
import { cn } from "@/lib/utils";

export function Projects() {
  const hero = projects.find((p) => p.hero);
  const rest = projects.filter((p) => !p.hero);

  return (
    <section id="projects" className="relative scroll-mt-24 py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Enterprise work that moves the needle"
          description="Selected engagements across compliance, endpoint management and Zero Trust — each mapped to certifications and focused on measurable security and operational outcomes."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {hero ? <HeroProjectCard project={hero} /> : null}
          {rest.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* View All Projects — entry point to the Enterprise Projects Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group w-full sm:w-auto"
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="max-w-md text-sm text-muted-foreground">
            Explore all Microsoft 365, Security, Infrastructure, and Home Lab
            projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                        */
/* ------------------------------------------------------------------ */

function DeploymentBadge({ deployment }: { deployment: Project["deployment"] }) {
  const isProd = deployment === "Production";
  return (
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
      {deployment}
    </span>
  );
}

function MetaGrid({ project }: { project: Project }) {
  const items = [
    { icon: Gauge, label: "Difficulty", value: project.difficulty },
    { icon: Layers, label: "Environment", value: project.environment },
  ];
  return (
    <dl className="mt-4 grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-border bg-muted/30 px-3 py-2.5"
        >
          <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <item.icon className="size-3.5" />
            {item.label}
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-foreground/90">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CertMapping({ certs }: { certs: string[] }) {
  return (
    <div className="mt-4">
      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <Award className="size-3.5" />
        Certification mapping
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {certs.map((c) => (
          <span
            key={c}
            className="rounded-md border border-primary/25 bg-primary/8 px-2 py-0.5 text-[11px] font-semibold text-primary"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="mt-auto flex flex-wrap gap-3 pt-6">
      <Button asChild size="sm">
        <Link href={`/projects/${project.slug}`}>
          View Case Study
          <ArrowUpRight className="size-4" />
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <a href={project.repo} target="_blank" rel="noopener noreferrer">
          <GithubIcon className="size-4" />
          GitHub
        </a>
      </Button>
    </div>
  );
}

function ProjectVisual({ hero = false }: { hero?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15",
        hero ? "h-56 sm:h-72" : "h-40"
      )}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 grid place-items-center">
        <ShieldCheck className={cn("text-primary/40", hero ? "size-20" : "size-14")} />
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
        Hero image placeholder
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                              */
/* ------------------------------------------------------------------ */

function HeroProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-primary/25 bg-card p-6 shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 lg:row-span-2 lg:p-8"
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          <Target className="size-3.5" />
          Hero Project
        </span>
        <DeploymentBadge deployment={project.deployment} />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {project.category}
        </span>
      </div>

      <ProjectVisual hero />

      <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
        {project.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      <MetaGrid project={project} />

      <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Outcome
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
          {project.outcome}
        </p>
      </div>

      <CertMapping certs={project.certs} />
      <TechTags tech={project.tech} />
      <ProjectActions project={project} />
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {project.category}
        </span>
        <DeploymentBadge deployment={project.deployment} />
      </div>

      <ProjectVisual />

      <h3 className="mt-5 text-lg font-semibold tracking-tight">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      <MetaGrid project={project} />
      <CertMapping certs={project.certs} />
      <TechTags tech={project.tech} />
      <ProjectActions project={project} />
    </motion.article>
  );
}
