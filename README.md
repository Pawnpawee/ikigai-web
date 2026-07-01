# Ikigai Web

An interactive, scroll- and animation-driven Next.js storytelling experience ("Ikigai") built with the App Router, Framer Motion, Lottie, and Howler.js audio.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion, Lottie (`lottie-web`, light build)
- **Smooth Scroll:** Lenis (`src/utils/lenisConfig.ts`)
- **Audio:** Howler.js (via `AudioContext`)
- **Media hosting:** Cloudinary (images, audio, JSON/Lottie assets)
- **Lint/Format:** Biome
- **Unused-code detection:** Knip

## Prerequisites

- Node.js 20+ (matches `@types/node` `^20`)
- npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in values (see [Environment Variables](#environment-variables)):

   ```bash
   cp .env.local .env.local.example   # or create .env.local manually
   ```

3. Start the dev server (Turbopack):

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server with Turbopack and hot reload |
| `npm run build` | Production build (type-checked) |
| `npm run start` | Start the production server (run `build` first) |
| `npm run lint` | Run Biome checks |
| `npm run fix` | Run Biome checks and auto-fix |
| `npm run format` | Format code with Biome |
| `npm run analyze` | Production build with the bundle analyzer enabled |
| `npm run tailwind:init` | Regenerate a Tailwind config file |

Other useful commands (not in `package.json`, referenced in project conventions):

```bash
npx knip          # find unused files/exports/dependencies
```

## Environment Variables

Defined in `.env.local` (not committed with real values):

| Variable | Required | Description |
|----------|----------|--------------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name used to build image/audio/JSON asset URLs (`src/utils/cloudinaryUtils.ts`) |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Only if signed uploads are needed | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Only if signed uploads are needed | Cloudinary API secret (server-side only, never expose to the client) |
| `NEXT_PUBLIC_API_BASE_URL` | Required in production | Base URL for backend API calls (`src/utils/appConfig.ts`). Falls back to `http://localhost:5112` in development; throws at build/runtime if unset in production |
| `NEXT_PUBLIC_FEEDBACK_FORM_URL` | No | URL for the feedback form link; defaults to `#` if unset |

## Project Structure

```
src/
├── app/
│   ├── components/       # Reusable components (modal/, reusable/, button/, text/)
│   ├── contexts/         # React Contexts: AudioContext, DeviceContext, UIStarContext, UserContext
│   ├── data/             # Scene configuration data (scene_*.data.ts)
│   ├── hooks/            # Custom hooks (useMouseParallax, useStarsVisibility)
│   ├── prologue/         # Opening scenes (Hero, Intro, JobApplication, Sleeping, dreaming/, into-dark/)
│   ├── journey-temple/   # Temple arrival / desert walk scenes
│   ├── love-session/, world-session/, skill-session/, paid-session/  # Story sessions
│   ├── ikigai-result/    # Result screen and detail modal
│   ├── about/, closing/  # Standalone routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home entry point (prologue flow)
└── utils/                # appConfig, cloudinaryUtils, lenisConfig, storage
```

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — prologue flow (Hero → Intro → Job Application → Sleeping → wake decision) |
| `/prologue/dreaming` | Dreaming/Weighing scene |
| `/prologue/into-dark` | Name input and choice scenes |
| `/journey-temple` | Desert walk and temple arrival |
| `/love-session`, `/world-session`, `/skill-session`, `/paid-session` | Story sessions |
| `/ikigai-result` | Final result screen |
| `/about`, `/closing` | Static/ending pages |

## Key Conventions

- **Comment tags:** `//! warning` (bug/risk), `//? information` (why/how), `//todo` (future work), `//*` (general note).
- **Client components:** only add `'use client'` when hooks/state/event listeners are required; push logic to server components where possible.
- **State management:** local `useState`/`useReducer`; global state via React Context (`AudioContext`, `DeviceContext`, `UIStarContext`, `UserContext`).
- **Scenes are data-driven:** scene layout/animation config lives in `src/app/data/scene_*.data.ts` using the `SceneItemData` shape, consumed by `SceneLayer`. Avoid hardcoding styles in components.
- **Animate `opacity`/`transform`** (not layout properties like `width`/`height`/`margin`) for performance.
- **Images:** always use `next/image`; Cloudinary is the remote image host (configured in `next.config.ts`).
- Full guidance for AI-assisted development is in [.github/copilot-instructions.md](.github/copilot-instructions.md).

## Building & Deployment

```bash
npm run build
npm run start
```

Deploys well to [Vercel](https://vercel.com/new) or any Node-compatible host. Ensure `NEXT_PUBLIC_API_BASE_URL` and Cloudinary variables are set in the deployment environment — the app throws at runtime if `NEXT_PUBLIC_API_BASE_URL` is missing in production.

## Code Quality

- **DeepSource** is configured (`.deepsource.toml`) for JS/React analysis and secret scanning.
- Run `npm run lint` / `npm run fix` before committing.
- Run `npx knip` periodically to catch unused files, exports, and dependencies.
