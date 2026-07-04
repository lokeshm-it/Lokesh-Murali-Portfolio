# Deployment Guide

This is a standard Next.js 15 app. It can run as a Node server (Vercel, any Node host) or be exported to fully static files (Hostinger or any static host).

## 1. Push to GitHub

From the `portfolio-website/` folder:

```bash
git init
git add .
git commit -m "Portfolio Phase 1"
git branch -M main
git remote add origin https://github.com/lokeshm-it/<your-repo>.git
git push -u origin main
```

`node_modules`, `.next`, `out` and env files are already excluded via `.gitignore`.

## 2. Deploy to Vercel (recommended)

1. Go to vercel.com → New Project → import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected). No build settings to change.
3. Add environment variable `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://lokeshm.dev`).
4. Deploy. Every push to `main` redeploys automatically.

Image optimization, caching and security headers (`vercel.json`) are handled for you.

## 3. Deploy to Hostinger (static hosting)

Hostinger shared hosting serves static files, so build a static export:

```bash
npm install
npm run build:static
```

This produces an `out/` folder. Upload its **contents** to your Hostinger `public_html/` directory (via File Manager or FTP).

Notes for static export:
- Set `NEXT_PUBLIC_SITE_URL` before building so metadata/sitemap use the right domain:
  - macOS/Linux: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run build:static`
  - Windows PowerShell: `$env:NEXT_PUBLIC_SITE_URL="https://yourdomain.com"; npm run build:static`
- Image optimization is disabled automatically for static builds (`images.unoptimized`).

## 4. Local verification before deploying

```bash
npm run typecheck   # TypeScript, no emit
npm run lint        # ESLint (next/core-web-vitals)
npm run build       # Production build
```

## Custom domain

Point your domain's DNS to the host (Vercel gives exact records; Hostinger uses your hosting IP), then set `NEXT_PUBLIC_SITE_URL` to match.

## Launch checklist — lokeshmurali.com

1. Set `NEXT_PUBLIC_SITE_URL=https://lokeshmurali.com` in the host's environment (this drives canonical URLs, sitemap, robots and Open Graph image URLs).
2. **Vercel**: Project → Settings → Domains → add `lokeshmurali.com` and `www.lokeshmurali.com`. Add the A / CNAME records Vercel shows at your registrar. Vercel provisions HTTPS automatically.
3. Verify after deploy:
   - `https://lokeshmurali.com/sitemap.xml` and `/robots.txt` resolve.
   - Social preview: paste a project URL into the LinkedIn Post Inspector / Twitter Card Validator — the `/og/*.png` image should appear.
   - Google Search Console: add the property and submit the sitemap.
4. Replace the placeholder assets (see `ASSETS.md`) with your real screenshots, diagrams, scripts and PDFs before or after launch — no code changes required for the drop-in paths.
