"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import Cover from "@/app/components/reusable/Cover";
import { COVER_SESSION1_ITEMS } from "@/app/data/cover_session1.data";

export default function SessionLovePage() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });


  return (
    <div ref={ref} className="w-full h-[200vh] relative bg-black">
      <Cover
        scrollYProgress={scrollYProgress}
        items={COVER_SESSION1_ITEMS}
        sessionText="session 1"
      />
    </div>
  );
}
