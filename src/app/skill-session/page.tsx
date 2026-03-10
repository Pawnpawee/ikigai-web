"use client";

import { useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Cover from "@/app/components/reusable/Cover";
import {
  COVER_SESSION2_CONFIG,
  COVER_SESSION2_ITEMS,
} from "@/app/data/cover_session2.data";
import { useStarsVisibility } from "@/app/hooks/useStarsVisibility";
import { API_BASE_URL } from "@/utils/appConfig";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import ErrorModal from "../components/modal/ErrorModal";
import LoadingScreen from "../components/reusable/LoadingScreen";
import ProgressBar from "../components/reusable/ProgressBar";
import { useAudio } from "../contexts/AudioContext";
import { useUser } from "../contexts/UserContext";
import S7_1, { type S7_1Data } from "./s7_1";
import S7_2, { type S7_2Data } from "./s7_2";
import S7_3, { type S7_3Data } from "./s7_3";

export interface SkillData {
  selectedHardSkills: string[];
  customHardSkills: string[];
  selectedSoftSkills: string[];
  customSoftSkills: string[];
  skillsMatchJob: string;
  useSkillsInNewRole: string;
}

export default function SessionSkillPage() {
  //? Single ref for entire page
  const ref = useRef<HTMLDivElement>(null);
  const { setBgMusic } = useAudio();
  const { userId, isLoading } = useUser();
  const lenis = useLenis();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isS7_1Completed, setIsS7_1Completed] = useState(false);
  const [isS7_2Completed, setIsS7_2Completed] = useState(false);
  const [s7_1Data, setS7_1Data] = useState<S7_1Data | null>(null);
  const [s7_2Data, setS7_2Data] = useState<S7_2Data | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  //? Single scrollYProgress for entire page (0-1 for 1000vh)
  //? Cover 200vh + S7_1 200vh + S7_2 200vh + S7_3 400vh = 1000vh
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //? Transform scrollYProgress to section-specific ranges (proportional to height)
  //? Cover: 0-0.2 → 0-1 (200vh / 1000vh)
  const coverProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  //? S7_1: 0.2-0.4 → 0-1 (200vh / 1000vh)
  const s7_1Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  //? S7_2: 0.4-0.6 → 0-1 (200vh / 1000vh)
  const s7_2Progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  //? S7_3: 0.6-1.0 → 0-1 (400vh / 1000vh)
  const s7_3Progress = useTransform(scrollYProgress, [0.6, 1.0], [0, 1]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/7/living-art.mp3"));
  }, [setBgMusic]);

  const isResettingScroll = useRef(false);

  //? Scroll lock effect: ล็อคไม่ให้ scroll ผ่าน section ที่ยังไม่เสร็จ
  //? Total 1000vh, scrollableDistance = 900vh
  //? S7_1 lock: 380/900 = 0.422, S7_2 lock: 580/900 = 0.644
  //? S7_3 Q1 lock: 780/900 = 0.867, S7_3 Q2 lock: 880/900 = 0.978
  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = (e: {
      scroll: number;
      animatedScroll: number;
      velocity: number;
    }) => {
      if (!ref.current || isResettingScroll.current) return;

      const scrollStart = ref.current.offsetTop;
      const sectionHeight = ref.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;
      const tolerance = 2;

      //? Lock S7_1: ไม่ให้ scroll เข้า S7_2 ถ้ายังไม่เสร็จ
      //? Cover=200vh + S7_1*0.9=180vh → 380/900 = 0.422
      if (!isS7_1Completed) {
        const s7_1Lock = scrollStart + scrollableDistance * 0.3;
        if (e.animatedScroll > s7_1Lock + tolerance && e.velocity > 0) {
          isResettingScroll.current = true;
          lenis.scrollTo(s7_1Lock, {
            immediate: true,
            force: true,
            lock: true,
            onComplete: () => {
              requestAnimationFrame(() => {
                isResettingScroll.current = false;
              });
            },
          });
          return;
        }
      }

      //? Lock S7_2: ไม่ให้ scroll เข้า S7_3 ถ้ายังไม่เสร็จ
      //? Cover=200vh + S7_1=200vh + S7_2*0.9=180vh → 580/900 = 0.644
      if (!isS7_2Completed) {
        const s7_2Lock = scrollStart + scrollableDistance * 0.5;
        if (e.animatedScroll > s7_2Lock + tolerance && e.velocity > 0) {
          isResettingScroll.current = true;
          lenis.scrollTo(s7_2Lock, {
            immediate: true,
            force: true,
            lock: true,
            onComplete: () => {
              requestAnimationFrame(() => {
                isResettingScroll.current = false;
              });
            },
          });
          return;
        }
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, isS7_1Completed, isS7_2Completed]);

  //? Check user authentication
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

  //? Handler: S7_1 status change (Hard Skills selected/unselected)
  const handleS7_1Completed = (data: S7_1Data | null) => {
    if (data) {
      setS7_1Data(data);
      setIsS7_1Completed(true);
    } else {
      //! Unselect ต่ำกว่า threshold → ล็อค scroll กลับ
      setIsS7_1Completed(false);
    }
  };

  //? Handler: S7_2 status change (Soft Skills selected/unselected)
  const handleS7_2Completed = (data: S7_2Data | null) => {
    if (data) {
      setS7_2Data(data);
      setIsS7_2Completed(true);
    } else {
      //! Unselect ต่ำกว่า threshold → ล็อค scroll กลับ
      setIsS7_2Completed(false);
    }
  };

  //? Handler: S7_3 completed (both questions answered)
  const handleS7_3Completed = (data: S7_3Data) => {
    //? Combine all section data and submit
    if (s7_1Data && s7_2Data) {
      handleSkillSubmit({
        selectedHardSkills: s7_1Data.selectedHardSkills,
        customHardSkills: s7_1Data.customHardSkills,
        selectedSoftSkills: s7_2Data.selectedSoftSkills,
        customSoftSkills: s7_2Data.customSoftSkills,
        skillsMatchJob: data.skillsMatchJob,
        useSkillsInNewRole: data.useSkillsInNewRole,
      });
    }
  };

  //? Submit skill data to API
  const handleSkillSubmit = async (data: SkillData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/progress/skill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          selectedHardSkills: data.selectedHardSkills,
          customHardSkills: data.customHardSkills,
          selectedSoftSkills: data.selectedSoftSkills,
          customSoftSkills: data.customSoftSkills,
          skillsMatchJob: data.skillsMatchJob,
          useSkillsInNewRole: data.useSkillsInNewRole,
        }),
      });

      if (!response.ok) {
        setIsSubmitting(false);
        setShowErrorModal(true);
        return;
      }

      //? Navigate to next session
      router.push("/world-session");
    } catch (error) {
      console.error("Error submitting skill data:", error);
      setIsSubmitting(false);
      setShowErrorModal(true);
    }
  };

  //? Hide stars after Cover section
  useStarsVisibility(scrollYProgress, {
    shouldShow: (p) => p <= 0.2,
  });

  return (
    <div ref={ref} className="h-[1000vh] w-full relative bg-black">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isSubmitting} />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="ขออภัย"
        message="ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง"
      />

      {/* Cover Section - 200vh (0-200vh, progress: 0-0.2) */}
      <div className="h-[200vh] w-full">
        <Cover
          scrollYProgress={coverProgress}
          items={COVER_SESSION2_ITEMS}
          titleImage={COVER_SESSION2_CONFIG.titleImage}
          iconImage={COVER_SESSION2_CONFIG.iconImage}
          sessionText={COVER_SESSION2_CONFIG.sessionText}
        />
      </div>
      <div className="bg-s7">
        {/* S7_1 Section - Hard Skills - 200vh (200-400vh, progress: 0.2-0.4) */}
        <div className="h-[200vh] w-full">
          <S7_1
            scrollYProgress={s7_1Progress}
            onCompleted={handleS7_1Completed}
          />
        </div>

        {/* S7_2 Section - Soft Skills - 200vh (400-600vh, progress: 0.4-0.6) */}
        <div className="h-[200vh] w-full">
          <S7_2
            scrollYProgress={s7_2Progress}
            onCompleted={handleS7_2Completed}
          />
        </div>
      </div>
      {/* S7_3 Section - Skills Match Job - 400vh (600-1000vh, progress: 0.6-1.0) */}
      <div className="h-[400vh] w-full">
        <S7_3
          scrollYProgress={s7_3Progress}
          onCompleted={handleS7_3Completed}
        />
      </div>

      {/* ProgressBar: scrollYProgress ของหน้านี้ */}
      <div className="pointer-events-none">
        <ProgressBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
