// hooks/useDeviceCheck.ts
"use client";

import { useEffect, useState } from "react";

export function useDeviceCheck() {
  const [isInvalidOrientation, setIsInvalidOrientation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const landscapeQuery = window.matchMedia("(orientation: landscape)");

    const handleDeviceChange = () => {
      const isTouch = touchQuery.matches;
      const isLand = landscapeQuery.matches;

      setIsMobile(isTouch);

      //? Logic: เป็น Touch Screen + แนวนอน = ห้าม
      if (isTouch && isLand) {
        setIsInvalidOrientation(true);
      } else {
        setIsInvalidOrientation(false);
      }
    };

    handleDeviceChange();

    touchQuery.addEventListener("change", handleDeviceChange);
    landscapeQuery.addEventListener("change", handleDeviceChange);

    return () => {
      touchQuery.removeEventListener("change", handleDeviceChange);
      landscapeQuery.removeEventListener("change", handleDeviceChange);
    };
  }, []);

  return { isInvalidOrientation, isMobile };
}
