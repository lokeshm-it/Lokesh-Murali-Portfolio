"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Dot } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { experience } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

/** Company logo placeholder — a clean brand monogram. */
function CompanyLogo({ company }: { company: string }) {
  const initials = company
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-gradient-to-br from-primary/12 to-accent/8 text-sm font-bold tracking-tight text-primary"
    >
      {initials}
    </span>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Nine years across enterprise IT"
          description="A steady progression from enterprise endpoint support to owning hybrid Microsoft infrastructure and security."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Timeline spine */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="relative pl-12 sm:pl-0"
              >
                {/* Node */}
                <span className="absolute left-4 top-6 z-10 grid size-8 -translate-x-1/2 place-items-center rounded-full border border-border bg-background shadow-sm sm:left-1/2">
                  <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    <Briefcase className="size-3" />
                  </span>
                </span>

                <div
                  className={
                    i % 2 === 0
                      ? "sm:pr-[calc(50%+2rem)]"
                      : "sm:pl-[calc(50%+2rem)]"
                  }
                >
                  <article className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                    <div className="flex items-start gap-3.5">
                      <CompanyLogo company={job.company} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{job.company}</h3>
                          {job.current ? (
                            <Badge variant="success">Current</Badge>
                          ) : null}
                        </div>
                        <p className="mt-0.5 font-medium text-primary">
                          {job.role}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-muted-foreground">
                      <span>{job.period}</span>
                      <Dot className="size-4" />
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {job.location}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {job.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {job.achievements.map((a) => (
                        <li
                          key={a}
                          className="flex items-start gap-2.5 text-sm text-foreground/85"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
