import { useCallback, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
import { saveSessionResult } from "@/utils/storage"; // ⭐ Import ทีนี่

export const useIkigaiProcess = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const startProcess = useCallback(async (userId: string) => {
    setIsProcessing(true);
    setErrorMsg("");
    setProgress(0);
    setStatusText("กำลังอัญเชิญดวงดาว...");

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

        setProgress(sseData.progress);
        setStatusText(sseData.status);

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

  return { progress, statusText, isProcessing, errorMsg, startProcess };
};
