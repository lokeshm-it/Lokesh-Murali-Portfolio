"use client";

import { motion } from "framer-motion";
import { Mail, BookOpen, ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { siteConfig } from "@/lib/site";

const channels = [
  {
    label: "Email",
    value: "lokeshmurali45@gmail.com",
    href: siteConfig.social.email,
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "in/lokesh-itinfra",
    href: siteConfig.social.linkedin,
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "lokeshm-it",
    href: siteConfig.social.github,
    Icon: GithubIcon,
  },
  {
    label: "Blog",
    value: "techcertguide.blog",
    href: siteConfig.social.blog,
    Icon: BookOpen,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-28 sm:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 sm:p-12 lg:p-16">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Let's build something secure"
                description="Open to Microsoft 365 Administrator, Endpoint Administrator, Modern Workplace and Security Engineer roles — remote or hybrid."
                align="left"
              />

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {siteConfig.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  {siteConfig.availability}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={siteConfig.social.email}>
                    <Mail className="size-4" />
                    Get in touch
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={siteConfig.resumeUrl} download>
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            {/* Channel cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-4 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{c.label}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {c.value}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
