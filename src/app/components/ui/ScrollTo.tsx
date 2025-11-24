"use client";
import React from "react";
import { Coolshape } from "coolshapes-react";
import { HiArrowDown } from "react-icons/hi";
import { motion, MotionValue } from "framer-motion";

interface ScrollToProps {
  opacity: MotionValue<number>;
}

export default function ScrollTo({ opacity }: ScrollToProps) {
  return (
    <motion.div
      className="box-border flex flex-col gap-2 items-center justify-center px-8 lg:px-14 py-0 fixed bottom-[env(safe-area-inset-bottom)] z-50 w-screen h-[100px]"
      style={{ opacity }} 
    >
      <div className="flex flex-col gap-2 items-center animate-fade-loop"> 
        <div className="flex gap-2 items-center relative shrink-0">
          <Coolshape type="star" index={7} size={20} noise={true} />
          <p className="typo-p-md text-white">
            scroll to continue
          </p>
          <Coolshape type="star" index={7} size={20} noise={true} />
        </div>

        {/* ⭐ ใช้ CSS Animation แทน animate prop */}
        <div className="animate-bounce-slow">
          <HiArrowDown size={30} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}