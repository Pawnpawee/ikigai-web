# Ikigai Web - AI Coding Agent Instructions

## Project Overview
**Ikigai: The Journey of Life** is an interactive storytelling web experience built with Next.js 15 that guides graduating students through self-discovery. The project combines scroll-based animations, Lottie animations, and audio synchronization to create an immersive narrative journey.

## Tech Stack
- **Framework**: Next.js 15.5.2 (App Router, React 19, Turbopack)
- **Animation**: Framer Motion 12.x, Lottie (via `@lottiefiles/dotlottie-react`)
- **Styling**: Tailwind CSS 4.x with custom design tokens
- **Smooth Scroll**: Lenis 1.3.x
- **Code Quality**: Biome (replaces ESLint + Prettier)
- **Language**: TypeScript (strict mode)

## Architecture

### Page Structure & Navigation
Routes follow a narrative flow:
1. `/` (prologue) → Hero, Intro, Job Application, Sleeping scenes
2. `/dreaming` → Weighing scene with decisions
3. `/into-dark` → Name input, choices, mysterious interactions
4. `/love-session`, `/skill-session`, `/world-session`, `/paid-session` → Four Ikigai pillars

Each scene is a full-page scroll section with parallax effects controlled by `useScroll` + `useTransform`.

### Context Architecture
**Three global contexts wrap the entire app** (see `AppWrapper.tsx` and `layout.tsx`):

1. **AssetLoaderContext** (`src/app/contexts/AssetLoaderContext.tsx`)
   - Preloads critical images defined in `src/utils/assets.ts` (`ASSETS_TO_PRELOAD`)
   - Provides `{ isLoading, progress }` - used by `Preloader` component
   - **Important**: Add new critical scene assets to `ASSETS_TO_PRELOAD` array

2. **AudioContext** (`src/app/contexts/AudioContext.tsx`)
   - Manages background music, sound effects, and user consent
   - Persists settings to localStorage (`audioSettings` key)
   - **Two audio elements architecture**:
     - `audioRef` - Primary audio (default bg-music.mp3)
     - `bgMusicRef` - Transition audio (for scene-specific music)
   - Key methods:
     - `setBgMusic(src)` - instant switch (pauses bgMusicRef, changes audioRef)
     - `transitionBgMusic(src, fadeDuration)` - crossfade between tracks (uses bgMusicRef)
     - `startAudio()` / `pauseAudio()` - consent-aware playback with fade
     - `pauseBgMusic()` - fade out with 1s duration (500ms fade + cleanup)
     - `resumeBgMusic()` - fade in (avoid using - let transitions handle it)
   - Volume controls:
     - `volume` (0-100) - Background music volume
     - `sfxVolume` (0-100) - Sound effects volume
     - Real-time updates via `setVolume()` / `setSfxVolume()`
   - Safari audio quirks handled with delayed volume setting (10ms timeout)

3. **ReactLenis** (smooth scroll)
   - Wraps app in `AppWrapper.tsx` with config: `wheelMultiplier: 0.6, duration: 1.2, lerp: 0.1`
   - Access via `useLenis()` hook to control scroll programmatically
   - Stopped during asset loading by `Preloader`

### Component Patterns

#### Scene Components
**SceneLayer** (`src/app/components/scene/SceneLayer.tsx`) is the core reusable scene renderer:
- Takes `items: SceneItemData[]` (from `src/app/data/*.data.ts`) + `animations: AnimationMap`
- Each item has `animGroup` number mapped to Framer Motion values (y, opacity, rotate)
- Uses `motion.create(Image)` factory for Next.js Image optimization
- Default image settings: `sizes="(max-width: 768px) 100vw, 50vw"`, `quality=85`, lazy loading except priority items

**Data file structure** (see `scene1.data.ts`):
```typescript
export const SCENE_X_ITEMS: SceneItemData[] = [
  {
    id: "unique-id",
    src: "/assets/Scene/SceneX/image.webp",
    alt: "Description",
    style: { left: "10%", top: "20%", width: "30%", height: "40%" }, // percent-based
    animGroup: 5, // maps to animation transformations
    priority?: true, // for above-fold images
  }
]
```

#### Animation Hooks
**Custom hooks for complex animations** (`src/app/hooks/`):

- **useLottieWithSound** - Synchronizes Lottie playback with audio
  - Waits for `animationsStarted` (user consent) + `!isAssetsLoading`
  - Returns `{ lottieRef, isLottieComplete, hasPlayedOnce }`
  - Example: Logo animation in Hero scene with `glowOffsetMs` for glow timing

- **useSoundEffect** - Manages one-shot sound effects with fade in/out
  - Auto-respects `sfxVolume` from AudioContext
  - Real-time volume updates when user adjusts slider
  - Params: `{ soundPath, fadeDurationMs, soundDurationMs, loop, volume }`
  - Returns `{ playSoundEffect, stopSoundEffect }`
  - Example: Button clicks, weighing sounds, metal sliding

