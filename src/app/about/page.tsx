"use client";

import About from "./About";

//? Information: หน้า About - เข้าถึงจาก MenuModal ลิงก์ "/about"
//? แสดงข้อมูลทีมผู้พัฒนา (อาจารย์ที่ปรึกษา, Developer, Designer)
export default function AboutPageRoute() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#1b1f21] caret-transparent">
      <About />
    </main>
  );
}
