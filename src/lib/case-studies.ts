/**
 * Enterprise case-study content model.
 *
 * This is fully data-driven: every project page, project card and dashboard
 * entry is rendered from one of these objects by a shared template. Adding a
 * new Microsoft project requires appending a single object to `caseStudies`
 * below — no other file needs to change (see `src/lib/data.ts` and
 * `src/lib/projects-index.ts`, which both derive from this array).
 *
 * Where real evidence (screenshots, exact scripts, architecture diagrams,
 * validation output) is available it is used directly. Where it is not yet
 * available the content uses clearly-labelled placeholders rather than
 * invented technical detail.
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
  /** Optional implementation phase label used to group the gallery. */
  phase?: string;
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

  /** Short outcome statement surfaced on the homepage project card. */
  outcome: string;

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
  /** Optional real architecture/workflow diagram image. */
  architectureImage?: string;

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

/** Build a real, phase-grouped screenshot array from copied evidence. */
const shots = (
  phase: string,
  items: [string, string, string][]
): ScreenshotPlaceholder[] =>
  items.map(([title, caption, image]) => ({ title, caption, image, phase }));

const standardDownloads = [
  { label: "Project Case Study", type: "PDF" },
  { label: "Architecture Diagram", type: "PDF" },
  { label: "PowerShell Scripts", type: "ZIP" },
  { label: "Technical Documentation", type: "PDF" },
];

/* ------------------------------------------------------------------ */
/* 1. Microsoft Purview Data Loss Prevention (Hero) */
/* ------------------------------------------------------------------ */

