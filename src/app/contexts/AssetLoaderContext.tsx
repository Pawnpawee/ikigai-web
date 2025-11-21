"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAssetUrl, ASSETS_TO_PRELOAD } from "@/utils/assets";

const AssetLoaderContext = createContext({
  isLoading: true,
  progress: 0,
});

export const useAssetLoader = () => useContext(AssetLoaderContext);

export const AssetLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // ถ้าไม่มีรายการให้โหลด ก็ปิดเลย
    if (ASSETS_TO_PRELOAD.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const total = ASSETS_TO_PRELOAD.length;

    const handleLoad = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / total) * 100);
      setProgress(percent);

      // เมื่อโหลดครบทุกไฟล์
      if (loadedCount >= total) {
        // หน่วงเวลานิดนึงให้ user เห็นว่าครบ 100% แล้วค่อยปิด
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    // วนลูปสั่ง Browser ให้ดาวน์โหลดไฟล์ทั้งหมดมาเก็บใน Cache
    ASSETS_TO_PRELOAD.forEach((path) => {
      const img = new Image();
      img.src = getAssetUrl(path);
      img.onload = handleLoad;
      img.onerror = handleLoad; // ถ้า error ก็นับว่าเสร็จ กันค้าง
    });
  }, []);

  return (
    <AssetLoaderContext.Provider value={{ isLoading, progress }}>
      {children}
    </AssetLoaderContext.Provider>
  );
};