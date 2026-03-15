import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
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

  //1. Effect สำหรับวิ่งเปอร์เซ็นต์ให้ค่อยๆ ขึ้นตลอดเวลาอย่างเป็นธรรมชาติ
  useEffect(() => {
    // ตั้งเป้าหมายหลอกที่ 80% เพื่อให้เปอร์เซ็นต์ค่อยๆ ขยับขึ้นไม่หยุดนิ่ง แม้ว่า backend จะยังประมวลผลไม่ส่งมา
    const fakeTarget = targetProgress === 100 ? 100 : 80;

    if (displayProgress < fakeTarget) {
      // กำหนดความเร็วในการขยับแต่ละ 1%
      let speed = 500; // ตอนเปอร์เซ็นต์วิ่งนำ backend ไปแล้ว ให้ค่อยๆ เดินช้าๆ คั่นเวลา

      if (displayProgress < targetProgress) {
        speed = 150; // เร่งเครื่องตอนวิ่งตามของจริงให้ทัน
      }

      if (targetProgress >= 80) {
        speed = 40; // โค้งสุดท้ายตอน backend ส่ง 80-100% มาแล้ว -> พุ่งให้จบไวๆ
      }

      const timer = setTimeout(() => {
        setDisplayProgress((prev) => (prev < fakeTarget ? prev + 1 : prev));
      }, speed);

      // คืนค่าฟังก์ชั่นทำความสะอาด
      return () => clearTimeout(timer);
    }
  }, [displayProgress, targetProgress]);

  //2. Effect เปลี่ยนข้อความและเลขสถานะ
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

        // แสดงทันที
        setStatusText("กำลังวิเคราะห์สิ่งที่คุณถนัด...");
        setStatusIcon({ src: "/assets/icons/skill.webp", alt: "Skill" });

        // ผ่านไป 10 วิ
        midPhaseTimer1Ref.current = setTimeout(() => {
          setStatusText("กำลังวิเคราะห์สิ่งที่โลกต้องการ...");
          setStatusIcon({ src: "/assets/icons/world.webp", alt: "World" });

          // ผ่านไปอีก 10 วิ
          midPhaseTimer2Ref.current = setTimeout(() => {
            setStatusText("กำลังวิเคราะห์สิ่งที่คุณสามารถสร้างรายได้ได้...");
            setStatusIcon({ src: "/assets/icons/paid.webp", alt: "Paid" });
          }, 10000);
        }, 10000);
      }
    } else if (targetProgress >= 20) {
      clearMidPhaseTimers();
      isMidPhaseStartedRef.current = false;
      setStatusText("กำลังวิเคราะห์สิ่งที่คุณรัก...");
      setStatusIcon({ src: "/assets/icons/love.webp", alt: "Love" });
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

          //รับเลขมา แต่ใส่ไว้ใน Target แล้วให้ Effect ข้างบนค่อยๆ วิ่งตามไปเอง
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

  //ส่ง displayProgress กลับไปให้ Component เพื่อให้เลข/หลอด ค่อยๆ วิ่ง
  return {
    progress: displayProgress,
    statusText,
    statusIcon,
    isProcessing,
    errorMsg,
    startProcess,
  };
};
