"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/appConfig";
import ErrorModal from "../components/modal/ErrorModal";
import { useUser } from "../contexts/UserContext";
import PaidWork, { type PaidData } from "./PaidWork";

export default function PaidSessionPage() {
  const router = useRouter();
  const { userId, isLoading } = useUser();
  const [showErrorModal, setShowErrorModal] = useState(false);

  //? Check user authentication
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

  //? Submit paid data to API
  const handlePaidSubmit = async (data: PaidData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/progress/paid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          everPaidAnswer: data.everPaidAnswer,
          selectedJobCards: data.selectedJobCards,
          monetizableExperience: data.monetizableExperience,
        }),
      });

      if (!response.ok) {
        setShowErrorModal(true);
        return;
      }

      //? Navigate to home or next session
      router.push("/journey-temple");
    } catch (error) {
      console.error("Error submitting paid data:", error);
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

      <PaidWork onSubmit={handlePaidSubmit} />
    </>
  );
}
