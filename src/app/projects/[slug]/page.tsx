import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FileText,
  AlertTriangle,
  Lightbulb,
  Network,
  Layers,
  Server,
  ListChecks,
  TerminalSquare,
  Images,
  CheckCircle2,
  Wrench,
  GraduationCap,
  TrendingUp,
  Sparkles,
  Award,
  BookOpen,
  GitBranch,
  Download,
} from "lucide-react";

import {
  caseStudies,
  getCaseStudy,
  getAdjacentCaseStudies,
} from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/section";
import { TableOfContents, type TocItem } from "@/components/case-study/toc";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { ImplementationTimeline } from "@/components/case-study/implementation-timeline";
import { ScreenshotGallery } from "@/components/case-study/screenshot-gallery";
import { ProjectPager } from "@/components/case-study/project-pager";
import { CodeBlock, CodeBlockTitle } from "@/components/case-study/code-block";
import {
  KpiCards,
  TechStackGrid,
  SpecList,
  ValidationChecklist,
  ChallengeList,
  InsightList,
  SkillBadges,
  RelatedCerts,
  BlogCards,
  RepoPreview,
  DownloadCenter,
} from "@/components/case-study/blocks";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/shared/reveal";
import { SkipLink } from "@/components/shared/skip-link";

/** All certification codes referenced across the roadmap (for highlighting). */
const ALL_CERTS = [
  "MS-102",
  "SC-200",
  "SC-300",
  "SC-400",
  "AZ-900",
  "AZ-500",
  "SC-100",
];

const tocItems: TocItem[] = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "business-problem", label: "Business Problem" },
  { id: "solution", label: "Solution Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "technology", label: "Technology Stack" },
  { id: "lab", label: "Lab Environment" },
  { id: "implementation", label: "Implementation" },
  { id: "powershell", label: "PowerShell" },
  { id: "screenshots", label: "Screenshots" },
  { id: "validation", label: "Validation" },
  { id: "challenges", label: "Challenges" },
  { id: "lessons", label: "Lessons Learned" },
  { id: "impact", label: "Business Impact" },
  { id: "skills", label: "Skills Demonstrated" },
  { id: "certifications", label: "Certifications" },
  { id: "blog", label: "Related Articles" },
  { id: "repository", label: "GitHub Repository" },
  { id: "downloads", label: "Download Center" },
];

