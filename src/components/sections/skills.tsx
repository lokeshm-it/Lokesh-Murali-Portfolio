"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

const accentMap: Record<string, string> = {
  primary: "from-primary/15 to-primary/5 text-primary",
  secondary: "from-secondary/15 to-secondary/5 text-secondary",
  accent: "from-accent/15 to-accent/5 text-accent",
};

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-28 sm:py-32">
      {/* Subtle grid backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container relative">
        <SectionHeading
          eyebrow="Skills"
          title="A full-stack Microsoft engineering toolkit"
          description="Depth across the Microsoft cloud and infrastructure stack — organized the way enterprise teams actually work."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
                  i === 6 && "sm:col-span-2 lg:col-span-1"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-xl bg-gradient-to-br",
                      accentMap[category.accent]
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-base font-semibold">{category.name}</h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors group-hover:border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
