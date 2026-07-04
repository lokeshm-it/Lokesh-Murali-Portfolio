/**
 * Central site configuration — identity, navigation and social links.
 * Update once here and it flows through the whole site.
 */

export const siteConfig = {
  name: "Lokesh M",
  initials: "LM",
  title: "Senior Infrastructure Engineer",
  role: "Microsoft 365 Administrator · Endpoint & Security Engineer",
  location: "Bengaluru, Karnataka, India",
  email: "lokeshmurali45@gmail.com",
  resumeUrl: "/Lokesh-M-Resume.pdf",
  headshot: "/headshot.webp",
  ogImage: "/og/home.png",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lokeshmurali.com",
  tagline:
    "Building secure enterprise Microsoft infrastructure with Identity, Intune, Compliance and Zero Trust.",
  description:
    "Senior Infrastructure Engineer with 9+ years designing, securing and operating hybrid Microsoft 365 and Windows Server environments. Microsoft Entra ID, Intune, Defender, Purview, Zero Trust and ISO 27001.",
  availability: "Open to remote & hybrid roles",
  social: {
    github: "https://github.com/lokeshm-it",
    linkedin: "https://www.linkedin.com/in/lokesh-itinfra",
    blog: "https://techcertguide.blog",
    twitter: "https://x.com/LokeshM365",
    email: "mailto:lokeshmurali45@gmail.com",
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;