/* Static generation — required for static export and optimal performance. */
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Project not found" };

  const title = `${study.title} — Case Study`;
  const description = study.tagline;
  const url = `${siteConfig.url}/projects/${study.slug}`;
  const ogImage = `/og/${study.slug}.png`;

  return {
    title,
    description,
    keywords: [...study.badges, ...study.certifications, study.category],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { prev, next } = getAdjacentCaseStudies(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: study.title,
    description: study.tagline,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    keywords: [...study.badges, ...study.certifications].join(", "),
    url: `${siteConfig.url}/projects/${study.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SkipLink />
      <CaseStudyNav />

      <main id="main">
        <CaseStudyHero study={study} />

        <div className="container">
          <div className="gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem]">
            {/* Main content column */}
            <div className="min-w-0">
              <CaseStudySection
                id="executive-summary"
                icon={FileText}
                eyebrow="Overview"
                title="Executive Summary"
              >
                <Reveal className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                  {study.executiveSummary.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </Reveal>
              </CaseStudySection>

              <CaseStudySection
                id="business-problem"
                icon={AlertTriangle}
                eyebrow="Context"
                title="Business Problem"
              >
                <div className="grid gap-6">
                  <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                    <p>{study.businessProblem.problem}</p>
                    <p>{study.businessProblem.importance}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <h3 className="flex items-center gap-2 text-sm font-semibold">
                        <AlertTriangle className="size-4 text-amber-500" />
                        Business Risks
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {study.businessProblem.risks.map((r) => (
                          <li
                            key={r}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <h3 className="flex items-center gap-2 text-sm font-semibold">
                        <ListChecks className="size-4 text-primary" />
                        Compliance Concerns
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {study.businessProblem.compliance.map((c) => (
                          <li
                            key={c}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CaseStudySection>

              <CaseStudySection
                id="solution"
                icon={Lightbulb}
                eyebrow="Approach"
                title="Solution Overview"
              >
                <Reveal className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                  {study.solutionOverview.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </Reveal>
              </CaseStudySection>

              <CaseStudySection
                id="architecture"
                icon={Network}
                eyebrow="Design"
                title="Architecture"
              >
                <ArchitectureDiagram
                caption={study.architectureCaption}
                image={study.architectureImage}
              />
              </CaseStudySection>

              <CaseStudySection
                id="technology"
                icon={Layers}
                eyebrow="Stack"
                title="Technology Stack"
              >
                <TechStackGrid items={study.technologyStack} />
              </CaseStudySection>

              <CaseStudySection
                id="lab"
                icon={Server}
                eyebrow="Environment"
                title="Lab Environment"
              >
                <SpecList items={study.labEnvironment} />
              </CaseStudySection>

              <CaseStudySection
                id="implementation"
                icon={ListChecks}
                eyebrow="Build"
                title="Implementation"
                description="A phased, expandable walkthrough. Screenshots and evidence can be attached to each phase."
              >
                <ImplementationTimeline phases={study.implementation} />
              </CaseStudySection>

              <CaseStudySection
                id="powershell"
                icon={TerminalSquare}
                eyebrow="Automation"
                title="PowerShell"
                description="Illustrative example snippets — copy or download each script. Production values are placeholders."
              >
                <div className="space-y-6">
                  {study.powershell.map((snippet) => (
                    <div key={snippet.filename}>
                      <CodeBlockTitle title={snippet.title} />
                      <CodeBlock snippet={snippet} />
                    </div>
                  ))}
                </div>
              </CaseStudySection>

              <CaseStudySection
                id="screenshots"
                icon={Images}
                eyebrow="Evidence"
                title="Configuration Screenshots"
                description="Click any tile to open the lightbox. Real screenshots will replace these placeholders."
              >
                <ScreenshotGallery screenshots={study.screenshots} />
              </CaseStudySection>

              <CaseStudySection
                id="validation"
                icon={CheckCircle2}
                eyebrow="Proof"
                title="Validation"
              >
                <ValidationChecklist items={study.validation} />
              </CaseStudySection>

              <CaseStudySection
                id="challenges"
                icon={Wrench}
                eyebrow="Reality"
                title="Challenges"
              >
                <ChallengeList items={study.challenges} />
              </CaseStudySection>

              <CaseStudySection
                id="lessons"
                icon={GraduationCap}
                eyebrow="Insight"
                title="Lessons Learned"
              >
                <InsightList items={study.lessons} />
              </CaseStudySection>

              <CaseStudySection
                id="impact"
                icon={TrendingUp}
                eyebrow="Outcome"
                title="Business Impact"
              >
                <KpiCards items={study.businessImpact} />
              </CaseStudySection>

              <CaseStudySection
                id="skills"
                icon={Sparkles}
                eyebrow="Capability"
                title="Skills Demonstrated"
              >
                <SkillBadges items={study.skills} />
              </CaseStudySection>

              <CaseStudySection
                id="certifications"
                icon={Award}
                eyebrow="Mapping"
                title="Related Certifications"
                description="Certifications this project maps to are highlighted."
              >
                <RelatedCerts
                  all={ALL_CERTS}
                  highlighted={study.relatedCertifications}
                />
              </CaseStudySection>

              <CaseStudySection
                id="blog"
                icon={BookOpen}
                eyebrow="Reading"
                title="Related Blog Articles"
                description="Placeholder cards — future TechCertGuide integration."
              >
                <BlogCards items={study.blogArticles} />
              </CaseStudySection>

              <CaseStudySection
                id="repository"
                icon={GitBranch}
                eyebrow="Source"
                title="GitHub Repository"
              >
                <RepoPreview repo={study.repo} />
              </CaseStudySection>

              <CaseStudySection
                id="downloads"
                icon={Download}
                eyebrow="Resources"
                title="Download Center"
              >
                <DownloadCenter items={study.downloads} />
              </CaseStudySection>

              <ProjectPager prev={prev} next={next} />
            </div>

            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 py-16">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
