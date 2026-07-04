"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ImageIcon } from "lucide-react";
import type { ImplementationPhase } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

/** Expandable, screenshot-ready step-by-step implementation timeline. */
export function ImplementationTimeline({
  phases,
}: {
  phases: ImplementationPhase[];
}) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <ol className="relative space-y-3">
      {phases.map((phase, i) => {
        const isOpen = open === i;
        return (
          <li
            key={phase.phase}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full border text-sm font-bold transition-colors",
                  isOpen
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground"
                )}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wider text-primary">
                  {phase.phase}
                </span>
                <span className="block text-base font-semibold">
                  {phase.title}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border/60 px-5 pb-5 pt-4 pl-[4.5rem]">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {phase.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {phase.steps.map((step) => (
                        <li
                          key={step}
                          className="flex items-start gap-2.5 text-sm text-foreground/85"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {step}
                        </li>
                      ))}
                    </ul>

                    {/* Screenshot slot (placeholder) */}
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
                      <ImageIcon className="size-4" />
                      Screenshots for this phase can be added here.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
