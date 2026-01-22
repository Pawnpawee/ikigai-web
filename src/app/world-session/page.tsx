"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
import ErrorModal from "../components/modal/ErrorModal";
import { useUser } from "../contexts/UserContext";
import WorldNeeds, { type WorldData } from "./WorldNeeds";

export default function WorldSessionPage() {
  const router = useRouter();
  const { userId, isLoading } = useUser();
  const [showErrorModal, setShowErrorModal] = useState(false);

  //? Check user authentication
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

  //? Submit world data to API
  const handleWorldSubmit = async (data: WorldData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/progress/world`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          calledUponAnswer: data.calledUponAnswer,
          selectedGifts: data.selectedGifts,
          noManualChoice: data.noManualChoice,
          mismatchChoice: data.mismatchChoice,
          futureValueAnswer: data.futureValueAnswer,
        }),
      });

      if (!response.ok) {
        setShowErrorModal(true);
        return;
      }

      //? Navigate to next session
      router.push("/paid-session");
    } catch (error) {
      console.error("Error submitting world data:", error);
      setShowErrorModal(true);
    }
  };

  return (
    <>
      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="ขออภัย"
        message="ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง"
      />

      <WorldNeeds onSubmit={handleWorldSubmit} />
    </>
  );
}
