import { useState, useEffect } from "react";

export type Orientation = "portrait" | "landscape";

/**
 * Hook สำหรับตรวจสอบ orientation ของหน้าจอ
 * @returns {Orientation} "portrait" หรือ "landscape"
 */
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(() => {
    // เช็ค orientation ตอน initialize (สำหรับ SSR ให้ default เป็น landscape)
    if (typeof window === "undefined") return "landscape";
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
  });

  useEffect(() => {
    const handleResize = () => {
      const newOrientation =
        window.innerHeight > window.innerWidth ? "portrait" : "landscape";
      setOrientation(newOrientation);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return orientation;
}

/**
 * Hook สำหรับตรวจสอบว่าเป็น portrait หรือไม่
 * @returns {boolean} true ถ้าเป็น portrait, false ถ้าเป็น landscape
 */
export function useIsPortrait(): boolean {
  const orientation = useOrientation();
  return orientation === "portrait";
}
