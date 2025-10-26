"use client";
import { useScroll, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import JobApplication1 from "./JobApplication_1";
import JobApplication2 from "./JobApplication_2";

export default function JobApplication() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative h-[500vh] bg-s1">
      <div
        className="
          sticky 
          w-screen                       
          top-[calc(100vh-112.5vw)]      
          
          lg:w-[85vw]                    
          lg:mx-auto                   
          lg:top-[calc(100vh-95.625vw)]  
          
        "
      >
        <JobApplication1 scrollYProgress={scrollYProgress} />
        <JobApplication2 scrollYProgress={scrollYProgress} />
      </div>
      {/* Light overlay */}
      <div
        className="absolute w-screen inset-0 mix-blend-soft-light pointer-events-none"
        style={{ backgroundColor: "#15237B", opacity: 0.5 }}
      />
    </div>
  );
}
