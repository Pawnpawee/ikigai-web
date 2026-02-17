"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
import { getSessionResult } from "@/utils/storage";
import ErrorModal from "../components/modal/ErrorModal";
import LoadingScreen from "../components/reusable/LoadingScreen";
import { useUser } from "../contexts/UserContext";
import type { IkigaiAnalysis } from "../types/ikigai.types";
import IkigaiResultDisplay from "./IkigaiResultDisplay";

//? 1. Define DTO Interfaces
interface IkigaiSummaryDto {
  componentType: string;
  shortSummary?: string;
  overallSummary: string;
  strengths: string[];
  developmentPoints: string[];
}

interface IkigaiResultDto {
  id: string;
  status: string;
  summaries: IkigaiSummaryDto[];
}

// ---------------------------------------------------------------------------
//? HELPER FUNCTIONS (Move outside component to avoid dependency issues)
// ---------------------------------------------------------------------------

const mapComponentTypeToKey = (
  type: string,
): keyof IkigaiAnalysis | undefined => {
  const normalizedType = type.toLowerCase().replace(/\s+/g, "");

  switch (normalizedType) {
    case "whatyoulove":
      return "what_you_love";
    case "whatyouaregoodat":
    case "whatyougoodat":
      return "what_you_good_at";
    case "whattheworldneeds":
    case "whattheworldneed":
      return "what_the_world_need";
    case "whatyoucanbepaidfor":
      return "what_you_can_be_paid_for";
    case "passion":
      return "passion";
    case "mission":
      return "mission";
    case "profession":
      return "profession";
    case "vocation":
      return "vocation";
    default:
      return undefined;
  }
};

const transformDtoToAnalysis = (dto: IkigaiResultDto): IkigaiAnalysis => {
  // เริ่มต้นด้วย object ว่าง แต่ cast type หลอกไว้ก่อนเพื่อความสะดวก
  const analysis: Partial<IkigaiAnalysis> = {};

  dto.summaries.forEach((summary) => {
    const key = mapComponentTypeToKey(summary.componentType);
    if (key) {
      analysis[key] = {
        short_summary: summary.shortSummary,
        overall_summary: summary.overallSummary,
        strengths: summary.strengths || [],
        development_points: summary.developmentPoints || [],
      };
    }
  });

  return analysis as IkigaiAnalysis;
};

// ---------------------------------------------------------------------------
//? MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function IkigaiResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId, playerName, isLoading: userLoading } = useUser();
  const [ikigaiAnalysis, setIkigaiAnalysis] = useState<IkigaiAnalysis | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //? Check authentication
  useEffect(() => {
    if (!userLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, userLoading, router]);

  //? Fetch Ikigai result
  useEffect(() => {
    const fetchIkigaiResult = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);

        // Step 1: Try SessionStorage
        const cachedResult = getSessionResult();
        if (cachedResult?.ikigai_analysis) {
          console.log("Loading result from sessionStorage");
          setIkigaiAnalysis(cachedResult.ikigai_analysis);
          setIsLoading(false);
          return;
        }

        // Step 2: Fetch API
        const processId = searchParams.get("id");
        const endpoint = `${API_BASE_URL}/api/ikigai/status/${processId}`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Ikigai result");
        }

        const data = await response.json();

        // Step 3: Handle Transformation
        if (data.summaries && Array.isArray(data.summaries)) {
          // เรียกใช้ Helper function ที่อยู่นอก Component ได้เลย โดยไม่ต้องใส่ใน dependency array
          const analysis = transformDtoToAnalysis(data);
          setIkigaiAnalysis(analysis);
        } else if (data.ikigai_analysis) {
          setIkigaiAnalysis(data.ikigai_analysis);
        } else {
          throw new Error("Invalid result format");
        }
      } catch (error) {
        console.error("Error fetching Ikigai result:", error);
        setErrorMessage("ไม่สามารถโหลดผลลัพธ์ได้ กรุณาลองอีกครั้ง");
        setShowErrorModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && !userLoading) {
      fetchIkigaiResult();
    }
  }, [userId, userLoading, searchParams]); // ✅ Safe dependency array

  const handleErrorClose = () => {
    setShowErrorModal(false);
    router.push("/journey-temple");
  };

  if (userLoading || isLoading) return <LoadingScreen isLoading={true} />;
  if (!userId) return null;
  if (!ikigaiAnalysis) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <p className="text-white text-xl">กำลังโหลดผลลัพธ์...</p>
      </div>
    );
  }

  return (
    <>
      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleErrorClose}
        title="เกิดข้อผิดพลาด"
        message={errorMessage}
      />

      <IkigaiResultDisplay
        analysis={ikigaiAnalysis}
        playerName={playerName || undefined}
      />
    </>
  );
}
