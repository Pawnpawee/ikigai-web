"use client";
import { motion, useScroll, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import IntoDarkNameInput from "./IntoDark_NameInput";
import IntoDarkChoices from "./IntoDark_Choices";
import IntoDarkHeard from "./IntoDark_Heard";
import IntoDarkSubmit from "./IntoDark_Submit";
import { useLenis } from "lenis/react";

export default function IntoDark() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const lenis = useLenis();

  const [playerName, setPlayerName] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<number[]>([]);
  const [hasHeard, setHasHeard] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [reasonsError, setReasonsError] = useState("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const handleReasonToggle = (reasonId: number) => {
    if (reasonsError) setReasonsError("");
    setSelectedReasons((prev) =>
      prev.includes(reasonId)
        ? prev.filter((id) => id !== reasonId)
        : [...prev, reasonId]
    );
  };
  const handlePlayerNameChange = (name: string) => {
    if (nameError) setNameError("");
    setPlayerName(name);
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
      scrollToProgress(0.05); // Middle of NameInput section (0-0.1)
      setIsLoading(false);
      return;
    }

    if (selectedReasons.length === 0) {
      setReasonsError("กรุณาเลือกเหตุผลอย่างน้อย 1 ข้อ");
      scrollToProgress(0.4); // Middle of Choices section (0.1-0.7)
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/save-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: playerName || "ผู้มาเยือน",
          selectedReasons,
        }),
      }); // if (!response.ok) { //   throw new Error('Failed to save data'); // }

      console.log("Data saved successfully!");
      router.push("/love-session");
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false);
    }
  };

  

  return (
    <div ref={ref} className="w-full relative bg-black">

      {/* 100vh */}
      <div className="h-screen w-full">
        <IntoDarkNameInput
          scrollYProgress={scrollYProgress}
          playerName={playerName}
          setPlayerName={handlePlayerNameChange}
          nameError={nameError}
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

      {/* 100vh - Ikigai Explanation */}
      <div className="h-screen w-full">
        <IntoDarkHeard
          scrollYProgress={scrollYProgress}
          hasHeard={hasHeard}
          setHasHeard={setHasHeard}
        />
      </div>

      {/* 300vh */}
      <div className="h-[300vh] w-full">
        <IntoDarkSubmit
          scrollYProgress={scrollYProgress}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
