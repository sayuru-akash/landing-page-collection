# Buffer Homepage Clone

A production-style recreation of the [Buffer](https://buffer.com/) homepage built with Next.js 16, React 19, TypeScript, and the App Router.

This project is not a generic landing page starter. It is a focused homepage clone that mirrors Buffer's current public homepage structure, content hierarchy, motion language, typography, and asset treatment while keeping the implementation aligned with modern Next.js conventions.

## What This Project Includes

- A full homepage rebuild using the Next.js App Router in `app/`
- TypeScript across the app and component layer
- Localized homepage assets in `public/images/` instead of depending on live remote image URLs
- Localized fonts in `public/fonts/` to preserve the original visual feel
- Recreated desktop and mobile navigation patterns
- Hero tile pointer interaction that follows the cursor with a spring-like motion
- Animated social-proof counters
- Preserved Buffer visual styling through imported vendor CSS plus app-specific React structure

## Stack

- Next.js `16.2.4`
- React `19.2.4`
- TypeScript `5`
- Tailwind CSS `4` for global integration support
- ESLint `9`

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx

components/
  buffer-animated-tile.tsx
  buffer-audience-tabs.tsx
  buffer-header.tsx
  buffer-hero-form.tsx
  buffer-icons.tsx
  buffer-social-proof.tsx

lib/
  buffer-data.ts

public/
  fonts/
  icons/
  images/

vendor/
  buffer-css/
```

## Implementation Notes

### 1. App Router-first structure

The homepage lives in [app/page.tsx](/Users/sayuru/Documents/GitHub/landing-page-collection/app/page.tsx:1) and is rendered through the App Router. Shared metadata and global styling are configured in [app/layout.tsx](/Users/sayuru/Documents/GitHub/landing-page-collection/app/layout.tsx:1) and [app/globals.css](/Users/sayuru/Documents/GitHub/landing-page-collection/app/globals.css:1).

### 2. Local assets instead of runtime remote dependencies

The clone now serves its main homepage images from `public/images/` through `next/image`. That keeps the page deterministic, avoids runtime dependency on Buffer's CDN for core visual content, and makes the clone portable.

Examples:

- `public/images/homepage/`
- `public/images/testimonials/`
- `public/images/og/homepage-og.png`

### 3. Data-driven content

Content and asset references are centralized in [lib/buffer-data.ts](/Users/sayuru/Documents/GitHub/landing-page-collection/lib/buffer-data.ts:1). This includes:

- hero decoration tile definitions
- channel links
- feature cards
- audience tabs
- resource cards
- footer groups
- open-company metrics

### 4. Recreated interaction behavior

Several interactive pieces are implemented as dedicated client components:

- [components/buffer-animated-tile.tsx](/Users/sayuru/Documents/GitHub/landing-page-collection/components/buffer-animated-tile.tsx:1)
  Recreates the hero pointer-following tile movement with a spring-style easing model and reduced-motion handling.

- [components/buffer-header.tsx](/Users/sayuru/Documents/GitHub/landing-page-collection/components/buffer-header.tsx:1)
  Handles desktop dropdown state and the mobile navigation panel.

- [components/buffer-audience-tabs.tsx](/Users/sayuru/Documents/GitHub/landing-page-collection/components/buffer-audience-tabs.tsx:1)
  Handles the audience section tab switching.

- [components/buffer-hero-form.tsx](/Users/sayuru/Documents/GitHub/landing-page-collection/components/buffer-hero-form.tsx:1)
  Replicates the hero email form submission pattern and forwards into Buffer's signup flow format.

- [components/buffer-social-proof.tsx](/Users/sayuru/Documents/GitHub/landing-page-collection/components/buffer-social-proof.tsx:1)
  Animates the homepage metrics when they enter the viewport.

### 5. Styling strategy

This clone intentionally uses imported vendor CSS from `vendor/buffer-css/` to preserve the original look and spacing system, while React components reconstruct the markup and behavior in a maintainable Next.js codebase.

Global styling entry point:

- [app/globals.css](/Users/sayuru/Documents/GitHub/landing-page-collection/app/globals.css:1)

Vendor styles:

- `vendor/buffer-css/base.css`
- `vendor/buffer-css/home.css`
- `vendor/buffer-css/extra.css`

## Running Locally

Install dependencies if needed:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

- [http://localhost:3000](http://localhost:3000)

Create a production build:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```

Start the production server after building:

```bash
npm run start
```

## Validation

The current implementation has been checked with:

- `npm run lint`
- `npm run build`
- browser verification against the live homepage structure
- responsive checks for desktop and mobile navigation
- confirmation that homepage images resolve from local `/images/...` assets through `next/image`

## Design Fidelity Goals

This repository aims to preserve the following Buffer homepage traits as closely as practical inside a clean Next.js codebase:

- visual hierarchy
- spacing rhythm
- typography feel
- CTA treatment
- feature card composition
- audience tab section
- customer support section layout
- footer density and content grouping
- hero decorative motion behavior

## Important Notes

- The project follows the local repository guidance in `AGENTS.md`, including the requirement to respect the bundled Next.js 16 docs in `node_modules/next/dist/docs/`.
- The implementation is intentionally focused on the homepage, not a full multi-page Buffer product clone.
- Some links point to Buffer routes or external Buffer destinations because the goal is homepage fidelity rather than rebuilding the entire site tree.

## Future Extension Ideas

- Recreate any remaining hover or scroll micro-interactions section-by-section from the live site
- Build additional pages such as pricing, publish, analyze, or start-page using the same content and asset strategy
- Add visual regression snapshots for desktop and mobile breakpoints
- Extract reusable primitives from the homepage-specific components if the repo grows into a multi-page collection
