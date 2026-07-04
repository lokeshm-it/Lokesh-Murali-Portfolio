"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/80 backdrop-blur transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {/* Avoid hydration mismatch: render neutral icon until mounted */}
      {mounted ? (
        <>
          <Sun
            className={cn(
              "size-[18px] transition-all duration-300",
              isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
            )}
          />
          <Moon
            className={cn(
              "absolute size-[18px] transition-all duration-300",
              isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
            )}
          />
        </>
      ) : (
        <span className="size-[18px]" />
      )}
    </button>
  );
}
