"use client";

import { useMemo } from "react";

import LazyLottie from "@/app/components/reusable/LazyLottie";
import { useDevice } from "@/app/contexts/DeviceContext";
import { SCENE_ABOUT_ITEMS } from "@/app/data/scene_about";

//? Information: หน้า About - แสดงทีมผู้พัฒนาโปรเจค Ikigai
//? Desktop: อาจารย์อยู่กลางบน, Developer ล่างซ้าย, Designer ล่างขวา
//? Mobile: เรียงแนวตั้งจากบนลงล่าง
//? ใช้ Lottie animation แทนรูปภาพ เพื่อให้ตัวละครขยับได้
export default function About() {
  const { isMobile } = useDevice();

  //? เลือก style ตาม Device (Desktop / Mobile)
  const responsiveItems = useMemo(
    () =>
      SCENE_ABOUT_ITEMS.map((item) => ({
        ...item,
        activeStyle: isMobile ? item.mobileStyle : item.style,
      })),
    [isMobile],
  );

  return (
    <div
      className="relative w-full portrait:h-full"
      style={{ aspectRatio: "1920 / 1080" }}
    >
      {/* Title: เกี่ยวกับ */}
      <h1 className="absolute top-[8.74%] portrait:top-[7.86%] left-1/2 -translate-x-1/2 text-xl md:text-3xl text-white z-10">
        เกี่ยวกับ
      </h1>

      {/* Lottie avatars + ชื่อ-ตำแหน่ง ของทีมผู้พัฒนา */}
      {responsiveItems.map((item) => (
        <div
          key={item.id}
          className="absolute flex flex-col items-center"
          style={item.activeStyle}
        >
          {/* Lottie avatar */}
          <LazyLottie
            src={item.src}
            loop
            play
            className="w-full pointer-events-none"
          />

          {/* ชื่อและตำแหน่ง */}
          <div className="flex flex-col items-center gap-[2.35%] w-full text-center text-white">
            <p className="text-base sm:text-lg md:text-2xl md:tracking-[0.48px] whitespace-nowrap">
              {item.name}
            </p>
            <p className="text-xs sm:text-lg md:text-2xl">{item.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
