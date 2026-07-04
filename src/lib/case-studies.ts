/**
 * Enterprise case-study content model.
 *
 * This is fully data-driven: every project page is rendered from one of these
 * objects by a shared template, so new Microsoft projects can be added by
 * appending to `caseStudies` — no layout changes required (scales to 50+).
 *
 * Where real evidence (screenshots, exact scripts, architecture diagrams,
 * validation output) will be added later, the content uses clearly-labelled
 * placeholders rather than invented technical detail.
 */

export type Deployment = "Production" | "Home Lab";

/** Icon names resolved to Lucide components inside the KPI component. */
export type KpiIcon =
  | "shield"
  | "compliance"
  | "zerotrust"
  | "efficiency"
  | "risk"
  | "identity"
  | "clock"
  | "activity";

export interface KpiCard {
  label: string;
  value: string;
  icon: KpiIcon;
}

export interface TechStackItem {
  name: string;
  description: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface ImplementationPhase {
  phase: string;
  title: string;
  description: string;
  steps: string[];
}

export interface CodeSnippet {
  title: string;
  language: "powershell";
  filename: string;
  code: string;
}

export interface ScreenshotPlaceholder {
  title: string;
  caption: string;
  /**
   * Optional real screenshot path (e.g. /projects/purview-dlp/screenshots/dlp.png).
   * When set, the gallery shows the image; otherwise a styled placeholder.
   */
  image?: string;
}

export interface ValidationItem {
  item: string;
  detail: string;
}

export interface Challenge {
  title: string;
  detail: string;
}

export interface BlogArticle {
  title: string;
  description: string;
  /** Live TechCertGuide article URL. */
  url: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  hero: boolean;

  /* Hero banner meta */
  badges: string[];
  difficulty: "Intermediate" | "Advanced";
  environment: string;
  deployment: Deployment;
  implementationTime: string;
  certifications: string[];

  executiveSummary: string[];

  businessProblem: {
    problem: string;
    importance: string;
    risks: string[];
    compliance: string[];
  };

  solutionOverview: string[];

  architectureCaption: string;

  technologyStack: TechStackItem[];

  labEnvironment: SpecItem[];

  implementation: ImplementationPhase[];

  powershell: CodeSnippet[];

  screenshots: ScreenshotPlaceholder[];

  validation: ValidationItem[];

  challenges: Challenge[];

  lessons: string[];

  businessImpact: KpiCard[];

  skills: string[];

  relatedCertifications: string[];

  blogArticles: BlogArticle[];

  repo: {
    name: string;
    description: string;
    url: string;
  };

