// app/dreaming/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import Dreaming from "./Dreaming";
import Weighing from "./Weighing";
import DecisionSection from "../components/scene/DecisionSection"; // ⭐ Reuse
import MouseFollower from "../components/ui/MouseFollower";
import Navbar from "../components/ui/Navbar";

export default function DreamingPage() {
  const router = useRouter();
  const lenis = useLenis();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [lenis]);

  // ฟังก์ชันเปลี่ยนหน้าไป IntoDark
  const handleLook = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/into-dark"); // ⭐ ไป Route ใหม่
    }, 1000);
  };

  return (
    <main className="relative bg-black min-h-screen">
      <MouseFollower />
      <Navbar />

      {/* Fade In ตอนเข้าหน้าเว็บ (เพื่อให้เนียนกับหน้าก่อน) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed inset-0 z-99 bg-black pointer-events-none"
      />

      {/* Scenes */}
      <Dreaming />
      <Weighing />

      {/* ⭐ ส่วนตัดสินใจ 2: ดูสิ่งที่เดินเข้ามาไหม */}
      <DecisionSection
        text="คุณตกลงมาจุดสิ้นสุด....
             คุณเจอกับบางอย่างกำลังเดินใกล้เข้ามาจะดูมันไหม"
        primaryButtonText="ดูสิ"
        secondaryButtonText="ไม่ล่ะ"
        onPrimaryClick={handleLook}
      />

      {/* Transition Overlay ออก */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-20 pointer-events-none"
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
