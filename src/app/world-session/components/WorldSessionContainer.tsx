"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollTo from "@/app/components/ui/ScrollTo";
import Scene1CalledUpon from "./Scene1_CalledUpon";
import Scene2Gifts from "./Scene2_Gifts";
import Scene3NoManual from "./Scene3_NoManual";
import Scene4Mismatch from "./Scene4_Mismatch";
import Scene5FutureValue from "./Scene5_FutureValue";
import { useLenis } from "lenis/react";

// --- Constants ---
export const GIFTS_LIST = [
  "ภาระรับผิดชอบ (Accountability)",
  "การเรียนรู้ตลอดชีวิต (Lifelong Learning)",
  "จรรยาบรรณในการทำงานที่ดี (Good Work Ethics)",
  "การควบคุมตนเองและการปรับตัว (Self-Regulation & Adaptability)",
  "การทำงานร่วมกับผู้อื่น (Collaborative Skills / Teamwork)",
  "การสื่อสาร (Communication)",
  "สำนึกรู้ด้านสิ่งแวดล้อม (Environmental Awareness)",
  "ความตระหนักถึงความปลอดภัย (Safety Awareness)",
  "การคิดเชิงสร้างสรรค์ (Creative Thinking)",
  "การคิดเชิงวิเคราะห์และแก้ปัญหา (Analytical and Problem-solving Skills)",
  "การประยุกต์ใช้เทคโนโลยี (Technology Adoption)",
  "การบริหารการเปลี่ยนแปลง (Change Management)",
];

// Removed FuturePath scene & awareness questions; submit moved to Scene 5

// --- Types ---
export type CalledUponAnswer = "yes" | "no" | "";
export type NoManualChoice = "do_it_myself" | "ask_first" | "";
export type MismatchChoice = "adapt_self" | "adapt_role" | "both" | "";
export type FutureValueAnswer = "yes" | "no" | "";

