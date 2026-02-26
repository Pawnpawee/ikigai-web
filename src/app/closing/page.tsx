"use client";

import Closing from "./Closing";

//? information: หน้า Closing - ฉากปิดท้ายหลังจากเห็นผล Ikigai
//? ผู้เล่นจะเห็นข้อความสะท้อนความหมายของ Ikigai และเลือกเล่นอีกครั้งหรือกลับหน้าหลัก
export default function ClosingPageRoute() {
  return (
    <main className="relative w-screen overflow-x-hidden bg-black">
      <Closing />
    </main>
  );
}
