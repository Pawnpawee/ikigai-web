"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import { useMemo } from "react";
import GradientButton from "@/app/components/button/GradientButton";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { SCENE_INTODARK_3_ITEMS } from "@/app/data/scene_intoDark_3";
import { useDeviceCheck } from "@/app/hooks/useDeviceCheck";

interface HeardProps {
  scrollYProgress: MotionValue<number>;
  hasHeard: boolean | null;
  setHasHeard: (value: boolean) => void;
}

export default function IntoDarkHeard({
  scrollYProgress,
  hasHeard,
  setHasHeard,
}: HeardProps) {
  const { isMobile } = useDeviceCheck();

  const zIndex = useTransform(
    scrollYProgress,
    [0.497, 0.5, 0.666, 0.667],
    [-1, 10, 10, -1]
  );

  // ชุด 2 (70-100vh): 0.539-0.556 - ปุ่ม เคยไม่เคย + Little Star 2
  const set2Opacity = useTransform(
    scrollYProgress,
    [0.539, 0.548, 0.556],
    [0, 1, 1]
  );
  const set2Y = useTransform(scrollYProgress, [0.539, 0.548], [20, 0]);

  // ชุด 3 (100-200vh): 0.556-0.611 - สายหนึ่ง... + Little Star 1
  const set3Opacity = useTransform(
    scrollYProgress,
    [0.556, 0.564, 0.611],
    [0, 1, 1]
  );
  const set3Y = useTransform(scrollYProgress, [0.556, 0.564], [30, 0]);

  //? Animation Map - matches animGroup in scene_intoDark_3.data.ts
  const animations: AnimationMap = useMemo(
    () => ({
      2: { opacity: set2Opacity, y: set2Y },
      3: { opacity: set3Opacity, y: set3Y },
    }),
    [set2Opacity, set2Y, set3Opacity, set3Y]
  );

  return (
    <div className="sticky top-0 h-screen w-screen flex justify-center items-center overflow-hidden bg-s5-3">
      <m.div
        className="relative flex justify-start items-center w-screen portrait:w-auto h-full"
        style={{ zIndex }}
      >
        <SceneLayer
          items={SCENE_INTODARK_3_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* Lottie elements with special animations */}

          {/* Main Cat - Set 5 */}
          <m.div
            className="absolute -z-1"
            style={{
              width: isMobile ? "60.95%" : "34.28%",
              height: isMobile ? "34.44%" : "61.24%",
              right: isMobile ? "-8.45%" : "2.98%",
              bottom: isMobile ? "11.44%" : "12.10%",
              opacity: set3Opacity,
              y: set3Y,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene5/03/s5-3-cat-starline.json"
              className="w-full h-full"
              loop
              playTrigger={set3Opacity}
            />
          </m.div>

          {/* Text Container */}
          <div
            className={`flex flex-col items-center h-full w-full ${
              isMobile ? "gap-0" : "gap-10 py-15"
            }`}
          >
            {/* Set 1: Main Text + Buttons */}
            <m.div className="flex flex-col items-center w-full gap-8 md:gap-10 py-8 md:py-24 px-0 pt-20 pb-10">
              <div
                className={`text-white text-center select-none leading-normal text-xl md:text-3xl ${
                  isMobile ? " px-0" : "w-full"
                }`}
              >
                <MysteriousText
                  text={
                    isMobile
                      ? "มนุษย์บางพวก เรียกมันว่า \n อิคิไก… เคยได้ยินมาก่อนไหมล่ะ"
                      : "มนุษย์บางพวก เรียกมันว่า อิคิไก… เคยได้ยินมาก่อนไหมล่ะ"
                  }
                  scrollYProgress={scrollYProgress}
                  startProgress={0.5}
                  endProgress={0.539}
                />
              </div>

              {/* Set 2: Choice Buttons */}
              <m.div
                className={`flex pointer-events-auto ${
                  isMobile ? "gap-5 md:gap-[130px]" : "gap-[130px]"
                }`}
                style={{
                  opacity: set2Opacity,
                }}
              >
                <GradientButton
                  text="เคย"
                  isSelected={hasHeard === true}
                  onClick={() => setHasHeard(true)}
                />
                <GradientButton
                  text="ไม่เคย"
                  isSelected={hasHeard === false}
                  onClick={() => setHasHeard(false)}
                />
              </m.div>
            </m.div>

            {/* Set 3: Four Paths Explanation */}
            <m.div
              className={`text-left  ${
                isMobile ? "px-8 items-stretch" : "px-0 w-full"
              }`}
              style={{
                ...(isMobile ? {} : { paddingLeft: "8.46%" }),
                y: set3Y,
                opacity: set3Opacity,
              }}
            >
              <div className="text-white leading-relaxed select-none text-lg md:text-3xl">
                <div className="mb-2">
                  <MysteriousText
                    text={
                      isMobile
                        ? `— สายหนึ่งคือสิ่งที่ทำให้หัวใจเจ้า \n รู้สึกมีไฟ (What you love)`
                        : `— สายหนึ่งคือสิ่งที่ทำให้หัวใจเจ้ารู้สึกมีไฟ (What you love)`
                    }
                    scrollYProgress={scrollYProgress}
                    startProgress={0.55}
                    endProgress={0.57}
                  />
                </div>

                <div className="mb-2">
                  <MysteriousText
                    text={
                      isMobile
                        ? `— สายหนึ่งคือสิ่งที่เจ้าทำได้ดี \n (What you are good at)`
                        : `— สายหนึ่งคือสิ่งที่เจ้าทำได้ดี (What you are good at)`
                    }
                    scrollYProgress={scrollYProgress}
                    startProgress={0.57}
                    endProgress={0.59}
                  />
                </div>

                <div className="mb-2">
                  <MysteriousText
                    text={
                      isMobile
                        ? `— สายหนึ่งคือสิ่งที่โลกภายนอก \n กำลังรอคอยจากเจ้า`
                        : `— สายหนึ่งคือสิ่งที่โลกภายนอก กำลังรอคอยจากเจ้า`
                    }
                    scrollYProgress={scrollYProgress}
                    startProgress={0.59}
                    endProgress={0.61}
                  />
                </div>
                <div className="mb-2">
                  <MysteriousText
                    text="(What the world needs )"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.61}
                    endProgress={0.63}
                  />
                </div>
                <div className="mb-2">
                  <MysteriousText
                    text={
                      isMobile
                        ? `และอีกสิ่งคือสิ่งที่โลกยอมจ่ายให้ \n (What you can be paid for)`
                        : `— และอีกสิ่งคือสิ่งที่โลกยอมจ่ายให้ \n (What you can be paid for)`
                    }
                    scrollYProgress={scrollYProgress}
                    startProgress={0.63}
                    endProgress={0.65}
                  />
                </div>
              </div>
            </m.div>
          </div>
        </SceneLayer>
      </m.div>
    </div>
  );
}
