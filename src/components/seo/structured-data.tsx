import { siteConfig } from "@/lib/site";

/**
 * Person + WebSite JSON-LD for the homepage.
 * Non-visual: improves search rich results and recruiter/SEO discovery.
 */
export function HomeStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: siteConfig.title,
        email: siteConfig.email,
        url: siteConfig.url,
        image: `${siteConfig.url}${siteConfig.headshot}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        knowsAbout: [
          "Microsoft 365",
          "Microsoft Entra ID",
          "Microsoft Intune",
          "Microsoft Defender",
          "Microsoft Purview",
          "Zero Trust",
          "Identity and Access Management",
          "Endpoint Management",
          "Windows Server",
          "ISO/IEC 27001",
          "PowerShell",
          "Enterprise Infrastructure Security",
        ],
        sameAs: [
          siteConfig.social.linkedin,
          siteConfig.social.github,
          siteConfig.social.blog,
          siteConfig.social.twitter,
        ],
      },
      {
        "@type": "WebSite",
        name: `${siteConfig.name} — ${siteConfig.title}`,
        url: siteConfig.url,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
