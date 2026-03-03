"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import { getSessionResult } from "@/utils/storage";
import ErrorModal from "../components/modal/ErrorModal";
import LoadingScreen from "../components/reusable/LoadingScreen";
import { useAudio } from "../contexts/AudioContext";
import { useUser } from "../contexts/UserContext";
import type { IkigaiAnalysis, IkigaiScores } from "../types/ikigai.types";
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
  scores?: IkigaiScoresDto;
  playersInSessionPct?: number;
  maxSessionPercentage?: string;
}

//? API scores มาในรูปแบบ { loveScore: { percentage }, goodAtScore: { percentage }, ... }
interface ScoreEntry {
  rawScore: number;
  percentage: number;
}

interface IkigaiScoresDto {
  loveScore?: ScoreEntry;
  goodAtScore?: ScoreEntry;
  worldNeedsScore?: ScoreEntry;
  paidForScore?: ScoreEntry;
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

//? แปลง scores จาก API format → IkigaiScores (percentage ของ 4 ด้านหลัก)
const transformDtoScores = (scores?: IkigaiScoresDto): IkigaiScores => {
  if (!scores) return {};
  const result: IkigaiScores = {};

  if (scores.loveScore) {
    result.what_you_love = Math.round(scores.loveScore.percentage);
  }
  if (scores.goodAtScore) {
    result.what_you_good_at = Math.round(scores.goodAtScore.percentage);
  }
  if (scores.worldNeedsScore) {
    result.what_the_world_need = Math.round(scores.worldNeedsScore.percentage);
  }
  if (scores.paidForScore) {
    result.what_you_can_be_paid_for = Math.round(
      scores.paidForScore.percentage,
    );
  }

  return result;
};

// ---------------------------------------------------------------------------
//? MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function IkigaiResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId, playerName, isLoading: userLoading } = useUser();
  const { setBgMusic } = useAudio();
  const [ikigaiAnalysis, setIkigaiAnalysis] = useState<IkigaiAnalysis | null>(
    null,
  );
  const [ikigaiScores, setIkigaiScores] = useState<IkigaiScores | undefined>(
    undefined,
  );
  const [playersInSessionPct, setPlayersInSessionPct] = useState<number>(0);
  const [maxSessionPercentage, setMaxSessionPercentage] = useState<
    string | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/12/magical-sparkling.mp3"));
  }, [setBgMusic]);

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
          if (cachedResult.scores) {
            setIkigaiScores(cachedResult.scores);
          }
          if (cachedResult.playersInSessionPct != null) {
            setPlayersInSessionPct(cachedResult.playersInSessionPct);
          }
          if (cachedResult.maxSessionPercentage) {
            setMaxSessionPercentage(cachedResult.maxSessionPercentage);
          }
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
          if (data.scores) {
            setIkigaiScores(transformDtoScores(data.scores));
          }
          if (data.playersInSessionPct != null) {
            setPlayersInSessionPct(data.playersInSessionPct);
          }
          if (data.maxSessionPercentage) {
            setMaxSessionPercentage(data.maxSessionPercentage);
          }
        } else if (data.ikigai_analysis) {
          setIkigaiAnalysis(data.ikigai_analysis);
          if (data.scores) {
            setIkigaiScores(transformDtoScores(data.scores));
          }
          if (data.playersInSessionPct != null) {
            setPlayersInSessionPct(data.playersInSessionPct);
          }
          if (data.maxSessionPercentage) {
            setMaxSessionPercentage(data.maxSessionPercentage);
          }
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
  }, [userId, userLoading, searchParams]);

  const handleErrorClose = () => {
    setShowErrorModal(false);
    router.push("/journey-temple");
  };

  // if (userLoading || isLoading) return <LoadingScreen isLoading={true} />;
  if (isLoading) return <LoadingScreen isLoading={true} />;
  if (!userId) return null;
  if (!ikigaiAnalysis) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <p className="text-white text-xl">กำลังโหลดผลลัพธ์...</p>
      </div>
    );
  }

  return (
    <div className="bg-result w-screen h-screen">
      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleErrorClose}
        title="เกิดข้อผิดพลาด"
        message={errorMessage}
      />
  
      <IkigaiResultDisplay
        analysis={ikigaiAnalysis}
        scores={ikigaiScores}
        playersInSessionPct={playersInSessionPct}
        maxSessionPercentage={maxSessionPercentage}
        playerName={playerName || undefined}
      />
    </div>
  );
}
