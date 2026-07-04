"use client";

import * as React from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Decimal places to render (e.g. 1 → 99.9). */
  decimals?: number;
  duration?: number;
}

/** Counts up from 0 to `value` the first time it scrolls into view. */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.6,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = React.useState(0);

  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration, prefersReducedMotion]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
