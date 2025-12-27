// components/effects/EyelidOverlay.tsx
"use client";

import {
  animate,
  type MotionValue,
  m,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

interface EyelidOverlayProps {
  /** * โหมด A: ใช้ State ควบคุม (สำหรับปุ่ม Snooze)
   * จะทำการจำลองการกระพริบตา (Blink)
   */
  isSnoozing?: boolean;

  /**
   * โหมด B: ใช้ Value ควบคุม (สำหรับการ Scroll)
   * ค่า Ry (รัศมีแนวตั้ง) หน่วยเป็น %
   * ค่าแนะนำ: 200 (ลืมตาเต็มที่) -> 0 (หลับตา)
   */
  externalRy?: MotionValue<number>;
}

export default function EyelidOverlay({
  isSnoozing,
  externalRy,
}: EyelidOverlayProps) {
  //? 1. Internal State: ค่าเริ่มต้น 200% (ลืมตากว้างมองเห็นทั้งจอ)
  const internalRy = useSpring(200, { stiffness: 120, damping: 20 });

  //? 2. เลือกใช้ค่า External ก่อน ถ้าไม่มีให้ใช้ Internal
  const activeRy = externalRy || internalRy;

  //? 3. Mask Logic: ใช้สูตร Ellipse ตามที่คุณต้องการ
  //? transparent 0% -> จุดกึ่งกลาง (รูม่านตา) มองทะลุได้
  //? black 100% -> ขอบนอก (เปลือกตา) ทึบแสง (เห็นเป็นสีดำของ Div)
  //? ใช้ black แทน var(--color-background) เพื่อความชัวร์ว่า Mask จะทำงานถูกต้อง (Opaque)
  const maskImageValue = useMotionTemplate`radial-gradient(ellipse 50% ${activeRy}% at 50% 50%, transparent 0%, black 100%)`;

  const scrollOpacity = useTransform(activeRy, (v) => (v > 190 ? 0 : 1));
  // ถ้ากด Snooze = 1, ถ้าไม่กด = 0
  const snoozeOpacity = isSnoozing ? 1 : 0;

  //? 4. Effect สำหรับโหมด Snooze (จำลองการกระพริบ)
  useEffect(() => {
    if (!isSnoozing) {
    } // ข้ามถ้าใช้ External
    if (!externalRy && isSnoozing) {
      const sequence = async () => {
        // วูบหลับ (Ry ลดเหลือ 10%)
        await animate(internalRy, 10, { duration: 0.6, ease: "easeInOut" });
        // ค้างนิดนึง
        await new Promise((r) => setTimeout(r, 150));
        // สะดุ้งตื่น (Ry กลับไป 200%)
        animate(internalRy, 200, { duration: 0.4, ease: "backOut" });
      };
      sequence();
    }
  }, [isSnoozing, internalRy, externalRy]);

  return (
    <m.div
      className="fixed inset-0 z-99 pointer-events-none bg-black w-screen h-screen"
      style={{
        maskImage: maskImageValue,
        WebkitMaskImage: maskImageValue, // Support Safari/Chrome
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        opacity: externalRy ? scrollOpacity : snoozeOpacity,
      }}
      transition={{ opacity: { duration: 1 } }}
    />
  );
}
