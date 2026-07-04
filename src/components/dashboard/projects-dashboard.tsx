"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, SlidersHorizontal, FolderSearch } from "lucide-react";
import {
  projectsIndex,
  filterProjects,
  countActiveFilters,
  getDashboardStats,
  optionCounts,
  emptyFilters,
  TECHNOLOGY_FILTERS,
  CATEGORY_FILTERS,
  ENVIRONMENT_FILTERS,
  DIFFICULTY_FILTERS,
  CERTIFICATION_FILTERS,
  STATUS_FILTERS,
  type ActiveFilters,
} from "@/lib/projects-index";
import { StatsBar } from "@/components/dashboard/stats-bar";
import {
  FilterPanel,
  type FilterDimension,
} from "@/components/dashboard/filter-panel";
import { ProjectDashboardCard } from "@/components/dashboard/project-dashboard-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Map URL query keys to filter dimensions for shareable links. */
const QUERY_KEYS: Record<string, FilterDimension> = {
  tech: "technologies",
  category: "categories",
  environment: "environments",
  difficulty: "difficulties",
  cert: "certifications",
  status: "statuses",
};
const DIMENSION_TO_QUERY: Record<FilterDimension, string> = {
  technologies: "tech",
  categories: "category",
  environments: "environment",
  difficulties: "difficulty",
  certifications: "cert",
  statuses: "status",
};

export function ProjectsDashboard() {
  const [query, setQuery] = React.useState("");
  const [filters, setFilters] = React.useState<ActiveFilters>(emptyFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  const stats = React.useMemo(() => getDashboardStats(projectsIndex), []);
  const counts = React.useMemo(
    () => ({
      technologies: optionCounts(projectsIndex, "technologies"),
      categories: optionCounts(projectsIndex, "categories"),
      environments: optionCounts(projectsIndex, "environments"),
      certifications: optionCounts(projectsIndex, "certifications"),
    }),
    []
  );

  /* Seed filters from the URL on first mount (shareable technology/cert links). */
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seeded: ActiveFilters = {
      technologies: [],
      categories: [],
      environments: [],
      difficulties: [],
      certifications: [],
      statuses: [],
    };
    let touched = false;
    for (const [key, dim] of Object.entries(QUERY_KEYS)) {
      const values = params.getAll(key);
      if (values.length) {
        seeded[dim] = values;
        touched = true;
      }
    }
    const q = params.get("q");
    if (q) setQuery(q);
    if (touched) setFilters(seeded);
  }, []);

  /* Keep the URL in sync without navigation (no reload). */
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    (Object.keys(filters) as FilterDimension[]).forEach((dim) => {
      filters[dim].forEach((value) => params.append(DIMENSION_TO_QUERY[dim], value));
    });
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [query, filters]);

  const filtered = React.useMemo(
    () => filterProjects(projectsIndex, query, filters),
    [query, filters]
  );

  const activeCount = countActiveFilters(filters);
  const hasQuery = query.trim().length > 0;

  const toggleFilter = React.useCallback(
    (dimension: FilterDimension, value: string) => {
      setFilters((prev) => {
        const set = prev[dimension];
        const next = set.includes(value)
          ? set.filter((v) => v !== value)
          : [...set, value];
        return { ...prev, [dimension]: next };
      });
    },
    []
  );

  const clearAll = React.useCallback(() => {
    setFilters(emptyFilters);
    setQuery("");
  }, []);

  const groups = [
    { dimension: "technologies" as const, label: "Technology", options: TECHNOLOGY_FILTERS, counts: counts.technologies },
    { dimension: "categories" as const, label: "Category", options: CATEGORY_FILTERS, counts: counts.categories },
    { dimension: "environments" as const, label: "Environment", options: ENVIRONMENT_FILTERS, counts: counts.environments },
    { dimension: "difficulties" as const, label: "Difficulty", options: DIFFICULTY_FILTERS },
    { dimension: "certifications" as const, label: "Certification", options: CERTIFICATION_FILTERS, counts: counts.certifications },
    { dimension: "statuses" as const, label: "Status", options: STATUS_FILTERS },
  ];

  return (
    <div className="container pb-24 pt-28 sm:pt-32">
      {/* Heading */}
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          Enterprise Projects
        </span>
        <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Project Dashboard
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Explore every Microsoft engineering project — search, filter by
          technology, certification, environment and more, and open the full
          case study for each.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-10">
        <StatsBar stats={stats} />
      </div>

      {/* Search */}
      <div className="mt-8">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, technologies, certifications, skills…"
            aria-label="Search projects"
            className="h-14 w-full rounded-2xl border border-border bg-card/60 pl-12 pr-12 text-base backdrop-blur transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {hasQuery ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="mt-4 lg:hidden">
        <Button
          variant="outline"
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className="w-full"
        >
          <SlidersHorizontal className="size-4" />
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </Button>
      </div>

      <div className="mt-6 gap-8 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        {/* Filters */}
        <aside
          className={cn(
            "lg:sticky lg:top-24 lg:self-start",
            mobileFiltersOpen ? "block" : "hidden lg:block"
          )}
        >
          <FilterPanel
            groups={groups}
            filters={filters}
            onToggle={toggleFilter}
            onClear={clearAll}
            activeCount={activeCount}
          />
        </aside>

        {/* Results */}
        <div className="mt-6 min-w-0 lg:mt-0">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "project" : "projects"}
              {activeCount > 0 || hasQuery ? " match your filters" : " total"}
            </p>
            {activeCount > 0 || hasQuery ? (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <X className="size-3.5" />
                Reset
              </button>
            ) : null}
          </div>

          {filtered.length > 0 ? (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <ProjectDashboardCard
                    key={item.slug}
                    item={item}
                    onToggle={toggleFilter}
                    activeTechnologies={filters.technologies}
                    activeCertifications={filters.certifications}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card/40 py-20 text-center">
              <FolderSearch className="size-10 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-semibold">No projects found</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try removing a filter or adjusting your search.
              </p>
              <Button variant="outline" className="mt-6" onClick={clearAll}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