  downloads: { label: string; type: string }[];
}

/* Shared placeholders reused across projects (kept DRY & honest) */

const placeholderScreenshots = (labels: [string, string][]): ScreenshotPlaceholder[] =>
  labels.map(([title, caption]) => ({ title, caption }));

const standardDownloads = [
  { label: "Project Case Study", type: "PDF" },
  { label: "Architecture Diagram", type: "PDF" },
  { label: "PowerShell Scripts", type: "ZIP" },
  { label: "Technical Documentation", type: "PDF" },
];

/* ------------------------------------------------------------------ */
/* 1. Microsoft Purview Data Loss Prevention (Hero)                   */
/* ------------------------------------------------------------------ */

const purviewDlp: CaseStudy = {
  slug: "purview-dlp",
  title: "Microsoft Purview Data Loss Prevention",
  tagline:
    "Enterprise DLP across Microsoft 365 to classify, monitor and protect sensitive life-sciences data.",
  category: "Compliance · Data Governance",
  hero: true,
  badges: ["Microsoft Purview", "DLP", "Exchange Online", "SharePoint", "Teams", "ISO 27001"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "4–6 weeks",
  certifications: ["SC-400", "SC-900", "MS-102"],
  executiveSummary: [
    "This project established a tenant-wide Data Loss Prevention capability using Microsoft Purview to reduce the risk of sensitive information leaving the organisation through email, collaboration and endpoint channels.",
    "In a regulated life-sciences environment, protecting intellectual property and regulated data is a business-critical control. The DLP framework provides consistent classification, monitoring and enforcement mapped directly to ISO/IEC 27001 objectives, giving the business measurable assurance and audit-ready evidence.",
  ],
  businessProblem: {
    problem:
      "Sensitive and regulated data was moving across email, SharePoint, OneDrive and Teams without consistent classification or enforced controls, leaving gaps in how data leaving the organisation was governed.",
    importance:
      "Uncontrolled data movement in a life-sciences setting exposes the business to regulatory penalties, loss of intellectual property, and damaged partner trust. Leadership needed demonstrable controls rather than best-effort handling.",
    risks: [
      "Accidental or malicious exfiltration of regulated and confidential data",
      "Inconsistent handling of sensitive information across collaboration tools",
      "Limited visibility into where sensitive data lives and how it moves",
      "Audit findings due to missing preventative and detective controls",
    ],
    compliance: [
      "ISO/IEC 27001:2022 information protection controls",
      "Data classification and handling requirements",
      "Auditability and evidence retention for regulated data",
    ],
  },
  solutionOverview: [
    "The solution introduced a layered Purview DLP model: sensitive information types and sensitivity labels define what matters, DLP policies define how it is protected, and Activity Explorer and alerts provide continuous visibility.",
    "Policies were rolled out in stages — starting in test and simulation mode to tune false positives before moving to active enforcement — so the business gained protection without disrupting legitimate workflows.",
  ],
  architectureCaption:
    "High-level Purview DLP architecture across Exchange Online, SharePoint, OneDrive and Teams with classification, policy enforcement and monitoring layers. Detailed diagram to be added.",
  technologyStack: [
    { name: "Microsoft Purview", description: "DLP policies, sensitivity labels and Activity Explorer" },
    { name: "Exchange Online", description: "Email data-in-transit protection and policy tips" },
    { name: "SharePoint Online", description: "Document library classification and enforcement" },
    { name: "OneDrive for Business", description: "User file protection and policy coverage" },
    { name: "Microsoft Teams", description: "Chat and channel message DLP" },
    { name: "PowerShell", description: "Security & Compliance PowerShell for policy automation" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Microsoft 365 E5 / E5 Compliance" },
    { label: "Licensing", value: "Microsoft 365 E5 Compliance add-on" },
    { label: "Identity", value: "Microsoft Entra ID (hybrid)" },
    { label: "Endpoints", value: "Windows 10/11 managed via Intune" },
    { label: "Workloads", value: "Exchange, SharePoint, OneDrive, Teams" },
    { label: "Tooling", value: "Purview portal, Security & Compliance PowerShell" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Licensing & Prerequisites",
      description:
        "Confirm compliance licensing, enable required Purview roles, and scope the workloads in play.",
      steps: [
        "Validate E5 Compliance licensing coverage",
        "Assign least-privilege compliance admin roles",
        "Confirm workload readiness across Exchange, SharePoint, OneDrive and Teams",
      ],
    },
    {
      phase: "Phase 2",
      title: "Classification & Labels",
      description:
        "Define sensitive information types and sensitivity labels that reflect the data the business actually holds.",
      steps: [
        "Identify regulated and confidential data categories",
        "Configure sensitivity labels and label policies",
        "Map information types to business data owners",
      ],
    },
    {
      phase: "Phase 3",
      title: "DLP Policy Creation",
      description:
        "Author DLP policies with the right locations, conditions and actions, starting in simulation mode.",
      steps: [
        "Create DLP policies scoped to target workloads",
        "Configure conditions, exceptions and policy tips",
        "Deploy in test/simulation mode to observe matches",
      ],
    },
    {
      phase: "Phase 4",
      title: "Testing & Tuning",
      description:
        "Reduce false positives and validate user experience before enforcing.",
      steps: [
        "Review matches in Activity Explorer",
        "Tune conditions and thresholds",
        "Validate policy tips and end-user messaging",
      ],
    },
    {
      phase: "Phase 5",
      title: "Enforcement & Validation",
      description:
        "Move policies to active enforcement and confirm alerting and audit evidence.",
      steps: [
        "Enable enforcement on tuned policies",
        "Confirm alert generation and routing",
        "Capture audit evidence for compliance reporting",
      ],
    },
  ],
  powershell: [
    {
      title: "Connect to Security & Compliance PowerShell",
      language: "powershell",
      filename: "connect-scc.ps1",
      code: `# Example — connect to Security & Compliance PowerShell
# Replace values with your own tenant details before use.
Connect-IPPSSession -UserPrincipalName admin@contoso.onmicrosoft.com

# Verify the connection
Get-DlpCompliancePolicy | Select-Object Name, Mode, Enabled`,
    },
    {
      title: "Create a DLP policy (illustrative scaffold)",
      language: "powershell",
      filename: "new-dlp-policy.ps1",
      code: `# Illustrative scaffold — parameters are placeholders, not production values.
New-DlpCompliancePolicy \`
  -Name "Protect Regulated Data" \`
  -ExchangeLocation All \`
  -SharePointLocation All \`
  -OneDriveLocation All \`
  -TeamsLocation All \`
  -Mode TestWithoutNotifications

# A matching rule would then be added with New-DlpComplianceRule.`,
    },
  ],
  screenshots: placeholderScreenshots([
    ["DLP policy overview", "Purview portal — policy list and status (placeholder)"],
    ["Policy conditions", "Rule conditions and actions configuration (placeholder)"],
    ["Activity Explorer", "Matches and classification activity (placeholder)"],
    ["Alert detail", "Generated DLP alert with details (placeholder)"],
  ]),
  validation: [
    { item: "Policy Triggered", detail: "Test content reliably matches the intended DLP conditions." },
    { item: "Alerts Generated", detail: "Matching activity raises alerts to the compliance team." },
    { item: "Activity Explorer", detail: "Classification and policy matches are visible for review." },
    { item: "Audit Logs", detail: "Actions are captured in the unified audit log for evidence." },
    { item: "Expected Behaviour", detail: "Legitimate workflows continue without disruption." },
  ],
  challenges: [
    {
      title: "Balancing protection and productivity",
      detail:
        "Aggressive policies risk blocking legitimate work. Running in simulation first and tuning conditions kept enforcement precise.",
    },
    {
      title: "False-positive reduction",
      detail:
        "Broad information types generated noise. Refining conditions and exceptions materially improved signal quality.",
    },
  ],
  lessons: [
    "Start every DLP policy in simulation mode — data tells you where the false positives are.",
    "Classification is a business exercise as much as a technical one; involve data owners early.",
    "Policy tips shape user behaviour and reduce repeat incidents over time.",
  ],
  businessImpact: [
    { label: "Reduced Data Risk", value: "Enforced controls", icon: "risk" },
    { label: "Improved Compliance", value: "ISO 27001 aligned", icon: "compliance" },
    { label: "Zero Trust Alignment", value: "Data-layer controls", icon: "zerotrust" },
    { label: "Administrative Efficiency", value: "Automated alerting", icon: "efficiency" },
  ],
  skills: [
    "Microsoft Purview",
    "Data Loss Prevention",
    "Sensitivity Labels",
    "Compliance Policy Design",
    "Security & Compliance PowerShell",
    "ISO 27001 Controls",
  ],
  relatedCertifications: ["SC-400", "SC-900", "MS-102", "SC-100"],
  blogArticles: [
    {
      title: "Microsoft Purview Data Loss Prevention",
      description: "Deep dive into Purview DLP on TechCertGuide.",
      url: "https://techcertguide.blog/microsoft-purview-dlp/",
    },
    {
      title: "Microsoft Purview DLP Alerts",
      description: "Investigating and managing DLP alerts.",
      url: "https://techcertguide.blog/microsoft-purview-dlp-alerts/",
    },
    {
      title: "Automatic Sensitivity Labels in Microsoft Purview",
      description: "Classifying data with automatic labels.",
      url: "https://techcertguide.blog/automatic-sensitivity-labels-in-microsoft-purview/",
    },
  ],
  repo: {
    name: "lokeshm-it/purview-dlp",
    description: "Configuration notes, PowerShell and documentation for the Purview DLP rollout.",
    url: "https://github.com/lokeshm-it/purview-dlp",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 2. Microsoft Intune Deployment                                     */
/* ------------------------------------------------------------------ */

const intuneDeployment: CaseStudy = {
  slug: "intune-deployment",
  title: "Microsoft Intune Deployment",
  tagline:
    "A modern endpoint management baseline with Intune and Windows Autopilot for zero-touch provisioning.",
  category: "Endpoint Management",
  hero: false,
  badges: ["Microsoft Intune", "Windows Autopilot", "Compliance", "MDM/MAM", "Windows"],
  difficulty: "Advanced",
  environment: "Intune / Endpoint",
  deployment: "Production",
  implementationTime: "3–5 weeks",
  certifications: ["MD-102", "MS-102"],
  executiveSummary: [
    "This project delivered a modern management baseline using Microsoft Intune and Windows Autopilot, replacing manual device setup with automated, policy-driven provisioning.",
    "The result is consistent, compliant devices from first boot, less manual effort for IT, and an endpoint estate aligned to Zero Trust access requirements.",
  ],
  businessProblem: {
    problem:
      "Devices were configured manually and inconsistently, with no unified compliance baseline and slow onboarding for new users.",
    importance:
      "Inconsistent endpoints create security gaps and drag on IT capacity. A modern baseline is foundational to Zero Trust and to scaling the business efficiently.",
    risks: [
      "Non-compliant or misconfigured devices accessing corporate data",
      "Slow, error-prone manual provisioning",
      "Inconsistent security posture across the fleet",
    ],
    compliance: [
      "Endpoint compliance evidence for audits",
      "Standardised configuration and encryption baselines",
    ],
  },
  solutionOverview: [
    "Intune was configured as the single management plane: enrollment via Autopilot, configuration profiles for baseline settings, compliance policies to gate access, and application deployment for a consistent software set.",
    "Autopilot enables zero-touch provisioning so a device ships, enrolls and configures itself against policy with minimal IT involvement.",
  ],
  architectureCaption:
    "Intune management architecture — Autopilot enrollment, configuration and compliance policies, and Conditional Access integration. Detailed diagram to be added.",
  technologyStack: [
    { name: "Microsoft Intune", description: "MDM/MAM, configuration and compliance policies" },
    { name: "Windows Autopilot", description: "Zero-touch device provisioning" },
    { name: "Microsoft Entra ID", description: "Device identity and Conditional Access" },
    { name: "Windows 10/11", description: "Managed endpoint operating systems" },
    { name: "PowerShell", description: "Automation and reporting via Microsoft Graph" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Microsoft 365 E3/E5" },
    { label: "Licensing", value: "Intune / EMS licensing" },
    { label: "Identity", value: "Microsoft Entra ID" },
    { label: "Operating Systems", value: "Windows 10/11" },
    { label: "Test Devices", value: "Physical + virtual endpoints" },
    { label: "Virtual Machines", value: "Hyper-V test VMs" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Licensing & Enrollment",
      description: "Confirm licensing and configure automatic enrollment.",
      steps: [
        "Validate Intune licensing assignment",
        "Configure MDM automatic enrollment",
        "Register devices for Windows Autopilot",
      ],
    },
    {
      phase: "Phase 2",
      title: "Configuration Profiles",
      description: "Define baseline device configuration.",
      steps: [
        "Create configuration profiles for security baselines",
        "Configure BitLocker and update policies",
        "Assign profiles to device groups",
      ],
    },
    {
      phase: "Phase 3",
      title: "Compliance Policies",
      description: "Gate access on device health and compliance.",
      steps: [
        "Author compliance policies",
        "Integrate with Conditional Access",
        "Define non-compliance actions",
      ],
    },
    {
      phase: "Phase 4",
      title: "Testing",
      description: "Validate the Autopilot experience end to end.",
      steps: [
        "Run Autopilot provisioning on test devices",
        "Confirm profile and app delivery",
        "Verify compliance evaluation",
      ],
    },
    {
      phase: "Phase 5",
      title: "Validation & Rollout",
      description: "Confirm posture and roll out to the fleet.",
      steps: [
        "Review compliance reporting",
        "Stage rollout across device groups",
        "Document the operational baseline",
      ],
    },
  ],
  powershell: [
    {
      title: "Connect to Microsoft Graph (Intune)",
      language: "powershell",
      filename: "connect-graph.ps1",
      code: `# Example — connect to Microsoft Graph for Intune management
Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"

# List managed devices and compliance state
Get-MgDeviceManagementManagedDevice |
  Select-Object DeviceName, ComplianceState, OperatingSystem`,
    },
  ],
  screenshots: placeholderScreenshots([
    ["Autopilot profiles", "Autopilot deployment profile configuration (placeholder)"],
    ["Compliance policy", "Compliance policy settings (placeholder)"],
    ["Device inventory", "Managed device inventory and status (placeholder)"],
  ]),
  validation: [
    { item: "Autopilot Provisioning", detail: "Devices provision zero-touch against policy." },
    { item: "Compliance Evaluated", detail: "Devices report compliant before access is granted." },
    { item: "Conditional Access", detail: "Non-compliant devices are blocked as expected." },
    { item: "Reporting", detail: "Compliance dashboards reflect fleet posture." },
  ],
  challenges: [
    {
      title: "Profile assignment ordering",
      detail: "Overlapping assignments needed careful group design to avoid conflicts.",
    },
    {
      title: "Autopilot readiness",
      detail: "Hardware hash registration and network requirements required upfront planning.",
    },
  ],
  lessons: [
    "Group design is the backbone of clean Intune management — plan it first.",
    "Test Autopilot on representative hardware before wide rollout.",
    "Tie compliance to Conditional Access early so posture actually gates access.",
  ],
  businessImpact: [
    { label: "Endpoint Compliance", value: "98%+ target", icon: "compliance" },
    { label: "Faster Onboarding", value: "Zero-touch setup", icon: "clock" },
    { label: "Zero Trust Alignment", value: "Device signals", icon: "zerotrust" },
    { label: "Administrative Efficiency", value: "Reduced manual effort", icon: "efficiency" },
  ],
  skills: [
    "Microsoft Intune",
    "Windows Autopilot",
    "Compliance Policy Design",
    "Conditional Access",
    "Microsoft Graph / PowerShell",
    "Endpoint Security Baselines",
  ],
  relatedCertifications: ["MD-102", "MS-102", "SC-300"],
  blogArticles: [
    {
      title: "Microsoft 365 Security Baseline Lab",
      description: "Hands-on security baseline configuration.",
      url: "https://techcertguide.blog/microsoft-365-security-baseline-lab/",
    },
    {
      title: "Conditional Access in Microsoft Entra ID",
      description: "Gating access with Conditional Access.",
      url: "https://techcertguide.blog/conditional-access-in-microsoft-entra-id/",
    },
    {
      title: "Microsoft 365 Tenant Health Monitoring",
      description: "Keeping the tenant healthy and compliant.",
      url: "https://techcertguide.blog/microsoft-365-tenant-health-monitoring/",
    },
  ],
  repo: {
    name: "lokeshm-it/intune-deployment",
    description: "Intune configuration, Autopilot notes and PowerShell utilities.",
    url: "https://github.com/lokeshm-it/intune-deployment",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 3. Zero Trust Device Trust Enforcement                             */
/* ------------------------------------------------------------------ */

const zeroTrustDevice: CaseStudy = {
  slug: "zero-trust-device",
  title: "Zero Trust Device Trust Enforcement",
  tagline:
    "Using device compliance as a Conditional Access signal so only trusted endpoints reach corporate resources.",
  category: "Zero Trust · Endpoint",
  hero: false,
  badges: ["Conditional Access", "Intune Compliance", "Entra ID", "Defender", "Zero Trust"],
  difficulty: "Advanced",
  environment: "Entra ID / Intune",
  deployment: "Production",
  implementationTime: "2–4 weeks",
  certifications: ["SC-300", "MD-102"],
  executiveSummary: [
    "This project made device trust a first-class access control: Conditional Access policies evaluate Intune compliance and device health so only managed, compliant and healthy endpoints can access corporate resources.",
    "It closes the gap where unmanaged or unhealthy devices could otherwise reach sensitive data, strengthening the endpoint perimeter as part of a Zero Trust strategy.",
  ],
  businessProblem: {
    problem:
      "Access decisions did not consistently account for the state of the device requesting access, allowing potentially unmanaged or non-compliant endpoints to reach corporate data.",
    importance:
      "In a Zero Trust model, trust must be continuously verified. Device state is a critical signal — ignoring it undermines the entire access model.",
    risks: [
      "Unmanaged devices accessing corporate resources",
      "Compromised or unhealthy endpoints bypassing controls",
      "Inconsistent enforcement across applications",
    ],
    compliance: [
      "Access control and least-privilege requirements",
      "Evidence of device-based access decisions",
    ],
  },
  solutionOverview: [
    "Conditional Access policies were designed to require compliant or hybrid-joined devices for access, using Intune compliance state and device health as signals.",
    "Policies were rolled out with report-only mode first to measure impact, then enforced, with clear exclusion handling for break-glass accounts.",
  ],
  architectureCaption:
    "Device trust enforcement flow — Intune compliance and device health feeding Conditional Access decisions across applications. Detailed diagram to be added.",
  technologyStack: [
    { name: "Conditional Access", description: "Policy engine for access decisions" },
    { name: "Intune Compliance", description: "Device compliance and health signals" },
    { name: "Microsoft Entra ID", description: "Identity and device registration" },
    { name: "Defender for Endpoint", description: "Device risk and health signals" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Microsoft 365 E5" },
    { label: "Licensing", value: "Entra ID P1/P2, Intune" },
    { label: "Identity", value: "Microsoft Entra ID" },
    { label: "Endpoint", value: "Intune-managed Windows devices" },
    { label: "Network", value: "Corporate and remote access paths" },
    { label: "Test Devices", value: "Compliant and non-compliant test endpoints" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Baseline & Scoping",
      description: "Define which apps and users require device trust.",
      steps: [
        "Inventory target applications",
        "Confirm device compliance policies exist",
        "Define user and group scope",
      ],
    },
    {
      phase: "Phase 2",
      title: "Policy Design",
      description: "Author Conditional Access requiring compliant devices.",
      steps: [
        "Create Conditional Access policies",
        "Require compliant or hybrid-joined devices",
        "Define exclusions and break-glass handling",
      ],
    },
    {
      phase: "Phase 3",
      title: "Report-Only Rollout",
      description: "Measure impact before enforcing.",
      steps: [
        "Enable policies in report-only mode",
        "Analyse sign-in impact",
        "Refine scope and conditions",
      ],
    },
    {
      phase: "Phase 4",
      title: "Testing",
      description: "Validate allow/block behaviour.",
      steps: [
        "Test compliant device access",
        "Confirm non-compliant device blocking",
        "Validate exclusions",
      ],
    },
    {
      phase: "Phase 5",
      title: "Enforcement & Validation",
      description: "Enforce and confirm evidence.",
      steps: [
        "Move policies to enforced",
        "Confirm sign-in logs reflect decisions",
        "Document control and evidence",
      ],
    },
  ],
  powershell: [
    {
      title: "Review Conditional Access policies (Graph)",
      language: "powershell",
      filename: "get-ca-policies.ps1",
      code: `# Example — list Conditional Access policies via Microsoft Graph
Connect-MgGraph -Scopes "Policy.Read.All"

Get-MgIdentityConditionalAccessPolicy |
  Select-Object DisplayName, State`,
    },
  ],
  screenshots: placeholderScreenshots([
    ["Conditional Access policy", "Require compliant device grant control (placeholder)"],
    ["Report-only insights", "Sign-in impact in report-only mode (placeholder)"],
    ["Sign-in logs", "Access decision evidence in sign-in logs (placeholder)"],
  ]),
  validation: [
    { item: "Compliant Access", detail: "Compliant devices are granted access." },
    { item: "Non-Compliant Blocked", detail: "Non-compliant devices are blocked as designed." },
    { item: "Sign-in Evidence", detail: "Decisions are visible in Entra sign-in logs." },
    { item: "Exclusions Verified", detail: "Break-glass accounts behave as expected." },
  ],
  challenges: [
    {
      title: "Avoiding lockout",
      detail: "Careful exclusion design and report-only rollout prevented accidental lockouts.",
    },
    {
      title: "Legacy access paths",
      detail: "Some clients needed remediation to support modern authentication and device signals.",
    },
  ],
  lessons: [
    "Always start Conditional Access in report-only mode and read the data.",
    "Break-glass accounts and exclusions are non-negotiable safety nets.",
    "Device trust is only as good as the compliance policies feeding it.",
  ],
  businessImpact: [
    { label: "Reduced Risk", value: "Trusted devices only", icon: "risk" },
    { label: "Zero Trust Alignment", value: "Continuous verification", icon: "zerotrust" },
    { label: "Improved Posture", value: "Endpoint gating", icon: "shield" },
    { label: "Administrative Efficiency", value: "Policy-driven", icon: "efficiency" },
  ],
  skills: [
    "Conditional Access",
    "Intune Compliance",
    "Zero Trust Design",
    "Microsoft Entra ID",
    "Defender for Endpoint",
    "Access Control",
  ],
  relatedCertifications: ["SC-300", "MD-102", "SC-900", "SC-100"],
  blogArticles: [
    {
      title: "Conditional Access in Microsoft Entra ID",
      description: "Designing device-aware access policies.",
      url: "https://techcertguide.blog/conditional-access-in-microsoft-entra-id/",
    },
    {
      title: "Microsoft Defender XDR Explained (MS-102)",
      description: "Endpoint signals and threat protection.",
      url: "https://techcertguide.blog/microsoft-defender-xdr-explained-ms-102/",
    },
    {
      title: "Investigating Alerts in Microsoft Defender XDR",
      description: "Triage and response on endpoint alerts.",
      url: "https://techcertguide.blog/investigating-alerts-in-microsoft-defender-xdr/",
    },
  ],
  repo: {
    name: "lokeshm-it/zero-trust-device",
    description: "Conditional Access policy design and rollout notes.",
    url: "https://github.com/lokeshm-it/zero-trust-device",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 4. Microsoft Entra ID Protection                                   */
/* ------------------------------------------------------------------ */

const entraIdProtection: CaseStudy = {
  slug: "entra-id-protection",
  title: "Microsoft Entra ID Protection",
  tagline:
    "Risk-based identity protection with automated response to risky sign-ins and users.",
  category: "Identity Security",
  hero: false,
  badges: ["Entra ID Protection", "Risk Policies", "MFA", "Conditional Access"],
  difficulty: "Intermediate",
  environment: "Entra ID",
  deployment: "Production",
  implementationTime: "2–3 weeks",
  certifications: ["SC-300", "SC-900"],
  executiveSummary: [
    "This project deployed Microsoft Entra ID Protection to detect and respond to identity risk automatically, using sign-in and user risk signals to trigger remediation such as MFA challenges or password resets.",
    "It shifts identity security from reactive to proactive, reducing the window of exposure when credentials are at risk.",
  ],
  businessProblem: {
    problem:
      "Risky sign-ins and potentially compromised accounts were not being detected or remediated in a consistent, automated way.",
    importance:
      "Identity is the primary attack surface in cloud environments. Without automated risk response, compromised credentials can go unaddressed.",
    risks: [
      "Compromised accounts used to access corporate data",
      "Delayed detection of risky sign-in behaviour",
      "Inconsistent enforcement of MFA and remediation",
    ],
    compliance: [
      "Identity protection and access control requirements",
      "Evidence of risk detection and response",
    ],
  },
  solutionOverview: [
    "Sign-in risk and user risk policies were configured to automatically require MFA or secure password change when risk is detected, integrated with Conditional Access.",
    "Policies were tuned to balance security and user experience, with monitoring of risk detections and remediation outcomes.",
  ],
  architectureCaption:
    "Entra ID Protection flow — risk detection feeding risk-based Conditional Access and automated remediation. Detailed diagram to be added.",
  technologyStack: [
    { name: "Entra ID Protection", description: "Sign-in and user risk detection" },
    { name: "Risk Policies", description: "Automated risk-based response" },
    { name: "Conditional Access", description: "Risk-based access enforcement" },
    { name: "Multi-Factor Authentication", description: "Step-up authentication on risk" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Microsoft 365 E5 / Entra ID P2" },
    { label: "Licensing", value: "Microsoft Entra ID P2" },
    { label: "Identity", value: "Microsoft Entra ID" },
    { label: "Test Accounts", value: "Risk simulation test users" },
    { label: "Endpoint", value: "Managed and unmanaged test devices" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Licensing & Readiness",
      description: "Confirm P2 licensing and review risk signals.",
      steps: [
        "Validate Entra ID P2 licensing",
        "Review available risk detections",
        "Define policy scope",
      ],
    },
    {
      phase: "Phase 2",
      title: "Risk Policy Configuration",
      description: "Configure sign-in and user risk policies.",
      steps: [
        "Configure sign-in risk policy",
        "Configure user risk policy",
        "Set remediation actions (MFA, password change)",
      ],
    },
    {
      phase: "Phase 3",
      title: "Conditional Access Integration",
      description: "Wire risk into access decisions.",
      steps: [
        "Integrate risk with Conditional Access",
        "Define thresholds and exclusions",
        "Enable report-only for impact review",
      ],
    },
    {
      phase: "Phase 4",
      title: "Testing",
      description: "Validate detection and remediation.",
      steps: [
        "Simulate risky sign-ins",
        "Confirm remediation triggers",
        "Validate user experience",
      ],
    },
    {
      phase: "Phase 5",
      title: "Validation & Monitoring",
      description: "Confirm outcomes and monitor.",
      steps: [
        "Review risk detection reports",
        "Confirm remediation outcomes",
        "Establish ongoing monitoring",
      ],
    },
  ],
  powershell: [
    {
      title: "Review risky sign-ins (Graph)",
      language: "powershell",
      filename: "get-risky-signins.ps1",
      code: `# Example — review risk detections via Microsoft Graph
Connect-MgGraph -Scopes "IdentityRiskEvent.Read.All"

Get-MgRiskDetection |
  Select-Object UserDisplayName, RiskLevel, RiskState, DetectedDateTime`,
    },
  ],
  screenshots: placeholderScreenshots([
    ["Risk policy configuration", "Sign-in and user risk policy setup (placeholder)"],
    ["Risk detections", "Risk detection report (placeholder)"],
    ["Remediation outcome", "User remediation status (placeholder)"],
  ]),
  validation: [
    { item: "Risk Detected", detail: "Risky sign-ins are detected as expected." },
    { item: "Remediation Triggered", detail: "MFA or password change is enforced on risk." },
    { item: "Reporting", detail: "Risk detections and outcomes are visible in reports." },
    { item: "User Experience", detail: "Legitimate users experience minimal friction." },
  ],
  challenges: [
    {
      title: "Threshold tuning",
      detail: "Setting risk thresholds required balancing security with user disruption.",
    },
    {
      title: "Signal interpretation",
      detail: "Understanding detection types was key to configuring the right responses.",
    },
  ],
  lessons: [
    "Risk-based policies pay off most when integrated with Conditional Access.",
    "Tune thresholds against real detections, not assumptions.",
    "Monitor remediation outcomes — detection without action is incomplete.",
  ],
  businessImpact: [
    { label: "Reduced Risk", value: "Automated response", icon: "risk" },
    { label: "Identity Protection", value: "Proactive detection", icon: "identity" },
    { label: "Zero Trust Alignment", value: "Verify explicitly", icon: "zerotrust" },
    { label: "Improved Compliance", value: "Access evidence", icon: "compliance" },
  ],
  skills: [
    "Entra ID Protection",
    "Risk-Based Policies",
    "Conditional Access",
    "Multi-Factor Authentication",
    "Identity Security",
    "Microsoft Graph / PowerShell",
  ],
  relatedCertifications: ["SC-300", "SC-900", "SC-100"],
  blogArticles: [
    {
      title: "Conditional Access in Microsoft Entra ID",
      description: "Risk-based access enforcement.",
      url: "https://techcertguide.blog/conditional-access-in-microsoft-entra-id/",
    },
    {
      title: "Entra Privileged Identity Management (PIM)",
      description: "Protecting privileged identities.",
      url: "https://techcertguide.blog/entra-privileged-identity-management-pim/",
    },
    {
      title: "Role Assignment in Microsoft Entra ID",
      description: "Managing directory role assignments.",
      url: "https://techcertguide.blog/role-assignment-in-microsoft-entra-id/",
    },
  ],
  repo: {
    name: "lokeshm-it/entra-id-protection",
    description: "Risk policy configuration and monitoring notes.",
    url: "https://github.com/lokeshm-it/entra-id-protection",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 5. Zero Trust Identity Perimeter                                   */
/* ------------------------------------------------------------------ */

const zeroTrustIdentity: CaseStudy = {
  slug: "zero-trust-identity",
  title: "Zero Trust Identity Perimeter",
  tagline:
    "Establishing identity as the primary control plane with layered Conditional Access and least privilege.",
  category: "Zero Trust · Identity",
  hero: false,
  badges: ["Zero Trust", "Entra ID", "Conditional Access", "RBAC", "SSPR"],
  difficulty: "Advanced",
  environment: "Entra ID / Zero Trust",
  deployment: "Home Lab",
  implementationTime: "4–6 weeks",
  certifications: ["SC-300", "SC-100"],
  executiveSummary: [
    "This home-lab project designs identity as the primary security perimeter, layering Conditional Access, least-privilege RBAC and continuous verification to enable secure remote and hybrid access without relying on the network edge.",
    "It demonstrates a modern Zero Trust identity architecture that can be adapted to enterprise environments.",
  ],
  businessProblem: {
    problem:
      "Traditional network-centric security assumes trust based on location, which breaks down for remote and hybrid work and cloud-first access.",
    importance:
      "As work moves beyond the corporate network, identity must become the control plane. A network-based perimeter alone no longer protects modern access.",
    risks: [
      "Over-trusting network location for access decisions",
      "Excessive standing privilege",
      "Weak verification for remote access",
    ],
    compliance: [
      "Least-privilege and access governance principles",
      "Continuous verification requirements",
    ],
  },
  solutionOverview: [
    "The design layers Conditional Access policies, least-privilege role assignments, self-service password reset and strong authentication to build an identity-centric perimeter.",
    "Access decisions are based on identity, device and risk signals rather than network location, enabling secure access from anywhere.",
  ],
  architectureCaption:
    "Zero Trust identity architecture — identity as control plane with layered Conditional Access, RBAC and continuous verification. Detailed diagram to be added.",
  technologyStack: [
    { name: "Microsoft Entra ID", description: "Identity provider and control plane" },
    { name: "Conditional Access", description: "Layered, signal-based access policies" },
    { name: "RBAC", description: "Least-privilege role assignments" },
    { name: "SSPR", description: "Self-service password reset" },
    { name: "Hyper-V", description: "Home-lab virtualisation for test identities" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Microsoft 365 developer / lab tenant" },
    { label: "Licensing", value: "Entra ID P2 (lab)" },
    { label: "Identity", value: "Microsoft Entra ID" },
    { label: "Virtual Machines", value: "Hyper-V lab VMs" },
    { label: "Operating Systems", value: "Windows Server + Windows 11" },
    { label: "Network", value: "Segmented lab network" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Lab & Identity Foundation",
      description: "Stand up the lab tenant and identities.",
      steps: [
        "Provision lab tenant and users",
        "Configure Hyper-V test VMs",
        "Establish baseline identity configuration",
      ],
    },
    {
      phase: "Phase 2",
      title: "Strong Authentication",
      description: "Enable MFA and SSPR.",
      steps: [
        "Configure MFA methods",
        "Enable self-service password reset",
        "Set authentication strength requirements",
      ],
    },
    {
      phase: "Phase 3",
      title: "Conditional Access Layers",
      description: "Design layered access policies.",
      steps: [
        "Create baseline Conditional Access policies",
        "Layer device, risk and location signals",
        "Define exclusions and break-glass",
      ],
    },
    {
      phase: "Phase 4",
      title: "Least Privilege",
      description: "Apply RBAC and role governance.",
      steps: [
        "Assign least-privilege roles",
        "Review privileged access",
        "Document role model",
      ],
    },
    {
      phase: "Phase 5",
      title: "Validation",
      description: "Validate the identity perimeter.",
      steps: [
        "Test access scenarios",
        "Confirm continuous verification",
        "Document the architecture",
      ],
    },
  ],
  powershell: [
    {
      title: "Review role assignments (Graph)",
      language: "powershell",
      filename: "get-role-assignments.ps1",
      code: `# Example — review directory role assignments via Microsoft Graph
Connect-MgGraph -Scopes "RoleManagement.Read.Directory"

Get-MgRoleManagementDirectoryRoleAssignment |
  Select-Object PrincipalId, RoleDefinitionId`,
    },
  ],
  screenshots: placeholderScreenshots([
    ["Conditional Access design", "Layered policy set (placeholder)"],
    ["Role assignments", "Least-privilege role model (placeholder)"],
    ["Authentication methods", "MFA and SSPR configuration (placeholder)"],
  ]),
  validation: [
    { item: "Identity-Based Access", detail: "Access decisions use identity and risk, not location." },
    { item: "Least Privilege", detail: "Roles follow least-privilege principles." },
    { item: "Strong Authentication", detail: "MFA and SSPR are enforced." },
    { item: "Continuous Verification", detail: "Signals are re-evaluated per access." },
  ],
  challenges: [
    {
      title: "Policy layering complexity",
      detail: "Designing non-conflicting, layered policies required careful planning and testing.",
    },
    {
      title: "Balancing security and usability",
      detail: "Strong controls were tuned to avoid unnecessary friction for legitimate access.",
    },
  ],
  lessons: [
    "Identity-first design is the foundation of modern Zero Trust.",
    "Least privilege must be governed continuously, not set once.",
    "A home lab is an excellent way to prove architecture before production.",
  ],
  businessImpact: [
    { label: "Zero Trust Alignment", value: "Identity control plane", icon: "zerotrust" },
    { label: "Reduced Risk", value: "Least privilege", icon: "risk" },
    { label: "Secure Remote Access", value: "Location-independent", icon: "identity" },
    { label: "Improved Governance", value: "Role model", icon: "shield" },
  ],
  skills: [
    "Zero Trust Architecture",
    "Microsoft Entra ID",
    "Conditional Access",
    "RBAC & Least Privilege",
    "MFA & SSPR",
    "Identity Governance",
  ],
  relatedCertifications: ["SC-300", "SC-100", "SC-900"],
  blogArticles: [
    {
      title: "Conditional Access in Microsoft Entra ID",
      description: "Layered, identity-first access policies.",
      url: "https://techcertguide.blog/conditional-access-in-microsoft-entra-id/",
    },
    {
      title: "PIM Access Reviews in Microsoft Entra ID",
      description: "Governing privileged access over time.",
      url: "https://techcertguide.blog/pim-access-reviews-microsoft-entra-id/",
    },
    {
      title: "Role Assignment in Microsoft Entra ID",
      description: "Applying least-privilege role models.",
      url: "https://techcertguide.blog/role-assignment-in-microsoft-entra-id/",
    },
  ],
  repo: {
    name: "lokeshm-it/zero-trust-identity",
    description: "Home-lab Zero Trust identity architecture and notes.",
    url: "https://github.com/lokeshm-it/zero-trust-identity",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* Registry                                                           */
/* ------------------------------------------------------------------ */

export const caseStudies: CaseStudy[] = [
  purviewDlp,
  intuneDeployment,
  zeroTrustDevice,
  entraIdProtection,
  zeroTrustIdentity,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Ordered slugs for prev/next navigation. */
export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  const prev = index > 0 ? caseStudies[index - 1] : undefined;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : undefined;
  return { prev, next };
}
