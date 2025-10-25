"use client";
import { motion, useScroll, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import IntoDarkNameInput from "./IntoDark_NameInput";
import IntoDarkChoices from "./IntoDark_Choices";
import IntoDarkSubmit from "./IntoDark_Submit";
import { useLenis } from "lenis/react";

export default function IntoDark() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const lenis = useLenis();

  const [playerName, setPlayerName] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<number[]>([]);
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
      scrollToProgress(0.3);
      setIsLoading(false);
      return;
    }

    if (selectedReasons.length === 0) {
      setReasonsError("กรุณาเลือกเหตุผลอย่างน้อย 1 ข้อ");
      scrollToProgress(0.6);
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
    <div ref={ref} className="h-[750vh] w-full relative bg-black">
      <IntoDarkNameInput
        scrollYProgress={scrollYProgress}
        playerName={playerName}
        setPlayerName={handlePlayerNameChange}
        nameError={nameError}
      />

      <IntoDarkChoices
        scrollYProgress={scrollYProgress}
        playerName={playerName}
        selectedReasons={selectedReasons}
        handleReasonToggle={handleReasonToggle}
        reasonsError={reasonsError}
      />

      <IntoDarkSubmit
        scrollYProgress={scrollYProgress}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
