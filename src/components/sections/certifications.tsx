"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, CircleDashed } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { certifications, type CertStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

const columns: {
  status: CertStatus;
  stage: string;
  title: string;
  icon: typeof CheckCircle2;
  accent: string;
  ring: string;
  chip: string;
}[] = [
  {
    status: "completed",
    stage: "01",
    title: "Completed",
    icon: CheckCircle2,
    accent: "text-emerald-500",
    ring: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
    chip: "bg-emerald-500/10 text-emerald-500",
  },
  {
    status: "in-progress",
    stage: "02",
    title: "In Progress",
    icon: Loader2,
    accent: "text-primary",
    ring: "border-primary/40 bg-primary/10 text-primary",
    chip: "bg-primary/10 text-primary",
  },
  {
    status: "planned",
    stage: "03",
    title: "Roadmap",
    icon: CircleDashed,
    accent: "text-muted-foreground",
    ring: "border-border bg-muted text-muted-foreground",
    chip: "bg-muted text-muted-foreground",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative scroll-mt-24 py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Certifications"
          title="A deliberate path to Security Architect"
          description="From ISO 27001 auditing today toward Microsoft security and cloud certifications — a roadmap built around identity, compliance and defence."
        />

        {/* Roadmap spine */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-emerald-500/50 via-primary/50 to-border lg:block" />

          <div className="grid gap-6 lg:grid-cols-3">
            {columns.map((col, colIndex) => {
              const items = certifications.filter((c) => c.status === col.status);
              const Icon = col.icon;
              return (
                <motion.div
                  key={col.status}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: colIndex * 0.12 }}
                  className="relative"
                >
                  {/* Stage marker */}
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={cn(
                        "relative z-10 grid size-12 place-items-center rounded-full border-2 bg-background",
                        col.ring
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-5",
                          col.status === "in-progress" &&
                            "animate-spin [animation-duration:3s]"
                        )}
                      />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Stage {col.stage}
                      </p>
                      <h3 className="text-base font-semibold leading-tight">
                        {col.title}
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          {items.length}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3 rounded-2xl border border-border bg-card/50 p-4">
                    {items.map((cert) => (
                      <div
                        key={cert.code + cert.name}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                      >
                        <span
                          className={cn(
                            "grid h-9 min-w-16 place-items-center rounded-lg px-2 text-xs font-bold",
                            col.chip
                          )}
                        >
                          {cert.code}
                        </span>
                        <p className="text-sm font-medium leading-tight text-foreground/90">
                          {cert.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
