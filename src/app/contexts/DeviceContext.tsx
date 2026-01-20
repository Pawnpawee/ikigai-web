"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import LoadingScreen from "@/app/components/reusable/LoadingScreen";

// กำหนด Type ของ Context
interface DeviceContextType {
  isMobile: boolean;
  isDesktop: boolean;
  isInvalidOrientation: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isInvalidOrientation, setIsInvalidOrientation] = useState(false);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Logic การเช็ค Device 
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const landscapeQuery = window.matchMedia("(orientation: landscape)");

    const handleDeviceChange = () => {
      const isTouch = touchQuery.matches;
      const isLand = landscapeQuery.matches;

      setIsMobile(isTouch);
      setIsInvalidOrientation(isTouch && isLand);

      // เช็คเสร็จแล้ว ให้บอกว่า Initialized เรียบร้อย
      setIsInitialized(true);
    };

    // รันครั้งแรก
    handleDeviceChange();

    touchQuery.addEventListener("change", handleDeviceChange);
    landscapeQuery.addEventListener("change", handleDeviceChange);

    return () => {
      touchQuery.removeEventListener("change", handleDeviceChange);
      landscapeQuery.removeEventListener("change", handleDeviceChange);
    };
  }, []);

  // -------------------------------------------------------
  // 🛑 GLOBAL GATE: ถ้ายังเช็คไม่เสร็จ ให้ Return Loading Screen ไปเลย
  // -------------------------------------------------------
  if (!isInitialized) {
    // ตรงนี้คือจุดที่ "บัง" ไม่ให้ App ส่วนที่เหลือถูก Render
    // จนกว่าเราจะรู้ค่า isMobile ที่แน่นอน
    return <LoadingScreen isLoading={true} text="Initializing..." />;
  }

  // ถ้าเช็คเสร็จแล้ว ค่อยปล่อย children (Page ต่างๆ) ให้ทำงาน
  // โดยส่งค่าที่ถูกต้องไปให้ใช้
  return (
    <DeviceContext.Provider
      value={{ isMobile, isDesktop: !isMobile, isInvalidOrientation }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

// Custom Hook สำหรับเรียกใช้ในหน้าต่างๆ (สั้นและง่ายกว่าเดิม)
export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
}
