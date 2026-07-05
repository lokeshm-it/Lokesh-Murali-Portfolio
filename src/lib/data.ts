/**
 * Portfolio content model.
 * All copy is real and outcome-focused — no placeholder text.
 * Icons are referenced by Lucide name and resolved in the components.
 */

import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FolderKanban,
  FileText,
  MonitorSmartphone,
  ShieldCheck,
  Activity,
  Cloud,
  Fingerprint,
  Laptop,
  Shield,
  Server,
  TerminalSquare,
  ScrollText,
} from "lucide-react";
import { caseStudies } from "./case-studies";

/* ------------------------------------------------------------------ */
/* Metrics — six-metric dashboard */
/* ------------------------------------------------------------------ */

export interface Metric {
  /** Numeric target the counter animates toward. */
  value: number;
  label: string;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  /** Decimal places to render (e.g. 1 for 99.9). */
  decimals?: number;
}

export const metrics: Metric[] = [
  { value: 9, suffix: "+", label: "Years of Experience", icon: Briefcase },
  {
    value: 22,
    suffix: "+",
    label: "Enterprise & Home Lab Projects",
    icon: FolderKanban,
  },
  { value: 60, suffix: "+", label: "Technical Articles", icon: FileText },
  {
    value: 200,
    suffix: "+",
    label: "Enterprise Endpoints Managed",
    icon: MonitorSmartphone,
  },
  {
    value: 99,
    prefix: "97–",
    suffix: "%",
    label: "Patch Compliance",
    icon: ShieldCheck,
  },
  {
    value: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Infrastructure Availability",
    icon: Activity,
  },
];

/* ------------------------------------------------------------------ */
/* About — focus areas */
/* ------------------------------------------------------------------ */

export interface FocusArea {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const focusAreas: FocusArea[] = [
  {
    title: "Microsoft 365 & Collaboration",
    description:
      "Exchange Online, Teams, SharePoint and OneDrive administration with governed provisioning, licensing and access control.",
    icon: Cloud,
  },
  {
    title: "Identity & Access",
    description:
      "Hybrid identity on Microsoft Entra ID — Conditional Access, MFA, SSPR and RBAC designed around Zero Trust.",
    icon: Fingerprint,
  },
  {
    title: "Endpoint Management",
    description:
      "Intune, Windows Autopilot and compliance policies driving 98%+ endpoint compliance across managed fleets.",
    icon: Laptop,
  },
  {
    title: "Security & Threat Protection",
    description:
      "Microsoft Defender for Endpoint, Defender XDR and EDR for threat visibility, hardening and rapid response.",
    icon: Shield,
  },
  {
    title: "Infrastructure & Continuity",
    description:
      "Active Directory, Windows Server, Azure IaaS, DNS/DHCP and BCP/DR planning validated against RTO and RPO targets.",
    icon: Server,
  },
  {
    title: "Compliance & Governance",
    description:
      "ISO/IEC 27001:2022 audit readiness and Microsoft Purview data governance embedded into day-to-day operations.",
    icon: ScrollText,
  },
];

/* ------------------------------------------------------------------ */
/* Skills */
/* ------------------------------------------------------------------ */

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  accent: "primary" | "secondary" | "accent";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Microsoft 365",
    icon: Cloud,
    accent: "primary",
    skills: [
      "Exchange Online",
      "Microsoft Teams",
      "SharePoint Online",
      "OneDrive for Business",
      "Licensing & Provisioning",
      "Power Automate",
    ],
  },
  {
    name: "Identity & Access",
    icon: Fingerprint,
    accent: "accent",
    skills: [
      "Microsoft Entra ID",
      "Entra Connect",
      "Conditional Access",
      "MFA & SSPR",
      "RBAC",
      "Active Directory",
    ],
  },
  {
    name: "Endpoint Management",
    icon: Laptop,
    accent: "secondary",
    skills: [
      "Microsoft Intune",
      "Windows Autopilot",
      "MDM / MAM",
      "Compliance Policies",
      "BitLocker",
      "WSUS Patching",
    ],
  },
  {
    name: "Security",
    icon: Shield,
    accent: "primary",
    skills: [
      "Defender for Endpoint",
      "Defender XDR",
      "EDR",
      "Microsoft Sentinel",
      "Zero Trust",
      "Vulnerability Management",
    ],
  },
  {
    name: "Infrastructure",
    icon: Server,
    accent: "accent",
    skills: [
      "Windows Server",
      "Azure IaaS",
      "DNS / DHCP",
      "Group Policy",
      "FortiGate / VPN",
      "BCP / DR",
    ],
  },
  {
    name: "Automation",
    icon: TerminalSquare,
    accent: "secondary",
    skills: [
      "PowerShell",
      "Power Automate",
      "Provisioning Scripts",
      "Reporting Automation",
      "Graph API",
    ],
  },
  {
    name: "Compliance",
    icon: ScrollText,
    accent: "primary",
    skills: [
      "ISO/IEC 27001:2022",
      "Microsoft Purview",
      "Data Loss Prevention",
      "Audit Readiness",
      "Security Controls",
      "ITIL",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience */
/* ------------------------------------------------------------------ */

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  achievements: string[];
  tech: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Celegence",
    role: "Senior Infrastructure Engineer",
    period: "Jul 2023 — Present",
    location: "Bengaluru · Life Sciences",
    current: true,
    summary:
      "Own hybrid Microsoft 365, Azure and Windows Server infrastructure across 200+ endpoints in a regulated life-sciences environment, aligned to ISO/IEC 27001.",
    achievements: [
      "Maintain 99.9% infrastructure availability across hybrid M365, Azure IaaS and Windows Server.",
      "Lead patch management via WSUS and Intune, achieving 97–99% endpoint compliance.",
      "Implemented Intune, Autopilot, Conditional Access, MFA and SSPR for 98%+ Zero Trust compliance.",
      "Support ISO/IEC 27001:2022 audits and BCP/DR validation against defined RTOs and RPOs.",
    ],
    tech: [
      "Microsoft 365",
      "Entra ID",
      "Intune",
      "Defender",
      "Azure IaaS",
      "Windows Server",
      "PowerShell",
      "ISO 27001",
    ],
  },
  {
    company: "CX100",
    role: "System Administrator",
    period: "Dec 2021 — Jul 2023",
    location: "Bengaluru",
    summary:
      "Primary Microsoft 365 administrator for a cloud-native environment, owning identity, endpoint management, security and SaaS operations.",
    achievements: [
      "Owned the full M365 estate — Entra ID, Intune, Exchange Online and Teams — reaching 100% MFA coverage.",
      "Reduced onboarding and provisioning time by ~40% through standardized IAM.",
      "Automated provisioning, licensing and reporting with PowerShell, cutting admin effort ~50%.",
      "Enforced Zero Trust with Intune MDM/MAM, Autopilot and compliance policies.",
    ],
    tech: [
      "Microsoft 365",
      "Entra ID",
      "Conditional Access",
      "Intune",
      "Exchange Online",
      "PowerShell",
      "ITIL",
    ],
  },
  {
    company: "Moody's Analytics",
    role: "Desktop Support Engineer",
    period: "Dec 2018 — Dec 2021",
    location: "Bengaluru",
    summary:
      "Delivered enterprise endpoint support for 500+ users while supporting Active Directory, Microsoft 365 and infrastructure operations.",
    achievements: [
      "Supported M365 services — Outlook, Teams, OneDrive and SharePoint — for 500+ enterprise users.",
      "Administered Active Directory accounts, security groups, Group Policy and access requests.",
      "Deployed Windows 10 with BitLocker and standardized configurations to speed onboarding.",
      "Monitored patch compliance and drove remediation while maintaining SLA targets.",
    ],
    tech: [
      "Active Directory",
      "Microsoft 365",
      "Windows 10",
      "MDM",
      "Group Policy",
      "BitLocker",
    ],
  },
  {
    company: "Wipro Info Tech",
    role: "Desktop Support Engineer",
    period: "Jan 2017 — Nov 2018",
    location: "Bengaluru · Contract",
    summary:
      "Provided enterprise desktop support in a 3,000+ user environment covering endpoint deployment and ITIL-based service operations.",
    achievements: [
      "Deployed enterprise desktops and laptops using SCCM for imaging and hardware refresh.",
      "Resolved Windows, Office, VPN and network incidents with accurate ticket documentation.",
      "Coordinated SaaS access provisioning and escalations using ITIL service management.",
      "Monitored endpoint patch compliance and escalated operational issues for remediation.",
    ],
    tech: ["SCCM", "Windows OS", "Microsoft Office", "VPN", "ITIL"],
  },
];

