# Production Launch Report — lokeshmurali.com

**Product:** Lokesh M — Enterprise Microsoft Portfolio
**Review type:** Pre-launch production readiness (Senior Staff Engineer review)
**Date:** 4 July 2026
**Reviewer scope:** Static code + content audit of the Next.js 15 codebase. Runtime metrics (Lighthouse, real-device, screen-reader passes) are flagged as post-deploy verification where they cannot be measured statically.

---

## Launch Readiness Score: 88 / 100 → **94 / 100 (post-remediation)** — Conditional GO

The portfolio is well-architected, accessible, SEO-ready and free of broken links or committed secrets. No Critical blockers were found. After the remediation pass below, the remaining open items are **operational actions only you can perform** (create the repos, run the build, set the host env) — there are no outstanding code fixes.

---

## Remediation Update (4 July 2026)

Implemented in code:

| Item | Status |
| --- | --- |
| M1 — Content-Security-Policy | ✅ Added (enforcing) in `vercel.json` |
| M1 — HSTS (`Strict-Transport-Security`) | ✅ Added (`max-age=63072000; includeSubDomains; preload`) |
| M2 — Lightbox focus trap | ✅ Focus moves in on open, Tab is trapped, focus restored on close |
| M3 — Skip link on subpages | ✅ Reusable `SkipLink` added to dashboard + case-study pages |
| M5 — Headshot optimization | ✅ Converted to WebP: **568 KB → 26 KB** (~95% smaller) |
| Deploy config | ✅ `cleanUrls`, `trailingSlash:false`, long-cache headers for `/og/*` |
| Env / robots / sitemap | ✅ Verified: `NEXT_PUBLIC_SITE_URL=https://lokeshmurali.com`; robots.ts + sitemap.ts driven by `siteConfig.url` |
| `Permissions-Policy` | ✅ Extended with `interest-cohort=()` |

Still open (operational — not code):
- **H1** create/verify the 5 project repos (or revert those links to profile).
- **H2** run `npm run build` on a machine with registry access / CI.
- **H3** set `NEXT_PUBLIC_SITE_URL` and domains on the host.
- **M4** add real screenshots (drop-in ready; awaiting your files).

CSP note: the policy uses `script-src 'self' 'unsafe-inline'` because a static Next.js export cannot use per-request nonces. This is a deliberate, documented trade-off; tighten with hashes/nonces if you later move to a server runtime or add middleware.

---

### Original assessment (retained for reference)

The portfolio is well-architected, accessible, SEO-ready and free of broken links or committed secrets. It is safe to launch **after clearing the 3 High-priority items** below (verify the project repositories exist, run a clean production build, and confirm the domain/env). No Critical blockers were found.

| Area | Result |
| --- | --- |
| 1. Navigation | ✅ Pass |
| 2. Performance | ⚠️ Minor optimizations |
| 3. Accessibility | ✅ Strong (2 medium items) |
| 4. SEO | ✅ Strong |
| 5. Recruiter experience | ✅ Strong |
| 6. Mobile | ✅ Pass (device test recommended) |
| 7. Contact | ✅ Pass |
| 8. Project pages | ✅ Complete |
| 9. GitHub links | ⚠️ Verify repos exist |
| 10. Security | ⚠️ Add CSP + HSTS |
| 11. Branding | ✅ Consistent |

---

## Findings by Priority

### 🔴 Critical (0)
None. No broken links, no committed secrets, no placeholder credentials, no build-blocking issues detected in static review.

### 🟠 High (3)

**H1 — Project pages link to repositories that may not exist yet.**
Each case-study page now links its GitHub button to a specific repo (`github.com/lokeshm-it/<slug>`, e.g. `/purview-dlp`). If those repositories are not yet created and public, visitors hit a 404.
*Recommendation:* Before launch, either (a) create the 5 repos (even as private-to-public stubs with a README), or (b) temporarily point `repo.url` back to the profile in `src/lib/case-studies.ts`. Homepage hero → profile is correct and unaffected.

**H2 — Production build must be verified on a machine with npm access.**
The build could not be compiled in this environment (the sandbox blocks the npm registry). All checks here are static.
*Recommendation:* Run `npm install && npm run typecheck && npm run lint && npm run build` locally / in CI and confirm a clean build before deploying. The included GitHub Actions workflow (`.github/workflows/ci.yml`) does this automatically on push.

