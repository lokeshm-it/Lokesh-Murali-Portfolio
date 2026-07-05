"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ScreenshotPlaceholder } from "@/lib/case-studies";

/** A single gallery tile — shared between the grouped and flat layouts. */
function ScreenshotTile({
  shot,
  onClick,
}: {
  shot: ScreenshotPlaceholder;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        {shot.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.image}
            alt={shot.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <span className="grid-bg absolute inset-0 opacity-30" />
            <ImageIcon className="size-8 text-primary/40 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute bottom-2 right-2 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
              Placeholder
            </span>
          </>
        )}
      </span>
      <span className="flex flex-col gap-1 p-4">
        <span className="text-sm font-semibold">{shot.title}</span>
        <span className="text-xs leading-relaxed text-muted-foreground">
          {shot.caption}
        </span>
      </span>
    </button>
  );
}

/** Professional screenshot gallery with an accessible lightbox. */
export function ScreenshotGallery({
  screenshots,
}: {
  screenshots: ScreenshotPlaceholder[];
}) {
  const [active, setActive] = React.useState<number | null>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);
  const isOpen = active !== null;

  const close = React.useCallback(() => setActive(null), []);
  const go = React.useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null
          ? cur
          : (cur + dir + screenshots.length) % screenshots.length
      ),
    [screenshots.length]
  );

  // Open/close lifecycle: focus management, focus trap, scroll lock.
  React.useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'button, [href], [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute("disabled"))
        : [];

    // Move focus into the dialog once it has mounted.
    const raf = requestAnimationFrame(() => focusables()[0]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        const f = focusables();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restore focus to the element that opened the lightbox.
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, close, go]);

  // Group screenshots by implementation phase when phase metadata is present,
  // while keeping a single flat index shared with the lightbox for prev/next.
  const hasPhases = screenshots.some((s) => s.phase);
  const groups = React.useMemo(() => {
    if (!hasPhases) return [];
    const order: string[] = [];
    const map = new Map<string, { shot: ScreenshotPlaceholder; index: number }[]>();
    screenshots.forEach((shot, index) => {
      const key = shot.phase ?? "Additional Screenshots";
      if (!map.has(key)) {
        map.set(key, []);
        order.push(key);
      }
      map.get(key)!.push({ shot, index });
    });
    return order.map((phase) => ({ phase, items: map.get(phase)! }));
  }, [screenshots, hasPhases]);

  return (
    <>
      {hasPhases ? (
        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.phase}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                {group.phase}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map(({ shot, index }) => (
                  <ScreenshotTile
                    key={shot.title}
                    shot={shot}
                    onClick={() => setActive(index)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((shot, i) => (
            <ScreenshotTile key={shot.title} shot={shot} onClick={() => setActive(i)} />
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={screenshots[active].title}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next"
              className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.figure
              key={active}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-transparent to-accent/15">
                {screenshots[active].image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={screenshots[active].image}
                    alt={screenshots[active].title}
                    className="size-full object-contain"
                  />
                ) : (
                  <>
                    <span className="grid-bg absolute inset-0 opacity-30" />
                    <ImageIcon className="size-14 text-primary/40" />
                  </>
                )}
              </div>
              <figcaption className="flex flex-col gap-1 p-5">
                <span className="text-base font-semibold">
                  {screenshots[active].title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {screenshots[active].caption}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
