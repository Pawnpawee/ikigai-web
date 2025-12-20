# Ikigai Web Project - Copilot Instructions (ภาษาไทย)

เอกสารนี้เป็นคู่มือสำหรับ AI (Copilot) เพื่อช่วยในการพัฒนาโปรเจค Ikigai Web

## 1. ภาพรวมโปรเจค (Project Overview)

- **ชื่อโปรเจค:** Ikigai - Life of Journey
- **ประเภท:** เว็บไซต์เชิงโต้ตอบ (Interactive Website) ที่เน้นประสบการณ์ผู้ใช้ผ่านอนิเมชั่นและเสียงประกอบ
- **เป้าหมาย:** นำเสนอแนวคิดเรื่อง "อิคิไก" ผ่านการเดินทางเชิงเปรียบเทียบ ผู้ใช้จะได้สำรวจองค์ประกอบ 4 อย่างของอิคิไก (สิ่งที่รัก, สิ่งที่ถนัด, สิ่งที่โลกต้องการ, สิ่งที่สร้างรายได้)
- **Tech Stack หลัก:**
  - **Framework:** Next.js (App Router)
  - **ภาษา:** TypeScript
  - **Styling:** Tailwind CSS
  - **Animation:** Framer Motion, Lottie
  - **เสียง:** Howler.js
  - **Linting/Formatting:** Biome

## 2. การติดตั้งและเริ่มโปรเจค (Setup & Running)

ใช้คำสั่งต่อไปนี้เพื่อรันโปรเจคใน Development Mode:

```bash
npm run dev
```

โปรเจคจะทำงานบน `http://localhost:3000` และใช้ Turbopack เพื่อความรวดเร็ว

## 3. โครงสร้างโปรเจค (Project Structure)

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

## 4. แนวทางการเขียนโค้ด (Coding Style & Conventions)

- **State Management:** ใช้ React Context เป็นหลักสำหรับ Global State ที่ไม่ซับซ้อน เช่น `AudioContext`, `DeviceContext`
- **Styling:**
  - ใช้ Tailwind CSS สำหรับการจัดสไตล์ทั้งหมด
  - สี, Font, และค่าที่ใช้บ่อยๆ ถูกกำหนดไว้ใน `tailwind.config.js`
  - มีการใช้ Custom Font ผ่าน `next/font` ใน `layout.tsx`
- **Animation:**
  - **Framer Motion:** เป็นเครื่องมือหลักสำหรับทำอนิเมชั่นในโปรเจคนี้ โดยเฉพาะการทำ Parallax และ Scroll-based animations
  - **Lottie:** ใช้สำหรับอนิเมชั่นที่ซับซ้อน เช่น โลโก้ (`logo_ikigai_animate.json`)
- **Components:**
  - สร้าง Components ให้เล็กและ Reusable ที่สุดเท่าที่ทำได้
  - Components ที่มีความซับซ้อนและใช้ State ภายในตัวเอง ให้แยกไฟล์ออกมา
  - มีการใช้ `index.ts` เพื่อ export components ออกจาก folder ทำให้ import สะดวกขึ้น
- **ภาษา:**
  - เขียนโค้ดเป็นภาษาอังกฤษ
  - สามารถเขียนคอมเมนต์เป็นภาษาไทยได้เพื่ออธิบาย Logic ที่ซับซ้อน (มีตัวอย่างในโค้dอยู่แล้ว)

## 5. การทำงานกับเสียง (Working with Audio)

- `AudioContext` เป็นตัวจัดการเสียงทั้งหมด
- **`useAudio()` hook:** เป็นวิธีเข้าถึงฟังก์ชันต่างๆ เช่น
  - `start()` / `stop()`: ควบคุมการเล่น/หยุดเสียงทั้งหมด (Mute/Unmute)
  - `playSfx(src)`: เล่น Sound Effect
  - `setBgMusic(src)`: เปลี่ยนเพลงพื้นหลัง
- ไฟล์เสียงทั้งหมดเก็บไว้ที่ `public/assets/Sound/`

## 6. การเพิ่ม Scene หรือ Component ใหม่

1.  **สร้างไฟล์ Component:** สร้างไฟล์ `.tsx` ใหม่ใน `src/app/components/` หรือ `src/app/{scene_name}/`
2.  **ใช้ Tailwind CSS:** สำหรับการ Styling
3.  **ใช้ Framer Motion:** หากต้องการอนิเมชั่น
    - `useScroll` และ `useTransform` เป็น hooks ที่ใช้บ่อยสำหรับการทำ Scroll-based animation
4.  **จัดการ State:** หากมี State ที่ต้องใช้ร่วมกับ Component อื่น ให้พิจารณาเพิ่มเข้าไปใน Context ที่มีอยู่ หรือสร้าง Context ใหม่ถ้าจำเป็น
5.  **เพิ่มข้อมูล:** หากมีข้อมูลคงที่ (เช่น ข้อความ, path รูปภาพ) ให้เพิ่มใน `src/app/data/`

**ตัวอย่างสำคัญ:** ศึกษาไฟล์ `prologue/Hero.tsx` และ `prologue/Intro.tsx` เพื่อทำความเข้าใจการนำ Framer Motion มาใช้กับ `useScroll` และ `useTransform` ซึ่งเป็นหัวใจหลักของอนิเมชั่นในเว็บนี้
