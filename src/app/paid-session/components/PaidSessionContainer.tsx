"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollTo from "@/app/components/ui/ScrollTo";
import Scene1EverPaid from "./Scene1_EverPaid";
import Scene2JobCards from "./Scene2_JobCards";
import Scene3MonetizableExperience from "./Scene3_MonetizableExperience";
import { useLenis } from "lenis/react";

// --- Constants ---
export const JOB_CARDS_LIST = [
  "สาขาอาชีพก่อสร้างและให้บริการเกี่ยวกับอสังหาริมทรัพย์",
  "สาขาอาชีพการเกษตรและเทคโนโลยีชีวภาพ",
  "สาขาอาชีพการบริหารจัดการ และการให้บริการทางวิชาชีพ",
  "สาขาอาชีพการผลิตเชื้อเพลิงชีวภาพ เคมีชีวภาพ ผลิตภัณฑ์เคมี และไบโอดีเซล",
  "สาขาอาชีพการพัฒนาบุคลากร",
  "สาขาอาชีพการพิมพ์และสื่อสารมวลชน",
  "สาขาอาชีพการวิจัย",
  "สาขาอาชีพเครื่องจักรกลและการผลิต",
  "สาขาอาชีพด้านการแพทย์ และสุขภาพ",
  "สาขาอาชีพท่องเที่ยว กีฬา และการจัดนิทรรศการ",
  "สาขาอาชีพเทคโนโลยีดิจิทัล",
  "สาขาอาชีพธุรกิจการเงินและการจัดการทรัพย์สิน",
  "สาขาอาชีพธุรกิจบริการและพาณิชย์",
  "สาขาอาชีพผลิตยานยนต์และชิ้นส่วน",
  "สาขาอาชีพผลิตอาหารและการแปรรูปอาหาร",
  "สาขาอาชีพพลังงานและสาธารณูปโภค",
  "สาขาอาชีพเฟอร์นิเจอร์",
  "สาขาอาชีพแฟชั่นและอุตสาหกรรมศิลป์",
  "สาขาอาชีพไฟฟ้าและอิเล็กทรอนิกส์",
  "สาขาอาชีพระบบอัตโนมัติและหุ่นยนต์",
  "สาขาอาชีพโลจิสติกส์และการขนส่ง",
  "สาขาอาชีพโลหการ",
  "สาขาอาชีพเหมืองแร่",
];

// --- Types ---
export type EverPaidAnswer = "yes" | "no" | "";

export default function PaidSessionContainer() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // --- State Management ---
  const [everPaidAnswer, setEverPaidAnswer] = useState<EverPaidAnswer>("");
  const [selectedJobCards, setSelectedJobCards] = useState<string[]>([]);
  const [monetizableExperience, setMonetizableExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Validation error states
  const [everPaidError, setEverPaidError] = useState<string>("");
  const [jobCardsError, setJobCardsError] = useState<string>("");
  const [experienceError, setExperienceError] = useState<string>("");

  // --- Scroll Animations for 4 Scenes (last one stays) ---
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Scene 1 (0 -> 0.25)
  const scene1Opacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.23, 0.25],
    [0, 1, 1, 0],
  );
  const scene1TextProgress = useTransform(
    scrollYProgress,
    [0.02, 0.15],
    [0, 1],
  );
  const z1 = useTransform(
    scrollYProgress,
    [0, 0.01, 0.24, 0.25],
    [-1, 10, 10, -1],
  );

  // Scene 2 (0.25 -> 0.5)
  const scene2Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.27, 0.48, 0.5],
    [0, 1, 1, 0],
  );
  const scene2TextProgress = useTransform(scrollYProgress, [0.27, 0.4], [0, 1]);
  const z2 = useTransform(
    scrollYProgress,
    [0.25, 0.26, 0.49, 0.5],
    [-1, 10, 10, -1],
  );

  // Scene 3 (0.5 -> 1.0) - Stays visible
  const scene3Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.52, 1],
    [0, 1, 1],
  );
  const scene3TextProgress = useTransform(scrollYProgress, [0.52, 0.9], [0, 1]);
  const z3 = useTransform(scrollYProgress, [0.5, 0.51, 1], [-1, 10, 10]);

  const scrollToOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.8, 0.85],
    [0, 1, 1, 0],
  );

  // --- Submission Logic ---
  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    // clear errors
    setEverPaidError("");
    setJobCardsError("");
    setExperienceError("");

    // helper scroll within this container
    const scrollToProgress = (progress: number) => {
      if (!ref.current || !lenis) return;
      const offsetTop = ref.current.offsetTop;
      const scrollable = ref.current.scrollHeight - window.innerHeight;
      const target = offsetTop + scrollable * progress;
      lenis.scrollTo(target, { immediate: true });
    };

    // validate
    let hasError = false;
    if (!everPaidAnswer) {
      setEverPaidError("โปรดเลือกคำตอบ");
      scrollToProgress(0.15);
      hasError = true;
    }
    if (selectedJobCards.length === 0) {
      setJobCardsError("โปรดเลือกอย่างน้อย 1 รายการ");
      if (!hasError) scrollToProgress(0.4);
      hasError = true;
    }
    if (!monetizableExperience.trim()) {
      setExperienceError("โปรดกรอกข้อความ");
      if (!hasError) scrollToProgress(0.65);
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    const sessionData = {
      everPaidAnswer,
      selectedJobCards,
      monetizableExperience,
    };

    // TODO: Combine with data from previous sessions (e.g., from Zustand, Context, or local storage)
    // TODO: Send all data to your n8n webhook URL
    try {
      // Example: await fetch('YOUR_N8N_WEBHOOK_URL', { method: 'POST', body: JSON.stringify(allData) });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // router.push("/results-page"); // Navigate to the results/thank you page
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div ref={ref} className="h-[600vh] w-full relative">
      <Scene1EverPaid
        opacity={scene1Opacity}
        zIndex={z1}
        textProgress={scene1TextProgress}
        everPaidAnswer={everPaidAnswer}
        setEverPaidAnswer={setEverPaidAnswer}
        errorMessage={everPaidError}
      />
      <Scene2JobCards
        opacity={scene2Opacity}
        zIndex={z2}
        textProgress={scene2TextProgress}
        selectedJobCards={selectedJobCards}
        setSelectedJobCards={setSelectedJobCards}
        errorMessage={jobCardsError}
      />
      <Scene3MonetizableExperience
        opacity={scene3Opacity}
        zIndex={z3}
        textProgress={scene3TextProgress}
        monetizableExperience={monetizableExperience}
        setMonetizableExperience={setMonetizableExperience}
        errorMessage={experienceError}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <ScrollTo opacity={scrollToOpacity} />
    </motion.div>
  );
}
