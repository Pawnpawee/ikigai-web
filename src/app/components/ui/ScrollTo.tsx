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
      <motion.div
        className="flex flex-col gap-2 items-center"
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          times: [0, 0.5, 0.75, 1],
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut",
        }}
      >
        <div className="flex gap-2 items-center relative shrink-0">
          <Coolshape type="star" index={7} size={20} noise={true} />
          <p className="typo-p-md text-white">scroll to continue</p>
          <Coolshape type="star" index={7} size={20} noise={true} />
        </div>

        <motion.div
          animate={{ y: [-20, 0, 0, 20], opacity: [0, 1, 1, 0] }}
          transition={{
            times: [0, 0.2, 0.8, 1],
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 2,
            ease: "easeOut",
          }}
        >
          <HiArrowDown size={30} className="text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
