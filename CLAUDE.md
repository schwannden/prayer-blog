# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A lightweight, frontend-only daily-prayer site. Forked from the [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) template, so much of the architecture (the `pliny` library, layout names, `siteMetadata`) is inherited from upstream — when something looks generic, check the template before assuming it's project-specific. Default locale is `zh-TW` (`data/siteMetadata.js`); prayer content is bilingual.

## Commands

```bash
npm run dev      # dev server at localhost:3000 (wraps next dev with INIT_CWD set — needed for contentlayer)
npm run build    # next build + scripts/postbuild.mjs (RSS generation)
npm run serve     # serve a non-export production build
npm run lint     # next lint --fix over app, components, layouts, scripts (and pages/lib if present)
npm run analyze  # bundle analyzer (ANALYZE=true build)
npm run prepare  # install husky git hooks (run once after npm install)
```

There is **no test runner**. CI = lint + build only. The pre-commit hook (`.husky/pre-commit`) runs `lint-staged` (eslint + prettier on staged files); don't bypass it.

To reproduce the deployed static build locally, set the export env vars CI uses:

```bash
EXPORT=1 UNOPTIMIZED=1 BASE_PATH="" npm run build   # output lands in ./out
```

Node is pinned to 24.16.0 via Volta and `.nvmrc` (for nvm users), and enforced via the `engines` field (`node >=24`); CI builds against Node 24.

## Architecture

**Content pipeline (the core of this app).** Prayers are MDX files under `data/`, not code. [Contentlayer2](https://www.contentlayer.dev/) (`contentlayer.config.ts`) compiles them into typed objects imported from `contentlayer/generated`. Two document types:

- `Prayer` — `data/prayer/**/*.mdx`. Frontmatter schema (title/date required; tags, summary, authors, layout, etc.) lives in `contentlayer.config.ts` — treat that file as the source of truth, not docs.
- `Authors` — `data/authors/**/*.mdx`. `default.mdx` is required; posts reference authors by filename.

`makeSource`'s `onSuccess` hook regenerates two derived files on every build/dev start: `app/tag-data.json` (tag counts) and `public/search.json` (kbar local search index). These are **build artifacts** — don't hand-edit them; change the MDX and let contentlayer rebuild. The remark/rehype plugin chain (GFM, math/katex, citations, prism, GitHub alerts, auto-slugged headings) is also configured here.

**Routing (Next.js App Router, `app/`).** Prayer pages render through the catch-all `app/prayer/[...slug]/page.tsx`. The `slug` computed field strips the leading directory segment (`prayer/`), so a file at `data/prayer/for-husband/day1.mdx` is served at `/prayer/for-husband/day1`. `generateStaticParams` enumerates all prayers — everything is statically generated at build time. Drafts are filtered out only in production (`NODE_ENV === 'production'`).

**Layouts (`layouts/`).** A post's `layout` frontmatter field selects the renderer: `PostLayout` (default, 2-column), `PostSimple`, or `PostBanner`. Listing pages use `ListLayoutWithTags`. These are the templates to edit for post/listing structure.

**Path aliases** (`tsconfig.json`): `@/components/*`, `@/data/*`, `@/layouts/*`, `@/css/*`. Custom MDX components are registered in `components/MDXComponents.tsx` — components used inside `.mdx` must be added there (and default-exported, per a Next.js limitation).

## Styling / UI

**Tailwind CSS v4**, but configured in hybrid mode: the entry is `css/tailwind.css` (`@import 'tailwindcss'`) which bridges to the v3-style JS config via `@config '../tailwind.config.mjs'`. PostCSS uses `@tailwindcss/postcss`. When changing theme/colors/typography, edit `tailwind.config.mjs` (primary color is `colors.pink`; dark mode is `class`-based). `css/tailwind.css` contains v4-compat base styles (notably the border-color shim) — preserve those when editing. Code-block theming lives in `css/prism.css`. The README's "Tailwind 3.0" claim is stale; this is v4.

## Dependency management & releases

- **Dependabot** (`.github/dependabot.yml`) opens grouped dependency-bump PRs; these flow through normal CI. Keep `package-lock.json` committed (`npm ci` is used in CI).
- **Conventional Commits are mandatory** — they drive changelog and versioning. Use `feat:`, `fix:`, `build:`, `chore:`, `refactor:`, `docs:`, `test:` (see `release-please-config.json`). Branch names follow `<type>/<short-description>`.
- **release-please** (`.github/workflows/release.yaml`) watches `main` and maintains a release PR titled `release: release <version>`. Merging that PR triggers `pages.yml`, which builds the static export and deploys to **GitHub Pages**. Do not hand-edit `CHANGELOG.md` or `package.json` version — release-please owns them.
- Deploy flow: PR → Vercel preview; merge to `main` → Vercel public; release PR merged → GitHub Pages.

## Constraints

The site ships as a **static export** to GitHub Pages, so anything requiring a Node server at runtime is unavailable — no API routes, no server actions, no on-demand image optimization (`UNOPTIMIZED=1`). Code must work after `next build` with `EXPORT=1`. External script/image/style origins must be whitelisted in the Content Security Policy in `next.config.js`.
