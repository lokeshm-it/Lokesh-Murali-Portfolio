"use client";

import * as React from "react";
import { ZoomIn, ZoomOut, Maximize2, Network } from "lucide-react";

/**
 * Responsive architecture diagram frame with zoom controls.
 * Renders a real diagram image when `image` is provided; otherwise falls
 * back to the placeholder frame for projects without a diagram graphic yet.
 */
export function ArchitectureDiagram({
  caption,
  image,
}: {
  caption: string;
  image?: string;
}) {
  const [zoom, setZoom] = React.useState(1);

  const clamp = (z: number) => Math.min(2, Math.max(0.6, Number(z.toFixed(2))));

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-2.5">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Network className="size-4 text-primary" />
          Architecture Diagram
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => clamp(z - 0.2))}
            aria-label="Zoom out"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ZoomOut className="size-4" />
          </button>
          <span className="w-12 text-center text-xs tabular-nums text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => clamp(z + 0.2))}
            aria-label="Zoom in"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ZoomIn className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            aria-label="Reset zoom"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Maximize2 className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative aspect-[16/9] overflow-auto bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        {!image ? <div className="grid-bg absolute inset-0 opacity-40" /> : null}
        <div
          className="grid h-full w-full place-items-center transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Architecture diagram"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="grid size-16 place-items-center rounded-2xl border border-border bg-card/70 text-primary backdrop-blur">
                <Network className="size-7" />
              </span>
              <p className="text-sm font-medium text-muted-foreground">
                Architecture diagram placeholder
              </p>
            </div>
          )}
        </div>
      </div>

      <figcaption className="border-t border-border/60 px-4 py-3 text-sm text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
