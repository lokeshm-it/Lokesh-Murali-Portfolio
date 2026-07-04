"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

/** Sticky, scrollspy table of contents (desktop only). */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState<string>(items[0]?.id ?? "");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 transition-colors",
                active === item.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
