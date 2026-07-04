/**
 * Enterprise Projects Dashboard — data layer.
 *
 * This file is additive: it reads the existing `caseStudies` (untouched) and
 * augments each project with dashboard-facing metadata (categories, status,
 * normalized technologies, environments). Adding a project to `caseStudies`
 * plus one entry here surfaces it in the dashboard automatically — the UI is
 * fully data-driven and scales to 100+ projects with no redesign.
 */

import { caseStudies, type CaseStudy } from "@/lib/case-studies";

/* ------------------------------------------------------------------ */
/* Filter dimensions (single source of truth for the UI)              */
/* ------------------------------------------------------------------ */

export const TECHNOLOGY_FILTERS = [
  "Microsoft 365",
  "Exchange Online",
  "SharePoint",
  "Teams",
  "Entra ID",
  "Intune",
  "Purview",
  "Defender",
  "Defender XDR",
  "Sentinel",
  "Azure",
  "Hyper-V",
  "PowerShell",
  "Windows Server",
  "Networking",
] as const;

export const CATEGORY_FILTERS = [
  "Identity",
  "Endpoint",
  "Security",
  "Compliance",
  "Infrastructure",
  "Automation",
  "Zero Trust",
  "Governance",
] as const;

export const ENVIRONMENT_FILTERS = ["Production", "Home Lab", "Hybrid"] as const;

export const DIFFICULTY_FILTERS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Architect",
] as const;

export const CERTIFICATION_FILTERS = [
  "MS-102",
  "SC-200",
  "SC-300",
  "SC-400",
  "AZ-900",
  "AZ-500",
  "SC-100",
] as const;

export const STATUS_FILTERS = ["Completed", "In Progress", "Planned"] as const;

export type Technology = (typeof TECHNOLOGY_FILTERS)[number];
export type Category = (typeof CATEGORY_FILTERS)[number];
export type Environment = (typeof ENVIRONMENT_FILTERS)[number];
export type Difficulty = (typeof DIFFICULTY_FILTERS)[number];
export type Certification = (typeof CERTIFICATION_FILTERS)[number];
export type Status = (typeof STATUS_FILTERS)[number];

/* ------------------------------------------------------------------ */
/* Per-project augmentation (keyed by case-study slug)                */
/* ------------------------------------------------------------------ */

interface Augmentation {
  categories: Category[];
  technologies: Technology[];
  environments: Environment[];
  certifications: Certification[];
  difficulty: Difficulty;
  status: Status;
}

const augmentations: Record<string, Augmentation> = {
  "purview-dlp": {
    categories: ["Compliance", "Governance", "Security"],
    technologies: ["Microsoft 365", "Exchange Online", "SharePoint", "Teams", "Purview", "PowerShell"],
    environments: ["Production", "Hybrid"],
    certifications: ["SC-400", "MS-102", "SC-100"],
    difficulty: "Advanced",
    status: "Completed",
  },
  "intune-deployment": {
    categories: ["Endpoint", "Security"],
    technologies: ["Intune", "Entra ID", "Windows Server", "PowerShell"],
    environments: ["Production", "Hybrid"],
    certifications: ["MS-102", "SC-300"],
    difficulty: "Advanced",
    status: "Completed",
  },
  "zero-trust-device": {
    categories: ["Zero Trust", "Endpoint", "Security"],
    technologies: ["Entra ID", "Intune", "Defender"],
    environments: ["Production"],
    certifications: ["SC-300", "SC-100"],
    difficulty: "Advanced",
    status: "In Progress",
  },
  "entra-id-protection": {
    categories: ["Identity", "Security"],
    technologies: ["Entra ID", "Defender"],
    environments: ["Production"],
    certifications: ["SC-300"],
    difficulty: "Intermediate",
    status: "Completed",
  },
  "zero-trust-identity": {
    categories: ["Identity", "Zero Trust", "Governance"],
    technologies: ["Entra ID", "Hyper-V", "Windows Server", "PowerShell"],
    environments: ["Home Lab"],
    certifications: ["SC-300", "SC-100"],
    difficulty: "Advanced",
    status: "Planned",
  },
};

/* ------------------------------------------------------------------ */
/* Index model                                                        */
/* ------------------------------------------------------------------ */

export interface ProjectIndexItem {
  slug: string;
  title: string;
  summary: string;
  category: string;
  hero: boolean;
  implementationTime: string;
  deployment: CaseStudy["deployment"];
  skills: string[];
  blogCount: number;

