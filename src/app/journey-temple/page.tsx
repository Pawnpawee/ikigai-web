"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
import ErrorModal from "../components/modal/ErrorModal";
import { useUser } from "../contexts/UserContext";
import HeartWeighingProcess from "./HeartWeighingProcess";
import TempleArrival from "./TempleArrival";

export default function JourneyTemplePage() {
  const router = useRouter();
  const { userId, isLoading } = useUser();
  const [showTempleScene, setShowTempleScene] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //? Check user authentication
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

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

  //? Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <p className="text-white text-xl">กำลังโหลด...</p>
      </div>
    );
  }

  if (!userId) {
    return null;
  }

  return (
    <>
      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="ขออภัย"
        message={errorMessage}
      />

      {/* Scene 10: Temple Arrival */}
      {showTempleScene && (
        <TempleArrival onStartCeremony={handleStartCeremony} />
      )}

      {/* Scene 11: Heart Weighing Process */}
      <HeartWeighingProcess isProcessing={isProcessing} />
    </>
  );
}
