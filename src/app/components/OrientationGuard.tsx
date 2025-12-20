// components/OrientationGuard.tsx
"use client";

import { AnimatePresence, m } from "framer-motion";
import { useDevice } from "@/app/contexts/DeviceContext";

export default function OrientationGuard() {
  const { isInvalidOrientation } = useDevice();

  return (
    <AnimatePresence>
      {isInvalidOrientation && (
        <m.div className="fixed inset-0 z-99 bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          {/* Icon หมุนจอ */}
          <div className="text-6xl mb-6 animate-pulse">📱🔄</div>

          <h2 className="text-3xl font-bold mb-4">Please Rotate Device</h2>
          <p className="text-gray-400 text-lg max-w-md">
            This website is optimized for Portrait mode on mobile & tablet
            devices.
            <br />
            <span className="text-sm mt-2 block opacity-70">
              (Desktop users can browse in Landscape as usual)
            </span>
          </p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
