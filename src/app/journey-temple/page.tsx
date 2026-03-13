"use client";

import { useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import ErrorModal from "../components/modal/ErrorModal";
import ProgressBar from "../components/reusable/ProgressBar";
import { useAudio } from "../contexts/AudioContext";
import { useUI } from "../contexts/UIStarContext";
import { useUser } from "../contexts/UserContext";
import { useIkigaiProcess } from "../hooks/useIkigaiProcess";
import HeartWeighingProcess from "./HeartWeighingProcess";
import TempleArrival from "./TempleArrival";
import WalkingDesert from "./WalkingDesert";

//? Journey Temple Page - รวม Scene 10.1 + 10.2
//? Scene 10.1: Walking through the desert (200vh)
//? Scene 10.2: Temple Arrival + Heart Weighing (400vh)

export default function JourneyTemplePage() {
  const router = useRouter();
  const { userId, isLoading } = useUser();
  const [showTempleScene, setShowTempleScene] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [localErrorMsg, setLocalErrorMsg] = useState("");

  const { setBgMusic } = useAudio();
  const { setShowStars } = useUI();
  const ref = useRef<HTMLDivElement>(null);

  const { progress, statusText, isProcessing, errorMsg, startProcess } =
    useIkigaiProcess();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //? ซ่อน Stars ตลอดทั้งหน้า
  useEffect(() => {
    setShowStars(false);
    return () => setShowStars(true);
  }, [setShowStars]);

  //? Check user authentication
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/10/egypt_expedition.mp3"));
  }, [setBgMusic]);

  const handleStartCeremony = () => {
    if (!userId) {
      setLocalErrorMsg("ไม่พบข้อมูลผู้ใช้ กรุณาเริ่มต้นใหม่");
      setShowErrorModal(true);
      return;
    }
    setShowTempleScene(false);
    startProcess(userId); // สั่ง Hook ทำงาน
  };

  useEffect(() => {
    if (errorMsg) {
      setLocalErrorMsg(errorMsg);
      setShowErrorModal(true);
      setShowTempleScene(true); // กลับมาแสดงปุ่มให้กดใหม่
    }
  }, [errorMsg]);

  useEffect(() => {
    if (progress === 100) {
      // รอให้ Animation วิ่งเต็มหลอด 100% สัก 1.5 วิ แล้วค่อยย้ายหน้า
      const timer = setTimeout(() => {
        router.push(`/ikigai-result`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [progress, router]);

  return (
    <div ref={ref}>
      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="ขออภัย"
        message={localErrorMsg}
      />

      {/* Scene 10.1: Walking through the desert */}
      <WalkingDesert />

      {/* Scene 10.2: Temple Arrival */}
      {showTempleScene && (
        <TempleArrival onStartCeremony={handleStartCeremony} />
      )}

      {/* Scene 10.2 (ต่อ): Heart Weighing Process */}
      <HeartWeighingProcess
        isProcessing={isProcessing}
        progress={progress}
        statusText={statusText}
      />

      {/* ProgressBar: scrollYProgress ของหน้านี้ */}
      <div className="pointer-events-none">
        <ProgressBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
