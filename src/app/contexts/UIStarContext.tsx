"use client";

import React, { createContext, useContext, useState } from "react";

interface UIContextType {
  showStars: boolean;
  setShowStars: (show: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIStarProvider = ({ children }: { children: React.ReactNode }) => {
  const [showStars, setShowStars] = useState(false);

  return (
    <UIContext.Provider value={{ showStars, setShowStars }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
