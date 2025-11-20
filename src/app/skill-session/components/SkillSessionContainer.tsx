"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Scene1Skills from "./Scene1_Skills";
import Scene2Match from "./Scene2_Match";
import Scene3NewRole from "./Scene3_NewRole";
import ScrollTo from "@/app/components/ui/ScrollTo";
import { useLenis } from "lenis/react";

// --- Constants ---
export const HARD_SKILLS_LIST = [
  "เทคโนโลยีสารสนเทศ & พัฒนาซอฟต์แวร์",
  "ด้านข้อมูล คณิตศาสตร์ สถิติ และการวิเคราะห์",
  "วิศวกรรม & ช่าง",
  "ไฟฟ้า อิเล็กทรอนิกส์ และระบบควบคุม",
  "การขนส่ง โครงสร้างพื้นฐาน และโยธา",
  "สำรวจ ภูมิสารสนเทศ",
  "ห้องปฏิบัติการ ชีวภาพ เคมี และเทคโนโลยีชีวภาพ",
  "การเกษตร พืช และสัตวศาสตร์",
  "การผลิต พลังงาน โลหะ และโลหการ",
  "เหมือง แร่ และธรณีเทคนิค",
  "สื่อ บันเทิง และเทคโนโลยีเสียง",
  "การแพทย์ และการดูแลสุขภาพ",
  "การเงิน บัญชี และการตรวจสอบ",
  "โลจิสติกส์ ซัพพลายเชน และคลังสินค้า",
  "แฟชั่นและอุตสาหกรรมศิลป์",
  "ผลิตอาหารและการแปรรูปอาหาร",
  "การให้บริการ ที่ปรึกษาและภาษา",
];

export const SOFT_SKILLS_LIST = [
  "ทักษะสื่อสาร (Communication)",
  "การทำงานเป็นทีม & ความร่วมมือ (Teamwork & Collaboration)",
  "ความเป็นผู้นำ & การบริหาร (Leadership & Management)",
  "การคิดวิเคราะห์ & แก้ปัญหา (Problem-solving & Critical Thinking)",
  "การตัดสินใจ (Decision-making & Judgment)",
  "การจัดการเวลา & การวางแผน (Time Management & Planning)",
  "การปรับตัว & ยืดหยุ่น (Adaptability & Resilience)",
  "อารมณ์สังคม (Emotional Intelligence & Interpersonal)",
  "ความคิดสร้างสรรค์ & นวัตกรรม (Creativity & Innovation)",
  "จริยธรรม & ความรับผิดชอบ (Ethics & Responsibility)",
  "ความใส่ใจรายละเอียด & คุณภาพงาน (Attention to Detail & Quality)",
  "การบริการลูกค้า & การเจรจา (Customer Service & Negotiation)",
];

// Removed Confidence Scene & questions; submit moved to Scene 3

// --- Types ---
export interface CustomSkill {
  id: string;
  text: string;
}
export type MatchAnswer = "match" | "no_match" | "";
export type NewRoleAnswer = "yes" | "no" | "";

export default function SkillSessionContainer() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // --- State Management ---
  const [selectedHardSkills, setSelectedHardSkills] = useState<string[]>([]);
  const [customHardSkills, setCustomHardSkills] = useState<CustomSkill[]>([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [customSoftSkills, setCustomSoftSkills] = useState<CustomSkill[]>([]);
  const [skillsMatchJob, setSkillsMatchJob] = useState<MatchAnswer>("");
  const [useSkillsInNewRole, setUseSkillsInNewRole] =
    useState<NewRoleAnswer>("");
  const [isLoading, setIsLoading] = useState(false);
  // Validation error states
  const [hardSkillsError, setHardSkillsError] = useState<string>("");
  const [softSkillsError, setSoftSkillsError] = useState<string>("");
  const [matchError, setMatchError] = useState<string>("");
  const [newRoleError, setNewRoleError] = useState<string>("");

  // --- Scroll Animations ---
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Opacity & Progress mapping for 3 scenes (last one stays)
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

    // clear previous errors
    setHardSkillsError("");
    setSoftSkillsError("");
    setMatchError("");
    setNewRoleError("");

    // helper to scroll to a given container progress (0..1)
    const scrollToProgress = (progress: number) => {
      if (!ref.current || !lenis) return;
      const offsetTop = ref.current.offsetTop;
      const scrollable = ref.current.scrollHeight - window.innerHeight;
      const target = offsetTop + scrollable * progress;
      lenis.scrollTo(target, { immediate: true });
    };

    // Validate
    const nonEmptyCustomHard = customHardSkills
      .map((s) => s.text.trim())
      .filter(Boolean);
    const nonEmptyCustomSoft = customSoftSkills
      .map((s) => s.text.trim())
      .filter(Boolean);
    const hardCount = selectedHardSkills.length + nonEmptyCustomHard.length;
    const softCount = selectedSoftSkills.length + nonEmptyCustomSoft.length;
    let hasError = false;

    if (hardCount < 2) {
      setHardSkillsError("โปรดเลือกอย่างน้อย 2 รายการ หรือเพิ่มทักษะของคุณ");
      scrollToProgress(0.15);
      hasError = true;
    }

    if (softCount < 3) {
      setSoftSkillsError("โปรดเลือกอย่างน้อย 3 รายการ หรือเพิ่มทักษะของคุณ");
      if (!hasError) scrollToProgress(0.15);
      hasError = true;
    }

    if (!skillsMatchJob) {
      setMatchError("โปรดเลือกคำตอบ");
      if (!hasError) scrollToProgress(0.35);
      hasError = true;
    }

    if (!useSkillsInNewRole) {
      setNewRoleError("โปรดเลือกคำตอบ");
      if (!hasError) scrollToProgress(0.65);
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    const session2Data = {
      hardSkills: {
        selected: selectedHardSkills,
        custom: customHardSkills.map((s) => s.text).filter(Boolean),
      },
      softSkills: {
        selected: selectedSoftSkills,
        custom: customSoftSkills.map((s) => s.text).filter(Boolean),
      },
      skillsMatchJob,
      useSkillsInNewRole,
    };

    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/world-session");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div ref={ref} className="h-[600vh] w-full relative">
      <Scene1Skills
        opacity={scene1Opacity}
        zIndex={z1}
        textProgress={scene1TextProgress}
        selectedHardSkills={selectedHardSkills}
        setSelectedHardSkills={setSelectedHardSkills}
        customHardSkills={customHardSkills}
        setCustomHardSkills={setCustomHardSkills}
        selectedSoftSkills={selectedSoftSkills}
        setSelectedSoftSkills={setSelectedSoftSkills}
        customSoftSkills={customSoftSkills}
        setCustomSoftSkills={setCustomSoftSkills}
        errorHardMessage={hardSkillsError}
        errorSoftMessage={softSkillsError}
      />

      <Scene2Match
        opacity={scene2Opacity}
        zIndex={z2}
        textProgress={scene2TextProgress}
        skillsMatchJob={skillsMatchJob}
        setSkillsMatchJob={setSkillsMatchJob}
        errorMessage={matchError}
      />

      <Scene3NewRole
        opacity={scene3Opacity}
        zIndex={z3}
        textProgress={scene3TextProgress}
        useSkillsInNewRole={useSkillsInNewRole}
        setUseSkillsInNewRole={setUseSkillsInNewRole}
        errorMessage={newRoleError}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <ScrollTo opacity={scrollToOpacity} />
    </motion.div>
  );
}
