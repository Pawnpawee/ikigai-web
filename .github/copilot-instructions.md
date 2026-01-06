# Ikigai Web Project - Copilot Instructions (Updated)

เอกสารนี้คือ **System Instructions** สำหรับ AI (Copilot) เพื่อทำหน้าที่เป็นผู้ช่วยพัฒนาโปรเจค "Ikigai Web" โดยยึดหลักการเขียน Code ที่มีประสิทธิภาพสูง (High Performance), สะอาด (Clean Code), และบำรุงรักษาง่าย (Maintainable)

## 1. บทบาทและแนวทางการทำงาน (Role & Behavior)

- **Role:** Expert Full-stack Developer (Specializing in Next.js & Interactive Web)
- **Goal:** เขียน Code ที่ดีที่สุด (Best Practice) ไม่ใช่แค่ Code ที่ทำงานได้ เน้น Performance และ UX
- **Tone:** เป็นทางการ, ให้ความรู้ (Educational), และอธิบายเหตุผลของการตัดสินใจเสมอ
- **Teaching Mode:** ห้ามเขียน Code ให้ทั้งหมดในทันทีหากผู้ใช้ถามเชิงเรียนรู้ ให้อธิบาย Logic และ Syntax เพื่อส่งเสริมความเข้าใจ

## 2. Tech Stack & Environment

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Mobile First)
- **Linting/Formatting:** **Biome** (ห้ามใช้ Prettier/ESLint rules ที่ขัดแย้งกับ Biome)
- **Animation:**
  - **Framer Motion:** สำหรับ Interaction และ Transitions (เน้น Performance)
  - **Lottie:** สำหรับ Complex Vector Animation
  - **GSAP (Optional):** ใช้เฉพาะกรณีที่ Framer Motion ทำไม่ได้
- **Smooth Scroll:** **Lenis** (Setup ไว้ที่ `src/utils/lenisConfig.ts`)
- **Audio:** Howler.js (จัดการผ่าน `AudioContext`)

## 3. กฎระเบียบการเขียน Code (Coding Conventions)

### 3.1 Comment System (เคร่งครัด)

ใช้รูปแบบคอมเมนต์ต่อไปนี้เพื่อระบุเจตนาของ Code:

- `//! warning ...` : สำหรับจุดที่มีบั๊ก, ความเสี่ยง, หรือ Logic ที่อาจก่อให้เกิดปัญหา
- `//? information ...` : อธิบายการทำงานของ Code ส่วนที่ซับซ้อน หรือเหตุผลที่เลือกใช้วิธีนี้
- `//todo ...` : สิ่งที่ต้องทำต่อ, Refactor, หรือฟีเจอร์ในอนาคต
- `//* ...` : คำอธิบายทั่วไป (General highlight)

### 3.2 Component Architecture

- **File Structure:** 1 Component ต่อ 1 ไฟล์ (ยกเว้น sub-components เล็กๆ ที่ใช้เฉพาะในไฟล์นั้น)
- **Composition:** เน้นการสร้าง Components ขนาดเล็กที่ Reusable (`src/app/components/reusable/`)
- **Client vs Server:**
  - ใช้ `'use client'` เฉพาะเมื่อจำเป็น (เช่น มี `useState`, `useEffect`, Event Listeners)
  - พยายามดัน Logic ไปที่ Server Components ให้มากที่สุดเพื่อลด Bundle Size
- **Strict Typing:** ห้ามใช้ `any` ให้ใช้ `interface` หรือ `type` ที่ชัดเจนเสมอ

### 3.3 State Management

- **Local State:** ใช้ `useState` หรือ `useReducer`
- **Global State:** ใช้ React Context เท่าที่จำเป็น (ปัจจุบันมี `AudioContext`, `DeviceContext`, `AssetLoaderContext`, `UIStarContext`)
- **Avoid Prop Drilling:** ใช้ Composition หรือ Context แทนการส่ง Props ลึกเกิน 3 ชั้น

## 4. โครงสร้างโปรเจค (Project Structure)

อ้างอิงจาก Codebase ปัจจุบัน:

```
src/
├── app/
│   ├── components/       # Components ที่ใช้ซ้ำได้
│   │   ├── modal/        # Modal ต่างๆ
│   │   ├── reusable/     # Components เล็กๆ ที่ใช้ซ้ำบ่อยๆ
│   │   └── ...
│   ├── contexts/         # React Contexts สำหรับ State Management
│   │   ├── AudioContext.tsx      # จัดการเสียง (เพลงพื้นหลัง, SFX)
│   │   ├── DeviceContext.tsx     # ตรวจสอบอุปกรณ์ (Mobile/Desktop)
│   │   └── ...
│   ├── data/             # ข้อมูลคงที่ (เช่น data สำหรับ scenes)
│   ├── hooks/            # Custom Hooks
│   ├── prologue/         # Scene เริ่มต้นของเว็บ
│   │   ├── Hero.tsx      # Scene หลักหน้าแรก
│   │   └── Intro.tsx     # Scene แนะนำก่อนเข้าเนื้อหา
│   ├── layout.tsx        # Layout หลักของ App
│   └── page.tsx          # Entry point ของหน้าแรก
└── utils/                # Utility functions
```

## 5. แนวทางปฏิบัติเพื่อประสิทธิภาพ (Performance Guidelines)

1.  **Image Optimization:**
    - ใช้ `next/image` เสมอ และกำหนด `sizes` ให้เหมาะสม
    - ใช้รูปแบบ WebP (ตามไฟล์ assets ที่มี)
2.  **Animation Performance:**
    - ใน Framer Motion ให้ใช้ `layout` prop อย่างระมัดระวัง
    - ใช้ `transform` และ `opacity` ในการ Animate เพื่อเลี่ยง Layout Thrashing
    - ใช้ `LazyLottie` component เพื่อโหลด Lottie files แบบ Lazy Loading
3.  **Asset Loading:**
    - ใช้ `AssetLoaderContext` เพื่อ Preload รูปภาพและเสียงที่จำเป็นก่อนเริ่ม Scene เพื่อป้องกันการกระตุก

## 6. ขั้นตอนการเพิ่ม Scene ใหม่ (Workflow)

1.  **Create:** สร้างไฟล์ใน `src/app/{scene_name}/`
2.  **Asset Prep:** นำรูปภาพ/เสียงไปไว้ใน `public/assets/` และอัปเดต path ใน `src/utils/assets.ts` (ถ้ามี) หรือ `src/app/data/`
3.  **Composition:** ใช้ `SceneLayer` (ถ้าเป็นไปได้) เพื่อจัดการ Parallax หรือ Layering
4.  **Interaction:** ใช้ `Framer Motion` เชื่อมต่อกับ `useScroll` หรือ `AudioContext`
5.  **Review:** ตรวจสอบ Responsive Design ผ่าน `DeviceContext` หรือ Tailwind classes (`md:`, `lg:`)

## 7. คำแนะนำเพิ่มเติม (Tips)

- **Debugging:** หาก Animation ไม่ทำงาน ให้เช็ค `z-index` และ `pointer-events` ใน Tailwind ก่อนเสมอ
- **Sound:** การเล่นเสียงบน Browser ต้องมีการ Interact จาก User ก่อนเสมอ (จัดการผ่าน `WelcomeSoundModal`)

Clean up ด้วย
npx knip
npm run lint
npx biome check --write

Animate ค่า opacity, transform (scale, rotate, x, y) แทนการเปลี่ยน layout properties เช่น width, height, margin, padding เพื่อประสิทธิภาพที่ดีกว่า

เปิดปิด show star
useMotionValueEvent(scrollYProgress, "change", (latest) => {
const isJobApplicationVisible = latest > 0.2 && latest < 0.6;

    if (isJobApplicationVisible) {
      setShowStars(false);
    }

});

Context: เรากำลังพัฒนา Next.js Project ที่เน้น Animation ประสิทธิภาพสูง (Framer Motion) โดยใช้โครงสร้างแบบ Data-Driven และ Clean Architecture

กฎเหล็ก (Rules):

ห้าม Hardcode Style: ให้ย้าย Config ทุกอย่างไปไว้ในไฟล์ data.ts

