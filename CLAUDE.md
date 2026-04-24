# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SKKU H-Lab (Helper Lab) academic research lab homepage. Built with Next.js 16 + React 19 + Tailwind CSS 4, deployed as a static site to GitHub Pages at hlab.skku.edu.

## Commands

- `npm run dev` — local dev server at localhost:3000
- `npm run build` — static export to `out/` directory
- `npm run lint` — ESLint
- No test framework is configured

## Architecture

**Static export site** (`output: 'export'` in next.config.ts) — no server-side features at runtime. Deployed via GitHub Actions on push to `main`.

### Pages (src/app/)

- `/` — Landing page (server component) with hero, research area cards
- `/research` — Research projects detail page (**client component**, uses `"use client"`)
- `/publications` — Publications list, fetched from ORCID API at build time (`src/lib/orcid.ts`)
- `/members` — Lab members
- `/contact` — Contact info

### Data-driven research content

Research projects are managed via JSON files, not code changes:

1. `src/data/research-areas.json` — defines research areas and their `projectFiles` arrays
2. `src/data/projects/{areaId}/*.json` — individual project data (title, description, overview, content, images, videos)
3. `src/app/research/page.tsx` — imports each project JSON and maps them in `projectMap`

**Adding a new project requires three steps:** create the JSON file, add its path to `research-areas.json`, and add the import + mapping in `research/page.tsx`.

### Key patterns

- `BASE_PATH` from `src/lib/constants.ts` is used for image paths (currently empty string, was needed for GitHub Pages subdirectory hosting)
- Images go in `public/projects/{areaId}/{projectName}/`
- Publications are fetched from ORCID API (ID: 0000-0002-5025-8785), filtered to last 6 years, excluding preprints
- Layout uses shared `Navbar` and `Footer` from `src/components/layout/`
- Styling uses Tailwind CSS with `clsx` + `tailwind-merge` via `cn()` utility in `src/lib/utils.ts`
- Animations use `framer-motion`
- Icons from `lucide-react`

## Content language

The site content is primarily in Korean. Code, comments, and variable names are in English.
