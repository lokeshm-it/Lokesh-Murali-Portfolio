"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActiveFilters } from "@/lib/projects-index";

export type FilterDimension = keyof ActiveFilters;

interface FilterGroupDef {
  dimension: FilterDimension;
  label: string;
  options: readonly string[];
  counts?: Record<string, number>;
}

interface FilterPanelProps {
  groups: FilterGroupDef[];
  filters: ActiveFilters;
  onToggle: (dimension: FilterDimension, value: string) => void;
  onClear: () => void;
  activeCount: number;
}

export function FilterPanel({
  groups,
  filters,
  onToggle,
  onClear,
  activeCount,
}: FilterPanelProps) {
  return (
    <div className="rounded-3xl border border-border bg-card/50 p-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Filters</h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-3.5" />
            Clear ({activeCount})
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-5">
        {groups.map((group) => (
          <FilterGroup
            key={group.dimension}
            group={group}
            selected={filters[group.dimension]}
            onToggle={(value) => onToggle(group.dimension, value)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterGroup({
  group,
  selected,
  onToggle,
}: {
  group: FilterGroupDef;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {group.label}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {group.options.map((option) => {
          const active = selected.includes(option);
          const count = group.counts?.[option];
          const disabled = count === 0 && !active;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => onToggle(option)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                  : "border-border bg-background/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                disabled && "cursor-not-allowed opacity-40 hover:border-border hover:text-muted-foreground"
              )}
            >
              {option}
              {typeof count === "number" ? (
                <span
                  className={cn(
                    "tabular-nums",
                    active ? "text-primary-foreground/80" : "text-muted-foreground/70"
                  )}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
