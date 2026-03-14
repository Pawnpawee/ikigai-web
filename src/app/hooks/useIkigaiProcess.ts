import { useCallback, useEffect, useState } from "react";
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

  // 🌟 2. Effect เปลี่ยนข้อความและเลข 40->50->60
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (targetProgress >= 100) {
      setStatusText("ใกล้เสร็จแล้ว กำลังบันทึกผลลัพธ์...");
      setStatusIcon(null);
    } else if (targetProgress >= 80) {
      setStatusText('กำลังวิเคราะห์ "อิคิไก" ของคุณ...');
      setStatusIcon(null);
    } else if (targetProgress >= 40) {
      const sequence = [
        {
          text: "กำลังวิเคราะห์สิ่งที่คุณถนัด...",
          icon: { src: getImgPath("Icon/skill.webp"), alt: "Skill" },
          pct: 40,
        },
        {
          text: "กำลังวิเคราะห์สิ่งที่โลกต้องการ...",
          icon: { src: getImgPath("Icon/world.webp"), alt: "World" },
          pct: 50,
        },
        {
          text: "กำลังวิเคราะห์สิ่งที่คุณสามารถสร้างรายได้ได้...",
          icon: { src: getImgPath("Icon/paid.webp"), alt: "Paid" },
          pct: 60,
        },
      ];

      let step = 0;

      // แสดง 40% ทันที
      setStatusText(sequence[0].text);
      setStatusIcon(sequence[0].icon);
      setDisplayProgress(sequence[0].pct);

      timer = setInterval(() => {
        // 🛑 เช็คว่ายังไม่ถึงอันสุดท้าย (60%) ใช่ไหม? ถ้าใช่ก็ไปต่อ
        if (step < sequence.length - 1) {
          step++;
          setStatusText(sequence[step].text);
          setStatusIcon(sequence[step].icon);
          setDisplayProgress(sequence[step].pct);
        } else {
          // 🛑 ถ้าถึง 60% แล้ว (step = 2) ให้ "หยุด" สไลด์โชว์ทันที
          // ไม่ต้องวนกลับไป 40 อีก หลอดจะค้างที่ 60% สวยๆ เพื่อรอ Backend ส่ง 80 มา
          clearInterval(timer);
        }
      }, 2500); // หน่วงเวลา 2.5 วินาทีต่อการเปลี่ยน 1 ครั้ง
    } else if (targetProgress >= 20) {
      setStatusText("กำลังวิเคราะห์สิ่งที่คุณรัก...");
      setStatusIcon({ src: getImgPath("Icon/love.webp"), alt: "Love" });
    } else if (targetProgress > 0) {
      setStatusText("กำลังเตรียมข้อมูล...");
      setStatusIcon(null);
    } else {
      setStatusText("กำลังอัญเชิญดวงดาว...");
      setStatusIcon(null);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [targetProgress]);

  const startProcess = useCallback(async (userId: string) => {
    setIsProcessing(true);
    setErrorMsg("");
    setTargetProgress(0);
    setDisplayProgress(0); // รีเซ็ตหลอดกลับเป็น 0
    setStatusIcon(null);

    let eventSource: EventSource | null = null;

    try {
      const res = await fetch(`${API_BASE_URL}/api/ikigai/generate/${userId}`, {
        method: "POST",
      });
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
        setErrorMsg("การเชื่อมต่อขาดหาย ระบบกำลังพยายามทำงานต่อเบื้องหลัง...");
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
  }, []);

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
