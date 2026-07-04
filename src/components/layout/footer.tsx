import { ShieldCheck, Mail, BookOpen } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/shared/brand-icons";

const socials = [
  { label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { label: "Blog", href: siteConfig.social.blog, Icon: BookOpen },
  { label: "X", href: siteConfig.social.twitter, Icon: XIcon },
  { label: "Email", href: siteConfig.social.email, Icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60">
      <div className="container py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <ShieldCheck className="size-5" />
              </span>
              <span className="text-sm font-bold">{siteConfig.name}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigate
            </span>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connect
            </span>
            <div className="flex flex-wrap gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-border bg-background/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
