"use client";

import { useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Cover from "@/app/components/reusable/Cover";
import {
  COVER_SESSION2_CONFIG,
  COVER_SESSION2_ITEMS,
} from "@/app/data/cover_session2.data";
import { API_BASE_URL } from "@/utils/appConfig";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import ErrorModal from "../components/modal/ErrorModal";
import { useAudio } from "../contexts/AudioContext";
import { useUser } from "../contexts/UserContext";
import SkillSelection, { type SkillData } from "./SkillSelection";

export default function SessionSkillPage() {
  const router = useRouter();
  const { userId, isLoading } = useUser();
  const [showErrorModal, setShowErrorModal] = useState(false);

  //? Cover Section (0-200vh)
  const coverRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: coverProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end end"],
  });

  const { setBgMusic, isMuted } = useAudio();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (!isMuted) {
      setBgMusic(getAudioUrl("Sound/7/living-art.mp3"));
    }
  }, [setBgMusic, isMuted]);

  //? Check user authentication
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

  //? Submit skill data to API
  const handleSkillSubmit = async (data: SkillData) => {
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
        setShowErrorModal(true);
        return;
      }

      //? Navigate to next session
      router.push("/world-session");
    } catch (error) {
      console.error("Error submitting skill data:", error);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="w-full relative bg-black">
      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="ขออภัย"
        message="ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง"
      />

      {/* Cover Section - 200vh */}
      <div ref={coverRef} className="h-[200vh] w-full">
        <Cover
          scrollYProgress={coverProgress}
          items={COVER_SESSION2_ITEMS}
          titleImage={COVER_SESSION2_CONFIG.titleImage}
          iconImage={COVER_SESSION2_CONFIG.iconImage}
          sessionText={COVER_SESSION2_CONFIG.sessionText}
        />
      </div>

      <SkillSelection onSubmit={handleSkillSubmit} />
    </div>
  );
}