  categories: Category[];
  technologies: Technology[];
  environments: Environment[];
  certifications: Certification[];
  difficulty: Difficulty;
  status: Status;

  /** Pre-computed lowercase blob for instant search. */
  searchText: string;
  repoUrl: string;
}

function toIndexItem(study: CaseStudy): ProjectIndexItem {
  const aug = augmentations[study.slug] ?? {
    categories: [],
    technologies: [],
    environments: [study.deployment as Environment],
    certifications: [],
    difficulty: (study.difficulty as Difficulty) ?? "Advanced",
    status: "Completed" as Status,
  };

  const searchText = [
    study.title,
    study.tagline,
    study.category,
    study.executiveSummary.join(" "),
    ...study.badges,
    ...study.skills,
    ...aug.categories,
    ...aug.technologies,
    ...aug.certifications,
    ...aug.environments,
    aug.difficulty,
    aug.status,
  ]
    .join(" ")
    .toLowerCase();

  return {
    slug: study.slug,
    title: study.title,
    summary: study.tagline,
    category: study.category,
    hero: study.hero,
    implementationTime: study.implementationTime,
    deployment: study.deployment,
    skills: study.skills,
    blogCount: study.blogArticles.length,
    categories: aug.categories,
    technologies: aug.technologies,
    environments: aug.environments,
    certifications: aug.certifications,
    difficulty: aug.difficulty,
    status: aug.status,
    searchText,
    repoUrl: study.repo.url,
  };
}

export const projectsIndex: ProjectIndexItem[] = caseStudies.map(toIndexItem);

/* ------------------------------------------------------------------ */
/* Filtering + search                                                 */
/* ------------------------------------------------------------------ */

export interface ActiveFilters {
  technologies: string[];
  categories: string[];
  environments: string[];
  difficulties: string[];
  certifications: string[];
  statuses: string[];
}

export const emptyFilters: ActiveFilters = {
  technologies: [],
  categories: [],
  environments: [],
  difficulties: [],
  certifications: [],
  statuses: [],
};

/** Every selected value must be present on the project (AND semantics). */
const matchesAll = (selected: string[], values: string[]) =>
  selected.length === 0 || selected.every((s) => values.includes(s));

/** At least one selected value must be present on the project (OR semantics). */
const matchesSome = (selected: string[], values: string[]) =>
  selected.length === 0 || selected.some((s) => values.includes(s));

export function filterProjects(
  items: ProjectIndexItem[],
  query: string,
  filters: ActiveFilters
): ProjectIndexItem[] {
  const q = query.trim().toLowerCase();
  const terms = q.length ? q.split(/\s+/) : [];

  return items.filter((item) => {
    if (terms.length && !terms.every((t) => item.searchText.includes(t))) {
      return false;
    }
    if (!matchesAll(filters.technologies, item.technologies)) return false;
    if (!matchesAll(filters.categories, item.categories)) return false;
    if (!matchesAll(filters.certifications, item.certifications)) return false;
    if (!matchesSome(filters.environments, item.environments)) return false;
    if (!matchesSome(filters.difficulties, [item.difficulty])) return false;
    if (!matchesSome(filters.statuses, [item.status])) return false;
    return true;
  });
}

export function countActiveFilters(filters: ActiveFilters): number {
  return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
}

/* ------------------------------------------------------------------ */
/* Dashboard statistics                                               */
/* ------------------------------------------------------------------ */

export interface DashboardStats {
  projects: number;
  production: number;
  homeLab: number;
  technologies: number;
  certifications: number;
}

export function getDashboardStats(items = projectsIndex): DashboardStats {
  const tech = new Set<string>();
  const certs = new Set<string>();
  let production = 0;
  let homeLab = 0;

  for (const item of items) {
    item.technologies.forEach((t) => tech.add(t));
    item.certifications.forEach((c) => certs.add(c));
    if (item.deployment === "Production") production += 1;
    if (item.deployment === "Home Lab") homeLab += 1;
  }

  return {
    projects: items.length,
    production,
    homeLab,
    technologies: tech.size,
    certifications: certs.size,
  };
}

/** Option lists with result counts, for filter UI. */
export function optionCounts(
  items: ProjectIndexItem[],
  key: "technologies" | "categories" | "environments" | "certifications"
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    for (const value of item[key]) {
      counts[value] = (counts[value] ?? 0) + 1;
    }
  }
  return counts;
}