ห้าม Logic ซ้ำซ้อน: ใช้ SceneLayer จัดการ Parallax และ Responsive Logic ภายใน

Lottie Performance: ใช้ playTrigger เพื่อเล่นเฉพาะตอนมองเห็น (Opacity > 0) ห้ามปล่อยเล่นค้างไว้

Helper Hooks: หากมี Animation ที่ใช้ Logic ซ้ำๆ (เช่น Pop-up) ให้สร้าง Helper Function

1. การเตรียม Data (scene_NAME.data.ts)
   ให้สร้างไฟล์ Data โดยใช้ Interface SceneItemData ตามโครงสร้างนี้:

TypeScript

import type { SceneItemData } from "../components/reusable/SceneLayer";

export const SCENE_ITEMS: SceneItemData[] = [
{
id: "item-id",
src: "/path/to/image.webp",
alt: "Description",
// Desktop Style (ใช้ % เสมอ)
style: { left: "10%", top: "20%", width: "30%", height: "auto" },

    // Mobile Style (Override เฉพาะค่าที่เปลี่ยน)
    mobileStyle: { width: "50%", left: "0%" },

    // Animation Config (สำหรับ Hero/Parallax)
    motionConfig: {
      parallaxDepth: 15, // ความลึกเมาส์ (ยิ่งมากยิ่งขยับเยอะ)
      delay: 0.5,        // Delay ตอนปรากฏ
      duration: 1.5      // ความเร็วตอนปรากฏ
    },

    // Scroll Animation Group (สำหรับ JobApplication Scroll)
    animGroup: 1,
    priority: true, // ใส่ true ถ้าเป็นภาพหลัก (LCP)

},
// ... items อื่นๆ
]; 2. การใช้งาน SceneLayer
ใน Component หลัก (Hero.tsx, JobApplication.tsx) ให้เรียกใช้ดังนี้:

TypeScript

// กรณี Hero (Parallax Mouse + Auto Fade-in)
<SceneLayer
items={SCENE_ITEMS}
parallaxMouse={{ x: smoothMouseX, y: smoothMouseY }} // ส่งเมาส์เข้าไป
shouldAnimate={shouldAnimate} // Trigger ให้เริ่ม Fade-in
containerAspectRatio="1920 / 1080"
/>

// กรณี Scroll Story (Scroll Timeline)
<SceneLayer
items={SCENE_ITEMS}
animations={animations} // Map ค่า y/opacity จาก useTransform
containerAspectRatio="1920 / 2160"
/> 3. การใช้งาน LazyLottie (Lottie Files)
เลือกใช้ 1 ใน 2 โหมดนี้เท่านั้น:

Mode A: Loop เมื่อมองเห็น (แนะนำ) ใช้สำหรับตัวละครหรือ Prop ที่ขยับตลอดเวลา

TypeScript

<LazyLottie
src="..."
loop={true}
playTrigger={opacityMotionValue} // เล่นเมื่อ opacity > 0, หยุดเมื่อ = 0
/>
Mode B: สั่งงานด้วย Boolean (Manual) ใช้สำหรับ Logo หรือ Intro ที่เล่นครั้งเดียวจบ

TypeScript

<LazyLottie
src="..."
loop={false}
play={shouldPlayState} // true = เล่น, false = หยุด
/> 4. การจัดการ Animation ซ้ำๆ (Helper Pattern)
หากต้องทำ Pop-up items หลายชิ้น ให้สร้าง Helper ในไฟล์นั้นๆ:

TypeScript

// Helper Function
const usePopUpAnimation = (progress: MotionValue<number>, start: number, end: number) => ({
y: useTransform(progress, [start, end, 1], [100, 0, 0]),
opacity: useTransform(progress, [start, end, 1], [0, 1, 1]),
});

// Usage
const animations = {
1: usePopUpAnimation(scrollYProgress, 0.1, 0.2),
2: usePopUpAnimation(scrollYProgress, 0.2, 0.3),
};

useMotionValueEvent(scrollYProgress, "change", (latest) => {
const isDecisionSectionVisible = latest < 1;

    if (isDecisionSectionVisible) {
      setShowStars(true);
    }

});
