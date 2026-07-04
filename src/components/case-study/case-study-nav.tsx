"use client";

import * as React from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Minimal top bar for case-study pages (does not touch the homepage nav). */
export function CaseStudyNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-3">
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass shadow-lg shadow-black/5" : "border border-transparent"
          )}
        >
          <a href="/" className="group flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/30">
              <ShieldCheck className="size-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">
                {siteConfig.name}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Enterprise Case Study
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/#projects"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">All projects</span>
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