export default function WorldSessionContainer() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // --- State Management ---
  const [calledUponAnswer, setCalledUponAnswer] =
    useState<CalledUponAnswer>("");
  const [selectedGifts, setSelectedGifts] = useState<string[]>([]);
  const [noManualChoice, setNoManualChoice] = useState<NoManualChoice>("");
  const [mismatchChoice, setMismatchChoice] = useState<MismatchChoice>("");
  const [futureValueAnswer, setFutureValueAnswer] =
    useState<FutureValueAnswer>("");
  const [isLoading, setIsLoading] = useState(false);
  // Validation error states
  const [calledUponError, setCalledUponError] = useState<string>("");
  const [giftsError, setGiftsError] = useState<string>("");
  const [noManualError, setNoManualError] = useState<string>("");
  const [mismatchError, setMismatchError] = useState<string>("");
  const [futureValueError, setFutureValueError] = useState<string>("");

  // --- Scroll Animations for 5 Scenes (Scene 5 stays) ---
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Scene 1 (0 -> 0.2)
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.02, 0.18, 0.2], [0, 1, 1, 0]);
  const scene1TextProgress = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const z1 = useTransform(scrollYProgress, [0, 0.01, 0.19, 0.2], [-1, 10, 10, -1]);

  // Scene 2 (0.2 -> 0.4)
  const scene2Opacity = useTransform(scrollYProgress, [0.2, 0.22, 0.38, 0.4], [0, 1, 1, 0]);
  const scene2TextProgress = useTransform(scrollYProgress, [0.22, 0.3], [0, 1]);
  const z2 = useTransform(scrollYProgress, [0.2, 0.21, 0.39, 0.4], [-1, 10, 10, -1]);

  // Scene 3 (0.4 -> 0.6)
  const scene3Opacity = useTransform(scrollYProgress, [0.4, 0.42, 0.58, 0.6], [0, 1, 1, 0]);
  const scene3TextProgress = useTransform(scrollYProgress, [0.42, 0.5], [0, 1]);
  const z3 = useTransform(scrollYProgress, [0.4, 0.41, 0.59, 0.6], [-1, 10, 10, -1]);

  // Scene 4 (0.6 -> 0.8)
  const scene4Opacity = useTransform(scrollYProgress, [0.6, 0.62, 0.78, 0.8], [0, 1, 1, 0]);
  const scene4TextProgress = useTransform(scrollYProgress, [0.62, 0.7], [0, 1]);
  const z4 = useTransform(scrollYProgress, [0.6, 0.61, 0.79, 0.8], [-1, 10, 10, -1]);

  // Scene 5 (0.8 -> 1) - stays visible
  const scene5Opacity = useTransform(scrollYProgress, [0.8, 0.82, 1], [0, 1, 1]);
  const scene5TextProgress = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const z5 = useTransform(scrollYProgress, [0.8, 0.81, 1], [-1, 10, 10]);

  const scrollToOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.8, 0.85],
    [0, 1, 1, 0]
  );

  // --- Submission Logic ---
  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    // clear previous errors
    setCalledUponError("");
    setGiftsError("");
    setNoManualError("");
    setMismatchError("");
    setFutureValueError("");

    // scroll helper within this container
    const scrollToProgress = (progress: number) => {
      if (!ref.current || !lenis) return;
      const offsetTop = ref.current.offsetTop;
      const scrollable = ref.current.scrollHeight - window.innerHeight;
      const target = offsetTop + scrollable * progress;
      lenis.scrollTo(target, { immediate: true });
    };

    // validate
    let hasError = false;
    if (!calledUponAnswer) {
      setCalledUponError("โปรดเลือกคำตอบ");
      scrollToProgress(0.1);
      hasError = true;
    }
    if (selectedGifts.length === 0) {
      setGiftsError("โปรดเลือกอย่างน้อย 1 รายการ");
      if (!hasError) scrollToProgress(0.3);
      hasError = true;
    }
    if (!noManualChoice) {
      setNoManualError("โปรดเลือกคำตอบ");
      if (!hasError) scrollToProgress(0.5);
      hasError = true;
    }
    if (!mismatchChoice) {
      setMismatchError("โปรดเลือกคำตอบ");
      if (!hasError) scrollToProgress(0.7);
      hasError = true;
    }
    if (!futureValueAnswer) {
      setFutureValueError("โปรดเลือกคำตอบ");
      if (!hasError) scrollToProgress(0.85);
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    const session3Data = {
      calledUponAnswer,
      selectedGifts,
      noManualChoice,
      mismatchChoice,
      futureValueAnswer,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/paid-session");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div ref={ref} className="h-[1000vh] w-full relative">
      <Scene1CalledUpon
        opacity={scene1Opacity}
        zIndex={z1}
        textProgress={scene1TextProgress}
        calledUponAnswer={calledUponAnswer}
        setCalledUponAnswer={setCalledUponAnswer}
        errorMessage={calledUponError}
      />
      <Scene2Gifts
        opacity={scene2Opacity}
        zIndex={z2}
        textProgress={scene2TextProgress}
        selectedGifts={selectedGifts}
        setSelectedGifts={setSelectedGifts}
        errorMessage={giftsError}
      />
      <Scene3NoManual
        opacity={scene3Opacity}
        zIndex={z3}
        textProgress={scene3TextProgress}
        noManualChoice={noManualChoice}
        setNoManualChoice={setNoManualChoice}
        errorMessage={noManualError}
      />
      <Scene4Mismatch
        opacity={scene4Opacity}
        zIndex={z4}
        textProgress={scene4TextProgress}
        mismatchChoice={mismatchChoice}
        setMismatchChoice={setMismatchChoice}
        errorMessage={mismatchError}
      />
      <Scene5FutureValue
        opacity={scene5Opacity}
        zIndex={z5}
        textProgress={scene5TextProgress}
        futureValueAnswer={futureValueAnswer}
        setFutureValueAnswer={setFutureValueAnswer}
        errorMessage={futureValueError}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <ScrollTo opacity={scrollToOpacity} />
    </motion.div>
  );
}
