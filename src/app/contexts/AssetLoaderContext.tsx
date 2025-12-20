"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ASSETS_TO_PRELOAD, getAssetUrl } from "@/utils/assets";

const AssetLoaderContext = createContext({
  isLoading: true,
  progress: 0,
});

export const useAssetLoader = () => useContext(AssetLoaderContext);

export const AssetLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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

      if (loadedCount >= total) {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

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
