"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { focusAreas } from "@/lib/data";

const principles = [
  "Security and compliance built in, not bolted on",
  "Automation-first operations with PowerShell & Graph",
  "Continuous learning across the Microsoft security stack",
  "Clear technical writing that turns complexity into clarity",
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="Engineering secure, resilient Microsoft environments"
          description="Nine years spent designing, securing and operating the infrastructure enterprises depend on — from hybrid identity to endpoint compliance and Zero Trust."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Bio */}
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a Senior Microsoft 365 &amp; Infrastructure Engineer based in
              Bengaluru, focused on designing and securing hybrid IT across Azure
              and on-premises Windows Server. My work spans{" "}
              <strong className="font-semibold text-foreground">
                identity, endpoint management, security and compliance
              </strong>{" "}
              — the pillars that keep modern enterprises running safely.
            </p>
            <p>
              At Celegence, a regulated life-sciences company, I manage hybrid IT
              for 200+ endpoints, hold 99.9% infrastructure availability and lead
              patch management to 97–99% compliance while supporting ISO/IEC 27001
              audit readiness. Earlier, at CX100, I owned the entire Microsoft 365
              cloud environment and reached 100% MFA coverage.
            </p>
            <p>
              Outside of engineering, I run{" "}
              <strong className="font-semibold text-foreground">
                TechCertGuide
              </strong>{" "}
              and the IT Insider newsletter (1,000+ subscribers), publishing
              practical guides on Microsoft 365, Azure and security. I lean on
              AI-assisted workflows to move faster without cutting corners.
            </p>

            <ul className="grid gap-3 pt-2">
              {principles.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-foreground/90">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Focus grid */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {focusAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{area.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
