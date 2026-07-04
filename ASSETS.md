# Real Assets — Drop-in Guide

Phase 4 replaced text placeholders with real content where possible (live TechCertGuide
article links, Open Graph images, SEO metadata, the lokeshmurali.com domain). The remaining
placeholders are **binary assets only you can provide**. Nothing here is invented — drop your
real files at the paths below and wire them in with the small edits noted.

## What is already real

- **Blog cards** → live TechCertGuide articles (`src/lib/case-studies.ts` → `blogArticles`).
- **Open Graph images** → generated, branded, per page in `public/og/`.
- **SEO** → per-page metadata, canonical URLs, sitemap, robots, Person + TechArticle JSON-LD.
- **Domain** → `lokeshmurali.com` (`src/lib/site.ts`, `.env.example`).

## What still needs your files

Data for each project lives in one object in `src/lib/case-studies.ts`. Add the files, then
point the data at them.

### 1. Configuration screenshots
- Drop images in: `public/projects/<slug>/screenshots/`
- Then in each `screenshots` entry add an `image` path (e.g. `/projects/purview-dlp/screenshots/dlp-policy.png`).
  The gallery component (`screenshot-gallery.tsx`) shows a placeholder until an `image` is present.

### 2. Architecture diagrams
- Drop the diagram in: `public/projects/<slug>/architecture.png` (or `.svg`)
- Then set an `architectureImage` field on the case study and pass it to `ArchitectureDiagram`.

### 3. PowerShell scripts
- The `powershell` snippets currently hold clearly-labelled illustrative examples.
- Replace the `code` strings with your real production/lab scripts (keep secrets/tenant IDs out).

### 4. Downloadable PDFs / ZIPs
- Drop files in: `public/projects/<slug>/downloads/`
- Then give each `downloads` entry an `href` (the Download Center links out once `href` is set).

### 5. GitHub repositories
- `repo.url` and `repo.name` per project currently point to your profile (`github.com/lokeshm-it`).
- Replace with the real per-project repository URLs when they exist.

## Suggested folder layout

```
public/
  og/                      # generated OG images (done)
  projects/
    purview-dlp/
      architecture.png
      screenshots/
      downloads/
    intune-deployment/
    zero-trust-device/
    entra-id-protection/
    zero-trust-identity/
```

Each addition is data-only — no component or layout changes needed.
