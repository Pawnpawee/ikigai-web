"use client";

import { useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import ErrorModal from "../components/modal/ErrorModal";
import ProgressBar from "../components/reusable/ProgressBar";
import { useAudio } from "../contexts/AudioContext";
import { useUI } from "../contexts/UIStarContext";
import { useUser } from "../contexts/UserContext";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setBgMusic, isMuted } = useAudio();
  const { setShowStars } = useUI();
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isMuted) {
      setBgMusic(getAudioUrl("Sound/10/egypt_expedition.mp3"));
    }
  }, [setBgMusic, isMuted]);

  const handleStartCeremony = async () => {
    if (!userId) {
      setErrorMessage("ไม่พบข้อมูลผู้ใช้ กรุณาเริ่มต้นใหม่");
      setShowErrorModal(true);
      return;
    }

    //? 1. Hide temple scene and show processing UI
    setShowTempleScene(false);
    setIsProcessing(true);

    try {
      // ------------------------------------------------------------------
      // STEP 1: ส่งคำสั่ง "เริ่มประมวลผล" (Trigger Generation)
      // ------------------------------------------------------------------
      const startResponse = await fetch(
        `${API_BASE_URL}/api/ikigai/generate/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!startResponse.ok) {
        throw new Error("Failed to start Ikigai process");
      }

      const startData = await startResponse.json();
      const { processId, status } = startData; // Destructure เพื่อให้อ่านง่าย

      //? INFORMATION: Fast Track Check
      //* ถ้า Backend บอกว่า "Completed" ตั้งแต่แรก (งานเก่าที่เสร็จแล้ว)
      //* ให้กระโดดข้ามการ Polling ไปหน้า Result ทันที
      if (status === "Completed") {
        console.log("Ikigai already completed. Redirecting...");
        router.push(`/ikigai-result?id=${processId}`);
        return; // จบฟังก์ชันทันที
      }

      // ------------------------------------------------------------------
      // STEP 2: วนลูปเช็คสถานะ (Polling Loop) เฉพาะกรณีที่ยังเป็น Pending
      // ------------------------------------------------------------------
      let isComplete = false;
      let attempts = 0;
      const maxAttempts = 60; // 10 นาที (ถ้า delay 10s) หรือปรับตามความเหมาะสม

      while (!isComplete && attempts < maxAttempts) {
        // รอ 2 วินาทีก่อนเช็คครั้งถัดไป (แนะนำให้เริ่มรอเลย ไม่ต้องยิงซ้ำทันที)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // เรียก API เช็คสถานะ
        const statusResponse = await fetch(
          `${API_BASE_URL}/api/ikigai/status/${processId}`,
        );

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();

          if (statusData.status === "Completed") {
            // เช็ค property ให้ตรงกับ Backend DTO
            isComplete = true;
            console.log("Ikigai Generated Successfully!");

            //? Optional: ถ้าต้องการ Save ลง Storage
            // saveSessionResult(statusData);

            // Break loop เพื่อไปทำงานส่วน Redirect
            break;
          } else if (statusData.status === "Failed") {
            //! warning: Backend แจ้งว่า Process ล้มเหลว
            throw new Error(statusData.error || "Processing failed on server");
          } else {
            // ยังเป็น Pending หรือ Processing อยู่
            console.log(
              `Processing... Attempt ${attempts + 1}: ${statusData.status}`,
            );
            attempts++;
          }
        } else {
          //? information: กรณี Network error ชั่วคราว เราจะไม่ Throw ทันที แต่จะลองใหม่
          console.warn("Network glitch, retrying polling...");
          attempts++;
        }
      }

      // ตรวจสอบว่าหลุด Loop มาเพราะอะไร
      if (!isComplete) {
        throw new Error(
          "Timeout: Processing took too long. Please try again later.",
        );
      }

      // ------------------------------------------------------------------
      // STEP 3: ประมวลผลเสร็จสิ้น -> เปลี่ยนหน้า
      // ------------------------------------------------------------------

      // รอสักครู่เพื่อให้ User เห็นหน้า Success หรือ Animation จบ (Optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsProcessing(false);
      router.push(`/ikigai-result?id=${processId}`);
    } catch (error) {
      console.error("Error processing Ikigai:", error);

      setIsProcessing(false);
      setShowTempleScene(true); // กลับไปหน้าเดิมเพื่อให้ User กดใหม่ได้

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "การประมวลผลล้มเหลว กรุณาลองอีกครั้ง",
      );
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    // 4. เรา "สมัคร" (subscribe) เพื่อดักฟังเหตุการณ์ "change"
    // .on() จะ return ฟังก์ชันสำหรับ "ยกเลิก" (unsubscribe) ออกมา
    const unsubscribe = scrollYProgress.on("change", (latestValue) => {
      // latestValue คือค่าตัวเลขล่าสุด
      console.log(
        `scrollYProgress (from useEffect): ${latestValue.toFixed(2)}`,
      );
    }); // 5. [สำคัญมาก] เรา return cleanup function
    // ฟังก์ชันนี้จะทำงานเมื่อ Component ถูก unmount (ถูกทำลาย)
    // เพื่อสั่ง "ยกเลิกการสมัคร" ป้องกัน Memory Leak

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <div ref={ref}>
      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="ขออภัย"
        message={errorMessage}
      />

      {/* Scene 10.1: Walking through the desert */}
      <WalkingDesert />

      {/* Scene 10.2: Temple Arrival */}
      {showTempleScene && (
        <TempleArrival onStartCeremony={handleStartCeremony} />
      )}

      {/* Scene 10.2 (ต่อ): Heart Weighing Process */}
      <HeartWeighingProcess isProcessing={isProcessing} />

      {/* ProgressBar: scrollYProgress ของหน้านี้ */}
      <div className="pointer-events-none">
        <ProgressBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
