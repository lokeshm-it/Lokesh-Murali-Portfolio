"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "glass shadow-lg shadow-black/5"
              : "border border-transparent"
          )}
        >
          {/* Brand */}
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/30">
              <ShieldCheck className="size-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">
                {siteConfig.name}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Infrastructure & Security
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={siteConfig.resumeUrl} download>
                Resume
              </a>
            </Button>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-border bg-background/60 text-foreground/80 backdrop-blur lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass mt-2 overflow-hidden rounded-2xl p-2 lg:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 w-full">
                <a href={siteConfig.resumeUrl} download>
                  Download Resume
                </a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
