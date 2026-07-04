import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
