"use client";

import About from "./About";

//? Information: หน้า About - เข้าถึงจาก MenuModal ลิงก์ "/about"
//? แสดงข้อมูลทีมผู้พัฒนา (อาจารย์ที่ปรึกษา, Developer, Designer)
export default function AboutPageRoute() {
  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden overflow-y-auto caret-transparent bg-[linear-gradient(180deg,#09345b_0%,#083054_5%,#062137_29%,#051622_54%,#041015_77%,#040e11_100%)]">
      <About />
    </main>
  );
}