/* ------------------------------------------------------------------ */
/* Featured Projects */
/* ------------------------------------------------------------------ */

export type Deployment = "Production" | "Home Lab";

export interface Project {
  slug: string;
  title: string;
  category: string;
  hero?: boolean;
  summary: string;
  outcome: string;
  tech: string[];
  /** Relative complexity of the engagement. */
  difficulty: "Intermediate" | "Advanced";
  /** Primary platform the work targets. */
  environment: string;
  /** Where the work runs. */
  deployment: Deployment;
  /** Certifications the project maps to. */
  certs: string[];
  href: string;
  repo: string;
}

/**
 * Homepage project cards are derived directly from the single case-study
 * data source (`src/lib/case-studies.ts`). Adding a new Microsoft project
 * therefore only requires appending one object to `caseStudies` — this file,
 * the homepage grid and the projects dashboard all update automatically with
 * no further edits required.
 */
export const projects: Project[] = caseStudies.map((study) => ({
  slug: study.slug,
  title: study.title,
  category: study.category,
  hero: study.hero,
  summary: study.tagline,
  outcome: study.outcome,
  tech: study.badges,
  difficulty: study.difficulty,
  environment: study.environment,
  deployment: study.deployment,
  certs: study.certifications,
  href: study.repo.url,
  repo: study.repo.url,
}));

/* ------------------------------------------------------------------ */
/* Certifications */
/* ------------------------------------------------------------------ */

export type CertStatus = "completed" | "in-progress" | "planned";

export interface Certification {
  code: string;
  name: string;
  status: CertStatus;
}

export const certifications: Certification[] = [
  { code: "ISO 27001", name: "ISO/IEC 27001 Internal Auditor", status: "completed" },
  { code: "ISO 27001", name: "ISO/IEC 27001 Lead Implementer", status: "completed" },
  { code: "MS-102", name: "Microsoft 365 Administrator", status: "in-progress" },
  { code: "SC-200", name: "Security Operations Analyst", status: "in-progress" },
  { code: "SC-300", name: "Identity & Access Administrator", status: "planned" },
  { code: "SC-400", name: "Information Protection Administrator", status: "planned" },
  { code: "AZ-900", name: "Azure Fundamentals", status: "planned" },
  { code: "AZ-500", name: "Azure Security Engineer", status: "planned" },
  { code: "SC-100", name: "Cybersecurity Architect", status: "planned" },
  { code: "CISSP", name: "Certified Information Systems Security Professional", status: "planned" },
  { code: "CCSP", name: "Certified Cloud Security Professional", status: "planned" },
];