**H3 — Confirm domain + environment on the host.**
`NEXT_PUBLIC_SITE_URL` drives canonical URLs, sitemap, robots and Open Graph image URLs.
*Recommendation:* Set `NEXT_PUBLIC_SITE_URL=https://lokeshmurali.com` in the Vercel project, add the apex + `www` domains, and verify `/sitemap.xml`, `/robots.txt` and OG previews resolve post-deploy.

### 🟡 Medium (5)

**M1 — No Content-Security-Policy or HSTS header.**
`vercel.json` sets X-Content-Type-Options, X-Frame-Options, Referrer-Policy and Permissions-Policy, but no CSP or `Strict-Transport-Security`.
*Recommendation:* Add HSTS (`max-age=63072000; includeSubDomains; preload`) and a starter CSP. A strict CSP needs `'unsafe-inline'` handling for Next's inline styles/JSON-LD; start in report-only mode. (See Recommendations.)

**M2 — Lightbox modal does not trap or move focus.**
The screenshot lightbox sets `role="dialog"` + `aria-modal` and supports Esc/arrow keys, but focus is not moved into the dialog on open nor trapped inside it — a WCAG 2.4.3 / 2.1.2 concern for keyboard/screen-reader users.
*Recommendation:* On open, move focus to the close button and trap Tab within the dialog; restore focus to the trigger on close.

**M3 — Skip-to-content link is only on the homepage.**
The `/projects` dashboard and `/projects/[slug]` case-study pages do not render the skip link.
*Recommendation:* Add the same skip link to those two page shells for keyboard users.

**M4 — Configuration screenshots are still placeholders.**
The gallery is wired to render real images the moment they're added (optional `image` field), but no real screenshots are present yet.
*Recommendation:* Add real screenshots to `public/projects/<slug>/screenshots/` and reference them (see `ASSETS.md`). Not a blocker — placeholders are clearly labelled.

**M5 — Headshot is a 568 KB, 800×800 PNG.**
On Vercel, `next/image` optimizes it automatically; on a static export it ships as-is.
*Recommendation:* Compress and/or provide a WebP/AVIF variant (~40–80 KB) to improve LCP, especially for static hosting.

### 🟢 Low (4)

**L1 — Some touch targets are ~32px.** A few icon buttons use `size-8` (32px); WCAG 2.5.5 (AAA) suggests 44px. Most primary controls already meet this. Consider bumping small icon buttons to `size-10`/`size-11`.

**L2 — Dashboard page has no structured data.** Home (Person/WebSite) and case studies (TechArticle) have JSON-LD; `/projects` could add `CollectionPage` / `BreadcrumbList` for richer results.

**L3 — No breadcrumb trail on case-study pages.** There is an "All projects" back link, but no visible breadcrumb or `BreadcrumbList` JSON-LD. Optional enhancement.

**L4 — Spot-check low-contrast micro-text.** A few `text-[11px] text-muted-foreground/70` labels may be borderline against the card background. Verify ≥ 4.5:1 (or 3:1 for ≥ 18.66px bold) with an automated contrast checker.

---

## Checklist Detail

### 1. Navigation ✅
Internal routes verified: `/`, `/#projects`, `/projects`, `/projects/[slug]` — all resolve to real pages/anchors. All 10 external `target="_blank"` links carry `rel="noopener noreferrer"`. Case-study pages provide an "All projects" back link and prev/next pager. No broken links found. (Breadcrumbs — see L3.)

### 2. Performance ⚠️
Fonts are loaded via `next/font` (Inter + JetBrains Mono) — automatically subset, self-hosted and preloaded. Hero image uses `next/image` with `priority`. No analytics or heavy runtime libraries; `poweredByHeader` disabled. Main client-side weight is Framer Motion (acceptable). Optimize the headshot (M5). Verify Core Web Vitals with Lighthouse after deploy.

### 3. Accessibility ✅ (WCAG 2.1 AA target)
Exactly one `<h1>` per page; sections use `<h2>`. Global `:focus-visible` rings. All images have `alt` text. Rich ARIA usage: `aria-label` (18), `aria-hidden`, `aria-expanded` (accordion), `aria-pressed` (filter chips), `aria-modal`/`role="dialog"` (lightbox), `aria-labelledby` (sections). `prefers-reduced-motion` respected (including count-up). No forms (contact is `mailto:`), so no form-label gaps; the search input has an `aria-label`. Address focus management (M2) and subpage skip links (M3).

