<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repository Notes

This repo is a route-scoped Next.js 16 landing-page collection. Treat every page as an isolated landing-page build unless the user explicitly asks for shared refactoring.

## Current Routes

- `/buffer` — Buffer homepage clone.
- `/create-studio` — Buffer Create fictional product launch page.
- `/cloudflare-startups` — Cloudflare Startups clone.
- `/antigravity-home` — cinematic Antigravity landing-page experiment.

The root `/` route is intentionally unused for now.

## Conventions

- Keep route-specific components named by route slug, such as `cloudflare-startups-*` or `antigravity-*`.
- Keep route-specific data in `lib/<route-slug>-data.ts`.
- Keep route-specific CSS modules named by route slug where a page needs heavy custom styling.
- Keep route assets under `public/images/<route-slug>/`.
- Keep route fonts under `public/fonts/<route-slug>/` when needed.
- Keep README screenshots under `public/images/readme/` as optimized WebP files.
- Do not hotlink production-site images for primary visuals.
- Use `next/image` for local images unless a CSS background or SVG inline asset is the better fit.
- Preserve unrelated dirty worktree changes.
- Run `npm run lint` and `npm run build` after meaningful changes.

## Visual Work

For clone work, match the source page section-by-section: colors, typography rhythm, spacing, cards, header, dropdowns, mobile menu, footer, hover states, and motion. For fictional pages, keep the brand language intentional and avoid generic filler SaaS layouts.
