"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { siteConfig } from "@/lib/site";

const badges = [
  "Microsoft 365",
  "Entra ID",
  "Intune",
  "Defender",
  "Purview",
  "Zero Trust",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <AnimatedBackground />

      <div className="container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left — copy */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {siteConfig.availability}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-balance text-[2.75rem] font-bold leading-[1.03] tracking-tight sm:text-6xl md:text-7xl xl:text-[5rem]"
            >
              Senior{" "}
              <span className="text-gradient">Infrastructure</span>{" "}
              Engineer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="size-4" />
              {siteConfig.location}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <a href={siteConfig.resumeUrl} download>
                  <Download className="size-4" />
                  Download Resume
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#projects">
                  View Projects
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex items-center gap-2.5"
            >
              <SocialLink href={siteConfig.social.github} label="GitHub">
                <GithubIcon className="size-[18px]" />
              </SocialLink>
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
                <LinkedinIcon className="size-[18px]" />
              </SocialLink>
              <SocialLink href={siteConfig.social.blog} label="Blog">
                <BookOpen className="size-[18px]" />
              </SocialLink>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
                >
                  {b}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            <Portrait />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
    >
      {children}
    </a>
  );
}

function Portrait() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/30 via-accent/20 to-secondary/30 blur-2xl" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl">
        {/* Headshot placeholder — replace /public/headshot.png */}
        <Image
          src={siteConfig.headshot}
          alt={`${siteConfig.name} — ${siteConfig.title}`}
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 420px"
          className="object-cover"
        />
        <PlaceholderFallback />
      </div>

      {/* Floating stat card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">9+ Years</p>
          <p className="text-xs text-muted-foreground">Enterprise IT</p>
        </div>
      </motion.div>

      {/* Floating compliance card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.72 }}
        className="glass absolute -right-4 top-8 rounded-2xl px-4 py-3 shadow-xl"
      >
        <p className="text-sm font-semibold text-emerald-500">99.9%</p>
        <p className="text-xs text-muted-foreground">Availability</p>
      </motion.div>
    </div>
  );
}

/** Shown behind the image; visible if headshot.png is a transparent placeholder. */
function PlaceholderFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 grid place-items-center bg-gradient-to-br from-muted to-card">
      <span className="text-7xl font-bold text-muted-foreground/30">
        {siteConfig.initials}
      </span>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-50" />
      {/* Azure architecture node network */}
      <AzureNodeNetwork />
      {/* Aurora blobs */}
      <div className="absolute left-1/2 top-0 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-aurora" />
      <div className="absolute right-0 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-secondary/15 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[110px]" />
      {/* Top fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

/**
 * Subtle Azure-architecture-style node/line diagram.
 * Calm, low-opacity, gently pulsing connection dots. Hidden for
 * reduced-motion users via the CSS in globals.css (animations disabled).
 */
function AzureNodeNetwork() {
  const nodes = [
    { cx: 120, cy: 90 },
    { cx: 320, cy: 60 },
    { cx: 520, cy: 130 },
    { cx: 720, cy: 80 },
    { cx: 240, cy: 240 },
    { cx: 470, cy: 300 },
    { cx: 700, cy: 250 },
    { cx: 90, cy: 360 },
    { cx: 360, cy: 420 },
    { cx: 620, cy: 400 },
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [4, 5],
    [5, 2],
    [5, 6],
    [6, 3],
    [4, 7],
    [7, 8],
    [8, 5],
    [8, 9],
    [9, 6],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 480"
      preserveAspectRatio="xMidYMid slice"
      className="absolute right-0 top-0 -z-10 h-full w-full opacity-[0.14] dark:opacity-[0.18] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
    >
      <g stroke="hsl(var(--primary))" strokeWidth="1" fill="none">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="16" fill="hsl(var(--primary) / 0.06)" />
          <circle cx={n.cx} cy={n.cy} r="4" fill="hsl(var(--primary))">
            <animate
              attributeName="opacity"
              values="0.35;1;0.35"
              dur={`${3 + (i % 4)}s`}
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