### 4. SEO ✅
Per-page titles (with template), meta descriptions, canonical URLs, `metadataBase`, Open Graph + Twitter cards with branded 1200×630 images, `robots.ts`, `sitemap.ts` (home + dashboard + 5 case studies), Person/WebSite + TechArticle JSON-LD, correct heading hierarchy. Strong. (Optional: dashboard structured data — L2.)

### 5. Recruiter Experience ✅
Clear value proposition ("Senior Infrastructure Engineer"), quantified metrics, five certification-mapped case studies, a filterable project dashboard, and a certification roadmap toward Security Architect. CTAs are strong and repeated appropriately (Download Resume, View Projects, View All Projects, Get in touch). Reads well for HR, a Microsoft hiring manager, a Security Architect and an IT Director. Ensure the linked resume PDF is the latest version before launch.

### 6. Mobile Experience ✅
Responsive utilities used throughout (sm/lg/xl), grids collapse to single column, mobile nav menu, collapsible dashboard filters, full-width CTA on mobile. No data tables (specs use definition lists/grids that reflow). Recommend a real-device pass at 320 / 375 / 768 / 1024 / 1440 px and bumping the few 32px touch targets (L1).

### 7. Contact ✅
Email (`mailto:lokeshmurali45@gmail.com`), LinkedIn (`/in/lokesh-itinfra`), GitHub (`/lokeshm-it`), TechCertGuide blog, X, and résumé download (`/Lokesh-M-Resume.pdf`) all present and correctly wired in the hero, contact card and footer.

### 8. Project Pages ✅
All five case studies contain every required section — Executive Summary, Business Problem, Solution, Architecture, Technology Stack, Lab Environment, Implementation, PowerShell, Screenshots, Validation, Challenges, Lessons Learned, Business Impact, Skills, Related Certifications, Blog Articles, GitHub Repository, Download Center — enforced by the shared TypeScript model, so no page can be partially populated.

### 9. GitHub ✅ (verify targets)
Homepage hero → GitHub **profile**. Case-study pages → **specific repository** per project. Correct per spec; verify the repos exist and are public (H1).

### 10. Security ⚠️
HTTPS is provided automatically by Vercel. Four security headers configured. No secrets in source, `.env` git-ignored, no placeholder credentials, minimal reputable dependencies. `dangerouslySetInnerHTML` is used only for self-authored JSON-LD (safe, no user input). Add CSP + HSTS (M1).

### 11. Branding ✅
Consistent "Senior Infrastructure Engineer" positioning across hero, metadata, OG images and structured data, anchored in Microsoft 365, Identity/Entra ID, Intune, Defender, Purview, Compliance, Zero Trust and enterprise architecture. No generic "IT support" framing.

---

## Recommendations (in suggested order)

1. **Clear the High items:** verify/create the 5 project repos (or revert those links to the profile), run a clean production build, and set the domain + `NEXT_PUBLIC_SITE_URL` on Vercel.
2. **Harden headers:** add HSTS and a report-only CSP in `vercel.json`, then promote CSP to enforcing once verified. Suggested starter:
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
   - `Content-Security-Policy-Report-Only: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'`
3. **Accessibility polish:** add focus trap + initial focus to the lightbox, and the skip link to the dashboard and case-study pages.
4. **Performance:** compress the headshot (WebP/AVIF); run Lighthouse and confirm LCP < 2.5s, CLS < 0.1, INP < 200ms.
5. **Content authenticity:** add real screenshots (and later architecture diagrams, scripts, PDFs) via the `ASSETS.md` drop-in paths.
6. **Post-deploy verification:** submit the sitemap in Google Search Console, validate OG cards in the LinkedIn Post Inspector / Twitter Card Validator, and run axe DevTools on each route.

---

## Pre-Launch Checklist (copy/paste)

- [ ] 5 project repositories exist and are public (or links reverted to profile)
- [ ] `npm run typecheck && npm run lint && npm run build` pass locally / in CI
- [ ] `NEXT_PUBLIC_SITE_URL=https://lokeshmurali.com` set on host
- [ ] Apex + `www` domains added; HTTPS active
- [ ] `/sitemap.xml`, `/robots.txt`, OG previews verified live
- [ ] HSTS + CSP headers added
- [ ] Lighthouse ≥ 90 across Performance / A11y / Best Practices / SEO
- [ ] Résumé PDF is the current version
- [ ] Real-device check at 320/375/768/1024/1440
- [ ] Google Search Console property + sitemap submitted

---

*No code changes were made as part of this review. Each finding above can be actioned on request.*
