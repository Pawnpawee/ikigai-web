import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
import { getImgPath } from "@/utils/cloudinaryUtils";
import { saveSessionResult } from "@/utils/storage";

export const useIkigaiProcess = () => {
  const [targetProgress, setTargetProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  const [statusText, setStatusText] = useState("");
  const [statusIcon, setStatusIcon] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //? Mid-phase (40 -> 50 -> 60) timer control
  const isMidPhaseStartedRef = useRef(false);
  const midPhaseTimer1Ref = useRef<NodeJS.Timeout | null>(null);
  const midPhaseTimer2Ref = useRef<NodeJS.Timeout | null>(null);

  const clearMidPhaseTimers = useCallback(() => {
    if (midPhaseTimer1Ref.current) {
      clearTimeout(midPhaseTimer1Ref.current);
      midPhaseTimer1Ref.current = null;
    }
    if (midPhaseTimer2Ref.current) {
      clearTimeout(midPhaseTimer2Ref.current);
      midPhaseTimer2Ref.current = null;
    }
  }, []);

  // 🌟 1. Effect สำหรับช่วงปกติ (วิ่งเนียนๆ ทีละ 1%)
  useEffect(() => {
    // 🛑 บล็อกไว้: ถ้า Backend ส่งเลข 40 มา เราจะหยุดการบวกทีละ 1 ทันที
    // เพื่อปล่อยให้ Effect ตัวที่ 2 (สไลด์โชว์) จัดการตัวเลขแทน
    if (targetProgress >= 40 && targetProgress < 80) return;

    if (displayProgress < targetProgress) {
      const timer = setInterval(() => {
        setDisplayProgress((prev) => {
          if (prev < targetProgress) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [displayProgress, targetProgress]);

  // 🌟 2. Effect เปลี่ยนข้อความและเลขสถานะ
  useEffect(() => {
    if (targetProgress >= 100) {
      clearMidPhaseTimers();
      isMidPhaseStartedRef.current = false;
      setStatusText("ใกล้เสร็จแล้ว กำลังบันทึกผลลัพธ์...");
      setStatusIcon(null);
    } else if (targetProgress >= 80) {
      clearMidPhaseTimers();
      isMidPhaseStartedRef.current = false;
      setStatusText('กำลังวิเคราะห์ "อิคิไก" ของคุณ...');
      setStatusIcon(null);
    } else if (targetProgress >= 40) {
      //? เริ่ม phase นี้แค่ครั้งเดียวต่อรอบ process เพื่อกันการรีเซ็ตจาก SSE ช่วง 40-79
      if (!isMidPhaseStartedRef.current) {
        isMidPhaseStartedRef.current = true;
        clearMidPhaseTimers();

        // แสดง 40% ทันที
        setStatusText("กำลังวิเคราะห์สิ่งที่คุณถนัด...");
        setStatusIcon({ src: getImgPath("Icon/skill.webp"), alt: "Skill" });
        setDisplayProgress(40);

        // ผ่านไป 10 วิ -> 50%
        midPhaseTimer1Ref.current = setTimeout(() => {
          setStatusText("กำลังวิเคราะห์สิ่งที่โลกต้องการ...");
          setStatusIcon({ src: getImgPath("Icon/world.webp"), alt: "World" });
          setDisplayProgress(50);

          // ผ่านไปอีก 10 วิ -> 60% แล้วค้างจนกว่า targetProgress >= 80
          midPhaseTimer2Ref.current = setTimeout(() => {
            setStatusText("กำลังวิเคราะห์สิ่งที่คุณสามารถสร้างรายได้ได้...");
            setStatusIcon({ src: getImgPath("Icon/paid.webp"), alt: "Paid" });
            setDisplayProgress(60);
          }, 10000);
        }, 10000);
      }
    } else if (targetProgress >= 20) {
      clearMidPhaseTimers();
      isMidPhaseStartedRef.current = false;
      setStatusText("กำลังวิเคราะห์สิ่งที่คุณรัก...");
      setStatusIcon({ src: getImgPath("Icon/love.webp"), alt: "Love" });
    } else if (targetProgress > 0) {
      clearMidPhaseTimers();
      isMidPhaseStartedRef.current = false;
      setStatusText("กำลังเตรียมข้อมูล...");
      setStatusIcon(null);
    } else {
      clearMidPhaseTimers();
      isMidPhaseStartedRef.current = false;
      setStatusText("กำลังอัญเชิญดวงดาว...");
      setStatusIcon(null);
    }
  }, [targetProgress, clearMidPhaseTimers]);

  //? cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearMidPhaseTimers();
    };
  }, [clearMidPhaseTimers]);

  const startProcess = useCallback(
    async (userId: string) => {
      setIsProcessing(true);
      setErrorMsg("");
      setTargetProgress(0);
      setDisplayProgress(0); // รีเซ็ตหลอดกลับเป็น 0
      setStatusIcon(null);
      isMidPhaseStartedRef.current = false;
      clearMidPhaseTimers();

      let eventSource: EventSource | null = null;

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/ikigai/generate/${userId}`,
          {
            method: "POST",
          },
        );
        if (!res.ok) throw new Error("Failed to start process");

        const data = await res.json();
        const processId = data.processId;
        sessionStorage.setItem("ikigaiProcessId", processId);

        eventSource = new EventSource(
          `${API_BASE_URL}/api/ikigai/stream/${processId}`,
        );

        eventSource.onmessage = (event) => {
          const sseData = JSON.parse(event.data);

          if (sseData.progress === -1) {
            setErrorMsg(`เกิดข้อผิดพลาด: ${sseData.error}`);
            setIsProcessing(false);
            eventSource?.close();
            return;
          }

          // ⭐ รับเลขมา แต่ใส่ไว้ใน Target แล้วให้ Effect ข้างบนค่อยๆ วิ่งตามไปเอง
          setTargetProgress(sseData.progress);

          if (sseData.progress === 100) {
            saveSessionResult(sseData.result);
            eventSource?.close();
          }
        };

        eventSource.onerror = (err) => {
          console.error("SSE Error:", err);
          setErrorMsg(
            "การเชื่อมต่อขาดหาย ระบบกำลังพยายามทำงานต่อเบื้องหลัง...",
          );
          eventSource?.close();
        };
      } catch (error: unknown) {
        console.error(error);
        setErrorMsg("ไม่สามารถเริ่มการประมวลผลได้ กรุณาลองใหม่");
        setIsProcessing(false);
      }

      return () => {
        if (eventSource) eventSource.close();
      };
    },
    [clearMidPhaseTimers],
  );

  // ⭐ ส่ง displayProgress กลับไปให้ Component เพื่อให้เลข/หลอด ค่อยๆ วิ่ง
  return {
    progress: displayProgress,
    statusText,
    statusIcon,
    isProcessing,
    errorMsg,
    startProcess,
  };
};
