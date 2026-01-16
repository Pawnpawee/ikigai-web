"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";

import { useEffect, useRef, useState } from "react";
import { useUI } from "@/app/contexts/UIStarContext";
import IntoDarkChoices from "./IntoDark_Choices";
import IntoDarkHeard from "./IntoDark_Heard";
import IntoDarkNameInput from "./IntoDark_NameInput";
import IntoDarkSubmit from "./IntoDark_Submit";

export default function IntoDark() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { setShowStars } = useUI();

  const [playerName, setPlayerName] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<number[]>([]);
  const [hasHeard, setHasHeard] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [reasonsError, setReasonsError] = useState("");
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const isResettingScroll = useRef(false);

  //? Scroll lock effect สำหรับ s6_1
  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = (e: {
      scroll: number;
      animatedScroll: number;
      velocity: number;
    }) => {
      if (isNameConfirmed || !ref.current || isResettingScroll.current) return;

      const scrollStart = ref.current.offsetTop;
      const sectionHeight = ref.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;

      const lockThreshold = scrollStart + scrollableDistance * 0.15;

      const tolerance = 2;

      if (e.animatedScroll > lockThreshold + tolerance && e.velocity > 0) {
        isResettingScroll.current = true;

        lenis.scrollTo(lockThreshold, {
          immediate: true,
          force: true,
          lock: true,

          onComplete: () => {
            requestAnimationFrame(() => {
              isResettingScroll.current = false;
            });
          },
        });
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, isNameConfirmed]);

  const handleNameConfirm = () => {
    if (!playerName.trim()) {
      setNameError("กรุณากรอกชื่อของเจ้า");
      return;
    }

    // ปลดล็อค
    setIsNameConfirmed(true);

    // เลื่อนหน้าจอไปต่อเล็กน้อย (Auto-scroll) เพื่อ UX ที่ลื่นไหล
    if (ref.current && lenis) {
      const scrollStart = ref.current.offsetTop;
      const scrollableDistance = ref.current.scrollHeight - window.innerHeight;
      // เลื่อนไปที่ 0.250 (เริ่มของ Choices section + buffer)
      const target = scrollStart + scrollableDistance * 0.25;
      lenis.scrollTo(target, { duration: 1.5 });
    }
  };

  // ... (ส่วน handleReasonToggle, handleSubmit คงเดิม) ...
  const handleReasonToggle = (reasonId: number) => {
    if (reasonsError) setReasonsError("");
    setSelectedReasons((prev) =>
      prev.includes(reasonId)
        ? prev.filter((id) => id !== reasonId)
        : [...prev, reasonId],
    );
  };

  const handlePlayerNameChange = (name: string) => {
    if (nameError) setNameError("");
    setPlayerName(name);

    // ถ้าผู้ใช้ลบชื่อออกจนหมด ให้รีเซ็ต state กลับไปเป็นสถานะเริ่มต้น
    if (!name.trim() && isNameConfirmed) {
      setIsNameConfirmed(false);

      // Scroll กลับไปตำแหน่ง input แบบนุ่มนวล
      if (ref.current && lenis) {
        const scrollStart = ref.current.offsetTop;
        const scrollableDistance =
          ref.current.scrollHeight - window.innerHeight;
        // กลับไปที่ 0.150 (ตำแหน่ง input - lock position ที่ 90% ของ NameInput section)
        const target = scrollStart + scrollableDistance * 0.15;
        lenis.scrollTo(target, { duration: 1.2 });
      }
    }
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setNameError("");
    setReasonsError("");

    const scrollToProgress = (progress: number) => {
      if (!ref.current || !lenis) return;
      const scrollStartOffset = ref.current.offsetTop;
      const scrollableDistance = ref.current.scrollHeight - window.innerHeight;
      const targetPixel = scrollStartOffset + scrollableDistance * progress;

      lenis.scrollTo(targetPixel, { immediate: true });
    };

    if (!playerName.trim()) {
      setNameError("กรุณากรอกชื่อของคุณ");
      scrollToProgress(0.084); // Middle of NameInput section (0-0.167)
      setIsLoading(false);
      return;
    }

    if (selectedReasons.length === 0) {
      setReasonsError("กรุณาเลือกเหตุผลอย่างน้อย 1 ข้อ");
      scrollToProgress(0.35); // Middle of Choices section (0.167-0.500)
      setIsLoading(false);
      return;
    }

    try {
      await fetch("/api/save-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: playerName || "ผู้มาเยือน",
          selectedReasons,
        }),
      });

      window.location.href = "/love-session";
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isIntoDark = latest > 0;

    if (isIntoDark) {
      setShowStars(false);
    }
  });

  return (
    <div ref={ref} className="w-full relative bg-black">
      {/* 300vh */}
      <div className="h-[300vh] w-full ">
        <IntoDarkNameInput
          scrollYProgress={scrollYProgress}
          playerName={playerName}
          setPlayerName={handlePlayerNameChange}
          nameError={nameError}
          onConfirm={handleNameConfirm}
          isConfirmed={isNameConfirmed}
        />
      </div>

      {/* 600vh - เพิ่มความยาวให้ scroll ได้มากขึ้น */}
      <div className="h-[600vh] w-full">
        <IntoDarkChoices
          scrollYProgress={scrollYProgress}
          playerName={playerName}
          selectedReasons={selectedReasons}
          handleReasonToggle={handleReasonToggle}
          reasonsError={reasonsError}
        />
      </div>

      {/* 300vh - Ikigai Explanation */}
      <div className="h-[300vh] w-full">
        <IntoDarkHeard
          scrollYProgress={scrollYProgress}
          hasHeard={hasHeard}
          setHasHeard={setHasHeard}
        />
      </div>

      {/* 600vh - Ikigai Submit */}
      <div className="relative h-[600vh] w-full">
        <IntoDarkSubmit
          scrollYProgress={scrollYProgress}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
