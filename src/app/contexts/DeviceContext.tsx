"use client";
import React, { createContext, useContext } from "react";
import { useDeviceCheck } from "../hooks/useDeviceCheck";

const DeviceContext = createContext<ReturnType<typeof useDeviceCheck> | null>(
  null
);

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const deviceData = useDeviceCheck();

  return (
    <DeviceContext.Provider value={deviceData}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) throw new Error("useDevice must be used within DeviceProvider");
  return context;
};
