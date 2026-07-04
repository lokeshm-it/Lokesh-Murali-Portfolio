# Lokesh M — Portfolio (Phase 1)

Enterprise portfolio for **Lokesh M — Senior Infrastructure Engineer**. Built to feel like a modern Microsoft/Azure product: dashboard-inspired, minimal, fully responsive, with dark and light modes.

## Tech Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript** (strict)
- **Tailwind CSS 3.4** with CSS-variable theming
- **shadcn/ui-style** primitives (Button, Card, Badge) — dependency-light, no Radix required
- **Framer Motion** for scroll reveals, counters and micro-interactions
- **Lucide Icons** + local brand glyphs
- **next-themes** for dark/light mode

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Build for production:

```bash
npm run build       # Node/Vercel build
npm run start       # Serve the production build
```

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (Node/Vercel) |
| `npm run build:static` | Static export to `out/` (Hostinger / static hosts) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | TypeScript, no emit |

## Enterprise Case Studies (Phase 2)

Each featured project has a full case-study page at `/projects/[slug]`, rendered by a single data-driven template. The homepage is unchanged.

- **Content**: `src/lib/case-studies.ts` — one `CaseStudy` object per project. Add a new object to `caseStudies` and a new page is generated automatically (scales to 50+ projects, no layout work).
- **Template**: `src/app/projects/[slug]/page.tsx` composes reusable blocks from `src/components/case-study/` (hero, section shell, architecture diagram with zoom, expandable implementation timeline, syntax-highlighted PowerShell with copy/download, screenshot lightbox gallery, KPI cards, validation checklist, certification mapping, repo preview, download center, sticky table of contents, prev/next pager).
- Each page is statically generated (`generateStaticParams`), SEO-optimized (per-page metadata, canonical, Open Graph, JSON-LD `TechArticle`) and included in the sitemap.

To add a project: append a `CaseStudy` to `caseStudies`, then (optionally) point its homepage card's "View Case Study" button at `/projects/<slug>`.

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full GitHub → Vercel and Hostinger (static) instructions. In short: push to GitHub, import into Vercel (auto-detects Next.js), or run `npm run build:static` and upload `out/` to Hostinger. Set `NEXT_PUBLIC_SITE_URL` to your domain (see `.env.example`).

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout, fonts, theme provider, SEO metadata
    page.tsx          # Home — composes all sections
    globals.css       # Design tokens (light/dark) + utilities
    icon.svg          # Favicon
  components/
    layout/           # Navbar, Footer
    sections/         # Hero, Metrics, About, Skills, Experience, Projects, Certifications, Contact
    shared/           # Reveal, SectionHeading, AnimatedCounter, brand icons
    ui/               # Button, Card, Badge, Slot (shadcn-style primitives)
    theme-provider.tsx
    theme-toggle.tsx
  lib/
    site.ts           # Identity, nav, social links — single source of truth
    data.ts           # Metrics, skills, experience, projects, certifications
    utils.ts          # cn() class merge helper
public/
  headshot.png        # Profile photo (replace with your own)
  Lokesh-M-Resume.pdf # Downloadable resume
```

## Customizing

- **Content**: edit `src/lib/data.ts` and `src/lib/site.ts`.
- **Colors**: edit the HSL tokens in `src/app/globals.css` (`--primary`, `--secondary`, `--accent`).
- **Headshot / Resume**: replace the files in `public/`.

## Roadmap (future phases)

Phase 2+ — projects dashboard with search & filtering, architecture gallery, blog integration, GitHub API, analytics. The data-driven, component-based structure is built to scale into these without rework.

---

© Lokesh M. Built with Next.js, TypeScript & Tailwind CSS.
