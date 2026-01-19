"use client";

import type React from "react";
import { createContext, useContext, useMemo, useState } from "react";

interface UIContextType {
  showStars: boolean;
  setShowStars: (show: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIStarProvider = ({ children }: { children: React.ReactNode }) => {
  const [showStars, setShowStars] = useState(true);

  //? Memoize Context Value เพื่อป้องกัน re-render ที่ไม่จำเป็น
  const value = useMemo(() => ({ showStars, setShowStars }), [showStars]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
