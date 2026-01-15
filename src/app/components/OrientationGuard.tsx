// components/OrientationGuard.tsx
"use client";

import { m } from "framer-motion";
import { useDevice } from "@/app/contexts/DeviceContext";
import LazyLottie from "./reusable/LazyLottie";

export default function OrientationGuard() {
  const { isInvalidOrientation } = useDevice();

  return (
    <>
      {isInvalidOrientation && (
        <m.div className="fixed inset-0 z-101 bg-black text-white flex flex-col items-center justify-center gap-12 xl:gap-25 p-6 w-screen h-screen">
          {/* ข้อความบน */}
          <p className="text-lg md:text-2xl xl:text-4xl text-center text-white leading-normal tracking-wide font-normal">
            กรุณาหมุนหน้าจอเป็นแนวตั้ง
          </p>

          {/* Rotate Phone Animation */}
          <div className="w-30 md:w-50 xl:w-75">
            <LazyLottie
              src="/assets/rotate phone.json"
              className="w-full h-full"
              loop
              play={true}
            />
          </div>

          {/* ข้อความล่าง */}
          <p className="text-lg md:text-2xl xl:text-4xl text-center text-white leading-normal tracking-wide font-normal">
            เพื่อประสบการณ์ที่ดียิ่งขึ้น
          </p>
        </m.div>
      )}
    </>
  );
}