- **useBgMusicTransition** - Manages background music transitions per scene
  - Params: `{ targetMusic, defaultMusic, fadeDuration, isInView, continueOnExit }`
  - Uses `transitionBgMusic()` from AudioContext
  - `continueOnExit: true` - Keep music playing to next scene
  - `continueOnExit: false` - Return to default when leaving viewport
  - Example: Dreaming scene uses egypt-jelly-dance.mp3 with `continueOnExit: true`

- **useAnimationReady** - Gate animations behind asset loading + user consent

#### Parallax Patterns
**All scroll-based scenes follow this pattern**:
```typescript
const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"]
});

// Use useSpring for smoother motion (reduce jitter)
const smoothScroll = useSpring(scrollYProgress, {
  mass: 0.1, stiffness: 100, damping: 20
});

// Transform for parallax layers
const layerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
```

**Performance tip**: Use `useWillChange()` hook + `transform: translateZ(0)` in styles for GPU acceleration.

## Development Workflow

### Commands
```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build with Turbopack
npm run lint         # Biome check (not ESLint)
npm run format       # Biome format --write
npm run analyze      # Bundle analyzer (opens localhost:8888)
```

### Adding New Scenes
1. Create scene data file in `src/app/data/scene_name.data.ts`
2. Export WebP images in `public/assets/Scene/SceneName/`
3. Add critical images to `ASSETS_TO_PRELOAD` in `src/utils/assets.ts`
4. Create scene component with `useScroll` + `SceneLayer`
5. Add route in `src/app/scene-name/page.tsx` (if new route)

### Audio Management
- Background music: `transitionBgMusic("/assets/Sound/new-track.mp3", 1000)`
- Sound effects: Use `useSoundEffect` hook with `soundDurationMs` for cleanup timing
- **Safari issue**: Volume changes need 10ms setTimeout to apply
- **Critical**: Don't call `resumeBgMusic()` after page transitions - `transitionBgMusic()` handles fade in automatically
- **Page transition flow**:
  1. Call `pauseBgMusic()` before navigation (fades out current music)
  2. Navigate to new page
  3. Call `transitionBgMusic()` in new page (fades in new music)
- **Scene music patterns**:
  - Use `useBgMusicTransition` in scene components (not page components)
  - Set `continueOnExit: true` if next scene shares the same music
  - Set `continueOnExit: false` if returning to default music
  - Example: Dreaming → Weighing (same egypt music, use `continueOnExit: true` in Dreaming only)

### Image Optimization
- Use WebP format (configured in `next.config.ts`)
- Formats: AVIF → WebP fallback
- Quality: 85-100 scale (default 85 in SceneLayer)
- Priority only for above-fold images

## Code Conventions

### Styling
- **Biome** enforces formatting (2-space indent, no semicolons optional)
- Tailwind utility-first with custom theme in `globals.css` (`@theme inline`)
- Font variables: `--font-anuphan` (Thai/Latin), `--font-bentham`, `--font-luxurious-script`
- Semantic colors: `--color-background`, `--color-orange-500`, etc.

### TypeScript
- Path alias: `@/*` maps to `src/*`
- Strict mode enabled
- `"use client"` required for all components using hooks/state

### State Management
- **No external state library** - Context + hooks only
- localStorage for persistence (see AudioContext pattern)
- Scene state typically scoped to route-level components

## Common Pitfalls

1. **Audio autoplay blocked**: Always wrap `audio.play()` in try-catch with user gesture fallback
2. **Scene stuttering**: Use `useSpring` on `scrollYProgress` before transformations
3. **Lottie not playing**: Check `animationsStarted && !isAssetsLoading` gates
4. **Assets not preloading**: Must be in `ASSETS_TO_PRELOAD` array
5. **Scroll not working**: ReactLenis must wrap content, check `useLenis()` is available
6. **Music overlapping**: Never call `resumeBgMusic()` after transitions - use `transitionBgMusic()` only
7. **Sound effects not respecting volume**: Ensure `useSoundEffect` hook is used (not raw Audio elements)
8. **Music not changing between pages**: Check `transitionBgMusic()` is called in page's useEffect

## Key Files Reference
- Global styles: `src/app/globals.css`
- Asset list: `src/utils/assets.ts`
- Scene data pattern: `src/app/data/scene1.data.ts`
- Audio state: `src/app/contexts/AudioContext.tsx`
- Reusable scene renderer: `src/app/components/scene/SceneLayer.tsx`
- Animation hooks: `src/app/hooks/useLottieWithSound.ts`, `useSoundEffect.ts`, `useBgMusicTransition.ts`
- UI components with sound: `src/app/components/ui/GradientButton.tsx` (button click sounds)
- Volume controls: `src/app/components/ui/MenuModal.tsx` (background music + SFX sliders)
