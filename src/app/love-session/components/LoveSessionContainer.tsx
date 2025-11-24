"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Scene1Hobbies from "./Scene1_Hobbies";
import Scene2TopThree from "./Scene2_TopThree";
import Scene3Dream from "./Scene3_Dream";
import ScrollTo from "@/app/components/ui/ScrollTo";
import { useLenis } from "lenis/react";

export const HOBBIES_LIST = [
  "วาดรูป",
  "ถ่ายรูป",
  "ตัดต่อคลิป",
  "ทำอาหาร",
  "เขียนนิยาย",
  "อ่านการ์ตูน",
  "ฟังเพลง",
  "อ่านหนังสือ",
  "ร้องเพลง",
  "เล่นดนตรี",
  "เล่นเกม",
  "ดูหนัง/ซีรี่ย์",
  "เล่นกับน้องหมา/แมว",
  "เดินทางท่องเที่ยว",
  "ออกกำลังกาย",
  "ไปคาเฟ่",
  "สร้างคอนเทนต์สั้น",
  "งานคราฟต์",
  "สะสมของเก่า",
  "กิจกรรมกลางแจ้ง",
  "บอร์ดเกม",
  "ปลูกต้นไม้",
  "ไปคอนเสิร์ต",
  "เรียนภาษาใหม่ ๆ",
];

export const CURIOSITY_QUESTIONS = [
  "ฉันสนใจสิ่งต่าง ๆ รอบตัว",
  "ฉันหาโอกาสในการพัฒนาตนเอง",
  "ฉันพิจารณาทางเลือกต่าง ๆ ก่อนตัดสินใจ",
  "ฉันศึกษาแนวทางต่าง ๆ ในการกระทําสิ่งใดสิ่งหนึ่ง",
  "ฉันใคร่ครวญกับคําถามที่เกิดขึ้นในใจ",
  "ฉันสนใจในโอกาสใหม่ ๆ อยู่เสมอ",
];

export interface CustomHobby {
  id: string;
  text: string;
}

export type DreamAnswer = "yes" | "no" | "not_sure" | "";

export default function LoveSessionContainer() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [customHobbies, setCustomHobbies] = useState<CustomHobby[]>([]);
  const [topThree, setTopThree] = useState<string[]>([]);
  const [dreamAnswer, setDreamAnswer] = useState<DreamAnswer>("");
  const [isLoading, setIsLoading] = useState(false);
  // Validation error messages (similar approach to IntoDark)
  const [hobbiesError, setHobbiesError] = useState<string>("");
  const [topThreeError, setTopThreeError] = useState<string>("");
  const [dreamError, setDreamError] = useState<string>("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Helper: scroll the page to a given progress (0..1) within this container
  const scrollToProgress = (progress: number) => {
    if (!ref.current || !lenis) return;
    const scrollStartOffset = ref.current.offsetTop;
    const scrollableDistance = ref.current.scrollHeight - window.innerHeight;
    const targetPixel = scrollStartOffset + scrollableDistance * progress;

    lenis.scrollTo(targetPixel, { immediate: true });
  };

  const scrollToOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.8, 0.85],
    [0, 1, 1, 0],
  );

  const scene1Opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2, 0.25],
    [0, 1, 1, 0],
  );
  const scene1TextProgress = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    [0, 1],
  );
  const scene2Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.45, 0.5],
    [0, 1, 1, 0],
  );
  const scene2TextProgress = useTransform(
    scrollYProgress,
    [0.25, 0.35],
    [0, 1],
  );
  // Scene 3 is now the final scene: make it stay visible until end
  const scene3Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.52, 1],
    [0, 1, 1],
  );
  const scene3TextProgress = useTransform(scrollYProgress, [0.52, 0.8], [0, 1]);

  const z1 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.24, 0.25],
    [-1, 10, 10, -1],
  );

  const z2 = useTransform(
    scrollYProgress,
    [0, 0.26, 0.49, 0.5],
    [-1, 10, 10, -1],
  );

  const z3 = useTransform(scrollYProgress, [0, 0.51, 1], [-1, 10, 10]);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    // Clear previous errors
    setHobbiesError("");
    setTopThreeError("");
    setDreamError("");

    // Validate using the same principle as IntoDark (display message near each section)
    const nonEmptyCustom = customHobbies
      .map((h) => h.text.trim())
      .filter(Boolean);
    const hobbiesCount = selectedHobbies.length + nonEmptyCustom.length;
    let hasError = false;

    if (hobbiesCount < 3) {
      setHobbiesError("โปรดเลือกอย่างน้อย 3 รายการ หรือเพิ่มงานอดิเรกของคุณ");
      scrollToProgress(0.15);
      hasError = true;
    }

    if (topThree.length !== 3) {
      setTopThreeError("โปรดเลือกให้ครบ 3 รายการ");
      if (!hasError) scrollToProgress(0.35);
      hasError = true;
    }

    if (!dreamAnswer) {
      setDreamError("โปรดเลือกคำตอบ");
      if (!hasError) scrollToProgress(0.6);
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    const session1Data = {
      selectedHobbies,
      customHobbies: nonEmptyCustom,
      topThree,
      dreamAnswer,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/skill-session");
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false);
    }
  };

  const allHobbies = [
    ...selectedHobbies,
    ...customHobbies.map((h) => h.text).filter(Boolean),
  ];

  return (
    <motion.div ref={ref} className="h-[600vh] w-full relative ">
      <Scene1Hobbies
        opacity={scene1Opacity}
        zIndex={z1}
        textProgress={scene1TextProgress}
        selectedHobbies={selectedHobbies}
        setSelectedHobbies={setSelectedHobbies}
        customHobbies={customHobbies}
        setCustomHobbies={setCustomHobbies}
        errorMessage={hobbiesError}
      />

      <Scene2TopThree
        opacity={scene2Opacity}
        zIndex={z2}
        textProgress={scene2TextProgress}
        allHobbies={allHobbies}
        topThree={topThree}
        setTopThree={setTopThree}
        errorMessage={topThreeError}
      />

      <Scene3Dream
        opacity={scene3Opacity}
        zIndex={z3}
        textProgress={scene3TextProgress}
        dreamAnswer={dreamAnswer}
        setDreamAnswer={setDreamAnswer}
        errorMessage={dreamError}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <ScrollTo opacity={scrollToOpacity} />
    </motion.div>
  );
}
