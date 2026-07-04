import type { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { ProjectsDashboard } from "@/components/dashboard/projects-dashboard";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/shared/skip-link";
import { siteConfig } from "@/lib/site";

const title = "Enterprise Projects Dashboard";
const description =
  "Interactive dashboard of enterprise Microsoft engineering projects — search and filter by technology, certification, environment, difficulty and status, then open each full case study.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Microsoft projects",
    "Enterprise portfolio",
    "Microsoft 365",
    "Entra ID",
    "Intune",
    "Purview",
    "Defender",
    "Zero Trust",
    "Case studies",
  ],
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
    title: `${title} — ${siteConfig.name}`,
    description,
    siteName: siteConfig.name,
    images: [
      { url: "/og/projects.png", width: 1200, height: 630, alt: title },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${siteConfig.name}`,
    description,
    images: ["/og/projects.png"],
  },
};

export default function ProjectsDashboardPage() {
  return (
    <>
      <SkipLink />
      <DashboardNav />
      <main id="main">
        <ProjectsDashboard />
      </main>
      <Footer />
    </>
  );
}