const purviewDlp: CaseStudy = {
  slug: "purview-dlp",
  title: "Microsoft Purview Data Loss Prevention",
  tagline:
    "Enterprise DLP across Microsoft 365 and Windows endpoints — standard and custom SITs, Endpoint DLP and Generative AI upload protection.",
  category: "Compliance · Data Governance",
  hero: true,
  outcome:
    "Reduced sensitive-data exposure through policy-driven classification, alerting and automated enforcement mapped to ISO 27001 controls.",
  badges: ["Microsoft Purview", "DLP", "Endpoint DLP", "Custom SIT", "Generative AI Protection", "Defender for Endpoint"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "4–6 weeks",
  certifications: ["SC-400", "SC-900", "MS-102"],
  executiveSummary: [
    "This project established a tenant-wide Data Loss Prevention capability using Microsoft Purview, extending detection and enforcement beyond Microsoft 365 workloads to Windows endpoints and Generative AI websites.",
    "Built in three sequential phases — a standard Sensitive Information Type (SIT) policy for payment card data, a custom SIT for a proprietary data format (GSM), and an extension of that same protection to endpoint devices and AI chatbot uploads — the framework gives the business measurable, audit-ready controls mapped to ISO/IEC 27001, validated end to end before enforcement was switched on.",
  ],
  businessProblem: {
    problem:
      "Sensitive data — payment card numbers and proprietary internal identifiers alike — could leave the organisation through email, collaboration tools, USB copies, local printing and Generative AI website uploads without consistent detection or enforced controls.",
    importance:
      "Two 2026-era gaps compound the risk: proprietary data formats are invisible to Microsoft's built-in Sensitive Information Types, and Generative AI tools accept pasted or uploaded content as context that cannot be retrieved once submitted. Leadership needed demonstrable controls across both cloud and endpoint, not best-effort handling.",
    risks: [
      "Accidental or malicious exfiltration of regulated payment data and proprietary identifiers",
      "No visibility into local, on-device activity such as USB copies, printing or browser uploads",
      "Sensitive files pasted or uploaded into public Generative AI tools with no retrieval option",
      "Audit findings due to missing preventative and detective controls",
    ],
    compliance: [
      "ISO/IEC 27001:2022 information protection controls",
      "PCI-relevant data handling requirements",
      "Auditability and evidence retention for regulated data",
    ],
  },
  solutionOverview: [
    "The solution layered a built-in Credit Card Number SIT with a custom keyword-based GSM SIT inside a single \"Finance Credit Card Protection\" DLP policy, then extended that same policy to a Windows endpoint via Microsoft Defender for Endpoint onboarding — with no separate endpoint policy required.",
    "Browser and domain restrictions blocked uploads to Microsoft's built-in \"Generative AI Websites\" sensitive service domain group, while Activity Explorer, DLP Alerts and DLP Reports gave a single monitoring surface spanning cloud and endpoint events. Every stage was validated in Simulation mode in Activity Explorer before the policy was switched to Enforcement.",
  ],
  architectureCaption:
    "Detection layer (built-in + custom SITs) feeding a single DLP policy enforced across Exchange, SharePoint, OneDrive, Teams and an onboarded Windows endpoint, with Activity Explorer, DLP Alerts and DLP Reports providing unified monitoring.",
  technologyStack: [
    { name: "Microsoft Purview DLP", description: "Core policy and rule engine across cloud and endpoint" },
    { name: "Sensitive Information Types", description: "Built-in Credit Card Number SIT plus a custom keyword-based GSM SIT" },
    { name: "Microsoft Defender for Endpoint", description: "Device onboarding that feeds Purview Endpoint DLP" },
    { name: "Endpoint DLP", description: "File, clipboard, print and browser activity protection on Windows" },
    { name: "Generative AI Website Protection", description: "Block action on Microsoft's built-in AI chatbot domain group" },
    { name: "Activity Explorer / DLP Alerts / Reports", description: "Unified monitoring across cloud and endpoint events" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "securem365lsb.onmicrosoft.com (Microsoft 365 E5)" },
    { label: "Licensing", value: "Microsoft 365 E5 (Endpoint DLP requires E5 / E3 + Compliance add-on)" },
    { label: "Test device", value: "testing_machine — Windows 11, version 25H2" },
    { label: "Test user", value: "testuser1@securem365lsb.onmicrosoft.com" },
    { label: "Workloads", value: "Exchange, SharePoint, OneDrive, Teams + Windows endpoint" },
    { label: "Tooling", value: "Purview portal, Microsoft Edge with the Purview browser extension" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Standard SIT — Credit Card Policy",
      description:
        "Create the \"Finance Credit Card Protection\" DLP policy using the built-in Credit Card Number SIT across all core workloads.",
      steps: [
        "Select protected locations — Exchange, SharePoint, OneDrive and Teams",
        "Build the rule condition on the Credit Card Number SIT",
        "Configure block action, policy tips and Simulation mode",
      ],
    },
    {
      phase: "Phase 2",
      title: "Custom SIT — GSM",
      description:
        "Create a custom keyword-list Sensitive Information Type for a proprietary data format not covered by any built-in SIT.",
      steps: [
        "Define the GSM keyword-list detection pattern",
        "Review and create the custom SIT",
        "Add the GSM SIT as an additional condition on the DLP rule",
      ],
    },
    {
      phase: "Phase 3",
      title: "Monitoring — Activity Explorer & Alerts",
      description:
        "Configure incident reports and admin alerting, then validate visibility in Activity Explorer and DLP Reports.",
      steps: [
        "Configure incident report and email alert settings on the policy",
        "Review classification and policy matches in Activity Explorer",
        "Review the Most Triggered DLP Rules report",
      ],
    },
    {
      phase: "Phase 4",
      title: "Endpoint DLP",
      description:
        "Onboard a Windows endpoint via Microsoft Defender for Endpoint and extend the same DLP policy to local device activity.",
      steps: [
        "Onboard testing_machine (Windows 11 25H2) via Defender for Endpoint",
        "Confirm device and policy sync status show Updated",
        "Configure Firefox as an unallowed browser under browser and domain restrictions",
      ],
    },
    {
      phase: "Phase 5",
      title: "Generative AI Website Protection",
      description:
        "Block sensitive file uploads to Generative AI websites using Microsoft's built-in sensitive service domain group.",
      steps: [
        "Assign a Block action to the Generative AI Websites domain group",
        "Validate the block against a live ChatGPT upload attempt",
        "Confirm the OneDrive policy tip on the source file",
      ],
    },
    {
      phase: "Phase 6",
      title: "Simulation to Enforcement",
      description:
        "Switch the validated policy from Simulation to full Enforcement.",
      steps: [
        "Review Simulation-mode matches for false positives",
        "Switch the Finance Credit Card Protection policy to Enforce",
        "Confirm enforcement in the policies list",
      ],
    },
  ],
  powershell: [
    {
      title: "Deploy a baseline DLP policy",
      language: "powershell",
      filename: "New-DLPPolicyBaseline.ps1",
      code: `# Illustrative scaffold based on New-DLPPolicyBaseline.ps1 — parameters are placeholders.
Connect-IPPSSession -UserPrincipalName admin@yourtenant.onmicrosoft.com

New-DlpCompliancePolicy \`
  -Name "Finance Credit Card Protection" \`
  -ExchangeLocation All -SharePointLocation All \`
  -OneDriveLocation All -TeamsLocation All \`
  -Mode TestWithoutNotifications

# A matching rule referencing the Credit Card Number and GSM SITs is then
# added with New-DlpComplianceRule.`,
    },
    {
      title: "Export DLP policy and alert reports",
      language: "powershell",
      filename: "Get-DLPPolicyReport.ps1 / Get-DLPAlertsSummary.ps1",
      code: `# Illustrative scaffold — exports policy mode/sync status and alert summaries to CSV.
Get-DlpCompliancePolicy | Select-Object Name, Mode, Enabled |
  Export-Csv -Path .\\reports\\dlp-policy-report.csv -NoTypeInformation

Get-DlpComplianceRule | Where-Object Policy -eq "Finance Credit Card Protection"`,
    },
  ],
  screenshots: [
    ...shots("Phase 1 · Standard SIT — Credit Card Policy", [
      ["Purview Solutions Menu", "Microsoft Purview compliance portal — Solutions menu entry point.", "/projects/purview-dlp/screenshots/01-standard-sit/01-purview-portal-solutions-menu.jpg"],
      ["DLP Overview Dashboard", "Data Loss Prevention overview dashboard in the Purview portal.", "/projects/purview-dlp/screenshots/01-standard-sit/02-dlp-overview-dashboard.jpg"],
      ["What to Protect", "Selecting enterprise apps and devices as protected locations.", "/projects/purview-dlp/screenshots/01-standard-sit/03-what-to-protect-enterprise-apps-devices.png"],
      ["Template or Custom Policy", "Choosing between a DLP policy template and a custom policy.", "/projects/purview-dlp/screenshots/01-standard-sit/04-template-or-custom-policy.png"],
      ["Name the Policy", "Naming the policy \"Finance Credit Card Protection\".", "/projects/purview-dlp/screenshots/01-standard-sit/05-name-policy-finance-credit-card-protection.png"],
      ["Admin Units", "Scoping the policy to the full directory (no admin unit restriction).", "/projects/purview-dlp/screenshots/01-standard-sit/06-admin-units-full-directory.png"],
      ["Protected Locations", "Selecting Exchange, SharePoint, OneDrive and Teams as protected locations.", "/projects/purview-dlp/screenshots/01-standard-sit/07-protected-locations-all-workloads.png"],
      ["Advanced DLP Rules", "Switching to advanced rule-building mode.", "/projects/purview-dlp/screenshots/01-standard-sit/08-advanced-dlp-rules-mode.jpg"],
      ["Rule Builder", "The empty rule builder before conditions are added.", "/projects/purview-dlp/screenshots/01-standard-sit/09-rule-builder-empty.png"],
      ["Rule Condition — Credit Card Number", "Adding the built-in Credit Card Number sensitive information type as a rule condition.", "/projects/purview-dlp/screenshots/01-standard-sit/10-rule-condition-credit-card-number-sit.jpg"],
      ["Rule Action", "Configuring the rule action to block sharing with external users.", "/projects/purview-dlp/screenshots/01-standard-sit/11-rule-action-block-external-users.png"],
      ["User Notifications", "Configuring policy tip notifications shown to end users.", "/projects/purview-dlp/screenshots/01-standard-sit/12-user-notifications-policy-tips.png"],
      ["Simulation Mode", "Deploying the policy in Simulation mode before enforcement.", "/projects/purview-dlp/screenshots/01-standard-sit/13-policy-mode-simulation.jpg"],
      ["Review & Create", "Final policy summary before creation.", "/projects/purview-dlp/screenshots/01-standard-sit/14-review-and-create-summary.png"],
      ["Policies List", "Finance Credit Card Protection policy listed with sync status.", "/projects/purview-dlp/screenshots/01-standard-sit/15-policies-list-sync-status.jpg"],
      ["Sync Status Detail", "Detailed policy synchronisation status across workloads.", "/projects/purview-dlp/screenshots/01-standard-sit/16-policy-sync-status-detail.jpg"],
    ]),
    ...shots("Phase 2 · Custom SIT — GSM", [
      ["327 Built-in SITs", "The full list of Microsoft's built-in Sensitive Information Types.", "/projects/purview-dlp/screenshots/02-custom-sit-gsm/01-sensitive-info-types-list-327-built-in.png"],
      ["Name Custom SIT", "Naming the custom GSM sensitive information type.", "/projects/purview-dlp/screenshots/02-custom-sit-gsm/02-name-custom-sit-gsm.jpg"],
      ["Detection Pattern", "Defining the GSM keyword-list detection pattern.", "/projects/purview-dlp/screenshots/02-custom-sit-gsm/03-define-detection-pattern-keyword-list.jpg"],
      ["Review & Create", "Final review of the custom GSM SIT before creation.", "/projects/purview-dlp/screenshots/02-custom-sit-gsm/04-review-and-create-gsm-sit.png"],
      ["Add to DLP Rule", "Adding the GSM custom SIT as a condition on the DLP rule.", "/projects/purview-dlp/screenshots/02-custom-sit-gsm/05-add-gsm-to-dlp-rule-condition.jpg"],
    ]),
    ...shots("Phase 3 · Monitoring — Activity Explorer & Alerts", [
      ["Activity Explorer Filters", "Filtering DLP match activity in Activity Explorer.", "/projects/purview-dlp/screenshots/03-monitoring/01-activity-explorer-filters.jpg"],
      ["Edit Policy", "Opening the policy to configure incident reports.", "/projects/purview-dlp/screenshots/03-monitoring/02-open-policy-for-editing.jpg"],
      ["Alert Settings", "Configuring incident report and admin alert settings.", "/projects/purview-dlp/screenshots/03-monitoring/03-configure-incident-reports-alert-settings.jpg"],
      ["Verify Alert Configuration", "Confirming the alert configuration was saved correctly.", "/projects/purview-dlp/screenshots/03-monitoring/04-verify-alert-configuration.jpg"],
      ["Email Alert", "Admin alert email notification detail.", "/projects/purview-dlp/screenshots/03-monitoring/05-email-alert-inbox-detail.jpg"],
      ["Endpoint Event Chain", "Cross-workload event chain correlating endpoint and cloud activity.", "/projects/purview-dlp/screenshots/03-monitoring/06-activity-explorer-endpoint-event-chain.jpg"],
      ["DLP Alerts Dashboard", "Triaging a generated DLP alert on the Alerts dashboard.", "/projects/purview-dlp/screenshots/03-monitoring/07-dlp-alerts-dashboard-triage-agent.jpg"],
      ["DLP Reports", "Most-triggered DLP rules report.", "/projects/purview-dlp/screenshots/03-monitoring/08-dlp-reports-most-triggered-rules.jpg"],
    ]),
    ...shots("Phase 4 · Endpoint DLP", [
      ["Device Onboarding", "Endpoint DLP device list before onboarding.", "/projects/purview-dlp/screenshots/04-endpoint-dlp/01-device-onboarding-no-devices-yet.jpg"],
      ["Sync Pending", "Device policy sync status showing \"Not updated\" immediately after onboarding.", "/projects/purview-dlp/screenshots/04-endpoint-dlp/02-device-list-not-updated.jpg"],
      ["Device Synced", "testing_machine (Windows 11 25H2) confirmed synced and updated.", "/projects/purview-dlp/screenshots/04-endpoint-dlp/03-device-list-updated.jpg"],
      ["Browser Restriction", "Firefox configured as an unallowed browser under browser and domain restrictions.", "/projects/purview-dlp/screenshots/04-endpoint-dlp/04-browser-and-domain-restrictions-firefox-blocked.jpg"],
    ]),
    ...shots("Phase 5 · Generative AI Website Protection", [
      ["Generative AI Domain Group", "Microsoft's built-in Generative AI Websites sensitive service domain group.", "/projects/purview-dlp/screenshots/05-ai-website-protection/01-sensitive-service-domain-groups-generative-ai.jpg"],
      ["Block Service Domains", "Editing the rule to block file uploads to the Generative AI domain group.", "/projects/purview-dlp/screenshots/05-ai-website-protection/02-edit-rule-block-service-domains.jpg"],
      ["Domain Restrictions Flyout", "Sensitive service domain restrictions configuration flyout.", "/projects/purview-dlp/screenshots/05-ai-website-protection/03-sensitive-service-domain-restrictions-flyout.png"],
      ["ChatGPT Upload Blocked", "Validation: file upload to chatgpt.com blocked by the endpoint policy.", "/projects/purview-dlp/screenshots/05-ai-website-protection/04-chatgpt-upload-blocked-validation.jpg"],
      ["Upload Block — Additional Evidence", "Second capture of the blocked ChatGPT upload for validation evidence.", "/projects/purview-dlp/screenshots/05-ai-website-protection/05-chatgpt-upload-blocked-duplicate-evidence.jpg"],
      ["OneDrive Policy Tip", "Policy tip shown on GSM-Test.docx in OneDrive.", "/projects/purview-dlp/screenshots/05-ai-website-protection/06-onedrive-policy-tip-gsm-test-docx.jpg"],
    ]),
    ...shots("Phase 6 · Simulation to Enforcement", [
      ["Enforcement Switch", "Finance Credit Card Protection policy switched from Simulation to Enforce mode.", "/projects/purview-dlp/screenshots/06-enforcement/01-policies-list-enforce-mode-switch.jpg"],
    ]),
  ],
  validation: [
    { item: "Device & Policy Sync", detail: "Device configuration and policy sync status both confirmed Updated." },
    { item: "Generative AI Upload Blocked", detail: "Upload to ChatGPT blocked with the native organisation policy dialog." },
    { item: "OneDrive Policy Tip", detail: "Source file shows GSM detected as sensitive information." },
    { item: "DLP Alert Generated", detail: "Alert appears in the Alerts dashboard, scoped to the agent, Active." },
    { item: "Activity Explorer Event Chain", detail: "File created → modified → renamed → DLP rule matched, fully traceable." },
    { item: "Email Notification", detail: "Low-severity alert email received with rule and file details." },
  ],
  challenges: [
    {
      title: "Proprietary data invisible to built-in SITs",
      detail:
        "Microsoft's 327 built-in Sensitive Information Types do not cover an organisation's own identifiers. A custom keyword-list SIT (GSM) closed this gap using the same detection and enforcement engine.",
    },
    {
      title: "Endpoint visibility gap",
      detail:
        "Cloud DLP alone cannot see USB copies, local printing or browser uploads after a file is downloaded. Onboarding the device via Defender for Endpoint extended the existing policy rather than requiring a second product.",
    },
  ],
  lessons: [
    "Detection and enforcement are independent settings — a rule can alert without blocking, and block without alerting.",
    "Endpoint DLP shares policies with cloud DLP; it does not duplicate them. There is no separate endpoint policy to build.",
    "Device sync status is the first thing to check when an endpoint block \"doesn't work\".",
    "The built-in Generative AI Websites domain group is preferable to a manually maintained list, which falls behind within weeks.",
    "Switching to Enforcement is reversible — this lowers the risk of testing it in a lab or pilot group first.",
  ],
  businessImpact: [
    { label: "Reduced Data Risk", value: "Cloud + endpoint enforced", icon: "risk" },
    { label: "Improved Compliance", value: "ISO 27001 aligned", icon: "compliance" },
    { label: "AI Exfiltration Mitigated", value: "Generative AI upload block", icon: "zerotrust" },
    { label: "Administrative Efficiency", value: "Automated alerting", icon: "efficiency" },
  ],
  skills: [
    "Microsoft Purview DLP",
    "Sensitive Information Types (built-in & custom)",
    "Endpoint DLP / Defender for Endpoint",
    "Generative AI data exfiltration mitigation",
    "Activity Explorer investigation",
    "Simulation-to-Enforcement change management",
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
    name: "lokeshm-it/Microsoft-Purview-Data-Loss-Prevention",
    description: "Enterprise Purview DLP implementation — standard and custom SITs, Endpoint DLP and Generative AI protection.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-Data-Loss-Prevention",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 2. Microsoft Intune Deployment */
/* ------------------------------------------------------------------ */

const intuneDeployment: CaseStudy = {
  slug: "intune-deployment",
  title: "Microsoft Intune Deployment",
  tagline:
    "A modern endpoint management baseline with Intune and Windows Autopilot for zero-touch provisioning.",
  category: "Endpoint Management",
  hero: false,
  outcome:
    "Achieved 98%+ endpoint compliance and cut device provisioning time with fully automated Autopilot enrollment.",
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
    name: "lokeshm-it",
    description: "No dedicated public repository is published for this project yet — see the GitHub profile for other Microsoft 365 projects.",
    url: "https://github.com/lokeshm-it",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 3. Zero Trust Device Trust Enforcement */
/* ------------------------------------------------------------------ */

const zeroTrustDevice: CaseStudy = {
  slug: "zero-trust-device",
  title: "Zero Trust Device Trust Enforcement",
  tagline:
    "Using device compliance as a Conditional Access signal so only trusted endpoints reach corporate resources.",
  category: "Zero Trust · Endpoint",
  hero: false,
  outcome:
    "Closed the gap on unmanaged-device access and strengthened the endpoint perimeter with continuous compliance evaluation.",
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
    name: "lokeshm-it/Zero-Trust-Device-Enforcement",
    description: "Conditional Access policy design and rollout notes.",
    url: "https://github.com/lokeshm-it/Zero-Trust-Device-Enforcement",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 4. Microsoft Entra ID Protection */
/* ------------------------------------------------------------------ */

const entraIdProtection: CaseStudy = {
  slug: "entra-id-protection",
  title: "Microsoft Entra ID Protection",
  tagline:
    "Risk-based identity protection with automated response to risky sign-ins and users.",
  category: "Identity Security",
  hero: false,
  outcome:
    "Improved identity posture with automated response to risky sign-ins and 100% MFA coverage for privileged access.",
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
    name: "lokeshm-it/Entra-ID-Protection",
    description: "Risk policy configuration and monitoring notes.",
    url: "https://github.com/lokeshm-it/Entra-ID-Protection",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 5. Zero Trust Identity Perimeter */
/* ------------------------------------------------------------------ */

const zeroTrustIdentity: CaseStudy = {
  slug: "zero-trust-identity",
  title: "Zero Trust Identity Perimeter",
  tagline:
    "Establishing identity as the primary control plane with layered Conditional Access and least privilege.",
  category: "Zero Trust · Identity",
  hero: false,
  outcome:
    "Shifted security from the network edge to identity, enabling secure remote and hybrid access without VPN dependency.",
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
    name: "lokeshm-it/m365-zero-trust-identity",
    description: "Home-lab Zero Trust identity architecture and notes.",
    url: "https://github.com/lokeshm-it/m365-zero-trust-identity",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 6. Microsoft Purview Information Protection */
/* ------------------------------------------------------------------ */

const purviewInformationProtection: CaseStudy = {
  slug: "purview-information-protection",
  title: "Microsoft Purview Information Protection",
  tagline:
    "An enterprise sensitivity label taxonomy with manual and automatic labeling, and Azure RMS encryption across Microsoft 365.",
  category: "Data Governance & Compliance",
  hero: false,
  outcome:
    "Classified and encrypted sensitive content automatically across email, files and Teams, closing the gap left by manual, inconsistent labeling.",
  badges: ["Microsoft Purview", "Sensitivity Labels", "Auto-Labeling", "Azure RMS", "Exchange Online", "SharePoint"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "3–4 weeks",
  certifications: ["SC-400", "MS-102"],
  executiveSummary: [
    "This project deployed a complete Microsoft Purview Information Protection framework, covering an eight-tier sensitivity label taxonomy, label policy publishing with mandatory labeling, manual user-driven labeling in Office apps and Outlook, and an auto-labeling policy that detects Credit Card Numbers and automatically applies encryption.",
    "Implemented in a Microsoft 365 E5 tenant, the framework gives the organisation a consistent classification standard that downstream Purview DLP, Audit and Records Management controls all build on top of.",
  ],
  businessProblem: {
    problem:
      "Sensitive data generated across Microsoft 365 — emails, Word and Excel files, SharePoint content and Teams messages — had no formal classification or protection framework, leaving it exposed to accidental external sharing, unauthorised access and exfiltration via unprotected email.",
    importance:
      "Manual controls alone do not scale: users forget to apply labels, apply the wrong classification, or work without awareness of what is actually sensitive. A consistent, enterprise-standard taxonomy is also the prerequisite for downstream DLP and audit controls.",
    risks: [
      "Accidental external sharing of unclassified sensitive content",
      "Unauthorised access to confidential files and emails",
      "Data exfiltration via unprotected email and documents",
      "Regulatory non-compliance exposure (GDPR, ISO 27001)",
    ],
    compliance: [
      "ISO/IEC 27001:2022 information classification controls",
      "GDPR data protection requirements",
      "Consistent labeling as a prerequisite for downstream DLP and audit controls",
    ],
  },
  solutionOverview: [
    "An eight-tier sensitivity label taxonomy (Public, General, Confidential, Highly Confidential, Internal Projects, Client Confidential, Finance Restricted and Executive Confidential) was created and scoped to Files and Emails, with encryption and access-control protection settings applied to the confidential tiers.",
    "The label policy was published to all users with mandatory labeling enabled. On top of manual, user-driven labeling in Office apps and Outlook, an auto-labeling policy detects the built-in Credit Card Number Sensitive Information Type and automatically applies the Finance Confidential label with Azure RMS (AES-256) encryption — removing reliance on users to recognise and label regulated content themselves.",
  ],
  architectureCaption:
    "Sensitivity label taxonomy published across Exchange Online, SharePoint, OneDrive, Teams and Office apps, with an auto-labeling policy applying Finance Confidential on Credit Card Number detection and Azure RMS enforcing encryption-based access control.",
  architectureImage: "/projects/purview-information-protection/architecture-diagram.avif",
  technologyStack: [
    { name: "Microsoft Purview", description: "Sensitivity labels, label policies and auto-labeling policies" },
    { name: "Azure RMS", description: "AES-256 encryption and access-control enforcement" },
    { name: "Exchange Online", description: "Email classification and protection" },
    { name: "SharePoint Online / OneDrive", description: "Document classification and protection" },
    { name: "Microsoft Teams", description: "Chat and channel content protection" },
    { name: "PowerShell / Microsoft Graph", description: "Label taxonomy deployment and usage reporting" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Patchthecloud.onmicrosoft.com (Microsoft 365 E5 trial)" },
    { label: "Licensing", value: "Microsoft 365 E5" },
    { label: "Identity", value: "Microsoft Entra ID" },
    { label: "Workloads", value: "Exchange, SharePoint, OneDrive, Teams, Office apps" },
    { label: "Labels Created", value: "9 (default + custom taxonomy)" },
    { label: "Encryption", value: "Azure RMS (AES-256)" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Overview & Prerequisites",
      description: "Confirm Purview portal access and review the default label taxonomy.",
      steps: [
        "Verify compliance.microsoft.com access and licensing",
        "Review Microsoft's default sensitivity label taxonomy",
        "Scope the custom taxonomy required for the business",
      ],
    },
    {
      phase: "Phase 2",
      title: "Sensitivity Label Taxonomy",
      description: "Create the eight-tier label taxonomy with scope and protection settings.",
      steps: [
        "Create Public, General, Confidential and Highly Confidential labels",
        "Create Internal Projects, Client Confidential, Finance Restricted and Executive Confidential labels",
        "Configure scope (Files, Emails), encryption, access control and content marking per label",
      ],
    },
    {
      phase: "Phase 3",
      title: "Label Policy Publishing",
      description: "Publish the taxonomy to all users with mandatory labeling.",
      steps: [
        "Create a label policy naming the labels to publish",
        "Scope the policy to all users and enable mandatory labeling",
        "Confirm policy synchronisation status",
      ],
    },
    {
      phase: "Phase 4",
      title: "Manual Labeling",
      description: "Validate user-driven labeling in Office apps and Outlook.",
      steps: [
        "Confirm published labels appear in the Purview admin view",
        "Review the sensitivity labels overview available to end users",
        "Apply a label manually to a document in Word to confirm behaviour",
      ],
    },
    {
      phase: "Phase 5",
      title: "Automatic Labeling",
      description: "Build and publish an auto-labeling policy for Credit Card Number detection.",
      steps: [
        "Configure basic settings and scope for the auto-labeling policy",
        "Select the Credit Card Number Sensitive Information Type as the detection condition",
        "Review, publish and validate the auto-labeling policy",
      ],
    },
  ],
  powershell: [
    {
      title: "Create the sensitivity label taxonomy",
      language: "powershell",
      filename: "New-SensitivityLabels.ps1",
      code: `# Illustrative scaffold based on New-SensitivityLabels.ps1 — values are placeholders.
Connect-IPPSSession -UserPrincipalName admin@yourtenant.onmicrosoft.com

New-Label -Name "Finance Restricted" -DisplayName "Finance Restricted" \`
  -Tooltip "Restricted finance data — encryption enforced" \`
  -ContentType "File, Email"

Set-LabelPolicy -Identity "Enterprise Taxonomy" -AddLabel "Finance Restricted"`,
    },
    {
      title: "Create the auto-labeling policy",
      language: "powershell",
      filename: "New-AutoLabelingPolicy.ps1",
      code: `# Illustrative scaffold based on New-AutoLabelingPolicy.ps1
New-AutoSensitivityLabelPolicy -Name "Auto-Label Credit Card Data" \`
  -ApplySensitivityLabel "Finance Confidential" \`
  -ExchangeLocation All -SharePointLocation All -OneDriveLocation All \`
  -Mode TestWithoutNotifications

New-AutoSensitivityLabelRule -Policy "Auto-Label Credit Card Data" \`
  -ContentContainsSensitiveInformation @{Name="Credit Card Number"; minCount="1"}`,
    },
    {
      title: "Report label usage",
      language: "powershell",
      filename: "Get-SensitivityLabelReport.ps1",
      code: `# Illustrative scaffold based on Get-SensitivityLabelReport.ps1
Get-Label | Select-Object DisplayName, Guid, ContentType |
  Export-Csv -Path .\\reports\\sensitivity-labels.csv -NoTypeInformation`,
    },
  ],
  screenshots: [
    ...shots("Phase 1 · Overview", [
      ["Purview Portal Home", "Microsoft Purview compliance portal landing page.", "/projects/purview-information-protection/screenshots/01-overview/01-overview__01-purview-portal-home.avif"],
      ["Information Protection Solution", "Information Protection solution entry point in the Purview portal.", "/projects/purview-information-protection/screenshots/01-overview/01-overview__02-information-protection-solution.avif"],
      ["Sensitivity Labels Navigation", "Navigating to the sensitivity labels management area.", "/projects/purview-information-protection/screenshots/01-overview/01-overview__03-sensitivity-labels-navigation.avif"],
    ]),
    ...shots("Phase 2 · Sensitivity Label Taxonomy", [
      ["Sensitivity Labels List", "Default and custom sensitivity label taxonomy in the Purview portal.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__01-sensitivity-labels-list.avif"],
      ["Create Label — Name", "Naming a new sensitivity label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__02-create-label-name.avif"],
      ["Create Label — Description", "Adding a description to a new sensitivity label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__03-create-label-description.avif"],
      ["Label Scope", "Scoping the label to Files and Emails.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__04-label-scope-files-emails.avif"],
      ["Protection Settings", "Configuring encryption-based protection for the label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__05-label-protection-settings.avif"],
      ["Access Control", "Restricting label access to authorised users and groups.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__06-label-access-control.avif"],
      ["Content Marking", "Configuring content marking options for the label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__07-label-content-marking.avif"],
      ["Header & Footer", "Header and footer content marking configuration.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__08-label-header-footer.avif"],
      ["Auto-Labeling Option", "Reviewing auto-labeling eligibility during label creation.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__09-label-auto-labeling.avif"],
      ["Review & Finish", "Final review before publishing the new label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__10-label-review-finish.avif"],
      ["Label Created", "Confirmation that the sensitivity label was created successfully.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__11-label-created-confirmation.avif"],
      ["Create Label — Basic Info", "Basic information step for an additional taxonomy label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__12-create-label-basic-info.avif"],
      ["Label Scope Selection", "Selecting the scope for an additional taxonomy label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__13-label-scope-selection.avif"],
      ["Protection & Access Control", "Protection and access control settings for an additional label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__14-protection-access-control.avif"],
      ["Assign Permissions", "Assigning group-based permissions to a protected label.", "/projects/purview-information-protection/screenshots/02-sensitivity-labels/02-sensitivity-labels__15-assign-permissions-groups.avif"],
    ]),
    ...shots("Phase 3 · Label Policy Publishing", [
      ["Publish Policy — Name", "Naming the label policy that publishes labels to users.", "/projects/purview-information-protection/screenshots/03-label-policies/03-label-policies__02-publish-label-policy-name.avif"],
      ["Choose Labels", "Selecting which sensitivity labels to publish.", "/projects/purview-information-protection/screenshots/03-label-policies/03-label-policies__03-publish-label-choose-labels.avif"],
      ["Scope to Users", "Scoping the label policy to all users.", "/projects/purview-information-protection/screenshots/03-label-policies/03-label-policies__04-publish-label-scope-users.avif"],
      ["Policy Settings", "Configuring mandatory labeling and default label settings.", "/projects/purview-information-protection/screenshots/03-label-policies/03-label-policies__05-publish-label-policy-settings.avif"],
      ["Sync Status", "Confirming label policy synchronisation status.", "/projects/purview-information-protection/screenshots/03-label-policies/03-label-policies__06-policy-synchronization-status.avif"],
    ]),
    ...shots("Phase 4 · Manual Labeling", [
      ["Purview Admin View", "Administrator view confirming published labels.", "/projects/purview-information-protection/screenshots/04-manual-labels/04-manual-labels__01-purview-portal-admin-view.avif"],
      ["Labels Overview", "Overview of sensitivity labels available to end users.", "/projects/purview-information-protection/screenshots/04-manual-labels/04-manual-labels__02-sensitivity-labels-overview.avif"],
      ["Label Applied in Word", "A sensitivity label manually applied to a document in Word.", "/projects/purview-information-protection/screenshots/04-manual-labels/04-manual-labels__03-label-applied-word.avif"],
    ]),
    ...shots("Phase 5 · Automatic Labeling", [
      ["Auto-Label — Basic Settings", "Basic settings for the Finance Confidential auto-labeling policy.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__01-create-label-basic-settings.avif"],
      ["Auto-Label Scope", "Scoping the auto-labeling policy to target locations.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__02-create-label-scope.avif"],
      ["Enable Auto-Labeling", "Enabling automatic labeling for the policy.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__03-auto-labeling-enable.avif"],
      ["Auto-Labeling Conditions", "Defining the detection conditions for automatic labeling.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__04-auto-labeling-conditions.avif"],
      ["SIT Selection", "Selecting the Sensitive Information Type used for detection.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__05-sensitive-info-type-selection.avif"],
      ["Credit Card SIT Configuration", "Configuring the Credit Card Number sensitive information type as the detection trigger.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__06-credit-card-sit-configuration.avif"],
      ["Review & Finish", "Final review of the auto-labeling policy before publishing.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__07-auto-label-review-finish.avif"],
      ["Publish Auto-Label Policy", "Publishing the auto-labeling policy.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__08-publish-auto-label-policy.avif"],
      ["Policy Wizard", "Auto-labeling policy configuration wizard.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__09-auto-labeling-policy-wizard.avif"],
      ["Policy Scope", "Scope configuration for the auto-labeling policy.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__10-auto-labeling-policy-scope.avif"],
      ["Policy Review", "Final review of the auto-labeling policy configuration.", "/projects/purview-information-protection/screenshots/05-auto-labels/05-auto-labels__11-auto-labeling-policy-review.avif"],
    ]),
  ],
  validation: [
    { item: "Taxonomy Published", detail: "All 9 labels (default + custom) published and visible to users." },
    { item: "Mandatory Labeling Enforced", detail: "Label policy requires classification before content is saved/sent." },
    { item: "Manual Labeling Confirmed", detail: "Labels apply correctly in Word and Outlook." },
    { item: "Auto-Labeling Confirmed", detail: "Credit Card Number content is automatically labeled Finance Confidential." },
    { item: "Encryption Enforced", detail: "Azure RMS (AES-256) restricts access on protected labels." },
  ],
  challenges: [
    {
      title: "Groups & Sites scope unavailable in the lab tenant",
      detail: "Extending labels to Microsoft 365 Groups and sites required additional Entra/M365 integration not available in this lab tenant — documented as a known limitation rather than worked around.",
    },
    {
      title: "Manual labeling inconsistency",
      detail: "User-driven labeling alone was inconsistent, which is exactly why the auto-labeling policy for Credit Card Number detection was added on top.",
    },
  ],
  lessons: [
    "Publishing a label makes it available to users — it does not retroactively label existing content; auto-apply policies are needed for that.",
    "A clear taxonomy (why each tier exists) matters more than the number of labels.",
    "Auto-labeling policies should start in simulation before Automatic mode is enabled tenant-wide.",
    "Content marking and encryption are separate settings — both need to be deliberately configured, not assumed.",
  ],
  businessImpact: [
    { label: "Consistent Classification", value: "9-label taxonomy", icon: "compliance" },
    { label: "Reduced Manual Error", value: "Auto-labeling enabled", icon: "efficiency" },
    { label: "Encrypted Access Control", value: "Azure RMS AES-256", icon: "shield" },
    { label: "Zero Trust Alignment", value: "Data-layer protection", icon: "zerotrust" },
  ],
  skills: [
    "Microsoft Purview Information Protection",
    "Sensitivity Label Taxonomy Design",
    "Auto-Labeling Policies",
    "Azure RMS Encryption",
    "Label Policy Publishing",
    "PowerShell / Microsoft Graph",
  ],
  relatedCertifications: ["SC-400", "MS-102", "SC-900"],
  blogArticles: [
    {
      title: "Microsoft Information Protection: Sensitivity Labels & Data Classification",
      description: "MS-102 walkthrough of Purview Information Protection.",
      url: "https://techcertguide.blog/microsoft-information-protection-ms102/",
    },
    {
      title: "Manual Sensitivity Labels in Microsoft Purview",
      description: "User-driven labeling in Office apps and Outlook.",
      url: "https://techcertguide.blog/manual-sensitivity-labels-in-microsoft-purview/",
    },
    {
      title: "Automatic Sensitivity Labels in Microsoft Purview",
      description: "Building an auto-labeling policy for regulated data.",
      url: "https://techcertguide.blog/automatic-sensitivity-labels-in-microsoft-purview/",
    },
  ],
  repo: {
    name: "lokeshm-it/Microsoft-Purview-Information-Protection",
    description: "Sensitivity label taxonomy, manual/auto-labeling and Azure RMS encryption implementation.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-Information-Protection",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 7. Microsoft Purview Records Management */
/* ------------------------------------------------------------------ */

const purviewRecordsManagement: CaseStudy = {
  slug: "purview-records-management",
  title: "Microsoft Purview Records Management",
  tagline:
    "Formal lifecycle governance for financial, legal and HR records — Record Labels, File Plan, Disposition Review and Regulatory Records.",
  category: "Compliance · Governance",
  hero: false,
  outcome:
    "Declared financial records as immutable, centralised records visibility in the File Plan, and added reviewer-approved disposition before deletion.",
  badges: ["Microsoft Purview", "Records Management", "Record Labels", "Disposition Review", "File Plan"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "2–4 weeks",
  certifications: ["MS-102", "SC-400"],
  executiveSummary: [
    "This project deployed Microsoft Purview Records Management for a regulated organisation requiring formal lifecycle governance over financial, legal and HR records, establishing record declaration controls, immutable record protection, structured disposition workflows and centralised records visibility through the File Plan.",
    "Records Management extends standard retention with record-level controls that prevent modification, enforce chain-of-custody, and satisfy regulatory obligations such as ISO 15489, GDPR Article 5 and SEC Rule 17a-4.",
  ],
  businessProblem: {
    problem:
      "Financial records could be modified or deleted before their retention period expired, there was no centralised visibility into retention labels across workloads, legal hold coverage was inadequate for declared records, and content was disposed of without review or approval.",
    importance:
      "Regulated organisations must be able to prove that financial, legal and HR records were preserved, protected and disposed of correctly. Without record-level controls, the organisation cannot demonstrate this to auditors or in litigation.",
    risks: [
      "Financial records modified or deleted before retention period expires",
      "No centralised visibility into retention labels across workloads",
      "Legal hold inadequate for declared records during litigation",
      "Disposition of records without review or approval",
    ],
    compliance: [
      "ISO 15489 records management principles",
      "GDPR Article 5 storage limitation and integrity requirements",
      "SEC Rule 17a-4 style immutable record-keeping obligations",
    ],
  },
  solutionOverview: [
    "A record label (MS102-Finance-Record) was created with a 7-year retention period and the \"Mark items as a record\" setting enabled, converting a standard retention label into a Record Label with enhanced governance controls, then published to Exchange Online, SharePoint Online and OneDrive.",
    "The File Plan provides a single, centralised view of all record labels, retention durations and disposition settings, while Disposition Review assigns reviewers who must approve permanent deletion once the retention period lapses — closing the gap where records could previously be deleted without oversight.",
  ],
  architectureCaption:
    "Record Labels, File Plan and Disposition Review operating together over Exchange Online, SharePoint Online, OneDrive and Teams, giving centralised visibility and reviewer-approved disposition for declared records.",
  technologyStack: [
    { name: "Microsoft Purview Records Management", description: "Record declaration, File Plan and disposition workflow" },
    { name: "Record Labels", description: "\"Mark items as a record\" retention labels with enhanced governance" },
    { name: "Regulatory Record Labels", description: "Highest-level protection — cannot be removed once applied" },
    { name: "Disposition Review", description: "Reviewer approval workflow before permanent deletion" },
    { name: "Event-Based Retention", description: "Contract and legal document retention triggered by an event" },
    { name: "PowerShell / Microsoft Graph", description: "Record label reporting and File Plan export" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Patchthecloud.onmicrosoft.com" },
    { label: "Admin Portal", value: "compliance.microsoft.com" },
    { label: "Licensing", value: "Microsoft 365 E5" },
    { label: "Workloads", value: "Exchange Online, SharePoint Online, OneDrive, Teams" },
    { label: "Scope", value: "Organisation-wide + Finance adaptive scope" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Enable Records Management",
      description: "Confirm Records Management is enabled for the tenant.",
      steps: [
        "Navigate to compliance.microsoft.com → Solutions → Records Management",
        "Confirm the solution is enabled",
        "Review existing retention label estate before adding record labels",
      ],
    },
    {
      phase: "Phase 2",
      title: "Create Record Labels",
      description: "Create the MS102-Finance-Record label with the record declaration setting enabled.",
      steps: [
        "Create a retention label with a 7-year retention period and Retain-and-Delete action",
        "Enable \"Mark items as a record\"",
        "Publish the label policy to Exchange Online, SharePoint Online and OneDrive",
      ],
    },
    {
      phase: "Phase 3",
      title: "Configure File Plan",
      description: "Review all record labels centrally via the File Plan.",
      steps: [
        "Navigate to Records Management → File Plan",
        "Review label status, retention duration and disposition action",
        "Confirm Is Record = Yes for MS102-Finance-Record",
      ],
    },
    {
      phase: "Phase 4",
      title: "Event-Based Retention",
      description: "Extend coverage to contract and legal document categories.",
      steps: [
        "Review candidate categories for event-based retention",
        "Plan event triggers for contract expiry and legal matters",
        "Document scope for future rollout",
      ],
    },
    {
      phase: "Phase 5",
      title: "Disposition Review",
      description: "Assign reviewers who must approve deletion after retention expires.",
      steps: [
        "Navigate to Records Management → Disposition",
        "Assign disposition reviewers to record labels",
        "Confirm approval workflow is active before content reaches disposition",
      ],
    },
    {
      phase: "Phase 6",
      title: "Regulatory Records & Validation",
      description: "Evaluate Regulatory Records for the highest-sensitivity categories and validate the configuration.",
      steps: [
        "Review Regulatory Record behaviour (cannot be removed by admins once applied)",
        "Validate File Plan and disposition configuration end to end",
        "Export configuration evidence for compliance reporting",
      ],
    },
  ],
  powershell: [
    {
      title: "Export all record labels",
      language: "powershell",
      filename: "Get-RecordLabels.ps1",
      code: `# Illustrative scaffold based on Get-RecordLabels.ps1
Connect-IPPSSession -UserPrincipalName admin@patchthecloud.onmicrosoft.com
.\\scripts\\Get-RecordLabels.ps1 -OutputPath ".\\reports\\record-labels.csv"`,
    },
    {
      title: "Export the full File Plan",
      language: "powershell",
      filename: "Export-FilePlan.ps1",
      code: `# Illustrative scaffold based on Export-FilePlan.ps1
Get-ComplianceTag | Select-Object Name, RetentionDuration, IsRecordLabel, RetentionAction |
  Export-Csv -Path .\\reports\\file-plan.csv -NoTypeInformation`,
    },
    {
      title: "Audit Records Management configuration",
      language: "powershell",
      filename: "Get-RecordsManagementConfiguration.ps1",
      code: `# Illustrative scaffold based on Get-RecordsManagementConfiguration.ps1
Get-CompliancePolicy | Where-Object Name -like "*Record*" |
  Select-Object Name, Enabled, Mode`,
    },
  ],
  screenshots: [
    ...shots("Phase 2 · Record Labels", [
      ["Records Management Solution", "Navigating to the Records Management solution in the Purview compliance portal.", "/projects/purview-records-management/screenshots/02-record-labels/02-enable-audit__01-purview-audit-solution.png"],
      ["Mark as Record Setting", "Enabling the \"Mark items as a record\" setting when creating a retention label.", "/projects/purview-records-management/screenshots/02-record-labels/02-record-labels__01-mark-as-record-setting.png"],
      ["Label Policies Published", "MS102-Finance-Record label published across Microsoft 365 workloads.", "/projects/purview-records-management/screenshots/02-record-labels/02-record-labels__02-label-policies-published.png"],
    ]),
    ...shots("Phase 3 · File Plan", [
      ["File Plan Configuration", "Configuring the File Plan view for record labels and retention settings.", "/projects/purview-records-management/screenshots/03-file-plan/03-audit-search__01-search-configuration.png"],
      ["File Plan Loading", "File Plan view populating with record label configuration.", "/projects/purview-records-management/screenshots/03-file-plan/03-audit-search__02-search-in-progress.png"],
      ["File Plan Loaded", "File Plan view fully loaded with record label details.", "/projects/purview-records-management/screenshots/03-file-plan/03-audit-search__03-search-completed.png"],
      ["File Plan Overview", "Centralised File Plan view showing record labels, retention durations and disposition settings.", "/projects/purview-records-management/screenshots/03-file-plan/03-file-plan__01-file-plan-overview.png"],
    ]),
    ...shots("Phase 4 · Event-Based Retention", [
      ["Event-Based Retention Review", "Reviewing event-based retention configuration for contract and legal document categories.", "/projects/purview-records-management/screenshots/04-event-based-retention/04-investigation__01-audit-results.png"],
    ]),
    ...shots("Phase 5 · Disposition Review", [
      ["Disposition Export In Progress", "Exporting disposition review configuration for the reviewer approval workflow.", "/projects/purview-records-management/screenshots/05-disposition-review/05-export-results__01-export-in-progress.png"],
      ["Disposition Export Complete", "Disposition review export completed for records requiring reviewer approval.", "/projects/purview-records-management/screenshots/05-disposition-review/05-export-results__02-export-complete.png"],
    ]),
    ...shots("Phase 6 · Regulatory Records & Validation", [
      ["Regulatory Records Validation", "Validating regulatory record configuration and export in Excel.", "/projects/purview-records-management/screenshots/06-regulatory-records/06-validation__01-audit-export-excel.png"],
    ]),
  ],
  validation: [
    { item: "Record Visible in File Plan", detail: "MS102-Finance-Record appears with Is Record = Yes." },
    { item: "Published to All Workloads", detail: "Record label policy visible across Exchange, SharePoint and OneDrive." },
    { item: "Modification Prevented", detail: "Editing is blocked on declared record items." },
    { item: "File Plan Completeness", detail: "Duration, action and record type all visible centrally." },
    { item: "Disposition Configured", detail: "Reviewer assigned; approval workflow active." },
    { item: "Regulatory Record Immutability", detail: "Label removal blocked by administrators once applied." },
  ],
  challenges: [
    {
      title: "Publishing is not the same as applying",
      detail: "Publishing a record label makes it available to users; it does not automatically apply the label to existing content — auto-apply policies are required for that.",
    },
    {
      title: "Regulatory Records cannot be undone",
      detail: "Unlike standard Record Labels, Regulatory Records cannot be removed by administrators once applied, so they were thoroughly tested before any production consideration.",
    },
  ],
  lessons: [
    "Publishing ≠ applying — auto-apply policies are required to label existing content, not just new content.",
    "The \"Unlock this record by default\" option is useful during drafting phases before formally locking a record.",
    "The File Plan is read-only in Records Management; configuration changes are made in Data Lifecycle Management.",
    "Disposition review workflows require Microsoft 365 E5 or the Compliance add-on.",
  ],
  businessImpact: [
    { label: "Immutable Records", value: "Record Labels enforced", icon: "shield" },
    { label: "Centralised Visibility", value: "File Plan", icon: "compliance" },
    { label: "Governed Disposition", value: "Reviewer approval", icon: "risk" },
    { label: "Administrative Efficiency", value: "PowerShell reporting", icon: "efficiency" },
  ],
  skills: [
    "Microsoft Purview Records Management",
    "Record Label & File Plan Design",
    "Disposition Review Workflows",
    "Event-Based Retention",
    "Regulatory Records",
    "PowerShell / Microsoft Graph",
  ],
  relatedCertifications: ["MS-102", "SC-400"],
  blogArticles: [
    {
      title: "Records Management in Microsoft Purview",
      description: "Record Labels, File Plan and disposition review walkthrough.",
      url: "https://techcertguide.blog/records-management-in-microsoft-purview/",
    },
  ],
  repo: {
    name: "lokeshm-it/Microsoft-Purview-Records-Management",
    description: "Record Labels, File Plan, Disposition Review and Regulatory Records implementation.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-Records-Management",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 8. Microsoft Purview Audit */
/* ------------------------------------------------------------------ */

const purviewAudit: CaseStudy = {
  slug: "purview-audit",
  title: "Microsoft Purview Audit",
  tagline:
    "Unified Audit Log search, insider-threat investigation and evidence export across Microsoft 365.",
  category: "Compliance · Investigation",
  hero: false,
  outcome:
    "Investigated a focused file-access pattern to 12 audit events and produced a chain-of-custody CSV export for compliance evidence.",
  badges: ["Microsoft Purview", "Unified Audit Log", "Investigation", "Compliance Reporting"],
  difficulty: "Intermediate",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "1–2 weeks",
  certifications: ["MS-102"],
  executiveSummary: [
    "This project documents an enterprise Microsoft Purview Audit implementation — verifying audit is enabled, running a targeted audit search, investigating a focused insider-threat scenario, and exporting evidence for compliance and forensic use.",
    "Using Audit (Standard), a search scoped to a single user, activity type and three-day window returned 12 FileAccessed events, which were reviewed, exported to CSV with full AuditData JSON, and validated in Excel — demonstrating a repeatable, evidence-producing investigation workflow.",
  ],
  businessProblem: {
    problem:
      "There was no visibility into who accessed sensitive SharePoint documents, no accountability record for file deletions, no systematic review of privileged account actions, and security incidents were investigated reactively without data.",
    importance:
      "Regulatory auditors require evidence of monitoring controls; without a searchable, exportable audit trail the organisation cannot demonstrate accountability or respond quickly to a suspected incident.",
    risks: [
      "No visibility into who accessed sensitive SharePoint documents",
      "File deletions occur with no accountability record",
      "Privileged account actions not reviewed systematically",
      "Security incidents investigated reactively, without data",
    ],
    compliance: [
      "ISO/IEC 27001:2022 monitoring and logging controls",
      "GDPR Article 5 accountability requirements",
      "Evidence retention for regulatory audits",
    ],
  },
  solutionOverview: [
    "Microsoft Purview Audit (Standard) centralises activity from Exchange Online, SharePoint Online, OneDrive, Teams and Entra ID into the Unified Audit Log, searchable by date range, user, activity type and workload.",
    "A targeted investigation scenario — a single test user's FileAccessed activity over a three-day window — was executed end to end: search, results review, CSV export with full AuditData JSON, and validation of the export in Excel, producing chain-of-custody evidence ready for compliance or legal use.",
  ],
  architectureCaption:
    "Activity from Exchange, SharePoint, OneDrive, Teams and Entra ID flows into the Unified Audit Log, searchable via Audit Search and exportable to CSV for investigation and compliance evidence.",
  technologyStack: [
    { name: "Microsoft Purview Audit", description: "Unified Audit Log search, filters and export" },
    { name: "Audit Standard", description: "90-day retention, full search, CSV export (E3/E5)" },
    { name: "Exchange Online / SharePoint / OneDrive / Teams", description: "Audited Microsoft 365 workloads" },
    { name: "Microsoft Entra ID", description: "Administrator authentication and audit role assignment" },
    { name: "PowerShell", description: "Targeted search, bulk export and configuration auditing" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "securem365lsb.onmicrosoft.com (Microsoft 365 E5 trial)" },
    { label: "Audit Tier", value: "Audit Standard" },
    { label: "Test Account", value: "testuser1@securem365lsb.onmicrosoft.com" },
    { label: "Investigation Window", value: "2026-07-01 to 2026-07-03" },
    { label: "Investigation Scenario", value: "Insider Threat — file access pattern analysis" },
    { label: "Events Captured", value: "12 FileAccessed events" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Enable & Verify Audit",
      description: "Confirm auditing is enabled and administrator roles are assigned.",
      steps: [
        "Navigate to compliance.microsoft.com → Solutions → Audit",
        "Confirm auditing status is enabled for the tenant",
        "Verify Audit Logs / View-Only Audit Logs roles are assigned",
      ],
    },
    {
      phase: "Phase 2",
      title: "Configure Audit Search",
      description: "Scope the search by date range, user and activity type.",
      steps: [
        "Set the date range to 2026-07-01 – 2026-07-03",
        "Scope the activity to FileAccessed",
        "Scope the user to testuser1 and record type to SharePointFileOperation",
      ],
    },
    {
      phase: "Phase 3",
      title: "Execute & Investigate",
      description: "Run the search and review returned events.",
      steps: [
        "Submit the search and monitor asynchronous progress",
        "Confirm 12 audit records returned",
        "Review Date, User, Activity, Record Type and IP Address per event",
      ],
    },
    {
      phase: "Phase 4",
      title: "Export Evidence",
      description: "Export matching events to CSV with full AuditData JSON.",
      steps: [
        "Select Export Results",
        "Confirm CSV export includes RecordId, CreationDate, RecordType, Operation, UserId and AuditData",
        "Preserve the export for chain-of-custody evidence",
      ],
    },
    {
      phase: "Phase 5",
      title: "Validate",
      description: "Validate the exported CSV for completeness in Excel.",
      steps: [
        "Open the export in Excel",
        "Confirm all 12 events are present with full audit context",
        "Confirm AuditData JSON includes session IDs and client app details",
      ],
    },
  ],
  powershell: [
    {
      title: "Targeted Unified Audit Log search",
      language: "powershell",
      filename: "Search-UnifiedAuditLog.ps1",
      code: `# Illustrative scaffold based on Search-UnifiedAuditLog.ps1
.\\Search-UnifiedAuditLog.ps1 \`
  -StartDate "2026-07-01" \`
  -EndDate "2026-07-03" \`
  -UserIds "testuser1@securem365lsb.onmicrosoft.com" \`
  -Operations "FileAccessed" \`
  -OutputPath "C:\\AuditExports"`,
    },
    {
      title: "Bulk audit export",
      language: "powershell",
      filename: "Export-AuditLogs.ps1",
      code: `# Illustrative scaffold based on Export-AuditLogs.ps1
Search-UnifiedAuditLog -StartDate (Get-Date).AddDays(-3) -EndDate (Get-Date) \`
  -RecordType SharePointFileOperation |
  Export-Csv -Path .\\AuditExports\\audit-export.csv -NoTypeInformation`,
    },
  ],
  screenshots: [
    ...shots("Phase 2–3 · Audit Search", [
      ["Search Configuration", "Configuring the audit search — date range, activities, users and record types.", "/projects/purview-audit/screenshots/03-audit-search/02-audit-search_01-search-configuration.png.png"],
      ["Search Completed", "Audit search completed — 12 matching FileAccessed events returned.", "/projects/purview-audit/screenshots/03-audit-search/02-audit-search_02-search-completed.png.png"],
      ["Search Results", "Reviewing the 12 returned audit events for testuser1.", "/projects/purview-audit/screenshots/03-audit-search/03-audit-results_01-search-results.png.png"],
    ]),
    ...shots("Phase 4 · Export Results", [
      ["Export In Progress", "Exporting the matching audit events to CSV for evidence preservation.", "/projects/purview-audit/screenshots/05-export-results/04-export-results_01-export-in-progress.png.png"],
      ["Export Complete", "CSV export of all 12 audit records completed.", "/projects/purview-audit/screenshots/05-export-results/04-export-results_02-export-completed.png.png"],
    ]),
    ...shots("Phase 5 · Validation", [
      ["Excel Validation", "Validating the exported audit log CSV in Excel — RecordId, CreationDate, Operation and AuditData confirmed.", "/projects/purview-audit/screenshots/06-validation/05-validation_01-exported-audit-log-csv.png.png"],
    ]),
  ],
  validation: [
    { item: "Audit Solution Accessible", detail: "Audit accessible at compliance.microsoft.com → Solutions → Audit." },
    { item: "Search Executes with Filters", detail: "Date, user and activity filters apply correctly." },
    { item: "12 Results Returned", detail: "Search completes with 12 results for testuser1 FileAccessed." },
    { item: "Results Display Correctly", detail: "Activity, User, IP, Date and RecordType fields all visible." },
    { item: "Export Succeeds", detail: "Export completes and CSV downloads successfully." },
    { item: "CSV Validated in Excel", detail: "All 12 records and AuditData JSON confirmed intact." },
  ],
  challenges: [
    {
      title: "Audit is enabled by default — but must be verified",
      detail: "Many organisations assume auditing is active without checking; this was verified explicitly before relying on it for an investigation.",
    },
    {
      title: "Search scope affects performance",
      detail: "Broad date ranges across all users can be slow; scoping to a specific user, activity and date range returned results faster and was easier to analyse.",
    },
  ],
  lessons: [
    "AuditData JSON is the forensic record — CSV columns are metadata, but AuditData contains the complete activity context.",
    "Export early — Audit Standard retains logs for only 90 days; preserve evidence immediately once an incident is identified.",
    "Audit Premium is required for mailbox-read events (MailItemsAccessed), which are critical for email breach investigations.",
    "Targeted searches (specific user, activity, date range) are faster and easier to analyse than broad searches.",
  ],
  businessImpact: [
    { label: "Investigation Time", value: "12 events in one search", icon: "clock" },
    { label: "Evidence Preserved", value: "Chain-of-custody CSV", icon: "compliance" },
    { label: "Improved Accountability", value: "Searchable audit trail", icon: "shield" },
    { label: "Audit-Ready", value: "ISO 27001 evidence", icon: "risk" },
  ],
  skills: [
    "Microsoft Purview Audit",
    "Unified Audit Log Investigation",
    "Insider Threat Analysis",
    "Evidence Export & Chain of Custody",
    "PowerShell Audit Automation",
  ],
  relatedCertifications: ["MS-102"],
  blogArticles: [
    {
      title: "Microsoft Purview Audit Lab Guide",
      description: "Audit search, investigation and export walkthrough.",
      url: "https://techcertguide.blog/microsoft-purview-audit/",
    },
  ],
  repo: {
    name: "lokeshm-it/Microsoft-Purview-Audit",
    description: "Unified Audit Log search, investigation workflow and evidence export implementation.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-Audit",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 9. Microsoft Purview eDiscovery */
/* ------------------------------------------------------------------ */

const purviewEdiscovery: CaseStudy = {
  slug: "purview-ediscovery",
  title: "Microsoft Purview eDiscovery",
  tagline:
    "Case-based legal investigation, multi-workload KQL content search and evidence export across Microsoft 365.",
  category: "Compliance · Investigation",
  hero: false,
  outcome:
    "Stood up a case-based investigation workflow spanning Exchange, SharePoint, OneDrive and Teams, from KQL search through to a structured export package.",
  badges: ["Microsoft Purview", "eDiscovery", "KQL", "Legal Hold", "Case Management"],
  difficulty: "Intermediate",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "1–2 weeks",
  certifications: ["MS-102", "SC-400"],
  executiveSummary: [
    "This project implements Microsoft Purview eDiscovery (Standard) for legal and compliance investigations, covering case creation, multi-workload data source configuration, KQL-based content search, results review and structured evidence export.",
    "A Finance Investigation case was created end to end — spanning Exchange Online, SharePoint Online, OneDrive and Microsoft Teams — demonstrating the full case-based investigation lifecycle required for legal holds, HR investigations and regulatory requests.",
  ],
  businessProblem: {
    problem:
      "Legal and HR teams had no centralised way to search Exchange, SharePoint, Teams and OneDrive together, no legal hold mechanism to preserve a departing employee's communications, and no structured, exportable evidence workflow for external auditors.",
    importance:
      "When legal, HR or regulatory requests arrive with tight deadlines, a manual, per-workload search process is slow, inconsistent, and risks missing evidence — exposing the organisation to sanctions or adverse findings.",
    risks: [
      "No centralised search capability across Exchange, SharePoint, Teams and OneDrive",
      "No legal hold mechanism — account deletion could destroy evidence",
      "Manual, inconsistent collection risking missed evidence",
      "No documented, repeatable investigation process for regulators",
    ],
    compliance: [
      "Legal hold and litigation-readiness requirements",
      "Regulatory evidence production requirements",
      "Auditable investigation and export workflow",
    ],
  },
  solutionOverview: [
    "Microsoft Purview eDiscovery (Standard) organises every investigation activity inside a named case, providing role-based access, search history and export jobs in one auditable container.",
    "A Finance Investigation case was created, data sources across Exchange Online, SharePoint Online, OneDrive and Microsoft Teams were added, and a KQL query combining sender, subject, date range and file-type conditions was built, executed and reviewed before exporting a structured evidence package.",
  ],
  architectureCaption:
    "A named eDiscovery case aggregates search, hold and export activity across Exchange, SharePoint, OneDrive and Teams, producing a structured, auditable evidence package for legal and compliance teams.",
  technologyStack: [
    { name: "Microsoft Purview eDiscovery (Standard)", description: "Case management, KQL search and export" },
    { name: "KQL (Keyword Query Language)", description: "Precise multi-condition search across workloads" },
    { name: "Exchange Online / SharePoint / OneDrive / Teams", description: "Searched Microsoft 365 data sources" },
    { name: "Unified Audit Log", description: "Records all case activity for audit evidence" },
    { name: "PowerShell", description: "Case creation, inventory and export automation" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Microsoft 365 E5 Trial" },
    { label: "eDiscovery Tier", value: "eDiscovery Standard" },
    { label: "Case Name", value: "Finance Investigation" },
    { label: "Data Sources", value: "Exchange Online, SharePoint Online, OneDrive, Microsoft Teams" },
    { label: "Search Type", value: "KQL (Keyword Query Language)" },
    { label: "Export Format", value: "Evidence package (PST / CSV)" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Enable eDiscovery",
      description: "Confirm eDiscovery access and the investigator's role assignment.",
      steps: [
        "Navigate to compliance.microsoft.com → Solutions → eDiscovery",
        "Confirm eDiscovery (Standard) is available",
        "Assign the eDiscovery Manager role — not granted automatically to Global Admins",
      ],
    },
    {
      phase: "Phase 2",
      title: "Create Investigation Case",
      description: "Create a named case to contain all investigation activity.",
      steps: [
        "Select Create a case",
        "Name the case \"Finance Investigation\" with a description",
        "Confirm the case appears in the cases list",
      ],
    },
    {
      phase: "Phase 3",
      title: "Configure Data Sources & Build KQL Search",
      description: "Add data sources and build a targeted KQL query.",
      steps: [
        "Add Exchange Online, SharePoint Online, OneDrive and Teams as sources",
        "Build a KQL query combining keyword, sender, subject, date and file-type conditions",
        "Run the query and review the estimated item count and data size",
      ],
    },
    {
      phase: "Phase 4",
      title: "Export Evidence",
      description: "Export matching content as a structured evidence package.",
      steps: [
        "Select Export Results",
        "Choose export scope (all items vs. excluding unindexed/encrypted items)",
        "Deliver the structured package (PST + manifest) to the legal team",
      ],
    },
  ],
  powershell: [
    {
      title: "Create an eDiscovery case",
      language: "powershell",
      filename: "New-eDiscoveryCase.ps1",
      code: `# Illustrative scaffold based on New-eDiscoveryCase.ps1
.\\New-eDiscoveryCase.ps1 \`
  -CaseName "Finance Investigation" \`
  -Description "Finance-related emails and documents investigation" \`
  -Members "investigator@yourtenant.onmicrosoft.com"`,
    },
    {
      title: "List eDiscovery cases",
      language: "powershell",
      filename: "Get-eDiscoveryCases.ps1",
      code: `# Illustrative scaffold based on Get-eDiscoveryCases.ps1
Get-ComplianceCase | Select-Object Name, Status, CreatedDateTime`,
    },
  ],
  screenshots: [
    ...shots("Phase 1 · Overview", [
      ["eDiscovery Solutions Menu", "eDiscovery entry point in the Microsoft Purview Solutions menu.", "/projects/purview-ediscovery/screenshots/01-overview/01-overview__01-ediscovery-solutions-menu.png"],
    ]),
    ...shots("Phase 2 · Create Case", [
      ["eDiscovery Cases Page", "The eDiscovery cases list before the new case is created.", "/projects/purview-ediscovery/screenshots/02-create-case/02-create-case__01-ediscovery-cases-page.png"],
      ["Create Case Form", "Naming and describing the Finance Investigation case.", "/projects/purview-ediscovery/screenshots/02-create-case/02-create-case__02-create-case-form.png"],
      ["Case Created", "Finance Investigation confirmed in the cases list.", "/projects/purview-ediscovery/screenshots/02-create-case/02-create-case__03-case-created-list.png"],
    ]),
    ...shots("Phase 3 · Content Search", [
      ["Add Sources Button", "Adding data sources to the Finance Investigation search.", "/projects/purview-ediscovery/screenshots/04-content-search/04-content-search__01-add-sources-button.png"],
      ["Data Source Selection", "Selecting Exchange, SharePoint, OneDrive and Teams as search locations.", "/projects/purview-ediscovery/screenshots/04-content-search/04-content-search__02-data-source-selection.png"],
      ["Search Condition Builder", "Building the KQL query with keyword, sender, subject and date conditions.", "/projects/purview-ediscovery/screenshots/04-content-search/04-content-search__03-search-condition-builder.png"],
      ["Search Results", "Estimated item count and data size after running the query.", "/projects/purview-ediscovery/screenshots/04-content-search/04-content-search__04-search-results.png"],
    ]),
    ...shots("Phase 4 · Export Results", [
      ["Export Screen", "Configuring the evidence export package for legal team delivery.", "/projects/purview-ediscovery/screenshots/06-export-results/06-export-results__01-export-screen.png"],
    ]),
  ],
  validation: [
    { item: "eDiscovery Accessible", detail: "Solution accessible at compliance.microsoft.com with the Manager role assigned." },
    { item: "Case Created", detail: "Finance Investigation case created and visible in the cases list." },
    { item: "Data Sources Added", detail: "Exchange, SharePoint, OneDrive and Teams added to the search." },
    { item: "KQL Search Executed", detail: "Search configured and executed successfully." },
    { item: "Results Reviewed", detail: "0 items returned — expected behaviour in a low-activity test tenant." },
    { item: "Export Accessible", detail: "Export screen accessed with configuration options available." },
  ],
  challenges: [
    {
      title: "eDiscovery Manager role not automatic",
      detail: "Global Administrators are not automatically granted the eDiscovery Manager role — it must be assigned explicitly before a case can be created.",
    },
    {
      title: "Empty results in a test tenant",
      detail: "The content search returned 0 matching items, which is expected behaviour in a newly provisioned tenant with minimal sample data — the workflow itself is unaffected.",
    },
  ],
  lessons: [
    "Always run content searches inside a case — searching outside a case provides no investigation audit trail.",
    "KQL precision (sender, subject, date range, file type) prevents scope creep from broad keyword-only searches.",
    "Use Microsoft Edge for the eDiscovery export function; some export integrations are unreliable in other browsers.",
    "Test tenants with minimal activity will legitimately return 0 results — this does not indicate misconfiguration.",
  ],
  businessImpact: [
    { label: "Unified Investigation", value: "4 workloads, 1 case", icon: "efficiency" },
    { label: "Litigation Readiness", value: "Structured export", icon: "compliance" },
    { label: "Audit Trail", value: "Case-based activity log", icon: "shield" },
    { label: "Reduced Risk", value: "Repeatable process", icon: "risk" },
  ],
  skills: [
    "Microsoft Purview eDiscovery",
    "Case Management",
    "KQL Query Design",
    "Evidence Export & Legal Hold Concepts",
    "PowerShell Automation",
  ],
  relatedCertifications: ["MS-102", "SC-400"],
  blogArticles: [
    {
      title: "eDiscovery in Microsoft Purview Lab Guide",
      description: "Case creation, KQL search and export walkthrough.",
      url: "https://techcertguide.blog/ediscovery-in-microsoft-purview/",
    },
  ],
  repo: {
    name: "lokeshm-it/Microsoft-Purview-eDiscovery",
    description: "Case-based eDiscovery investigation — KQL content search and evidence export implementation.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-eDiscovery",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 10. Microsoft Purview Data Lifecycle Management */
/* ------------------------------------------------------------------ */

const purviewDlm: CaseStudy = {
  slug: "purview-dlm",
  title: "Microsoft Purview Data Lifecycle Management",
  tagline:
    "Organisation-wide retention policies with static scope, plus item-level retention labels targeted via adaptive scope.",
  category: "Compliance · Governance",
  hero: false,
  outcome:
    "Enforced a 7-year baseline retention policy tenant-wide and published an item-level Finance record label dynamically to Finance-department users.",
  badges: ["Microsoft Purview", "Retention Policies", "Retention Labels", "Adaptive Scope"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "2–3 weeks",
  certifications: ["MS-102"],
  executiveSummary: [
    "This project implements Microsoft Purview Data Lifecycle Management, combining an organisation-wide retention policy with static scope and an item-level retention label targeted dynamically to Finance-department users via an adaptive scope query.",
    "The result is a baseline governance layer — a 7-year retain-then-delete policy across Exchange, SharePoint, OneDrive, Teams and Microsoft 365 Groups — with a Finance-specific record label published on top for content that needs different, item-level retention treatment.",
  ],
  businessProblem: {
    problem:
      "Data accumulated across Microsoft 365 without a formal lifecycle framework, creating regulatory exposure for records that must be retained for defined periods, storage and cost inefficiency from data retained indefinitely, GDPR liability from over-retained personal data, and inconsistent governance dependent on individual users remembering to act.",
    importance:
      "Regulations such as APRA, FCA and SEC guidance require specific retention periods for financial records; compliance cannot be built on individual memory, and it must scale to the entire organisation without manual per-user configuration.",
    risks: [
      "Regulatory exposure from records not retained for required periods",
      "Storage and cost inefficiency from unmanaged data accumulation",
      "GDPR liability from personal data retained beyond its need",
      "Inconsistent governance dependent on individual user action",
    ],
    compliance: [
      "Financial record retention obligations (7-year baseline)",
      "GDPR data minimisation and storage limitation",
      "Consistent, auditable retention evidence",
    ],
  },
  solutionOverview: [
    "A tenant-wide retention policy (MS102-Retention-Policy) was configured with static scope covering Exchange Online, SharePoint Online, OneDrive, Microsoft Teams and Microsoft 365 Groups, retaining and then deleting content after 7 years as the organisational baseline.",
    "On top of that baseline, a retention label (MS102-Finance-Record, also 7 years, retain-then-delete) was published specifically to Finance department users via an adaptive scope querying the Department attribute — meaning new Finance users are automatically included without manual list maintenance. When both a policy and a label apply to the same content, the longer, more protective retention period wins.",
  ],
  architectureCaption:
    "A static-scope retention policy sets the organisation-wide 7-year baseline across all core workloads, while a retention label published via an adaptive scope (Department = Finance) applies item-level retention to Finance content specifically.",
  architectureImage: "/projects/purview-dlm/screenshots/02-architecture-diagram.avif",
  technologyStack: [
    { name: "Microsoft Purview Data Lifecycle Management", description: "Retention policies, labels and adaptive scopes" },
    { name: "Retention Policies (Static Scope)", description: "Organisation-wide baseline retention across workloads" },
    { name: "Retention Labels", description: "Item-level retention control layered on top of the baseline" },
    { name: "Adaptive Scopes", description: "Attribute-driven, dynamic targeting (Department = Finance)" },
    { name: "PowerShell / Microsoft Graph", description: "Policy auditing, label export and adaptive scope publishing" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Patchthecloud.onmicrosoft.com" },
    { label: "Portal", value: "purview.microsoft.com" },
    { label: "Retention Policy", value: "MS102-Retention-Policy — 7 years, static scope" },
    { label: "Retention Label", value: "MS102-Finance-Record — 7 years, adaptive scope" },
    { label: "Adaptive Scope", value: "Finance Users — Department = Finance" },
    { label: "Workloads", value: "Exchange, SharePoint, OneDrive, Teams, M365 Groups" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Overview & Portal Navigation",
      description: "Review the Data Lifecycle Management solution and plan static vs. adaptive scope usage.",
      steps: [
        "Review the Purview portal and Data Lifecycle Management solution",
        "Decide where static scope (organisation baseline) applies vs. item-level labels",
        "Review the workflow and architecture reference diagrams",
      ],
    },
    {
      phase: "Phase 2",
      title: "Retention Policy — Static Scope",
      description: "Create and publish MS102-Retention-Policy across all core workloads.",
      steps: [
        "Name the policy and confirm static scope",
        "Select Exchange, SharePoint, OneDrive, Teams and M365 Groups as covered workloads",
        "Configure a 7-year retain-then-delete retention period and publish",
      ],
    },
    {
      phase: "Phase 3",
      title: "Retention Labels",
      description: "Create MS102-Finance-Record for item-level Finance record retention.",
      steps: [
        "Name the label and select its retention type",
        "Configure a 7-year retain-then-delete retention action",
        "Review record declaration settings (left disabled for this foundational lab)",
      ],
    },
    {
      phase: "Phase 4",
      title: "Adaptive Scope & Label Policy",
      description: "Publish the Finance label dynamically using an adaptive scope query.",
      steps: [
        "Create the Finance Users adaptive scope (Department = Finance)",
        "Publish the label policy to Exchange, SharePoint and OneDrive via the adaptive scope",
        "Review and confirm the label policy before publishing",
      ],
    },
  ],
  powershell: [
    {
      title: "Audit retention policies",
      language: "powershell",
      filename: "Get-RetentionPolicies.ps1",
      code: `# Illustrative scaffold based on Get-RetentionPolicies.ps1
Get-RetentionCompliancePolicy | Select-Object Name, Enabled, Mode, RetentionRuleTypes`,
    },
    {
      title: "Export retention label inventory",
      language: "powershell",
      filename: "Export-RetentionLabels.ps1",
      code: `# Illustrative scaffold based on Export-RetentionLabels.ps1
Get-ComplianceTag | Select-Object Name, RetentionDuration, RetentionAction, IsRecordLabel |
  Export-Csv -Path .\\reports\\retention-labels.csv -NoTypeInformation`,
    },
    {
      title: "Publish retention labels via adaptive scope",
      language: "powershell",
      filename: "Publish-RetentionLabels.ps1",
      code: `# Illustrative scaffold based on Publish-RetentionLabels.ps1
New-AdaptiveScope -Name "Finance Users" -PolicyType User -LocationRule \`
  (New-AdaptiveScopeLocationRule -QueryString "Department -eq 'Finance'")

New-RetentionCompliancePolicy -Name "Finance Label Policy" \`
  -AdaptiveScopeLocation "Finance Users"`,
    },
  ],
  screenshots: [
    ...shots("Phase 1 · Overview & Workflow", [
      ["Purview Portal Home", "Microsoft Purview compliance portal landing page.", "/projects/purview-dlm/screenshots/01-overview__01-purview-portal-home.avif"],
      ["Solutions Navigation", "Navigating the Purview Solutions menu toward Data Lifecycle Management.", "/projects/purview-dlm/screenshots/01-overview__02-information-protection-solution.avif"],
      ["Portal Navigation", "Navigating within the compliance portal toward retention policies and labels.", "/projects/purview-dlm/screenshots/01-overview__03-sensitivity-labels-navigation.avif"],
      ["Workflow Diagram", "End-to-end workflow diagram covering retention policy and label lifecycle.", "/projects/purview-dlm/screenshots/03-workflow-diagram.avif"],
    ]),
    ...shots("Phase 2 · Retention Policy — Static Scope", [
      ["DLM Navigation", "Navigating to Data Lifecycle Management in the compliance portal.", "/projects/purview-dlm/screenshots/04-dlm-navigation.avif"],
      ["Create Policy Wizard", "Starting the retention policy creation wizard.", "/projects/purview-dlm/screenshots/05-create-policy-wizard.avif"],
      ["Policy Naming & Scope", "Naming MS102-Retention-Policy and confirming static scope.", "/projects/purview-dlm/screenshots/06-policy-naming-scope.avif"],
      ["Workload Selection", "Selecting Exchange, SharePoint, OneDrive, Teams and M365 Groups as covered workloads.", "/projects/purview-dlm/screenshots/07-workload-selection.avif"],
      ["Retention Settings", "Configuring a 7-year retain-then-delete retention period.", "/projects/purview-dlm/screenshots/08-retention-settings.avif"],
      ["Review & Publish", "Final review before publishing the retention policy.", "/projects/purview-dlm/screenshots/09-review-publish.avif"],
      ["Policy Deployed", "MS102-Retention-Policy deployed and showing Enabled (Pending) status.", "/projects/purview-dlm/screenshots/10-policy-deployed.avif"],
    ]),
    ...shots("Phase 3 · Retention Labels", [
      ["Retention Labels Overview", "Retention labels area of the Data Lifecycle Management solution.", "/projects/purview-dlm/screenshots/11-featured-retention-labels.avif"],
      ["Label Architecture", "Architecture reference for retention label configuration.", "/projects/purview-dlm/screenshots/12-labels-architecture-diagram.avif"],
      ["Labels Navigation", "Navigating to retention labels within Data Lifecycle Management.", "/projects/purview-dlm/screenshots/13-dlm-labels-navigation.avif"],
      ["Create Label — Name", "Naming the MS102-Finance-Record retention label.", "/projects/purview-dlm/screenshots/14-create-label-name.avif"],
      ["Retention Type", "Selecting the retention type for the Finance record label.", "/projects/purview-dlm/screenshots/15-retention-settings-type.avif"],
      ["7-Year Retention Period", "Setting a 7-year retention period on the label.", "/projects/purview-dlm/screenshots/16-retention-period-7years.avif"],
      ["Retain and Delete", "Configuring the Retain-then-Delete retention action.", "/projects/purview-dlm/screenshots/17-retain-and-delete.avif"],
      ["Review Record Settings", "Reviewing record declaration settings before publishing the label.", "/projects/purview-dlm/screenshots/18-review-record-settings.avif"],
    ]),
    ...shots("Phase 4 · Adaptive Scope & Label Policy", [
      ["Publish Label Policy — Start", "Beginning the process to publish the Finance retention label policy.", "/projects/purview-dlm/screenshots/03-label-policies__01-publish-label-start.avif"],
      ["Publish Label Policy", "Publishing the MS102-Finance-Record label policy.", "/projects/purview-dlm/screenshots/19-publish-label-start.avif"],
      ["Publish Locations", "Selecting Exchange Online, SharePoint Online and OneDrive as publish locations.", "/projects/purview-dlm/screenshots/20-publish-locations.avif"],
      ["Adaptive Scope Configuration", "Configuring the Finance Users adaptive scope query.", "/projects/purview-dlm/screenshots/21-adaptive-scope-config.avif"],
      ["Adaptive Scope Details", "Department = Finance adaptive scope query details.", "/projects/purview-dlm/screenshots/22-adaptive-scope-details.avif"],
      ["Label Policy Name", "Naming the Finance label policy.", "/projects/purview-dlm/screenshots/23-label-policy-name.avif"],
      ["Label Policy Review", "Final review of the Finance label policy before publishing.", "/projects/purview-dlm/screenshots/24-label-policy-review.avif"],
    ]),
  ],
  validation: [
    { item: "Retention Policy Deployed", detail: "MS102-Retention-Policy shows Enabled (Pending) across all configured workloads." },
    { item: "Retention Label Created", detail: "MS102-Finance-Record created with a 7-year retain-then-delete action." },
    { item: "Adaptive Scope Active", detail: "Finance Users adaptive scope dynamically includes Department = Finance users." },
    { item: "Label Policy Published", detail: "Finance label policy published to Exchange, SharePoint and OneDrive." },
    { item: "Most Protective Wins", detail: "Confirmed the longer retention period applies when policy and label overlap." },
  ],
  challenges: [
    {
      title: "Adaptive scopes depend on clean Entra ID attributes",
      detail: "The Finance Users adaptive scope queries Department = Finance; users without this attribute populated are silently excluded from the scope.",
    },
    {
      title: "Propagation takes time",
      detail: "Both the retention policy and label policy showed Enabled (Pending) immediately after creation — full propagation across all workloads can take several hours, which is expected behaviour, not an error.",
    },
  ],
  lessons: [
    "Static scope is simpler and equally effective for baseline, organisation-wide policies.",
    "Publishing a label ≠ applying it — auto-apply policies or manual user action are still required to classify content.",
    "Adaptive scopes require consistent Entra ID attribute data or users are silently excluded.",
    "When multiple retention settings apply to the same item, the longer, most protective retention period wins.",
  ],
  businessImpact: [
    { label: "Baseline Governance", value: "7-year org-wide policy", icon: "compliance" },
    { label: "Dynamic Targeting", value: "Adaptive scope", icon: "efficiency" },
    { label: "Reduced Storage Risk", value: "Automated disposition", icon: "risk" },
    { label: "Audit-Ready", value: "Verifiable retention evidence", icon: "shield" },
  ],
  skills: [
    "Microsoft Purview Data Lifecycle Management",
    "Retention Policy Design (Static Scope)",
    "Retention Labels (Item-Level Control)",
    "Adaptive Scopes",
    "PowerShell / Microsoft Graph",
  ],
  relatedCertifications: ["MS-102"],
  blogArticles: [
    {
      title: "Retention Policies in Microsoft Purview",
      description: "Static-scope, organisation-wide retention policy design.",
      url: "https://techcertguide.blog/retention-policies-in-microsoft-purview/",
    },
    {
      title: "Retention Labels in Microsoft Purview",
      description: "Item-level retention labels and adaptive scope publishing.",
      url: "https://techcertguide.blog/retention-labels-in-microsoft-purview/",
    },
  ],
  repo: {
    name: "lokeshm-it/Microsoft-Purview-Data-Lifecycle-Management",
    description: "Retention policies (static scope) and retention labels (adaptive scope) implementation.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-Data-Lifecycle-Management",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 11. Microsoft Purview Data Security Investigations                  */
/* ------------------------------------------------------------------ */

const purviewDsi: CaseStudy = {
  slug: "purview-dsi",
  title: "Microsoft Purview Data Security Investigations",
  tagline:
    "AI-powered departing-employee exfiltration investigation — scoped evidence collection, generative AI categorization, natural-language search and deep content examination inside Microsoft Purview.",
  category: "Compliance · Insider Risk",
  hero: false,
  outcome:
    "Triaged 10 collected files down to the one document containing regulated payment card data and tracked it through to a fully audited mitigation, using Microsoft Purview's generative AI investigation workspace end to end.",
  badges: ["Microsoft Purview", "Data Security Investigations", "Generative AI", "Insider Risk Management", "SC-400", "SC-200"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Home Lab",
  implementationTime: "1 week",
  certifications: ["SC-400", "MS-102", "SC-200"],
  executiveSummary: [
    "This project built an end-to-end Microsoft Purview Data Security Investigations (DSI) case modeled on a departing-employee insider-risk scenario, using the built-in \"Surface employee data exfiltration\" template to scope, collect and analyze evidence for a single user.",
    "Evidence was collected across Exchange/SharePoint (Audit) and Windows endpoint (Endpoint DLP) sources, then run through DSI's generative AI stages: automatic content categorization, natural-language AI Search, and deep AI Examination of the single highest-risk document.",
    "The investigation traced a confirmed high-risk file — containing nine payment card numbers — from initial collection through AI-assisted triage to a completed entry in the Mitigation list, with every stage logged in a timestamped Activities audit trail.",
  ],
  businessProblem: {
    problem:
      "A departing employee may access, copy or export confidential company data before their last day, and security teams have no fast way to reconstruct exactly what that employee touched across mailbox and file storage, or what kind of regulated data it actually contains.",
    importance:
      "Manually opening and reading every collected file to classify it does not scale, and traditional keyword search can confirm a document exists without revealing what regulated data it holds or at what risk level — a gap that matters most in the narrow window between resignation and exit.",
    risks: [
      "Undetected exfiltration of financial, personal or proprietary data by a departing employee",
      "No structured way to triage which collected files actually contain regulated data types",
      "Findings escalated to HR or legal without a defensible, auditable evidence trail",
      "Delayed response caused by manually reviewing every collected item by hand",
    ],
    compliance: [
      "Insider risk / data exfiltration investigation practice",
      "Auditability and chain-of-custody for HR and legal handoff",
      "Regulated data identification (payment card and personal data)",
    ],
  },
  solutionOverview: [
    "The investigation was built using Microsoft Purview's \"Surface employee data exfiltration\" template, scoped to a single departing user's mailbox and SharePoint/OneDrive sites, then carried through AI categorization, natural-language search, targeted AI examination and mitigation tracking inside one investigation workspace.",
  ],
  architectureCaption:
    "Audit and Endpoint DLP evidence sources feed a single DSI investigation workspace, where Categorize, AI Search and Examine progressively narrow the evidence set down to a confirmed high-risk file tracked through the Mitigation list.",
  technologyStack: [
    { name: "Microsoft Purview Data Security Investigations", description: "Generative AI-powered investigation workspace — Identify, Analyze, Mitigate" },
    { name: "Audit (Unified Audit Log)", description: "Exchange, SharePoint and OneDrive evidence collection source" },
    { name: "Endpoint DLP", description: "Data-loss activity evidence from managed Windows devices" },
    { name: "Categorize with AI", description: "Generative AI classifier assigning content categories per collected item" },
    { name: "AI Search (preview)", description: "Natural-language question-and-answer search over the evidence set" },
    { name: "Examine", description: "Deep AI content examination extracting and risk-rating specific data types" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "securem365lsb.onmicrosoft.com (Microsoft 365 lab tenant)" },
    { label: "Investigation", value: "Test User 1 - Data exfiltration investigation" },
    { label: "Template", value: "Surface employee data exfiltration" },
    { label: "Subject user", value: "testuser1@securem365lsb.onmicrosoft.com" },
    { label: "Data sources", value: "Audit, Endpoint DLP" },
    { label: "Items collected", value: "10 (Word, Excel, .cmd, .zip)" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Access Data Security Investigations",
      description: "Open DSI from the Purview Solutions menu and complete the required setup tasks before first use.",
      steps: [
        "Confirm pay-as-you-go billing for data storage is configured",
        "Provision AI capacity units for the AI-powered stages",
        "Confirm Admin/Investigator/Reviewer roles are assigned",
      ],
    },
    {
      phase: "Phase 2",
      title: "Create the investigation",
      description: "Stand up a scoped investigation using a pre-built template rather than building scope logic from scratch.",
      steps: [
        "Select \"Surface employee data exfiltration\" from the search template dialog",
        "Enter the subject user and review the auto-filled AI context and date range",
        "Confirm the auto-filled user activity list and start investigating",
      ],
    },
    {
      phase: "Phase 3",
      title: "Identify: scope search and data sources",
      description: "Add the subject user as a data source across both cloud and endpoint evidence.",
      steps: [
        "Add the subject user via \"Search for sources\" and confirm mailbox and site inclusion in Manage sources",
        "Configure the Endpoint DLP tab with a matching date range for device-level evidence",
        "Add the scoped sources to the investigation and monitor Audit search progress",
      ],
    },
    {
      phase: "Phase 4",
      title: "Analyze: categorize and search",
      description: "Run the collected evidence through AI categorization and query it in natural language.",
      steps: [
        "Run Categorize with AI across all 10 prepared items",
        "Review the resulting content categories across the evidence set",
        "Ask AI Search (preview) a natural-language question to triage down to the files that mattered",
      ],
    },
    {
      phase: "Phase 5",
      title: "Examine the highest-risk file",
      description: "Run deep AI content examination against the single most concerning document.",
      steps: [
        "Select the highest-risk file and choose an Examination type (Personal Data / Credentials)",
        "Review the structured results table of extracted, risk-rated findings",
        "Cross-check the AI-generated disclaimer before treating findings as confirmed",
      ],
    },
    {
      phase: "Phase 6",
      title: "Mitigate and audit",
      description: "Track remediation to completion and export a full audit trail.",
      steps: [
        "Add the confirmed high-risk file to the Mitigation list and update its status to Completed",
        "Review the Activities tab for a full timestamped history of every investigation action",
        "Export the Activities and Summary content ahead of HR/legal handoff",
      ],
    },
  ],
  powershell: [
    {
      title: "Reconstruct the audit search window used by the investigation template",
      language: "powershell",
      filename: "Get-DSIAuditActivity.ps1",
      code: `# Illustrative scaffold mirroring the "Surface employee data exfiltration" template scope
Connect-IPPSSession -UserPrincipalName admin@yourtenant.onmicrosoft.com

.\Get-DSIAuditActivity.ps1 \`
  -UserPrincipalName "testuser1@securem365lsb.onmicrosoft.com" \`
  -StartDate (Get-Date).AddDays(-7) \`
  -EndDate (Get-Date) \`
  -Operations "FileAccessed","FileCopied","FileDeleted","FileDownloaded","FileMoved","FileRenamed","FileUploaded","SensitivityLabelChanged","SensitivityLabelRemoved","Send"`,
    },
  ],
  screenshots: [
    { title: "Purview Solutions Menu", caption: "Data Security Investigations entry point alongside Audit, DLP and Insider Risk Management.", phase: "Phase 1" },
    { title: "Investigation Template Selection", caption: "\"Surface employee data exfiltration\" template chosen from the Create investigation dialog.", phase: "Phase 2" },
    { title: "Data Source Scoping", caption: "Subject user added with mailbox and site inclusion confirmed in Manage sources.", phase: "Phase 3" },
    { title: "AI Categorization Results", caption: "10 collected items classified into 11 content categories.", phase: "Phase 4" },
    { title: "AI Search (preview)", caption: "Natural-language question narrows the evidence set to the two files containing card data.", phase: "Phase 4" },
    { title: "Examine Results", caption: "Structured findings table showing 9 risk-rated payment card numbers extracted from a single document.", phase: "Phase 5" },
    { title: "Mitigation List", caption: "Confirmed high-risk file tracked to a Completed remediation status.", phase: "Phase 6" },
    { title: "Activities Audit Trail", caption: "Full timestamped history of every Audit search, Categorize and Examine action.", phase: "Phase 6" },
  ],
  validation: [
    { item: "Investigation Created", detail: "Investigation created from the \"Surface employee data exfiltration\" template with auto-filled AI context and date range." },
    { item: "Sources Scoped", detail: "Subject user's mailbox and site confirmed via Manage sources." },
    { item: "Endpoint DLP Configured", detail: "Endpoint DLP search tab configured with a matching date range and subject user." },
    { item: "Evidence Collected", detail: "Audit search completed; 10 items added to scope and prepared for AI." },
    { item: "AI Categorization", detail: "Categorize produced 11 distinct content categories across the 10 items." },
    { item: "AI Search Accuracy", detail: "Natural-language query correctly cited the 2 files that actually contained card numbers." },
    { item: "AI Examination", detail: "Examine extracted 9 risk-rated payment card numbers from the highest-risk file." },
    { item: "Mitigation Tracked", detail: "High-risk file tracked in the Mitigation list through to Completed status." },
    { item: "Full Audit Trail", detail: "Activities tab recorded timestamps, duration and performing account for every action." },
  ],
  challenges: [
    {
      title: "AI output is an accelerant, not a verdict",
      detail: "Purview explicitly flags Categorize and Examine output as AI-generated and possibly incorrect, so every high-risk finding was treated as a lead requiring human confirmation before any HR or legal action.",
    },
    {
      title: "No published PowerShell equivalent for the AI stages",
      detail: "Categorize, AI Search and Examine are portal/Copilot-driven with no direct cmdlet equivalent, so automation was scoped to the evidence-gathering side using Search-UnifiedAuditLog.",
    },
  ],
  lessons: [
    "AI capacity and pay-as-you-go billing are hard prerequisites — Categorize, AI Search and Examine will not run without both provisioned first.",
    "Templates auto-fill context that should be reviewed, not assumed, especially the lookback window against an employee's actual notice period.",
    "Categorize and Examine are complementary: Categorize triages breadth across the whole evidence set, Examine gives depth on the highest-priority file.",
    "The Activities tab is the definitive, exportable audit trail for any investigation that could become an HR or legal matter.",
  ],
  businessImpact: [
    { label: "Investigation Turnaround", value: "10 files triaged to 1 in minutes", icon: "efficiency" },
    { label: "Regulated Data Found", value: "9 card numbers, High risk", icon: "risk" },
    { label: "Mitigation Tracked", value: "Completed status, fully audited", icon: "compliance" },
    { label: "Insider Risk Coverage", value: "Mailbox + endpoint evidence", icon: "shield" },
  ],
  skills: [
    "Microsoft Purview Data Security Investigations",
    "Insider risk / data exfiltration investigation methodology",
    "Generative AI-assisted categorization and natural-language search",
    "Deep content examination and sensitive data risk rating",
    "Unified Audit Log and Endpoint DLP evidence configuration",
    "PowerShell automation for compliance evidence gathering",
  ],
  relatedCertifications: ["SC-400", "MS-102", "SC-200", "SC-300"],
  blogArticles: [],
  repo: {
    name: "lokeshm-it/Microsoft-Purview-Data-Security-Investigations",
    description: "AI-powered departing-employee data exfiltration investigation built on Microsoft Purview Data Security Investigations.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-Data-Security-Investigations",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 12. Microsoft Purview Communication Compliance                      */
/* ------------------------------------------------------------------ */

const purviewCommComp: CaseStudy = {
  slug: "purview-communication-compliance",
  title: "Microsoft Purview Communication Compliance",
  tagline:
    "Policy-driven detection of sensitive information and code-of-conduct risk across Exchange, Teams and Viva Engage, with a full reviewer investigation and remediation workflow.",
  category: "Compliance · Insider Risk",
  hero: false,
  outcome:
    "Stood up a tenant-wide Communication Compliance policy that automatically detected a regulated national ID number shared in a test message and routed it to a reviewer within a fully auditable investigation workflow.",
  badges: ["Microsoft Purview", "Communication Compliance", "Insider Risk", "Exchange", "Microsoft Teams", "Viva Engage"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Home Lab",
  implementationTime: "1 week",
  certifications: ["SC-400", "MS-102"],
  executiveSummary: [
    "This project implemented Microsoft Purview Communication Compliance to automatically detect code-of-conduct and regulatory violations in internal and external communications, replacing manual review with policy-driven detection and a dedicated reviewer queue.",
    "A \"Detect sensitive info types\" policy was configured to scan Exchange, Microsoft Teams and Viva Engage for the India Unique Identification (Aadhaar) Number sensitive information type, scoped to all users with a 100% review rate.",
    "A test message containing a sample Aadhaar Number and VID was sent between two lab accounts, correctly detected by the policy, and routed to the Pending review queue where the full reviewer remediation workflow was exercised end to end.",
  ],
  businessProblem: {
    problem:
      "Employees exchange sensitive personal identifiers and other code-of-conduct-risk content over email and chat with no systematic oversight, and compliance teams cannot manually review the full volume of internal and external communications.",
    importance:
      "Without an automated detection and escalation path, code-of-conduct violations and confidential data leakage are discovered only after the fact, and organizations lack the documented review process auditors and regulators expect.",
    risks: [
      "Undetected sharing of regulated personal identifiers over email, chat or Viva Engage",
      "No automated escalation path between a detected violation and a human reviewer",
      "Code-of-conduct and harassment violations discovered too late to limit damage",
      "No evidentiary record of proactive communication monitoring for audit purposes",
    ],
    compliance: [
      "Code-of-conduct and insider risk monitoring practice",
      "Regulated personal identifier detection (national ID formats)",
      "Auditable reviewer decision and remediation trail",
    ],
  },
  solutionOverview: [
    "The solution used Microsoft Purview Communication Compliance's \"Detect sensitive info types\" template to build a single policy spanning Exchange, Teams and Viva Engage, scoped to all users, with a 100% review rate for a high-sensitivity national ID sensitive information type, and a dedicated reviewer investigating each match through to remediation.",
  ],
  architectureCaption:
    "Exchange, Teams and Viva Engage communications are scanned by a single Communication Compliance policy; matches route to a reviewer queue offering resolve, dismiss, escalate, notify, tag, remove and automate actions.",
  technologyStack: [
    { name: "Microsoft Purview Communication Compliance", description: "Policy-driven detection, review and remediation workspace" },
    { name: "Sensitive Information Types (SITs)", description: "India Unique Identification (Aadhaar) Number classifier" },
    { name: "Exchange Online", description: "Email monitoring location" },
    { name: "Microsoft Teams", description: "Chat/channel monitoring location" },
    { name: "Viva Engage", description: "Enterprise social monitoring location" },
    { name: "Reviewer Queue", description: "Pending / Resolved / Exports investigation workflow" },
  ],
  labEnvironment: [
    { label: "Tenant", value: "Microsoft 365 lab tenant" },
    { label: "Policy name", value: "Sensitive information" },
    { label: "Policy template", value: "Detect sensitive info types" },
    { label: "Sensitive info type", value: "India Unique Identification (Aadhaar) Number" },
    { label: "Scoped locations", value: "Exchange, Microsoft Teams, Viva Engage" },
    { label: "Reviewer", value: "admin365 lab" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Access Communication Compliance",
      description: "Open Communication Compliance from the Purview Solutions menu and confirm licensing and role prerequisites.",
      steps: [
        "Confirm a Communication Compliance license (E5, E5 Compliance add-on, or standalone add-on)",
        "Confirm the account holds a Communication Compliance Admin or Analyst/Investigator role",
        "Assign a reviewer account before policy activation",
      ],
    },
    {
      phase: "Phase 2",
      title: "Select a policy template",
      description: "Choose a purpose-built detection template rather than starting from a fully custom policy.",
      steps: [
        "Open Communication Compliance → Policies → Create policy",
        "Review the available templates (sensitive info types, inappropriate content, financial regulatory compliance, conflict of interest, AI interactions)",
        "Select \"Detect sensitive info types\" for this implementation",
      ],
    },
    {
      phase: "Phase 3",
      title: "Configure the sensitive information policy",
      description: "Scope the policy to the target users, sensitive info type and communication locations.",
      steps: [
        "Name the policy \"Sensitive information\" and scope it to all users",
        "Select the India Unique Identification (Aadhaar) Number sensitive info type and assign admin365 lab as reviewer",
        "Confirm auto-filled scoped locations (Exchange, Teams, Viva Engage), direction, 100% review rate, OCR disabled and email blast filtering enabled",
      ],
    },
    {
      phase: "Phase 4",
      title: "Policy activation",
      description: "Allow the detection pipeline to provision before expecting alerts.",
      steps: [
        "Observe the policy in an Activating status immediately after creation",
        "Wait for Microsoft Purview to provision the detection pipeline",
        "Confirm the policy transitions to Active with a Healthy policy health status",
      ],
    },
    {
      phase: "Phase 5",
      title: "Alert detection and reviewer investigation",
      description: "Validate end-to-end detection and exercise the reviewer remediation workflow.",
      steps: [
        "Send a test message containing a sample Aadhaar Number and VID between two lab accounts",
        "Confirm the match appears in the Pending review queue with detected conditions and message content",
        "Exercise reviewer actions (Resolve, Dismiss, Escalate, Notify, Tag as, Remove message) and export the review activity",
      ],
    },
  ],
  powershell: [
    {
      title: "List Communication Compliance policies and create a sensitive-information policy",
      language: "powershell",
      filename: "Get-CommunicationCompliancePolicy.ps1",
      code: `# List all Communication Compliance policies and health status
.\Get-CommunicationCompliancePolicy.ps1

# Create a new sensitive-information policy
.\New-CommunicationComplianceSensitiveInfoPolicy.ps1 \`
  -PolicyName "Sensitive information" \`
  -SensitiveInfoType "India Unique Identification (Aadhaar) Number" \`
  -Reviewers "admin365lab@yourtenant.onmicrosoft.com" \`
  -ReviewPercentage 100`,
    },
  ],
  screenshots: [
    { title: "Purview Solutions Menu", caption: "Communication Compliance entry point alongside Audit, DLP and Data Security Investigations.", phase: "Phase 1" },
    { title: "Policy Template Selection", caption: "\"Detect sensitive info types\" chosen from the Communication Compliance template list.", phase: "Phase 2" },
    { title: "Sensitive Information Policy Configuration", caption: "Policy scoped to all users with the India Aadhaar Number SIT and admin365 lab as reviewer.", phase: "Phase 3" },
    { title: "Policy Activating", caption: "Policy provisioning in an Activating status immediately after creation.", phase: "Phase 4" },
    { title: "Policy Active and Healthy", caption: "Policy transitioned to Active with a Healthy policy health status.", phase: "Phase 4" },
    { title: "Pending Alert Detail", caption: "Detected Aadhaar Number match with conditions, sender, recipient and message content.", phase: "Phase 5" },
    { title: "Reviewer Remediation Actions", caption: "Full remediation action set: Resolve, Dismiss, Escalate, Notify, Tag as, Remove message, Automate.", phase: "Phase 5" },
  ],
  validation: [
    { item: "Solutions Menu Access", detail: "Communication Compliance accessible from the Microsoft Purview Solutions menu." },
    { item: "Template List", detail: "Policy template list displays all available detection templates." },
    { item: "Policy Created", detail: "\"Detect sensitive info types\" policy created with Aadhaar Number SIT, all-users scope and admin365 lab reviewer." },
    { item: "Auto-Filled Settings Confirmed", detail: "Exchange/Teams/Viva Engage scope, In/Out/Internal direction, 100% review, OCR disabled, email blast filter enabled." },
    { item: "Policy Activated", detail: "Policy transitioned from Activating to Active with Healthy status." },
    { item: "Test Message Detected", detail: "Message containing an Aadhaar Number and VID correctly detected and routed to the Pending queue." },
    { item: "Reviewer Pane Verified", detail: "Detail pane displays detected conditions, message content and the full remediation action set." },
  ],
  challenges: [
    {
      title: "Auto-filled defaults still need sign-off",
      detail: "Selecting a template pre-fills scoped locations, direction, review percentage, OCR and email blast filtering; these defaults were explicitly validated against the intended scope rather than accepted blindly.",
    },
    {
      title: "Activation delay before alerts appear",
      detail: "A newly created policy shows an Activating status before scanning begins, so validation testing had to wait for the policy to reach Active/Healthy before sending test messages.",
    },
  ],
  lessons: [
    "Auto-filled settings still require review — scoped locations, direction, review percentage, OCR and email blast filtering should be validated against organizational policy, not accepted by default.",
    "Policies take time to activate — alerts will not appear until the policy reaches Active/Healthy status.",
    "Microsoft ships a default \"User-reported messages\" policy automatically, alongside any custom policies an administrator creates.",
    "Sensitive Information Types are locale-specific — selecting the correct regional SIT (e.g., Aadhaar Number for India) is essential for accurate detection.",
    "The reviewer workflow is action-rich by design, spanning a soft dismissal through hard remediation (message removal) and downstream investigation handoff.",
  ],
  businessImpact: [
    { label: "Detection Coverage", value: "Exchange + Teams + Viva Engage", icon: "shield" },
    { label: "Review Rate", value: "100% for high-sensitivity SIT", icon: "risk" },
    { label: "Policy Health", value: "Active — Healthy", icon: "compliance" },
    { label: "Reviewer Actions", value: "9 remediation actions available", icon: "efficiency" },
  ],
  skills: [
    "Microsoft Purview Communication Compliance",
    "Sensitive Information Type (SIT) policy configuration",
    "Multi-workload compliance monitoring (Exchange, Teams, Viva Engage)",
    "Reviewer investigation and remediation workflow",
    "Insider risk / code-of-conduct detection methodology",
    "PowerShell reporting for Security & Compliance",
  ],
  relatedCertifications: ["SC-400", "MS-102", "SC-300"],
  blogArticles: [],
  repo: {
    name: "lokeshm-it/Microsoft-Purview-Communication-Compliance",
    description: "Enterprise Communication Compliance implementation across Exchange, Teams and Viva Engage with a full reviewer investigation workflow.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-Communication-Compliance",
  },
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
const defenderXdrSentinel: CaseStudy = {
  "slug": "defender-xdr-sentinel",
  "title": "Defender XDR + Microsoft Sentinel",
  "tagline": "Native Defender XDR connector unified with Microsoft Sentinel for cross-pillar incident correlation and automation-first investigation.",
  "category": "Monitoring · Response",
  "hero": false,
  "outcome": "Connected Microsoft Defender XDR (v3.0.12) to a Microsoft Sentinel workspace and validated automated investigation end-to-end: a real Defender for Office 365 phishing-report alert was auto-correlated into a Sentinel incident and closed in 14 minutes with zero analyst intervention.",
  "badges": [
    "Microsoft Sentinel",
    "Defender XDR",
    "SIEM",
    "KQL",
    "SOC Automation"
  ],
  "difficulty": "Advanced",
  "environment": "Microsoft 365 Business Premium / Azure",
  "deployment": "Home Lab",
  "implementationTime": "1 day",
  "certifications": [
    "SC-200",
    "SC-100"
  ],
  "executiveSummary": [
    "This project unified Microsoft Defender XDR with Microsoft Sentinel to close the visibility gap left by the siloed identity, device and email controls built in earlier projects, giving a single pane of glass for detection, investigation and response.",
    "A Log Analytics workspace was provisioned and Microsoft Sentinel enabled, then the native Defender XDR connector (v3.0.12) was installed from Content Hub to stream incidents and alerts from Defender for Endpoint, Defender for Office 365 and Defender for Identity into one workspace.",
    "Validation traced a real signal end-to-end: a user-reported phishing simulation from the email security project surfaced as a Defender for Office 365 alert, was auto-investigated by Defender XDR, and closed as a Low-severity Sentinel incident in 14 minutes with zero manual analyst actions (MTTA: 0 min)."
  ],
  "businessProblem": {
    "problem": "Microsoft 365 Business Premium generates security signals across Defender for Endpoint, Defender for Office 365, Defender for Identity and Entra ID, but each product surfaces alerts in its own console with no shared incident history.",
    "importance": "Without a unified SIEM, attack chains spanning multiple pillars remain invisible, SOC analysts must pivot across separate consoles to correlate signals manually, and there is no centralised, audit-ready incident record for compliance or post-incident review.",
    "risks": [
      "Cross-pillar attack chains going undetected because signals are never correlated",
      "Analyst time consumed pivoting between separate Defender and Entra consoles",
      "No centralised audit trail of incidents, classifications and resolution timelines",
      "Alert fatigue from low-value alerts that are never automatically triaged"
    ],
    "compliance": [
      "Centralised security incident logging for audit and post-incident review",
      "SOC governance reporting (MTTA/MTTC) as evidence of operational maturity"
    ]
  },
  "solutionOverview": [
    "Provisioned a dedicated Log Analytics workspace (sentinal) and enabled Microsoft Sentinel as the cloud-native SIEM on top of it.",
    "Installed the Microsoft Defender XDR solution (v3.0.12) from Sentinel's Content Hub and connected it as a native, agentless, bi-directional connector alongside Defender for Identity and Defender for Office 365 (Preview).",
    "Enabled built-in Defender XDR analytics rules and validated automated investigation and remediation end-to-end using a real cross-project alert, confirming incidents and MTTA/MTTC metrics land correctly in Sentinel."
  ],
  "architectureCaption": "Defender for Endpoint, Defender for Office 365, Defender for Identity and Entra ID stream alerts through the native Defender XDR connector into a Microsoft Sentinel workspace, where automated investigation and analytics rules correlate signals into a single incident timeline.",
  "technologyStack": [
    {
      "name": "Microsoft Sentinel",
      "description": "Cloud-native SIEM for log ingestion, analytics rules and incident management"
    },
    {
      "name": "Log Analytics Workspace",
      "description": "Underlying data store (sentinal) for all ingested security logs"
    },
    {
      "name": "Microsoft Defender XDR Connector",
      "description": "Native bi-directional connector (v3.0.12), no agents or API keys required"
    },
    {
      "name": "Defender for Office 365",
      "description": "Email threat signal source (MDO alerts)"
    },
    {
      "name": "Defender for Identity",
      "description": "Identity-based threat signal source"
    },
    {
      "name": "Analytics Rules",
      "description": "Scheduled KQL queries generating incidents from ingested signals"
    },
    {
      "name": "Automated Investigation & Remediation",
      "description": "Resolves low-risk alerts without analyst action"
    }
  ],
  "labEnvironment": [
    {
      "label": "Tenant",
      "value": "Patchthecloud.onmicrosoft.com"
    },
    {
      "label": "Workspace name",
      "value": "sentinal"
    },
    {
      "label": "Connector version",
      "value": "Microsoft Defender XDR v3.0.12"
    },
    {
      "label": "License",
      "value": "Microsoft 365 Business Premium"
    },
    {
      "label": "Lab date",
      "value": "January 2026"
    }
  ],
  "implementation": [
    {
      "phase": "Phase 1",
      "title": "Workspace creation",
      "description": "Create the Log Analytics workspace and enable Microsoft Sentinel on top of it.",
      "steps": [
        "Create a Log Analytics Workspace (sentinal) in the Azure subscription",
        "Enable Microsoft Sentinel against the new workspace",
        "Confirm the Sentinel Overview blade loads with no data sources connected yet"
      ]
    },
    {
      "phase": "Phase 2",
      "title": "Connector install",
      "description": "Install and connect the native Defender XDR solution from Content Hub.",
      "steps": [
        "Install the Microsoft Defender XDR solution (v3.0.12) from Sentinel Content Hub",
        "Connect the Defender XDR connector — bi-directional, no agents or API keys required",
        "Confirm Defender for Identity shows Connected and Defender for Office 365 (Preview) shows Visible"
      ]
    },
    {
      "phase": "Phase 3",
      "title": "Data source validation",
      "description": "Confirm incidents and alerts are actually flowing into Sentinel.",
      "steps": [
        "Validate connector status = Connected in Data Connectors",
        "Run a KQL query against SecurityIncident to confirm Defender XDR incidents are ingested",
        "Run a KQL query against SecurityAlert to confirm alert-level data is present"
      ]
    },
    {
      "phase": "Phase 4",
      "title": "Analytics rules",
      "description": "Enable correlation logic so ingested signals become actionable incidents.",
      "steps": [
        "Enable the built-in Defender XDR analytics rules",
        "Create a custom KQL detection rule summarising Defender XDR incident count by severity",
        "Confirm new analytics rules appear as Active in the Analytics blade"
      ]
    },
    {
      "phase": "Phase 5",
      "title": "Incident review",
      "description": "Validate that a real signal is correlated and auto-closed correctly.",
      "steps": [
        "Trace the Defender for Office 365 'Email reported by user as malware or phish' alert into Sentinel",
        "Confirm the incident was auto-investigated with Investigation state = No threats found",
        "Record MTTA (0 min) and MTTC (14 min) from the closed incident"
      ]
    },
    {
      "phase": "Phase 6",
      "title": "SOC governance",
      "description": "Confirm the automation-first posture is intentional and documented, not a configuration gap.",
      "steps": [
        "Confirm 0 manual analyst interventions were required across the lab period",
        "Document that an MTTA of 0 minutes reflects automation-first design rather than a monitoring gap",
        "Review SOC outcome metrics (incident counts, severity, MTTA/MTTC) for governance reporting"
      ]
    }
  ],
  "powershell": [
    {
      "title": "Deploy the Sentinel workspace and export incident/alert reports",
      "language": "powershell",
      "filename": "New-SentinelWorkspace.ps1",
      "code": "# Deploy Log Analytics workspace and enable Microsoft Sentinel\n.\\New-SentinelWorkspace.ps1 -WorkspaceName \"sentinal\" -ResourceGroup \"rg-security\" -Location \"eastus\"\n\n# Export all incidents with severity, status, MTTA and MTTC via Microsoft Graph API\n.\\Get-SentinelIncidentReport.ps1 -WorkspaceName \"sentinal\" -Days 30\n\n# Retrieve all Defender XDR alerts with investigation state and resolution\n.\\Get-DefenderXDRAlerts.ps1 -ProviderName \"Microsoft Defender XDR\""
    }
  ],
  "screenshots": [
    {
      "title": "Sentinel Workspace Overview",
      "caption": "Log Analytics workspace (sentinal) with Microsoft Sentinel enabled.",
      "phase": "Phase 1"
    },
    {
      "title": "Content Hub — Defender XDR Solution",
      "caption": "Microsoft Defender XDR solution v3.0.12 shown as Installed from Content Hub.",
      "phase": "Phase 2"
    },
    {
      "title": "Data Connectors Status",
      "caption": "Defender XDR, Defender for Identity and Defender for Office 365 connector status.",
      "phase": "Phase 3"
    },
    {
      "title": "Analytics Rules",
      "caption": "Built-in Defender XDR analytics rules and custom KQL detection rule shown as Active.",
      "phase": "Phase 4"
    },
    {
      "title": "Sentinel Incidents Overview",
      "caption": "Overview blade showing 1 total incident, 0 active, 1 closed, over the last 24 hours.",
      "phase": "Phase 5"
    },
    {
      "title": "Incident Detail — Auto-Closed",
      "caption": "Closed incident detail showing Low severity, MTTA 0 min, MTTC 14 min, and 0 analyst interventions.",
      "phase": "Phase 5"
    },
    {
      "title": "Cross-Project Alert Evidence",
      "caption": "Email reported by user as malware or phish alert, Investigation state: No threats found.",
      "phase": "Phase 5"
    }
  ],
  "validation": [
    {
      "item": "Workspace & Sentinel Enabled",
      "detail": "Log Analytics workspace (sentinal) created and Microsoft Sentinel enabled successfully."
    },
    {
      "item": "Connector Installed",
      "detail": "Defender XDR solution v3.0.12 installed from Content Hub and connected — no agents or keys required."
    },
    {
      "item": "Data Ingestion Confirmed",
      "detail": "SecurityIncident and SecurityAlert KQL queries return Defender XDR data."
    },
    {
      "item": "Analytics Rules Active",
      "detail": "Built-in rules enabled plus one custom KQL detection rule for incident count by severity."
    },
    {
      "item": "Incident Auto-Closed",
      "detail": "1 incident (Low severity) auto-investigated and closed with MTTA 0 min and MTTC 14 min."
    },
    {
      "item": "Cross-Project Traceability",
      "detail": "MDO 'reported phish' alert traced back to the Attack Simulation Training project, confirming end-to-end signal flow."
    },
    {
      "item": "Zero Analyst Interventions",
      "detail": "0 manual remediation actions were required across the validated lab period."
    }
  ],
  "challenges": [
    {
      "title": "Permanent workspace naming",
      "detail": "The Log Analytics workspace name (sentinal) cannot be renamed after creation, so naming had to be validated carefully before enabling Sentinel."
    },
    {
      "title": "Content Hub install order",
      "detail": "The Defender XDR solution must be installed from Content Hub before it can be activated in Data Connectors — attempting the reverse order does not work."
    }
  ],
  "lessons": [
    "Workspace naming is permanent — always validate spelling before enabling Sentinel on a Log Analytics workspace.",
    "Content Hub vs Data Connectors — install the solution from Content Hub first, then activate the connector; the reverse order fails.",
    "A 0-minute MTTA is a success metric, not a data gap — it should be communicated as evidence of automation maturity.",
    "An empty incidents list over 30 days is a valid lab outcome — document it explicitly so it doesn't read as an unconfigured environment.",
    "Cross-project signal traceability (an alert from one project surfacing as a Sentinel incident from another) is a strong portfolio differentiator."
  ],
  "businessImpact": [
    {
      "label": "Mean Time to Acknowledge",
      "value": "0 min",
      "icon": "clock"
    },
    {
      "label": "Mean Time to Close",
      "value": "14 min",
      "icon": "clock"
    },
    {
      "label": "Analyst Interventions",
      "value": "0",
      "icon": "efficiency"
    },
    {
      "label": "Incidents Auto-Closed",
      "value": "1 / 1 (100%)",
      "icon": "shield"
    }
  ],
  "skills": [
    "Microsoft Sentinel workspace deployment and configuration",
    "Microsoft Defender XDR connector integration",
    "KQL query authoring for security incident and alert analysis",
    "SIEM analytics rule creation and tuning",
    "SOC governance metrics (MTTA/MTTC) reporting",
    "Cross-pillar Zero Trust signal correlation"
  ],
  "relatedCertifications": [
    "SC-200",
    "SC-100",
    "SC-300"
  ],
  "blogArticles": [],
  "repo": {
    "name": "lokeshm-it/Defender-XDR-Microsoft-Sentinel",
    "description": "Native Microsoft Defender XDR integration with Microsoft Sentinel — unified SIEM ingestion, analytics rules and automation-first incident response.",
    "url": "https://github.com/lokeshm-it/Defender-XDR-Microsoft-Sentinel"
  }
,
  downloads: standardDownloads,
};

const continuousTvm: CaseStudy = {
  "slug": "continuous-tvm",
  "title": "Continuous Threat & Vulnerability Management",
  "tagline": "Risk-based CVE prioritisation with Microsoft Defender TVM, moving from point-in-time scanning to continuous, exploitability-weighted remediation.",
  "category": "Threat Signals · Vulnerability Management",
  "hero": false,
  "outcome": "Baselined a 57/100 Medium exposure score across 33 detected CVEs, resolved the highest-impact finding (30 weaknesses) with a single Windows 11 update, formally excepted vendor-managed OpenSSL CVEs in OneDrive, and deployed ASR + PUA hardening controls via Intune.",
  "badges": [
    "Microsoft Defender for Endpoint",
    "TVM",
    "ASR Rules",
    "PUA Protection",
    "Zero Trust"
  ],
  "difficulty": "Advanced",
  "environment": "Microsoft 365 Business Premium / Intune",
  "deployment": "Home Lab",
  "implementationTime": "1 day",
  "certifications": [
    "SC-200",
    "MD-102"
  ],
  "executiveSummary": [
    "This project replaced point-in-time vulnerability scanning with a continuous, risk-based Threat & Vulnerability Management (TVM) programme using Microsoft Defender for Endpoint Plan 2 across the Patchthecloud.onmicrosoft.com tenant.",
    "A baseline assessment recorded a 57/100 Medium exposure score across 33 detected CVEs, with Defender TVM prioritising findings by exploitability and exposure rather than CVSS severity alone, surfacing a Windows 11 OS update as the single highest-impact remediation (impact score 57.29, 30 weaknesses).",
    "Remediation covered the full lifecycle: the Windows update was applied and resolved the top CVEs, three OpenSSL CVEs bundled inside OneDrive were formally recorded as a vendor-managed risk exception, and two additional hardening controls — an Attack Surface Reduction rule blocking executable content from email, and PUA Protection in Block mode — were deployed through Intune Endpoint Security."
  ],
  "businessProblem": {
    "problem": "Point-in-time vulnerability scans miss CVEs disclosed between scan cycles, severity-only prioritisation causes patch fatigue on low-risk findings while high-exploitability items stay open, and there is no formal process for CVEs embedded in vendor-managed components that cannot be patched directly.",
    "importance": "Without continuous, risk-based vulnerability management, security teams cannot demonstrate measurable exposure reduction to leadership, third-party application CVEs go unaddressed by OS-only patching, and endpoints remain exposed to known attack techniques while patches are tested and staged.",
    "risks": [
      "Emerging CVEs disclosed between scan cycles remain undetected",
      "Patch fatigue from prioritising by CVSS score rather than real-world exploitability",
      "Vendor-bundled third-party CVEs (e.g. OpenSSL in OneDrive) left unpatched with no formal exception process",
      "No measurable before/after exposure evidence for leadership reporting",
      "Attack surface left unhardened between patch cycles"
    ],
    "compliance": [
      "Continuous vulnerability management practice for regulatory and audit expectations",
      "Documented risk-exception register for vendor-managed findings"
    ]
  },
  "solutionOverview": [
    "Onboarded the managed device to Microsoft Defender for Endpoint Plan 2 and established a continuous TVM baseline: 57/100 Medium exposure score across 33 detected vulnerabilities.",
    "Prioritised remediation using Defender TVM's exposure and exploitability weighting rather than CVSS alone, identifying the Windows 11 OS update as the single highest-impact action.",
    "Executed the full remediation lifecycle — patched the top finding, formally excepted the vendor-managed OpenSSL CVEs with monitoring, and deployed ASR and PUA Intune policies to harden the endpoint independent of the patch cycle."
  ],
  "architectureCaption": "The Defender for Endpoint sensor streams continuous vulnerability telemetry into Defender TVM, which scores and prioritises findings by exploitability and exposure; remediation flows either as an OS update, a documented risk exception, or an Intune-deployed ASR/PUA hardening policy.",
  "technologyStack": [
    {
      "name": "Microsoft Defender for Endpoint Plan 2",
      "description": "TVM engine — continuous vulnerability detection and exposure scoring"
    },
    {
      "name": "Threat & Vulnerability Management (TVM)",
      "description": "Risk-based prioritisation by exploitability and exposure, not CVSS alone"
    },
    {
      "name": "Microsoft Intune Endpoint Security",
      "description": "ASR rule deployment and PUA protection policy management"
    },
    {
      "name": "Attack Surface Reduction (ASR) Rules",
      "description": "Blocks executable content delivered via email client and webmail"
    },
    {
      "name": "PUA Protection",
      "description": "Blocks Potentially Unwanted Applications in real time"
    },
    {
      "name": "Microsoft Defender XDR",
      "description": "Unified security operations visibility across the tenant"
    }
  ],
  "labEnvironment": [
    {
      "label": "Tenant",
      "value": "Patchthecloud.onmicrosoft.com"
    },
    {
      "label": "Licence",
      "value": "Microsoft Defender for Endpoint Plan 2"
    },
    {
      "label": "Managed device",
      "value": "PTC_01 — Windows 11 23H2"
    },
    {
      "label": "Portal",
      "value": "security.microsoft.com"
    },
    {
      "label": "Lab date",
      "value": "January 2026"
    }
  ],
  "implementation": [
    {
      "phase": "Phase 1",
      "title": "Baseline assessment",
      "description": "Establish the starting exposure score and vulnerability inventory.",
      "steps": [
        "Onboard PTC_01 to Microsoft Defender for Endpoint Plan 2",
        "Record baseline exposure score: 57/100 (Medium) across 33 detected vulnerabilities",
        "Review top recommendations ranked by impact score rather than CVSS alone"
      ]
    },
    {
      "phase": "Phase 2",
      "title": "Vulnerability analysis",
      "description": "Analyse the detected CVE set and identify the highest-impact remediation.",
      "steps": [
        "Review the CVE sample across Windows and OpenSSL components",
        "Identify the Windows 11 OS/built-in-app recommendation as highest impact (57.29, 30 weaknesses)",
        "Identify the OpenSSL recommendation as a vendor-managed, non-OS finding (30.00 impact, 3 weaknesses)"
      ]
    },
    {
      "phase": "Phase 3",
      "title": "OS remediation",
      "description": "Resolve the single highest-impact finding via Windows Update.",
      "steps": [
        "Apply Windows Update on PTC_01",
        "Confirm the Windows Update recommendation is resolved in TVM",
        "Confirm the associated Windows CVEs are remediated"
      ]
    },
    {
      "phase": "Phase 4",
      "title": "Vendor risk exception",
      "description": "Formally document the OpenSSL CVEs that cannot be patched independently of the vendor.",
      "steps": [
        "Confirm OpenSSL is bundled inside OneDrive and cannot be patched directly",
        "Record a partial risk exception in Defender TVM's exception register",
        "Set the exception to monitor for a vendor-released patch"
      ]
    },
    {
      "phase": "Phase 5",
      "title": "Attack surface hardening",
      "description": "Deploy configuration-based controls that reduce attack surface independent of patching.",
      "steps": [
        "Create an Intune Endpoint Security Attack Surface Reduction Rules policy",
        "Set 'Block executable content from email client and webmail' to Block",
        "Edit the Microsoft Defender Antivirus policy to enable PUA Protection in Block mode",
        "Assign both policies to PTC_01 and confirm coverage"
      ]
    },
    {
      "phase": "Phase 6",
      "title": "Post-remediation validation",
      "description": "Confirm measurable exposure reduction and remaining accepted risk.",
      "steps": [
        "Confirm PUA protection and ASR recommendations show Remediated",
        "Confirm the OpenSSL recommendation shows as a vendor-managed exception with 0 exposed critical devices",
        "Document the before/after exposure evidence for reporting"
      ]
    }
  ],
  "powershell": [
    {
      "title": "Export TVM vulnerabilities, exposure scores, and deploy ASR policy",
      "language": "powershell",
      "filename": "Get-TVMVulnerabilityReport.ps1",
      "code": "# Export all device vulnerabilities from Defender TVM via Microsoft Graph\n.\\Get-TVMVulnerabilityReport.ps1 -DeviceName \"PTC_01\"\n\n# Deploy Attack Surface Reduction rules via Microsoft Intune (Graph)\n.\\New-ASRPolicy.ps1 -PolicyName \"Block-Email-Executables\" -Setting \"BlockExecutableContentFromEmailClientAndWebmail\"\n\n# Export device exposure scores and TVM recommendations to CSV\n.\\Get-ExposureScoreReport.ps1 -OutputPath \".\\reports\\exposure-score.csv\""
    }
  ],
  "screenshots": [
    {
      "title": "Baseline Exposure Score",
      "caption": "Device exposure score of 57/100 (Medium) with 33 detected vulnerabilities.",
      "phase": "Phase 1"
    },
    {
      "title": "Top TVM Recommendations",
      "caption": "Windows 11 update and OpenSSL findings ranked by impact score rather than CVSS.",
      "phase": "Phase 2"
    },
    {
      "title": "CVE Detail List",
      "caption": "Detected CVEs spanning Windows and OpenSSL components with CVSS and publish dates.",
      "phase": "Phase 2"
    },
    {
      "title": "Windows Update Applied",
      "caption": "Windows Update recommendation resolved after patching PTC_01.",
      "phase": "Phase 3"
    },
    {
      "title": "OpenSSL Risk Exception",
      "caption": "OpenSSL CVEs recorded as a partial, vendor-managed exception in the TVM exception register.",
      "phase": "Phase 4"
    },
    {
      "title": "ASR Rule Configuration",
      "caption": "Intune Attack Surface Reduction policy blocking executable content from email and webmail.",
      "phase": "Phase 5"
    },
    {
      "title": "PUA Protection Policy",
      "caption": "Microsoft Defender Antivirus policy with PUA Protection set to Block mode.",
      "phase": "Phase 5"
    },
    {
      "title": "Post-Remediation Recommendations",
      "caption": "ASR and PUA recommendations marked Remediated; OpenSSL shown as vendor-managed exception.",
      "phase": "Phase 6"
    }
  ],
  "validation": [
    {
      "item": "Baseline Recorded",
      "detail": "Exposure score 57/100 (Medium) captured across 33 detected vulnerabilities, 1 exploitable, 0 critical."
    },
    {
      "item": "Highest-Impact Finding Identified",
      "detail": "Windows 11 OS/built-in-app recommendation ranked highest at impact score 57.29 across 30 weaknesses."
    },
    {
      "item": "OS Remediation Confirmed",
      "detail": "Windows Update applied to PTC_01; Windows Update recommendation resolved in TVM."
    },
    {
      "item": "Vendor Exception Documented",
      "detail": "3 OpenSSL CVEs bundled in OneDrive formally recorded as a partial, vendor-managed exception."
    },
    {
      "item": "ASR Rule Deployed",
      "detail": "'Block executable content from email client and webmail' policy assigned to PTC_01 via Intune."
    },
    {
      "item": "PUA Protection Enabled",
      "detail": "PUA Protection set to Block mode via Intune Defender Antivirus policy."
    },
    {
      "item": "Post-Remediation Status Verified",
      "detail": "ASR and PUA recommendations marked Remediated; OpenSSL exception shows 0 exposed critical devices."
    }
  ],
  "challenges": [
    {
      "title": "Vendor-bundled CVEs cannot be patched directly",
      "detail": "The OpenSSL CVEs are bundled inside OneDrive rather than being an OS component, so they required a formal risk-exception process instead of a direct patch."
    },
    {
      "title": "Exposure score lag after remediation",
      "detail": "Defender TVM telemetry refreshes on a schedule, so exposure score movement was not immediate after applying the Windows update and required waiting for the next refresh cycle."
    }
  ],
  "lessons": [
    "TVM prioritises by exploitability, not CVSS alone — a high-CVSS finding with no known exploit can rank below a lower-CVSS finding with active exploit code.",
    "Third-party vulnerabilities bundled inside Microsoft components require a formal exception process rather than being left in an unacknowledged state.",
    "ASR rules and PUA protection reduce attack surface immediately, without waiting for a patch cycle to complete.",
    "Exposure score decreases are not instant — Defender TVM telemetry can take up to 24 hours to reflect a remediation.",
    "Partial exceptions remain visible in TVM, showing the accepted residual risk rather than silently clearing the finding."
  ],
  "businessImpact": [
    {
      "label": "Baseline Exposure Score",
      "value": "57 / 100 (Medium)",
      "icon": "risk"
    },
    {
      "label": "CVEs Resolved in One Update",
      "value": "30",
      "icon": "shield"
    },
    {
      "label": "Vendor Risk Exceptions Documented",
      "value": "3 (OpenSSL)",
      "icon": "compliance"
    },
    {
      "label": "Hardening Controls Deployed",
      "value": "2 (ASR + PUA)",
      "icon": "efficiency"
    }
  ],
  "skills": [
    "Microsoft Defender for Endpoint Plan 2 deployment",
    "Threat & Vulnerability Management (TVM) risk-based prioritisation",
    "CVE / CVSS analysis and exploitability-based triage",
    "Vendor-managed risk exception documentation",
    "Attack Surface Reduction (ASR) rule configuration via Intune",
    "PUA protection policy configuration via Intune"
  ],
  "relatedCertifications": [
    "SC-200",
    "MD-102",
    "SC-100"
  ],
  "blogArticles": [],
  "repo": {
    "name": "lokeshm-it/Continuous-Threat-Vulnerability-Management",
    "description": "Continuous, risk-based vulnerability management using Microsoft Defender TVM — baseline exposure scoring, CVE remediation lifecycle, vendor risk exceptions, and ASR/PUA hardening.",
    "url": "https://github.com/lokeshm-it/Continuous-Threat-Vulnerability-Management"
  }
,
  downloads: standardDownloads,
};

const zeroTrustEmailSecurity: CaseStudy = {
  "slug": "zero-trust-email-security",
  "title": "Zero Trust Email Security",
  "tagline": "Defence-in-depth email protection with Microsoft Defender for Office 365 — sandbox every attachment, inspect every URL at click time, and quarantine identity-based impersonation attacks.",
  "category": "Email · Threat Protection",
  "hero": false,
  "outcome": "Deployed Safe Attachments, Safe Links and mailbox/spoof-intelligence anti-phishing across the tenant, validated user-reported phishing through a live attack simulation, and produced a verified +55 point Microsoft Secure Score improvement across a two-day implementation window.",
  "badges": [
    "Microsoft Defender for Office 365",
    "Safe Attachments",
    "Safe Links",
    "Anti-Phishing",
    "Zero Trust"
  ],
  "difficulty": "Advanced",
  "environment": "Microsoft 365 Business Premium / Defender for Office 365 Plan 2",
  "deployment": "Home Lab",
  "implementationTime": "2 days",
  "certifications": [
    "SC-200",
    "MS-102"
  ],
  "executiveSummary": [
    "This project implemented a Zero Trust email security framework using Microsoft Defender for Office 365 Plan 2 across the Patchthecloud.onmicrosoft.com tenant, treating email as an untrusted entry point at every stage rather than a perimeter-trusted channel.",
    "Safe Attachments was deployed with a Block action and AdminOnlyAccessPolicy quarantine so every attachment is detonated in a cloud sandbox before delivery, while Safe Links was configured with real-time URL scanning, wait-for-scan delivery, and coverage across Email, Teams and Office apps so every link is re-evaluated at click time.",
    "An anti-phishing policy layered mailbox intelligence, domain impersonation protection and spoof intelligence to catch identity-based attacks regardless of content, and the full stack was validated end-to-end: a live attack simulation confirmed a test user correctly reported a credential-harvesting email, and the Microsoft Secure Score history export confirmed a +55 point improvement directly attributable to these controls."
  ],
  "businessProblem": {
    "problem": "Malicious attachments reach mailboxes without pre-delivery analysis, phishing links embedded in email bypass perimeter controls once delivered, impersonation and business email compromise exploit trusted sender relationships, and there is no unified telemetry for email-borne threats, link clicks, or remediation events.",
    "importance": "Without layered, identity-aware email controls, users have no structured way to report and escalate suspicious email, and the SOC cannot measure or demonstrate improvement in email security posture over time.",
    "risks": [
      "Malware delivered via attachments with no pre-delivery sandbox analysis",
      "Phishing links that evade perimeter filtering and are clicked after delivery",
      "CEO fraud and domain spoofing exploiting trusted sender relationships",
      "No structured user-reporting path for suspicious email",
      "No unified SOC telemetry for email threats, clicks or remediation outcomes"
    ],
    "compliance": [
      "Defence-in-depth email security control documentation for audit purposes",
      "Measurable Secure Score evidence of applied controls for governance reporting"
    ]
  },
  "solutionOverview": [
    "Deployed Safe Attachments with a Block action and AdminOnlyAccessPolicy quarantine so detected malware never reaches a mailbox and quarantined items require administrator review before release.",
    "Configured Safe Links at Priority 0 with real-time URL scanning, wait-for-scan-before-delivery, and coverage extended to Teams and Office 365 apps, closing the gap where attackers pivot away from the inbox.",
    "Layered an anti-phishing policy with mailbox intelligence, domain impersonation protection and spoof intelligence, then validated the full stack with a live attack simulation and confirmed a +55 point Secure Score improvement from the Secure Score history export."
  ],
  "architectureCaption": "Inbound mail is sandboxed by Safe Attachments before delivery, links are rewritten and re-evaluated at click time by Safe Links across Email, Teams and Office apps, and an identity-aware anti-phishing policy quarantines impersonation and spoofing attempts; Zero-Hour Auto Purge retroactively removes threats detected after delivery.",
  "technologyStack": [
    {
      "name": "Microsoft Defender for Office 365 Plan 2",
      "description": "Unified email threat protection platform"
    },
    {
      "name": "Safe Attachments",
      "description": "Pre-delivery cloud sandbox detonation of all email attachments"
    },
    {
      "name": "Safe Links",
      "description": "Click-time URL rewriting and inspection across Email, Teams and Office apps"
    },
    {
      "name": "Anti-Phishing Policy",
      "description": "Mailbox intelligence, domain impersonation and spoof intelligence"
    },
    {
      "name": "User-Reported Phishing",
      "description": "Converts user reports into Defender threat signals"
    },
    {
      "name": "Zero-Hour Auto Purge (ZAP)",
      "description": "Retroactive post-delivery removal of detected threats"
    },
    {
      "name": "Microsoft Secure Score",
      "description": "Measurable security posture improvement tracking"
    },
    {
      "name": "Attack Simulation Training",
      "description": "Real-world phishing simulation and user awareness validation"
    }
  ],
  "labEnvironment": [
    {
      "label": "Tenant",
      "value": "Patchthecloud.onmicrosoft.com"
    },
    {
      "label": "Licence",
      "value": "Microsoft 365 Business Premium / Defender for Office 365 Plan 2"
    },
    {
      "label": "Test mailbox",
      "value": "Johnsen@Patchthecloud.onmicrosoft.com"
    },
    {
      "label": "External test sender",
      "value": "tara@msteamsexternalone.com"
    },
    {
      "label": "Portal",
      "value": "security.microsoft.com"
    },
    {
      "label": "Implementation date",
      "value": "10–11 January 2026"
    }
  ],
  "implementation": [
    {
      "phase": "Phase 1",
      "title": "Safe Attachments",
      "description": "Deploy pre-delivery sandbox detonation for all attachments.",
      "steps": [
        "Configure the Safe Attachments policy with a Block action for detected malware",
        "Set the quarantine policy to AdminOnlyAccessPolicy",
        "Disable attachment redirection and apply the policy to all recipients"
      ]
    },
    {
      "phase": "Phase 2",
      "title": "Safe Links",
      "description": "Deploy click-time URL inspection across mail and collaboration apps.",
      "steps": [
        "Create a Safe Links policy at Priority 0 (highest)",
        "Enable real-time URL scanning and wait-for-scan-before-delivery",
        "Enable Do not rewrite URLs (API-only mode) and extend coverage to Teams and Office 365 apps"
      ]
    },
    {
      "phase": "Phase 3",
      "title": "Anti-phishing policy",
      "description": "Layer identity-based impersonation and spoof detection.",
      "steps": [
        "Create an impersonation protection policy scoped to all mailboxes",
        "Enable user impersonation, domain impersonation and mailbox intelligence with Quarantine actions",
        "Enable spoof intelligence and first-contact / impersonation safety tips"
      ]
    },
    {
      "phase": "Phase 4",
      "title": "Attack simulation validation",
      "description": "Validate the end-to-end stack with a real phishing simulation.",
      "steps": [
        "Send a simulated credential-harvesting email from an external test sender",
        "Confirm the test user (John Sen) correctly identifies and reports the phishing email",
        "Confirm the report is ingested as a Defender threat signal"
      ]
    },
    {
      "phase": "Phase 5",
      "title": "Secure Score validation",
      "description": "Confirm measurable, evidenced improvement in security posture.",
      "steps": [
        "Export the Microsoft Secure Score history via Microsoft Graph",
        "Confirm +55 points gained directly from the deployed email controls",
        "Document each scoring action and its effective date for audit evidence"
      ]
    }
  ],
  "powershell": [
    {
      "title": "Deploy Defender email policies and export Secure Score / threat reports",
      "language": "powershell",
      "filename": "New-DefenderEmailPolicies.ps1",
      "code": "# Deploy Safe Attachments, Safe Links and Anti-Phishing policies via Exchange Online PowerShell\n.\\New-DefenderEmailPolicies.ps1 -Tenant \"Patchthecloud.onmicrosoft.com\" -QuarantinePolicy \"AdminOnlyAccessPolicy\"\n\n# Export Secure Score history and recommended actions to CSV via Microsoft Graph\n.\\Get-SecureScoreReport.ps1 -OutputPath \".\\exports\\Microsoft-Secure-Score.csv\"\n\n# Export email threat detection summary from Defender for Office 365 via Graph\n.\\Get-EmailThreatReport.ps1 -Days 2"
    }
  ],
  "screenshots": [
    {
      "title": "Safe Attachments Policy List",
      "caption": "Safe Attachments policy shown as On with Priority 0.",
      "phase": "Phase 1"
    },
    {
      "title": "Safe Links Policy List",
      "caption": "Safe Links Policy shown as On with Priority 0.",
      "phase": "Phase 2"
    },
    {
      "title": "Anti-Phishing Policy Created",
      "caption": "Confirmation banner showing the impersonation protection policy created and in effect immediately.",
      "phase": "Phase 3"
    },
    {
      "title": "Attack Simulation — Reported Phish",
      "caption": "John Sen correctly reported the simulated phishing email from tara@msteamsexternalone.com.",
      "phase": "Phase 4"
    },
    {
      "title": "Secure Score Trend",
      "caption": "Secure Score graph showing an upward trend of +55 points across the implementation window.",
      "phase": "Phase 5"
    }
  ],
  "validation": [
    {
      "item": "Safe Attachments Active",
      "detail": "Policy list confirms Safe Attachments On at Priority 0 with Block action and AdminOnlyAccessPolicy quarantine."
    },
    {
      "item": "Safe Links Active",
      "detail": "Policy list confirms Safe Links Policy On at Priority 0 with real-time scanning and Teams/Office coverage."
    },
    {
      "item": "Anti-Phishing Policy Created",
      "detail": "Confirmation banner shown; policy in effect immediately with mailbox and spoof intelligence enabled."
    },
    {
      "item": "Attack Simulation Passed",
      "detail": "Test user John Sen correctly identified and reported a simulated phishing email."
    },
    {
      "item": "Secure Score Improvement Confirmed",
      "detail": "+55 points verified via the Microsoft Secure Score history CSV export across 10–11 January 2026."
    }
  ],
  "challenges": [
    {
      "title": "Sandbox detonation adds delivery latency",
      "detail": "Safe Attachments Block mode delays delivery while attachments are detonated, so users need to be informed before enabling this in production."
    },
    {
      "title": "Secure Score is a lagging indicator",
      "detail": "Secure Score points register only after Defender detects and scores the control, not immediately after the policy is saved, so validation required waiting for the scoring refresh."
    }
  ],
  "lessons": [
    "Safe Attachments Block mode delays delivery — sandbox detonation adds latency, so communicate this to users before enabling in production.",
    "\"Do not rewrite URLs\" in API-only mode is not reduced security — Defender still evaluates every URL via the Safe Links API, it just improves compatibility with mail clients that break rewritten links.",
    "Anti-phishing threshold 1 (Standard) is appropriate for most tenants — raising it to Aggressive significantly increases false positives on internal business email.",
    "Single user-reported phishing reports may not generate alerts on their own — this is expected Defender behaviour, since alerts fire when reports correlate with other signals, but every report still contributes to threat intelligence.",
    "Secure Score is a lagging indicator — points register after Defender detects and scores the control, not immediately after policy creation."
  ],
  "businessImpact": [
    {
      "label": "Secure Score Improvement",
      "value": "+55 pts",
      "icon": "shield"
    },
    {
      "label": "Attack Simulation Result",
      "value": "Passed — phish reported",
      "icon": "identity"
    },
    {
      "label": "Attachment Protection",
      "value": "100% sandboxed pre-delivery",
      "icon": "risk"
    },
    {
      "label": "Implementation Window",
      "value": "2 days",
      "icon": "efficiency"
    }
  ],
  "skills": [
    "Microsoft Defender for Office 365 policy configuration",
    "Safe Attachments and Safe Links deployment",
    "Anti-phishing policy design (mailbox and spoof intelligence)",
    "Attack Simulation Training and user-reported phishing validation",
    "Microsoft Secure Score measurement and reporting",
    "Exchange Online PowerShell and Microsoft Graph automation"
  ],
  "relatedCertifications": [
    "SC-200",
    "MS-102",
    "SC-100"
  ],
  "blogArticles": [],
  "repo": {
    "name": "lokeshm-it/Zero-Trust-Email-Security",
    "description": "Zero Trust email security using Microsoft Defender for Office 365 — Safe Attachments, Safe Links, anti-phishing with mailbox and spoof intelligence, and a verified +55 Secure Score improvement.",
    "url": "https://github.com/lokeshm-it/Zero-Trust-Email-Security"
  }
,
  downloads: standardDownloads,
};

const informationBarriers: CaseStudy = {
  "slug": "information-barriers",
  "title": "Microsoft Purview Information Barriers",
  "tagline": "Compliance-enforced ethical wall between Finance and HR, blocking Teams communication and SharePoint/OneDrive collaboration in both directions, independently verified via PowerShell and live Teams enforcement testing.",
  "category": "Compliance · Insider Risk",
  "hero": false,
  "outcome": "Configured attribute-based Finance and HR segments and two directional Information Barrier policies, confirmed a full bidirectional block via Exchange Online PowerShell (Communication1To2/2To1: False), and proved real-world enforcement when a live Teams chat message between the two segments failed to send.",
  "badges": [
    "Microsoft Purview",
    "Information Barriers",
    "Insider Risk",
    "Microsoft Teams",
    "Exchange Online PowerShell"
  ],
  "difficulty": "Advanced",
  "environment": "Microsoft 365 / Purview",
  "deployment": "Home Lab",
  "implementationTime": "1 day",
  "certifications": [
    "SC-400",
    "SC-300"
  ],
  "executiveSummary": [
    "This project implemented and validated Microsoft Purview Information Barriers to create a compliance-enforced ethical wall between the Finance and HR departments in a Microsoft 365 tenant, blocking Teams communication and SharePoint/OneDrive collaboration in both directions.",
    "Two attribute-based segments (Finance Department, HR Department) were created from the Department directory attribute, and a pair of directional Information Barrier policies (Finance-HR Block Policy, HR-Finance Block Policy) was configured as Blocked and Active, then compiled tenant-wide by the Purview policy application engine.",
    "Enforcement was independently verified at three layers: the Purview policy application job reaching Completed/100%, Exchange Online PowerShell confirming Communication1To2: False and Communication2To1: False between a Finance-segment and an HR-segment test user, and a live Microsoft Teams chat attempt between the two users returning \"Failed to send.\""
  ],
  "businessProblem": {
    "problem": "Without a technical control, any two Microsoft 365 users can freely chat, call and share files in Teams and SharePoint/OneDrive regardless of department or role, and relying on policy and training alone does not prevent accidental or intentional information leakage between segregated business units such as Finance and HR.",
    "importance": "Regulated organizations in financial services, healthcare, legal and public sector are often required to prevent certain groups of employees from communicating to avoid conflicts of interest, insider trading, or inappropriate access to sensitive personal or financial data, and need demonstrable, auditable technical enforcement rather than a policy document alone.",
    "risks": [
      "Unrestricted Teams chat/calls and SharePoint/OneDrive collaboration between segregated departments",
      "Conflict-of-interest or insider-trading exposure between Finance and HR",
      "Inappropriate access to sensitive compensation, workforce action, or financial reporting data",
      "No auditable, PowerShell-queryable evidence of segregation for compliance reporting"
    ],
    "compliance": [
      "Conflict-of-interest and insider-trading prevention obligations",
      "Auditable segregation-of-duties evidence via Get-EXOInformationBarrierRelationship"
    ]
  },
  "solutionOverview": [
    "Created two attribute-based Information Barrier segments — Finance Department and HR Department — filtered on the Department directory attribute (department -eq 'Finance').",
    "Configured two directional Information Barrier policies (Finance-HR Block Policy and HR-Finance Block Policy) with Communication and collaboration set to Blocked and Policy status set to Active, then ran the Purview policy application engine to compile the relationship tenant-wide.",
    "Independently verified the enforced relationship using Exchange Online PowerShell (Get-EXOInformationBarrierRelationship) and a live Microsoft Teams chat attempt between a Finance-segment and an HR-segment test user."
  ],
  "architectureCaption": "Finance Department and HR Department segments are defined from the Department directory attribute; two directional Blocked/Active Information Barrier policies are compiled by the Purview policy application engine into a bidirectional relationship that Teams, SharePoint and OneDrive enforce at the point of communication.",
  "technologyStack": [
    {
      "name": "Microsoft Purview Information Barriers",
      "description": "Segments, policies and policy application engine"
    },
    {
      "name": "Microsoft Purview compliance portal",
      "description": "Segment and policy configuration workspace"
    },
    {
      "name": "Exchange Online PowerShell",
      "description": "ExchangeOnlineManagement module — relationship verification cmdlets"
    },
    {
      "name": "Department directory attribute",
      "description": "Recipient attribute used as the segment filter condition"
    },
    {
      "name": "Microsoft Teams",
      "description": "1:1 chat enforcement surface — validated live"
    },
    {
      "name": "SharePoint Online / OneDrive for Business",
      "description": "Collaboration surfaces governed by the same IB policy"
    }
  ],
  "labEnvironment": [
    {
      "label": "Segments",
      "value": "Finance Department, HR Department"
    },
    {
      "label": "Segment filter",
      "value": "department -eq 'Finance'"
    },
    {
      "label": "Policies",
      "value": "Finance-HR Block Policy, HR-Finance Block Policy"
    },
    {
      "label": "Policy application duration",
      "value": "~4.5 minutes (ApplyInProgress → Completed)"
    },
    {
      "label": "Test users",
      "value": "testuser1 (Finance), testuser2 (HR)"
    }
  ],
  "implementation": [
    {
      "phase": "Phase 1",
      "title": "Segment creation",
      "description": "Define the two organizational segments used to group users by attribute.",
      "steps": [
        "Create the Finance Department segment with filter Department Equal Finance",
        "Confirm the wizard compiles the filter to department -eq 'Finance'",
        "Create the HR Department segment using the equivalent Department-based filter"
      ]
    },
    {
      "phase": "Phase 2",
      "title": "Policy creation",
      "description": "Create the two directional policies required for a bidirectional block.",
      "steps": [
        "Create Finance-HR Block Policy, assign the Finance Department segment, and block against HR Department",
        "Disable Allow moderation and set Policy status to Active",
        "Create the corresponding HR-Finance Block Policy for the opposite direction"
      ]
    },
    {
      "phase": "Phase 3",
      "title": "Policy application",
      "description": "Compile the configured policies into an enforceable tenant-wide relationship.",
      "steps": [
        "Trigger the Information Barrier policy application job",
        "Monitor progress from ApplyInProgress to PendingCompletion",
        "Confirm the job reaches Completed at 100% before validating enforcement"
      ]
    },
    {
      "phase": "Phase 4",
      "title": "PowerShell verification",
      "description": "Independently confirm segment resolution and the computed relationship.",
      "steps": [
        "Connect to Exchange Online via the ExchangeOnlineManagement module",
        "Run Get-EXOInformationBarrierRelationship between testuser1 and testuser2",
        "Confirm Visibility1To2/2To1 and Communication1To2/2To1 all return False",
        "Re-run the command to confirm the result is stable, not transient"
      ]
    },
    {
      "phase": "Phase 5",
      "title": "Live Teams enforcement test",
      "description": "Validate real-world enforcement at the client, not just the portal or PowerShell.",
      "steps": [
        "Sign in as Test User 1 (Finance segment) in Microsoft Teams",
        "Open the existing 1:1 chat with Test User 2 (HR segment)",
        "Attempt to send a message and confirm Teams displays 'Failed to send'"
      ]
    }
  ],
  "powershell": [
    {
      "title": "Connect to Exchange Online and verify the Information Barrier relationship",
      "language": "powershell",
      "filename": "Verify-InformationBarrier.ps1",
      "code": "# Connect to Exchange Online (required for all IB cmdlets)\nConnect-ExchangeOnline -UserPrincipalName \"admin@securem365lsb.onmicrosoft.com\"\n\n# Verify the computed relationship between two specific recipients\n.\\Verify-InformationBarrier.ps1 -RecipientId1 \"testuser1@securem365lsb.onmicrosoft.com\" -RecipientId2 \"testuser2@securem365lsb.onmicrosoft.com\"\n\n# View all configured segments and policies\nGet-OrganizationSegment\nGet-InformationBarrierPolicy\n\n# Manually trigger policy application and check job status\nStart-InformationBarrierPoliciesApplication\nGet-InformationBarrierPoliciesApplicationStatus"
    }
  ],
  "screenshots": [
    {
      "title": "Segments Created",
      "caption": "Segments list showing Finance Department and HR Department both present.",
      "phase": "Phase 1"
    },
    {
      "title": "Policy Configuration Summary",
      "caption": "Wizard summary confirming Finance-HR Block Policy: Blocked, HR Department, Active, moderation off.",
      "phase": "Phase 2"
    },
    {
      "title": "Both Directional Policies Active",
      "caption": "Policies list showing Finance-HR Block Policy and HR-Finance Block Policy, both Active.",
      "phase": "Phase 2"
    },
    {
      "title": "Policy Application Completed",
      "caption": "Policy application job progressing from ApplyInProgress to Completed at 100%.",
      "phase": "Phase 3"
    },
    {
      "title": "PowerShell Relationship Verification",
      "caption": "Get-EXOInformationBarrierRelationship output showing Communication1To2 and Communication2To1 both False.",
      "phase": "Phase 4"
    },
    {
      "title": "Teams Chat Blocked",
      "caption": "Live Teams chat attempt between Finance and HR test users showing 'Failed to send.'",
      "phase": "Phase 5"
    }
  ],
  "validation": [
    {
      "item": "Segments Created Correctly",
      "detail": "Finance Department and HR Department both present in the Purview Segments page."
    },
    {
      "item": "Policy Configuration Accurate",
      "detail": "Wizard summary confirms Blocked communication, HR Department as the blocked segment, Active status, moderation disabled."
    },
    {
      "item": "Both Directional Policies Active",
      "detail": "Policies list confirms 2 Active policies — Finance-HR Block Policy and HR-Finance Block Policy."
    },
    {
      "item": "Policy Application Completed",
      "detail": "Policy application job reached Completed at 100% (~4.5 minutes from start)."
    },
    {
      "item": "Segment Resolution Correct",
      "detail": "Get-EXOInformationBarrierRelationship correctly maps testuser1 to Finance Department and testuser2 to HR Department."
    },
    {
      "item": "Bidirectional Block Enforced",
      "detail": "PowerShell confirms Communication1To2: False and Communication2To1: False; re-verified as stable on a second run."
    },
    {
      "item": "Real-World Teams Enforcement",
      "detail": "A live chat message between the two segmented test users returned 'Failed to send' in the Teams client."
    }
  ],
  "challenges": [
    {
      "title": "Asynchronous policy application",
      "detail": "The policy application job took roughly 4–5 minutes to move from ApplyInProgress to Completed; validating enforcement before completion would have produced a false negative."
    },
    {
      "title": "Incomplete evidence for the HR segment wizard",
      "detail": "The HR Department segment and HR-Finance Block Policy creation screens were not captured, so their exact filter expression is assumed by naming convention rather than visually confirmed."
    }
  ],
  "lessons": [
    "Information Barriers are attribute-driven — the accuracy of the underlying directory attribute (Department) directly determines segment and policy accuracy.",
    "Bidirectional segregation requires two policies, not one — a single policy only blocks the assigned segment's outbound communication toward the blocked segment.",
    "Policy application is asynchronous and must be confirmed as Completed before relying on the control or presenting it as enforced.",
    "PowerShell verification and live-client testing are complementary — the portal and PowerShell confirm configuration, while a real chat attempt confirms enforcement.",
    "Information Barriers block new communication; they do not retroactively delete or hide prior chat history."
  ],
  "businessImpact": [
    {
      "label": "Enforcement Layers Validated",
      "value": "3 (Portal, PowerShell, Teams)",
      "icon": "compliance"
    },
    {
      "label": "Bidirectional Block Confirmed",
      "value": "Communication False both ways",
      "icon": "shield"
    },
    {
      "label": "Policy Application Time",
      "value": "~4.5 minutes",
      "icon": "clock"
    },
    {
      "label": "Segments Configured",
      "value": "2 (Finance, HR)",
      "icon": "identity"
    }
  ],
  "skills": [
    "Microsoft Purview compliance portal administration",
    "Information Barriers segment and policy design (attribute-based filtering)",
    "Exchange Online PowerShell (ExchangeOnlineManagement module)",
    "Asynchronous policy application monitoring and troubleshooting",
    "End-to-end control validation methodology (config → apply → PowerShell verify → live enforcement test)"
  ],
  "relatedCertifications": [
    "SC-400",
    "SC-300",
    "MS-102"
  ],
  "blogArticles": [],
  "repo": {
    "name": "lokeshm-it/Microsoft-Information-Barriers",
    "description": "Microsoft Purview Information Barriers enforcing a compliance-driven ethical wall between Finance and HR, validated via PowerShell and live Teams enforcement testing.",
    "url": "https://github.com/lokeshm-it/Microsoft-Information-Barriers"
  }
,
  downloads: standardDownloads,
};

const insiderRiskManagement: CaseStudy = {
  "slug": "insider-risk-management",
  "title": "Microsoft Purview Insider Risk Management",
  "tagline": "Tenant-wide Data Leaks policy detecting authorized-insider data exfiltration through behavioral analytics and sequence detection",
  "category": "Compliance · Insider Risk",
  "hero": false,
  "outcome": "Deployed a tenant-wide Data Leaks Insider Risk Management policy that reached Healthy status, with activity scoring validated end-to-end against a real test user",
  "badges": [
    "Microsoft Purview",
    "Insider Risk Management",
    "Data Loss Prevention",
    "Zero Trust"
  ],
  "difficulty": "Advanced",
  "environment": "Microsoft 365 tenant (securem365lsb.onmicrosoft.com)",
  "deployment": "Home Lab",
  "implementationTime": "4-6 hours",
  "certifications": [
    "SC-400",
    "SC-300",
    "SC-200",
    "MS-102"
  ],
  "executiveSummary": [
    "This project configures and validates Microsoft Purview Insider Risk Management with a tenant-wide Data Leaks policy, moving from an empty solution instance through analytics enablement, indicator and privacy configuration, and a fully scoped policy that reaches Healthy status with activity scoring actively initiated for a test user.",
    "Every configuration step is backed by a screenshot captured during the lab build, with no invented configuration values, following an evidence-only documentation standard."
  ],
  "businessProblem": {
    "problem": "Regulated and data-sensitive organizations need visibility into risk posed by authorized insiders — employees who already have legitimate access to sensitive data but who may exfiltrate it accidentally or intentionally, for example before resignation. Perimeter controls such as firewalls and Conditional Access do not address this risk because the actor is an authenticated, authorized user operating within their normal access boundaries.",
    "importance": "Without a dedicated insider risk solution, low-signal individual activities such as a SharePoint download, a removed sensitivity label, or a file archived and copied to USB go undetected in isolation, even though the same activities performed in sequence are a strong indicator of intentional data exfiltration.",
    "risks": [
      "Undetected multi-step exfiltration sequences (download, obfuscate, exfiltrate, delete) by authorized users",
      "Departing employees taking sensitive data before resignation",
      "Sensitive data such as credit card information leaving the tenant through prioritized SharePoint sites",
      "Lack of role-based visibility into insider activity due to unassigned Analyst/Investigator role groups"
    ],
    "compliance": [
      "PCI-relevant data handling",
      "Regulatory data governance obligations",
      "Zero Trust insider threat visibility"
    ]
  },
  "solutionOverview": [
    "Enabled analytics at both tenant and user aggregation levels to build a behavioral baseline.",
    "Configured solution-wide settings: privacy/pseudonymization, policy indicators (Office, Device, Defender for Endpoint, Risky browsing), intelligent detections, and domain lists.",
    "Reviewed the seven built-in Insider Risk Management role groups for least-privilege administration.",
    "Built a tenant-wide Data Leaks policy from a Microsoft Quick Policy template, with content prioritization, tenant-specific thresholds, and full sequence detection.",
    "Submitted the policy, confirmed Healthy status, and started activity scoring for a named test user to validate the deployment end-to-end."
  ],
  "architectureCaption": "Insider Risk Management data flow: Office, Device, Defender for Endpoint, and Entra ID Protection signals feed analytics, which drive a scoped Data Leaks policy with sequence detection and test-user activity scoring.",
  "technologyStack": [
    {
      "name": "Microsoft Purview Insider Risk Management",
      "description": "Core solution for behavioral analytics, indicator configuration, and policy management"
    },
    {
      "name": "Microsoft 365 Unified Audit Log",
      "description": "Source of Office and Device activity indicators"
    },
    {
      "name": "Microsoft Defender for Endpoint",
      "description": "Source of defense-evasion and unwanted-software indicators (P2 required)"
    },
    {
      "name": "Microsoft Purview Data Loss Prevention",
      "description": "Optional trigger and prerequisite for the Data Leaks policy template"
    },
    {
      "name": "Microsoft Entra ID Protection",
      "description": "Identity-risk indicators feeding into insider risk scoring"
    },
    {
      "name": "Microsoft Purview Roles and Scopes",
      "description": "RBAC role groups governing Insider Risk Management administration"
    }
  ],
  "labEnvironment": [
    {
      "label": "Tenant",
      "value": "securem365lsb.onmicrosoft.com"
    },
    {
      "label": "Policy Template",
      "value": "Data Leaks (Quick Policy)"
    },
    {
      "label": "Scope",
      "value": "All users, groups, and adaptive scopes"
    },
    {
      "label": "Prioritized Content",
      "value": "Team Site (SharePoint), Credit Card Number (SIT)"
    }
  ],
  "implementation": [
    {
      "phase": "Phase 1",
      "title": "Analytics and Privacy Configuration",
      "description": "Enabled tenant and user-level analytics to establish a behavioral baseline, and configured pseudonymized usernames for privacy-by-design alert triage.",
      "steps": [
        "Navigate to Insider Risk Management from the Purview Solutions menu",
        "Review the Overview page and recommended actions",
        "Configure Analytics settings (tenant + user level insights: On)",
        "Configure Privacy settings (pseudonymized usernames selected)"
      ]
    },
    {
      "phase": "Phase 2",
      "title": "Policy Indicators and Intelligent Detections",
      "description": "Enabled Office, Device, Defender for Endpoint, and Risky browsing indicators, then tuned intelligent detection thresholds and alert volume.",
      "steps": [
        "Enable Policy indicators — Office activities (Select all)",
        "Enable Policy indicators — Device activities (Select all)",
        "Enable Defender for Endpoint and Risky browsing indicators (preview)",
        "Configure Intelligent detections — file activity threshold (50 events), Default alert volume",
        "Configure Defender alert statuses (all 4) and Unallowed/Third-party domains (left empty)"
      ]
    },
    {
      "phase": "Phase 3",
      "title": "Role Group Review",
      "description": "Reviewed the seven built-in Insider Risk Management role groups to plan least-privilege administration, identifying that only the base group had an assigned user.",
      "steps": [
        "Review Insider Risk Management role groups (7 groups)",
        "Identify role groups lacking assigned Analysts/Investigators"
      ]
    },
    {
      "phase": "Phase 4",
      "title": "Data Leaks Policy Creation",
      "description": "Built a tenant-wide Data Leaks policy from Microsoft's Quick Policy template, scoped to all users, with SharePoint and Credit Card Number content prioritization.",
      "steps": [
        "Open Policies page and Create policy menu",
        "Select the Data leaks Quick Policy template",
        "Name the policy: \"Data Leaks Insider Risk Policy\"",
        "Scope: All users, groups, and adaptive scopes",
        "Enable content prioritization (SharePoint, labels, SITs, extensions, classifiers)",
        "Prioritize SharePoint site: Team Site",
        "Prioritize sensitive info type: Credit Card Number"
      ]
    },
    {
      "phase": "Phase 5",
      "title": "Triggering Events, Sequence Detection, and Validation",
      "description": "Configured exfiltration triggering events, applied recommended tenant-specific thresholds, enabled full sequence detection, submitted the policy, and validated activity scoring against a test user.",
      "steps": [
        "Configure scoring scope: Get alerts for all activity",
        "Select triggering event: User performs an exfiltration activity (8/24 activities)",
        "Apply built-in trigger thresholds (Recommended)",
        "Enable full sequence detection (download/archive/label-downgrade chains)",
        "Apply indicator thresholds specific to your users' activity (Recommended)",
        "Final review (74/126 indicators) and Submit",
        "Confirm policy Status: Healthy",
        "Start activity scoring for Test User 1 (5-day scope)"
      ]
    }
  ],
  "powershell": [
    {
      "title": "Insider Risk Role Group Verification",
      "language": "powershell",
      "filename": "Verify-InsiderRiskPolicy.ps1",
      "code": "# Connect to Security & Compliance PowerShell (required for Purview role and policy verification)\nConnect-IPPSSession -UserPrincipalName admin@securem365lsb.onmicrosoft.com\n\n# Review Insider Risk Management role group membership\nGet-RoleGroupMember -Identity \"Insider Risk Management\"\nGet-RoleGroupMember -Identity \"Insider Risk Management Analysts\"\nGet-RoleGroupMember -Identity \"Insider Risk Management Investigators\""
    }
  ],
  "screenshots": [
    {
      "title": "Analytics Settings",
      "caption": "Tenant and user-level insights enabled to establish a behavioral baseline.",
      "phase": "Phase 1"
    },
    {
      "title": "Policy Indicators — Office Activities",
      "caption": "All Office activity indicators selected tenant-wide.",
      "phase": "Phase 2"
    },
    {
      "title": "Insider Risk Role Groups",
      "caption": "Seven built-in role groups reviewed; only the base group had an assigned user.",
      "phase": "Phase 3"
    },
    {
      "title": "Quick Policy Templates",
      "caption": "Data leaks template selected from Microsoft's built-in Quick Policy library.",
      "phase": "Phase 4"
    },
    {
      "title": "Content Prioritization",
      "caption": "SharePoint Team Site and Credit Card Number sensitive information type prioritized.",
      "phase": "Phase 4"
    },
    {
      "title": "Detection Options — Sequence Detection",
      "caption": "Full multi-step sequence detection enabled for download, archive, and label-downgrade chains.",
      "phase": "Phase 5"
    },
    {
      "title": "Policy Successfully Created",
      "caption": "Data Leaks Insider Risk Policy reaches Healthy status immediately after submission.",
      "phase": "Phase 5"
    },
    {
      "title": "Activity Scoring Started",
      "caption": "Activity scoring started for Test User 1 with a 5-day scope to validate the deployment end-to-end.",
      "phase": "Phase 5"
    }
  ],
  "validation": [
    {
      "item": "Analytics enabled (tenant + user level)",
      "detail": "Confirmed via Purview portal settings — Pass"
    },
    {
      "item": "Privacy/pseudonymization configured",
      "detail": "Confirmed via Purview portal settings — Pass"
    },
    {
      "item": "Office, Device, Defender, Risky Browsing indicators enabled",
      "detail": "Confirmed via Purview portal settings — Pass"
    },
    {
      "item": "Role groups reviewed",
      "detail": "Partial — specialized groups have 0 assigned users"
    },
    {
      "item": "Policy created from Data Leaks template",
      "detail": "Confirmed via policy wizard — Pass"
    },
    {
      "item": "Content prioritization configured",
      "detail": "Confirmed via policy wizard — Pass"
    },
    {
      "item": "Triggering event and thresholds configured",
      "detail": "Confirmed via policy wizard — Pass"
    },
    {
      "item": "Sequence detection configured",
      "detail": "Confirmed via policy wizard — Pass"
    },
    {
      "item": "Policy submitted and reaches Healthy status",
      "detail": "Confirmed in Policies list — Pass"
    },
    {
      "item": "Activity scoring started for test user",
      "detail": "Confirmed via Policies action — Pass"
    }
  ],
  "challenges": [
    {
      "title": "Missing role-group alert-view permission",
      "detail": "The signed-in session lacked a role group with alert-viewing permission, surfaced directly by a banner on the Policies page; documented as a known limitation rather than resolved in place."
    },
    {
      "title": "Unconfigured optional connectors",
      "detail": "Cloud Apps, Cloud Storage, Microsoft Fabric, and Network indicator categories remained at 0 selected because their underlying connectors were not configured in this lab."
    }
  ],
  "lessons": [
    "Enabling an indicator at the solution-settings level does not guarantee it is available at the policy level — indicator availability can still be individually gated during policy creation.",
    "A \"Healthy\" policy status is a structural validation, not proof of active alerting; explicit test-user scoring is a necessary additional step.",
    "Several of the richest indicator categories depend entirely on optional connector prerequisites (Defender for Cloud Apps, Microsoft Fabric, physical badging) that are easy to overlook when following the Quick Policy path."
  ],
  "businessImpact": [
    {
      "label": "Policy Status",
      "value": "Healthy",
      "icon": "shield"
    },
    {
      "label": "Indicators Reviewed",
      "value": "126",
      "icon": "compliance"
    },
    {
      "label": "Detection Model",
      "value": "Sequence-Based",
      "icon": "risk"
    },
    {
      "label": "Validation",
      "value": "Test-User Verified",
      "icon": "activity"
    }
  ],
  "skills": [
    "Microsoft Purview Insider Risk Management",
    "Risk Indicator & Threshold Design",
    "RBAC Role Group Review",
    "Policy Lifecycle Management",
    "Evidence-Based Technical Documentation"
  ],
  "relatedCertifications": [
    "SC-400",
    "SC-300",
    "SC-200",
    "MS-102"
  ],
  "blogArticles": [],
  "repo": {
    "name": "Microsoft-Insider-Risk-Management",
    "description": "Enterprise implementation of Microsoft Purview Insider Risk Management with a tenant-wide Data Leaks policy",
    "url": "https://github.com/lokeshm-it/Microsoft-Insider-Risk-Management"
  }
,
  downloads: standardDownloads,
};

const adaptiveProtection: CaseStudy = {
  "slug": "adaptive-protection",
  "title": "Microsoft Purview Adaptive Protection",
  "tagline": "Dynamic Data Loss Prevention and Conditional Access enforcement driven by Insider Risk Management risk levels",
  "category": "Compliance · Insider Risk",
  "hero": false,
  "outcome": "Recovered Adaptive Protection from a disabled outage state, re-enabled it tenant-wide, and verified healthy, enforced linkage between insider risk levels and both DLP and Conditional Access policies",
  "badges": [
    "Microsoft Purview",
    "Adaptive Protection",
    "Insider Risk Management",
    "Conditional Access",
    "Zero Trust"
  ],
  "difficulty": "Advanced",
  "environment": "Microsoft 365 tenant (Microsoft Purview compliance portal)",
  "deployment": "Home Lab",
  "implementationTime": "3-5 hours",
  "certifications": [
    "SC-400",
    "SC-300",
    "SC-200"
  ],
  "executiveSummary": [
    "This project documents the configuration and verification of Microsoft Purview Adaptive Protection, which connects Insider Risk Management risk levels to Data Loss Prevention and Conditional Access enforcement, allowing those policies to automatically tighten controls against specific high-risk users without manual scope changes.",
    "The lab began from a real, observed outage state — Adaptive Protection disabled because its source insider risk policy had been deleted — and walks through diagnosis, recovery, risk-level configuration, and PowerShell-based health verification."
  ],
  "businessProblem": {
    "problem": "Static DLP and Conditional Access policies apply the same controls to every user regardless of their actual behavioral risk, meaning either all users are subject to strict friction-heavy controls, or high-risk users are not treated any differently from low-risk ones. Organizations need enforcement that automatically escalates for specific users identified as elevated risk, without administrators manually re-scoping policies.",
    "importance": "Without Adaptive Protection, insider risk signals computed by Insider Risk Management have no automated path into enforcement — an elevated-risk user continues operating under the same DLP and Conditional Access controls as every other user until a human intervenes.",
    "risks": [
      "Adaptive Protection silently disabled if its source insider risk policy is deleted, with no automatic remediation",
      "Elevated-risk users retaining full access under Conditional Access until manually restricted",
      "DLP policies not tightening automatically for users already flagged as high risk",
      "Report-only Conditional Access policies providing no real enforcement if never promoted to enforced"
    ],
    "compliance": [
      "Zero Trust adaptive access control",
      "Insider threat risk-based enforcement",
      "Regulatory data protection obligations"
    ]
  },
  "solutionOverview": [
    "Identified and diagnosed the initial Adaptive Protection outage state, caused by the deletion of its source Insider Risk Management policy.",
    "Re-enabled Adaptive Protection at the tenant level from the Adaptive Protection settings page.",
    "Configured Elevated, Moderate, and Minor insider risk level thresholds sourced from the Data Leaks Insider Risk Policy.",
    "Reviewed the Conditional Access policy (Block access to Office Apps for users with Insider Risk, Report-only, Elevated) that consumes Adaptive Protection risk levels.",
    "Reviewed the two Data Loss Prevention policies (Teams/Exchange and Endpoint) that consume Adaptive Protection risk levels.",
    "Verified the Adaptive Protection policy and all related Insider Risk Management policies using Security & Compliance PowerShell."
  ],
  "architectureCaption": "Adaptive Protection sits between Insider Risk Management, which computes a per-user risk level, and two enforcement surfaces — Microsoft Purview DLP and Microsoft Entra Conditional Access — both of which reference the insider risk level as a condition rather than duplicating risk logic themselves.",
  "technologyStack": [
    {
      "name": "Microsoft Purview Adaptive Protection",
      "description": "Connects computed insider risk levels to downstream DLP and Conditional Access enforcement"
    },
    {
      "name": "Microsoft Purview Insider Risk Management",
      "description": "Source of Elevated, Moderate, and Minor risk level classifications"
    },
    {
      "name": "Microsoft Purview Data Loss Prevention",
      "description": "Teams/Exchange and Endpoint DLP policies that tighten automatically for elevated-risk users"
    },
    {
      "name": "Microsoft Entra Conditional Access",
      "description": "Report-only policy blocking Office Apps access for users flagged at Elevated insider risk"
    },
    {
      "name": "Security & Compliance PowerShell",
      "description": "Used to verify policy health, mode, and enabled state for Adaptive Protection and Insider Risk Management"
    }
  ],
  "labEnvironment": [
    {
      "label": "Source Insider Risk Policy",
      "value": "Data Leaks Insider Risk Policy"
    },
    {
      "label": "Adaptive Protection Policy",
      "value": "Adaptive Protection policy for Insider Risk Management (system-generated)"
    },
    {
      "label": "Conditional Access Policy",
      "value": "Block access to Office Apps for users with Insider Risk (Preview) — Report-only, Elevated"
    },
    {
      "label": "DLP Policies",
      "value": "Adaptive Protection policy for Teams and Exchange DLP; Adaptive Protection policy for Endpoint DLP"
    }
  ],
  "implementation": [
    {
      "phase": "Phase 1",
      "title": "Outage Diagnosis and Recovery",
      "description": "Identified that Adaptive Protection was disabled because its source insider risk policy had been deleted, then re-enabled the feature at the tenant level.",
      "steps": [
        "Review the Adaptive Protection dashboard (initial disabled state)",
        "Diagnose the outage: source insider risk policy previously used for Adaptive Protection had been deleted",
        "Enable Adaptive Protection in settings"
      ]
    },
    {
      "phase": "Phase 2",
      "title": "Risk Level Configuration",
      "description": "Configured Elevated, Moderate, and Minor insider risk level thresholds sourced from the active Data Leaks Insider Risk Policy.",
      "steps": [
        "Configure insider risk levels (Elevated, Moderate, Minor)",
        "Source risk level thresholds from the Data Leaks Insider Risk Policy"
      ]
    },
    {
      "phase": "Phase 3",
      "title": "Enforcement Policy Review",
      "description": "Reviewed the downstream Conditional Access and DLP policies that consume Adaptive Protection insider risk levels as enforcement conditions.",
      "steps": [
        "Review Conditional Access policies using insider risk (Report-only, Elevated)",
        "Review Data Loss Prevention policies using insider risk (Teams/Exchange, Endpoint)"
      ]
    },
    {
      "phase": "Phase 4",
      "title": "PowerShell Health Verification",
      "description": "Verified the Adaptive Protection policy and all related Insider Risk Management policies were enabled and healthy using Security & Compliance PowerShell.",
      "steps": [
        "Verify the Adaptive Protection policy using PowerShell (Enabled: True, HealthStatus: Healthy)",
        "Verify all Insider Risk Management policies using PowerShell (Mode: Enable, Enabled: True)"
      ]
    }
  ],
  "powershell": [
    {
      "title": "Adaptive Protection and Insider Risk Policy Verification",
      "language": "powershell",
      "filename": "Verify-AdaptiveProtection.ps1",
      "code": "# Confirm the Adaptive Protection policy is enabled and healthy\nGet-InsiderRiskPolicy | Where-Object {$_.Name -like \"*Adaptive*\"} | fl Name,Enabled,PolicyHealth\n\n# Confirm the mode, state, and enabled status of every Insider Risk Management policy\nGet-InsiderRiskPolicy | fl Name,Mode,State,Enabled"
    }
  ],
  "screenshots": [
    {
      "title": "Adaptive Protection Dashboard (Initial Disabled State)",
      "caption": "The lab's real starting point: Adaptive Protection disabled after its source insider risk policy was deleted.",
      "phase": "Phase 1"
    },
    {
      "title": "Adaptive Protection Settings",
      "caption": "Adaptive Protection re-enabled at the tenant level.",
      "phase": "Phase 1"
    },
    {
      "title": "Insider Risk Levels",
      "caption": "Elevated, Moderate, and Minor risk level thresholds configured from the Data Leaks Insider Risk Policy.",
      "phase": "Phase 2"
    },
    {
      "title": "Conditional Access Policies Using Insider Risk",
      "caption": "Report-only Conditional Access policy blocking Office Apps access for Elevated-risk users.",
      "phase": "Phase 3"
    },
    {
      "title": "DLP Policies Using Insider Risk",
      "caption": "Teams/Exchange and Endpoint DLP policies referencing Adaptive Protection insider risk levels.",
      "phase": "Phase 3"
    },
    {
      "title": "PowerShell Verification — Adaptive Protection Policy",
      "caption": "Get-InsiderRiskPolicy confirms the Adaptive Protection policy is Enabled: True with HealthStatus: Healthy.",
      "phase": "Phase 4"
    },
    {
      "title": "PowerShell Verification — Insider Risk Policies",
      "caption": "All related Insider Risk Management policies confirmed Mode: Enable, Enabled: True.",
      "phase": "Phase 4"
    }
  ],
  "validation": [
    {
      "item": "Adaptive Protection outage diagnosed",
      "detail": "Confirmed via dashboard — disabled state traced to deleted source insider risk policy — Pass"
    },
    {
      "item": "Adaptive Protection re-enabled",
      "detail": "Confirmed via settings page — Pass"
    },
    {
      "item": "Insider risk levels configured",
      "detail": "Elevated, Moderate, Minor thresholds confirmed — Pass"
    },
    {
      "item": "Conditional Access policy reviewed",
      "detail": "Confirmed Report-only, Elevated scope — Pass"
    },
    {
      "item": "DLP policies reviewed",
      "detail": "Two policies (Teams/Exchange, Endpoint) confirmed referencing insider risk — Pass"
    },
    {
      "item": "Adaptive Protection policy health verified via PowerShell",
      "detail": "Enabled: True, HealthStatus: Healthy — Pass"
    },
    {
      "item": "Insider Risk Management policies verified via PowerShell",
      "detail": "Mode: Enable, Enabled: True for all related policies — Pass"
    }
  ],
  "challenges": [
    {
      "title": "Real outage from a deleted source policy",
      "detail": "Adaptive Protection was found disabled at the start of the lab because the insider risk policy it originally sourced risk levels from had been deleted — documented as the genuine starting state rather than a simulated failure."
    },
    {
      "title": "Report-only Conditional Access provides no real enforcement",
      "detail": "The Conditional Access policy consuming insider risk levels remains in Report-only mode, meaning it currently only logs matching sign-ins rather than actually blocking access."
    }
  ],
  "lessons": [
    "Adaptive Protection has a hard dependency on its source Insider Risk Management policy — deleting that policy silently disables downstream enforcement rather than failing loudly.",
    "PowerShell verification can reveal system-generated policies (such as IRM_Tenant_Setting_...) that are not otherwise surfaced in the Purview portal UI.",
    "Deploying new Conditional Access policies in Report-only mode first, as observed in this lab, is a safer rollout pattern than enforcing immediately.",
    "Turning off Adaptive Protection can take up to 6 hours to fully stop assigning and resetting risk levels, which has real operational implications for lab teardown or emergency rollback."
  ],
  "businessImpact": [
    {
      "label": "Policy Health",
      "value": "Healthy",
      "icon": "shield"
    },
    {
      "label": "Risk Levels",
      "value": "3-Tier (Elevated/Moderate/Minor)",
      "icon": "risk"
    },
    {
      "label": "Enforcement Surfaces",
      "value": "DLP + Conditional Access",
      "icon": "zerotrust"
    },
    {
      "label": "Verification",
      "value": "PowerShell-Validated",
      "icon": "compliance"
    }
  ],
  "skills": [
    "Microsoft Purview Adaptive Protection",
    "Insider Risk Management Policy Configuration",
    "Conditional Access Policy Review",
    "DLP Policy Review",
    "PowerShell-Based Compliance Verification",
    "Outage Diagnosis & Recovery"
  ],
  "relatedCertifications": [
    "SC-400",
    "SC-300",
    "SC-200"
  ],
  "blogArticles": [],
  "repo": {
    "name": "Microsoft-Adaptive-Protection",
    "description": "Configuration and verification of Microsoft Purview Adaptive Protection linking Insider Risk Management to DLP and Conditional Access enforcement",
    "url": "https://github.com/lokeshm-it/Microsoft-Adaptive-Protection"
  }
,
  downloads: standardDownloads,
};

/* ------------------------------------------------------------------ */
/* 19. Microsoft Purview DSPM for AI (Classic) */
/* ------------------------------------------------------------------ */

const dspmForAi: CaseStudy = {
  slug: "dspm-for-ai",
  title: "Microsoft Purview DSPM for AI (Classic)",
  tagline:
    "Discovering, auditing and governing Microsoft 365 Copilot and generative AI activity, with auto-provisioned Data Loss Prevention and Insider Risk Management policies.",
  category: "Compliance · AI Governance",
  hero: false,
  outcome:
    "Closed the Microsoft 365 Copilot visibility gap — validated live AI interaction telemetry and stood up three auto-provisioned governance policies spanning Data Loss Prevention and Insider Risk Management.",
  badges: ["Microsoft Purview", "DSPM for AI", "Microsoft 365 Copilot", "Purview Audit", "Data Loss Prevention", "Insider Risk Management"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "45–60 minutes",
  certifications: ["SC-400", "SC-300", "SC-900"],
  executiveSummary: [
    "This project documents an end-to-end configuration of Microsoft Purview Data Security Posture Management (DSPM) for AI (Classic) — the control plane Microsoft 365 tenants use to discover, audit and govern how users and agents interact with Microsoft 365 Copilot and other generative AI applications.",
    "The lab completes the mandatory onboarding checklist, validates live AI interaction and sensitive-information-type telemetry in Activity Explorer, reviews risk-focused Reports, and confirms the Data Loss Prevention and Insider Risk Management policies that extending AI data discovery insights auto-provisions, closing with a governance maturity scorecard from Purview’s Recommendations engine.",
  ],
  businessProblem: {
    problem:
      "The organization had no way to see what sensitive data — PII, financial data, national identifiers — was being shared with Microsoft 365 Copilot, Copilot agents, or external generative AI applications accessed through the browser.",
    importance:
      "Microsoft 365 Copilot and browser-based AI tools sit directly on top of the same SharePoint, Exchange and Teams content stores that traditional DLP programs were built to protect, and prompts submitted to those tools cannot be retrieved once sent — a governance blind spot that grows with every stage of Copilot adoption.",
    risks: [
      "Sensitive identifiers (Aadhaar numbers, Japanese My Number data and other regulated PII) shared with Copilot without any monitoring",
      "No structured signal for unauthorized or unethical AI interactions",
      "Governance and audit gaps as Copilot usage scales across the tenant",
    ],
    compliance: [
      "SC-400 / SC-300 aligned data security and insider risk scenarios",
      "Zero Trust audit-first governance posture",
    ],
  },
  solutionOverview: [
    "DSPM for AI (Classic) was activated from the Purview Solutions catalog and the four-step onboarding checklist was completed in sequence — activating Microsoft Purview Audit, installing the Purview browser extension, onboarding devices, and extending insights for data discovery.",
    "Extending insights auto-provisioned three governance policies across Data Loss Prevention and Insider Risk Management in a single action, while Activity Explorer and the Reports dashboard gave a unified view of Copilot interactions, sensitive information type matches and a dedicated \"unethical AI interaction\" risk signal.",
  ],
  architectureCaption:
    "Users interacting with Microsoft 365 Copilot and browser-based AI tools feed Purview Audit telemetry into DSPM for AI, which aggregates activity into Activity Explorer and Reports and auto-provisions enforcement policies in Data Loss Prevention and Insider Risk Management.",
  technologyStack: [
    { name: "Microsoft Purview DSPM for AI (Classic)", description: "Discovery, telemetry and governance control plane for AI activity" },
    { name: "Microsoft Purview Audit", description: "Foundational telemetry layer feeding Copilot interaction data" },
    { name: "Purview browser extension & device onboarding", description: "Extends visibility to AI sites reached through Edge, Chrome and Firefox" },
    { name: "Activity Explorer", description: "Event-level detail on AI interactions and sensitive info type matches" },
    { name: "Data Loss Prevention / Insider Risk Management", description: "Auto-provisioned enforcement policies triggered by extending AI insights" },
  ],
  labEnvironment: [
    { label: "Portal", value: "Microsoft Purview compliance portal (purview.microsoft.com)" },
    { label: "Tenant admin account", value: "admin365lab" },
    { label: "Test user", value: "testuser1@securem365lsb..." },
    { label: "AI app in scope", value: "Microsoft 365 Copilot (Copilot Chat, WebChat surface)" },
    { label: "Lab date range observed", value: "30 June 2026 – 7 July 2026" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Locate DSPM for AI and Review Onboarding",
      description:
        "Locate DSPM for AI (Classic) in the Purview Solutions catalog and review the four-step \"Get started\" onboarding checklist.",
      steps: [
        "Select DSPM for AI (classic) from the Purview Solutions catalog",
        "Review the Overview dashboard and the four required onboarding steps",
        "Confirm Purview Audit, the browser extension and device onboarding show completed",
      ],
    },
    {
      phase: "Phase 2",
      title: "Extend Insights for Data Discovery",
      description:
        "Complete the fourth onboarding step, which auto-provisions governance policies across Data Loss Prevention and Insider Risk Management.",
      steps: [
        "Action \"Extend your insights for data discovery\"",
        "Confirm the Extend Insights panel shows policies created",
        "Review the three new policies in the consolidated Policies list",
      ],
    },
    {
      phase: "Phase 3",
      title: "Validate Telemetry in Activity Explorer and Reports",
      description:
        "Confirm real AI interaction and sensitive-information-type events are populating, and review risk-focused Reports.",
      steps: [
        "Review AI Interaction and Sensitive info types events in Activity Explorer",
        "Review the Reports Data section — sensitive interactions per AI app and top unethical AI interactions",
        "Review the Reports Activity section — total interactions over time",
      ],
    },
    {
      phase: "Phase 4",
      title: "Review Policies and Recommendations",
      description:
        "Confirm policy status across the consolidated Policies list and track AI governance maturity via Recommendations.",
      steps: [
        "Confirm all DSPM for AI-provisioned and pre-existing policies show Status: On",
        "Review the Recommendations Not Started / Dismissed / Completed scorecard",
        "Re-confirm the Recommendations scorecard at a narrower viewport as a consistency check",
      ],
    },
  ],
  powershell: [
    {
      title: "Confirm Microsoft Purview Audit status",
      language: "powershell",
      filename: "Get-PurviewAuditStatus.ps1",
      code: "# Illustrative scaffold — DSPM for AI has a hard dependency on Purview Audit being active.\nConnect-IPPSSession -UserPrincipalName admin@yourtenant.onmicrosoft.com\n\n# Confirm unified audit logging is enabled tenant-wide\nGet-AdminAuditLogConfig | Select-Object UnifiedAuditLogIngestionEnabled",
    },
  ],
  screenshots: placeholderScreenshots([
    ["Solution Navigation", "Locating DSPM for AI (classic) in the Purview Solutions catalog."],
    ["Overview Dashboard", "The four-step \"Get started\" onboarding checklist."],
    ["Activity Explorer", "AI Interaction and Sensitive info types events for Microsoft 365 Copilot."],
    ["Reports — Data Section", "Sensitive interactions per AI app and top unethical AI interactions."],
    ["Recommendations List", "The Not Started / Dismissed / Completed governance scorecard."],
    ["Reports — Activity Trend", "Total AI interactions over time for Copilot experiences and agents."],
    ["Extend Insights — Policies Created", "Confirmation that extending insights auto-provisioned three new policies."],
    ["Policies Overview", "The consolidated Data Loss Prevention, DSPM for AI and Insider Risk Management policies."],
    ["Recommendations Progress", "A narrower-viewport consistency check of the Recommendations scorecard."],
  ]),
  validation: [
    { item: "Onboarding checklist completed", detail: "Purview Audit, browser extension and device onboarding confirmed complete before extending insights — Pass" },
    { item: "Telemetry validated", detail: "Activity Explorer returned 9 events across AI Interaction and Sensitive info types activity types — Pass" },
    { item: "Policies auto-provisioned", detail: "Extend Insights panel confirmed policies created; independently verified Status: On for all three in the Policies list — Pass" },
    { item: "Sensitive interactions confirmed", detail: "Reports Data section showed 12 sensitive interactions and 1 unethical interaction against Microsoft 365 Copilot — Pass" },
  ],
  challenges: [
    { title: "Sequenced onboarding dependency", detail: "DSPM for AI cannot surface any Copilot interaction telemetry until Purview Audit is active first — the onboarding checklist must be completed in order, not in parallel." },
    { title: "One action, multiple solution areas", detail: "\"Extend insights for data discovery\" provisions policies across Data Loss Prevention and Insider Risk Management simultaneously, so a single DSPM for AI action has a footprint that other solution owners need to review." },
  ],
  lessons: [
    "Visibility precedes governance — meaningful AI activity data only became visible after the first three onboarding steps were completed.",
    "A single \"Extend insights for data discovery\" action provisioned policies across three different Purview solution areas at once, which matters for change management.",
    "The Recommendations completion count is a leading indicator of governance maturity, not a lagging measure of actual protection already in place.",
    "DSPM for AI (Classic) is scheduled for retirement on 30 September 2026, with all classic data carrying forward into the new DSPM experience — a migration every Microsoft 365 security team using it will need to plan for.",
  ],
  businessImpact: [
    { label: "Sensitive Interactions Detected", value: "12", icon: "risk" },
    { label: "Policies Auto-Provisioned", value: "3", icon: "compliance" },
    { label: "Telemetry Validated", value: "9 Activity Events", icon: "shield" },
    { label: "Governance Maturity", value: "1 of 14 Recommendations", icon: "activity" },
  ],
  skills: [
    "Microsoft Purview DSPM for AI Configuration",
    "Microsoft 365 Copilot Activity Monitoring",
    "Activity Explorer & Reports Analysis",
    "Data Loss Prevention Policy Review",
    "Insider Risk Management Policy Review",
    "AI Governance Maturity Tracking",
  ],
  relatedCertifications: ["SC-400", "SC-300", "SC-900"],
  blogArticles: [],
  repo: {
    name: "Microsoft-Purview-DSPM-for-AI",
    description: "Enterprise configuration and validation of Microsoft Purview DSPM for AI (Classic) for Microsoft 365 Copilot governance.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-DSPM-for-AI",
  },
  downloads: standardDownloads,
};


/* 20. Microsoft Purview Compliance Manager */
const purviewComplianceManager: CaseStudy = {
  slug: "purview-compliance-manager",
  title: "Microsoft Purview Compliance Manager",
  tagline:
    "Operationalising a risk-based compliance program — assessments, a 500-item improvement action backlog and a full ISO/IEC 27001:2013 control mapping across a Microsoft 365 tenant.",
  category: "Compliance · Governance & Risk",
  hero: false,
  outcome:
    "Stood up a measurable compliance program from a 59% baseline score — prioritised a 500-item improvement action backlog by risk impact and mapped a full ISO/IEC 27001:2013 control set for audit readiness.",
  badges: ["Microsoft Purview", "Compliance Manager", "ISO/IEC 27001", "Regulatory Compliance", "Data Protection Baseline", "AI Baseline"],
  difficulty: "Advanced",
  environment: "Microsoft 365 / Purview",
  deployment: "Production",
  implementationTime: "60–90 minutes",
  certifications: ["SC-400", "SC-900"],
  executiveSummary: [
    "This project documents an end-to-end configuration of Microsoft Purview Compliance Manager, the risk-based compliance scoring and workflow engine embedded in the Microsoft Purview compliance portal, operated against a tenant with an active compliance program already in flight.",
    "The lab starts from a 59% compliance score (13,354.39 of 22,416 points), works two active assessments — AI Baseline and Data Protection Baseline for Microsoft 365 — prioritises a 500-item improvement action backlog by risk impact, reviews a 391-item regulation catalog, and maps the full ISO/IEC 27001:2013 control set (233 controls, 347 Microsoft actions) for certification readiness.",
  ],
  businessProblem: {
    problem:
      "The organisation needed a single system of record for compliance posture instead of tracking hundreds of controls across spreadsheets, SharePoint sites and email threads, which does not scale and produces inconsistent evidence when auditors ask \"prove it\".",
    importance:
      "Manual control tracking cannot keep pace with simultaneous regulatory pressure — data protection laws, industry-specific standards, national frameworks and voluntary certifications such as ISO/IEC 27001 — while a 500-item improvement action backlog needs risk-based prioritisation, not alphabetical processing.",
    risks: [
      "500 open improvement actions, many showing a Failed – High Risk test status, with no structured prioritisation",
      "Inability to demonstrate shared-responsibility coverage between Microsoft-managed and customer-managed controls",
      "Unpreparedness for an ISO/IEC 27001:2013 certification or surveillance audit across 233 applicable controls",
    ],
    compliance: [
      "Data Protection Baseline and AI Baseline assessments for Microsoft 365",
      "ISO/IEC 27001:2013 Annex A control mapping toward ISMS certification readiness",
    ],
  },
  solutionOverview: [
    "Compliance Manager was reviewed from the Overview dashboard to confirm the starting 59% compliance score, split between 946.39 of 9,915 customer-managed points and 12,408 of 12,501 Microsoft-managed points, before drilling into the two active assessments.",
    "The 500-item improvement action register was filtered to Test status: Failed - High Risk and sequenced by identity and access controls first, then device compliance, then data protection, while the Regulations catalog (391 templates) and the ISO/IEC 27001:2013 control mapping (233 controls, 347 Microsoft actions) were reviewed to plan certification-readiness work and export audit-ready reports.",
  ],
  architectureCaption:
    "Signal from Microsoft 365 workloads, Microsoft Entra ID, Microsoft Intune and Microsoft Defender feeds Compliance Manager, which scores Microsoft-managed and customer-managed controls across active assessments and produces exportable compliance reports.",
  technologyStack: [
    { name: "Microsoft Purview Compliance Manager", description: "Risk-based compliance scoring and workflow engine in the Purview compliance portal" },
    { name: "Assessments", description: "Data Protection Baseline for Microsoft 365 and AI Baseline, tracked at 61% and 64% progress" },
    { name: "Improvement Actions register", description: "500-item filterable compliance backlog spanning technical and operational controls" },
    { name: "Regulations catalog", description: "391 regulatory and industry templates spanning data protection, AI governance and premium frameworks" },
    { name: "ISO/IEC 27001:2013 mapping", description: "233 Annex A controls and 347 Microsoft/Azure Control Framework actions" },
  ],
  labEnvironment: [
    { label: "Portal", value: "Microsoft Purview compliance portal (compliance.microsoft.com)" },
    { label: "Starting compliance score", value: "59% (13,354.39 of 22,416 points)" },
    { label: "Active assessments", value: "AI Baseline (64%), Data Protection Baseline for Microsoft 365 (61%)" },
    { label: "Improvement actions tracked", value: "500 (37 completed, 0 out of scope)" },
    { label: "Regulations catalog reviewed", value: "391 templates, 3 of 3 purchased licenses available" },
  ],
  implementation: [
    {
      phase: "Phase 1",
      title: "Review Overview and Baseline Compliance Score",
      description:
        "Sign in to the Microsoft Purview compliance portal and review the Overview dashboard to confirm the starting compliance score and Microsoft-managed versus customer-managed point split.",
      steps: [
        "Sign in with an account holding the Compliance Manager Administrator role",
        "Review the Overall compliance score gauge and the points-achieved breakdown",
        "Review the Key improvement actions table for the highest-impact unresolved items",
      ],
    },
    {
      phase: "Phase 2",
      title: "Review Active Assessments",
      description:
        "Drill into the Data Protection Baseline for Microsoft 365 and AI Baseline assessments to review scoped progress against each regulation template.",
      steps: [
        "Open Assessments and review progress for Data Protection Baseline (61%) and AI Baseline (64%)",
        "Review the Progress, Controls, Your improvement actions and Microsoft actions tabs",
        "Cross-reference key improvement actions against their test status",
      ],
    },
    {
      phase: "Phase 3",
      title: "Prioritise the Improvement Actions Backlog",
      description:
        "Filter the 500-item improvement action register by test status and point value to build a risk-ordered remediation plan.",
      steps: [
        "Filter improvement actions to Test status: Failed - High Risk",
        "Sort by point value and sequence identity, then device, then data protection controls",
        "Assign owners and implementation status, attaching evidence where available",
      ],
    },
    {
      phase: "Phase 4",
      title: "Map ISO/IEC 27001:2013 Controls and Export Reports",
      description:
        "Review the Regulations catalog and the ISO/IEC 27001:2013 control and Microsoft action mapping, then export assessment reports as audit evidence.",
      steps: [
        "Browse the 391-item Regulations catalog grouped by template category",
        "Review ISO/IEC 27001:2013 All controls (233 items) and Microsoft actions (347 items)",
        "Download an assessment report and store it as date-stamped audit evidence",
      ],
    },
  ],
  powershell: [
    {
      title: "Illustrative Compliance Manager export scaffold",
      language: "powershell",
      filename: "Export-ComplianceManagerActions.ps1",
      code: "# Illustrative scaffold - this lab was performed entirely through the Purview compliance portal UI.\nConnect-IPPSSession -UserPrincipalName admin@yourtenant.onmicrosoft.com\n\n# Illustrates how improvement action export could be automated via the Microsoft Graph Compliance Manager APIs\nGet-ComplianceManagerAssessment | Select-Object AssessmentName, Progress, PointsAchieved",
    },
  ],
  screenshots: placeholderScreenshots([
    ["Compliance Manager Overview", "The Overview dashboard showing a 59% compliance score across Microsoft-managed and customer-managed points."],
    ["Assessments List", "AI Baseline and Data Protection Baseline for Microsoft 365 assessments in progress at 64% and 61%."],
    ["Data Protection Baseline Assessment Detail", "Scoped progress, controls and improvement actions for the Data Protection Baseline assessment."],
    ["Improvement Actions List", "The 500-item improvement action register filterable by test status, point value and category."],
    ["Device Compliance Reporting", "The Generate and review reports for device compliance improvement action with a Launch Now deep link into Intune."],
    ["Regulations Catalog", "The 391-item Regulations catalog grouped by Sub-Service Compliance Readiness, Included, Premium AI and Premium templates."],
    ["ISO/IEC 27001:2013 All Controls", "233 Annex A controls grouped by control family for ISMS certification readiness."],
    ["ISO/IEC 27001:2013 Microsoft Actions", "347 Microsoft/Azure Control Framework actions satisfying ISO/IEC 27001:2013 requirements."],
  ]),
  validation: [
    { item: "Baseline compliance score confirmed", detail: "Overview dashboard verified 59% overall - 13,354.39 of 22,416 points achieved - Pass" },
    { item: "Active assessments reviewed", detail: "AI Baseline at 64% (2 of 80 actions) and Data Protection Baseline at 61% (36 of 489 actions) - Pass" },
    { item: "Improvement actions backlog triaged", detail: "500 improvement actions reviewed and filtered by Test status: Failed - High Risk - Pass" },
    { item: "ISO/IEC 27001:2013 mapping reviewed", detail: "233 Annex A controls and 347 Microsoft actions confirmed under the regulation entry - Pass" },
  ],
  challenges: [
    { title: "Score is point-weighted, not count-weighted", detail: "Assessment progress percentages did not track linearly with completed action counts, since a few high-point actions outweigh many low-point actions - required prioritising by point value rather than backlog size." },
    { title: "500-item backlog risked appearing unmanageable", detail: "Segmenting improvement actions by test status and point value converted an unstructured 500-item list into an ordered, workable remediation sprint plan." },
  ],
  lessons: [
    "The compliance score is a communication tool, not the goal - chasing the percentage without validating genuine control implementation risks an audit that fails despite a high displayed score.",
    "Customer-managed points are where the real remediation work is - Microsoft-managed points arrive largely through the shared-responsibility model.",
    "ISO/IEC 27001 pre-built Azure Control Framework mapping (347 actions, 233 controls) is a substantial accelerator for certification readiness compared with manual cross-referencing.",
    "Evidence staleness is a silent risk - a Passed test status from months ago, without recurring verification, is a weaker audit position than an honest Not Assessed with a scheduled test date.",
  ],
  businessImpact: [
    { label: "Baseline Compliance Score", value: "59%", icon: "compliance" },
    { label: "Improvement Actions Tracked", value: "500", icon: "risk" },
    { label: "Regulatory Templates Reviewed", value: "391", icon: "activity" },
    { label: "ISO/IEC 27001 Controls Mapped", value: "233", icon: "shield" },
  ],
  skills: [
    "Microsoft Purview Compliance Manager Configuration",
    "Compliance Assessment Management (Data Protection Baseline, AI Baseline)",
    "Improvement Action Prioritisation and Remediation Tracking",
    "Regulatory Framework and Regulations Catalog Review",
    "ISO/IEC 27001:2013 Control Mapping",
    "Compliance Reporting and Audit Evidence Preparation",
  ],
  relatedCertifications: ["SC-400", "SC-900"],
  blogArticles: [],
  repo: {
    name: "Microsoft-Purview-Compliance-Manager",
    description: "Enterprise implementation of Microsoft Purview Compliance Manager - compliance assessments, improvement action remediation and ISO/IEC 27001:2013 control mapping.",
    url: "https://github.com/lokeshm-it/Microsoft-Purview-Compliance-Manager",
  },
  downloads: standardDownloads,
};

/* Registry */
/* ------------------------------------------------------------------ */

export const caseStudies: CaseStudy[] = [
  purviewDlp,
  purviewInformationProtection,
  purviewRecordsManagement,
  purviewAudit,
  purviewEdiscovery,
  purviewDlm,
  intuneDeployment,
  zeroTrustDevice,
  entraIdProtection,
  zeroTrustIdentity,
  purviewDsi,
  purviewCommComp,
  defenderXdrSentinel,
  continuousTvm,
  zeroTrustEmailSecurity,
  informationBarriers,
  insiderRiskManagement,
  adaptiveProtection,
  dspmForAi,
  purviewComplianceManager,
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
