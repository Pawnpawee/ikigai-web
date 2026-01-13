"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import GradientButton from "@/app/components/button/GradientButton";
import IkigaiCircle from "@/app/components/reusable/IkigaiCircle";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { SCENE_INTODARK_4_ITEMS } from "@/app/data/scene_intoDark_4";
import { useDeviceCheck } from "@/app/hooks/useDeviceCheck";

interface SubmitProps {
  scrollYProgress: MotionValue<number>;
  isLoading: boolean;
  handleSubmit: () => void;
}

export default function IntoDarkSubmit({
  scrollYProgress,
  isLoading,
  handleSubmit,
}: SubmitProps) {
  const { isMobile } = useDeviceCheck();

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.666, 0.668, 1.0],
    [-1, -1, 10, 10]
  );

  // ชุด 1: Cat animation (0.667-0.676)

  const bgOpacity = useTransform(scrollYProgress, [0.69, 0.72], [0, 1]);

  const catOpacity = useTransform(scrollYProgress, [0.667, 0.676], [0, 1]);
  const catY = useTransform(scrollYProgress, [0.667, 0.676], [50, 0]);

  // ชุด 2: Cloud animation (0.676-0.69)
  const cloudOpacity = useTransform(scrollYProgress, [0.676, 0.69], [0, 1]);

  // ชุด 3: Ikigai Circle (0.676-0.73)
  const circle1_rotate = useTransform(
    scrollYProgress,
    [0.676, 0.73],
    [0, -180]
  ); // Love - Top
  const circle2_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, 90]); // Skill - Left
  const circle3_rotate = useTransform(scrollYProgress, [0.676, 0.73], [90, 0]); // Paid - Bottom
  const circle4_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, -90]); // World - Right

  const subText_opacity = useTransform(scrollYProgress, [0.7, 0.73], [0, 1]);
  const subText_y = useTransform(scrollYProgress, [0.7, 0.73], [30, 0]);

  // Text opacity animations - appear sequentially
  const text1_opacity = useTransform(scrollYProgress, [0.67, 0.69], [0, 1]); // "ถ้าเจ้าหาจุด..."
  const text2_opacity = useTransform(scrollYProgress, [0.7, 0.77], [0, 1]); // Description

  const text3_opacity = useTransform(scrollYProgress, [0.77, 0.8], [0, 1]); // "แต่เจ้าไม่ต้องกังวล..."

  const text4_opacity = useTransform(scrollYProgress, [0.8, 0.83], [0, 1]); // "เจ้าอยากจะลองไปตามหา..."

  // Local animation config for IkigaiCircle reuse
  const circleTransition = {
    type: "tween" as const,
    duration: 2,
    ease: "easeInOut" as const,
    delay: 0,
  };
  const circleImgTransition = {
    type: "tween" as const,
    duration: 2,
    ease: "easeInOut" as const,
    delay: 0,
  };

  //? Animation Map - matches animGroup in scene_intoDark_4.data.ts
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: bgOpacity },
      2: { opacity: catOpacity, y: catY },
      3: { opacity: cloudOpacity },
    }),
    [bgOpacity, catOpacity, catY, cloudOpacity]
  );

  const [isTallScreen, setIsTallScreen] = useState(false);

  useEffect(() => {
    //? Logic: ฟังก์ชันสำหรับตรวจสอบความสูงหน้าจอ
    const checkScreenHeight = () => {
      // เช็คว่ามีความสูงมากกว่า 700px หรือไม่
      setIsTallScreen(window.innerHeight > 700);
    };

    // เรียกทำงานทันทีที่ Component mount
    checkScreenHeight();

    // เพิ่ม Event Listener เพื่อตรวจสอบตอน User ย่อ/ขยาย หน้าจอด้วย (Responsive)
    window.addEventListener("resize", checkScreenHeight);

    // Clean up function เพื่อคืน Memory เมื่อ Component ถูกทำลาย
    return () => window.removeEventListener("resize", checkScreenHeight);
  }, []);

  const top = useTransform(
    scrollYProgress,
    [0.667, 0.75, 0.8, 0.85, 1],
    isTallScreen
      ? ["0vh", "-10vh", "-20vh", "-30vh", "-50vh"]
      : ["0vh", "-30vh", "-50vh", "-80vh", "-100vh"]
  );

  return (
    <m.div className="sticky top-0 w-full" style={{ top }}>
      <m.div
        className="flex items-center justify-center bg-black min-h-screen"
        style={{
          zIndex,
        }}
      >
        <SceneLayer
          items={SCENE_INTODARK_4_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 3840" : "1920 / 2160"}
        >
          {/* Cat Lottie with LazyLottie */}
          <m.div
            className="absolute"
            style={{
              width: isMobile ? "75.50%" : "46.96%",
              height: isMobile ? "17.43%" : "34.27%",
              left: isMobile ? undefined : "5.66%",
              right: isMobile ? "2.93%" : undefined,
              bottom: isMobile ? "4.18%" : "0.98%",
              y: catY,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene5/04/s5-4-cat-starline.json"
              className="w-full h-full"
              loop
              playTrigger={catOpacity}
            />
          </m.div>

          <div className="flex flex-col px-5 xl:px-24 py-20 portrait:md:py-40 portrait:lg:py-60 portrait:md:gap-12 portrait:lg:gap-50 h-full xl:gap-24">
            {/* SECTION 1: Description with Circle Ikigai */}
            <div className="flex flex-col items-center gap-4 self-stretch portrait:md:gap-12">
              <m.div
                className="text-base md:text-3xl leading-relaxed text-center text-slate-100"
                style={{ opacity: text1_opacity }}
              >
                <MysteriousText
                  text={
                    isMobile
                      ? `ถ้าเจ้าหาจุดที่ทั้งสี่สายมาบรรจบกันได้… \n จะเกิดเป็น`
                      : `ถ้าเจ้าหาจุดที่ทั้งสี่สายมาบรรจบกันได้… จะเกิดเป็น`
                  }
                  scrollYProgress={scrollYProgress}
                  startProgress={0.67}
                  endProgress={0.69}
                />
              </m.div>

              {/* Circle Ikigai with 4 colored circles (reused IkigaiCircle component) */}
              <div className="w-[400px] md:w-[735px] h-[400px] md:h-[735px]  flex flex-col items-center justify-center relative">
                {/* World Circle - Top Right */}
                <IkigaiCircle
                  className="scale-50 md:scale-80 lg:scale-100"
                  imageSrc="/assets/Scene/Hero/world-circle.webp"
                  iconSrc="/assets/Icon/world.webp"
                  text={"สิ่งที่\nโลกต้องการ"}
                  rotateValue={circle4_rotate}
                  initialAnimation={{
                    initial: { opacity: 0, rotate: 0, x: 350 },
                    animate: { opacity: 1, rotate: -90 },
                  }}
                  shouldAnimate={true}
                  opacity={bgOpacity}
                  tooltipRotate={90}
                  circleImgTransition={circleImgTransition}
                  transition={circleTransition}
                />

                {/* Paid Circle - Bottom */}
                <IkigaiCircle
                  className="scale-50 md:scale-80 lg:scale-100"
                  imageSrc="/assets/Scene/Hero/paid-circle.webp"
                  iconSrc="/assets/Icon/paid.webp"
                  text="สิ่งที่ทำให้เกิดรายได้"
                  rotateValue={circle3_rotate}
                  initialAnimation={{
                    initial: { opacity: 0, rotate: 90, y: 320 },
                    animate: { opacity: 1, rotate: 0 },
                  }}
                  shouldAnimate={true}
                  opacity={bgOpacity}
                  tooltipRotate={0}
                  circleImgTransition={circleImgTransition}
                  transition={circleTransition}
                />

                {/* Skill Circle - Left */}
                <IkigaiCircle
                  className="scale-50 md:scale-80 lg:scale-100"
                  imageSrc="/assets/Scene/Hero/skill-circle.webp"
                  iconSrc="/assets/Icon/skill.webp"
                  text={"สิ่งที่\nเราถนัด"}
                  rotateValue={circle2_rotate}
                  initialAnimation={{
                    initial: { opacity: 0, rotate: 0, x: -350 },
                    animate: { opacity: 1, rotate: 90 },
                  }}
                  shouldAnimate={true}
                  opacity={bgOpacity}
                  tooltipRotate={-90}
                  circleImgTransition={circleImgTransition}
                  transition={circleTransition}
                />

                {/* Love Circle - Top */}
                <IkigaiCircle
                  className="scale-50 md:scale-80 lg:scale-100"
                  imageSrc="/assets/Scene/Hero/love-circle.webp"
                  iconSrc="/assets/Icon/love.webp"
                  text="สิ่งที่เรารัก"
                  rotateValue={circle1_rotate}
                  initialAnimation={{
                    initial: { opacity: 0, rotate: 0, y: -320 },
                    animate: { opacity: 1, rotate: -180 },
                  }}
                  shouldAnimate={true}
                  opacity={bgOpacity}
                  tooltipRotate={180}
                  circleImgTransition={circleImgTransition}
                  transition={circleTransition}
                />

                {/* Intersect Text - Center labels */}
                <m.div
                  className="text-base md:text-base leading-relaxed text-center flex flex-col justify-between items-center w-[45%] h-[35%]"
                  style={{ opacity: subText_opacity, y: subText_y }}
                >
                  <div className="text-xs md:text-base leading-relaxed text-center flex justify-between w-full">
                    <div className="text-white relative">
                      <MysteriousText
                        text={`แรงผลักดัน\n(Passion)`}
                        scrollYProgress={scrollYProgress}
                        startProgress={0.7}
                        endProgress={0.73}
                      />
                    </div>
                    <div className="text-white relative">
                      <MysteriousText
                        text={`หน้าที่\n(Mission)`}
                        scrollYProgress={scrollYProgress}
                        startProgress={0.7}
                        endProgress={0.73}
                      />
                    </div>
                  </div>
                  <div className="text-xs md:text-base text-center leading-relaxed  flex justify-between w-full">
                    <div className="text-white relative">
                      <MysteriousText
                        text={`ทักษะวิชาชีพ\n(Vocation)`}
                        scrollYProgress={scrollYProgress}
                        startProgress={0.7}
                        endProgress={0.73}
                      />
                    </div>
                    <div className="text-white relative">
                      <MysteriousText
                        text={`อาชีพ\n(Profession)`}
                        scrollYProgress={scrollYProgress}
                        startProgress={0.7}
                        endProgress={0.73}
                      />
                    </div>
                  </div>
                </m.div>
              </div>

              {/* Long description text */}
              <div className="text-sm md:text-3xl leading-relaxed text-center text-slate-100 w-full">
                <m.div className="mb-0" style={{ opacity: text2_opacity }}>
                  <MysteriousText
                    text={
                      isMobile
                        ? `พื้นที่ของ "ความหมาย" ในชีวิต \n และงานของแต่ละบุคคล ใช้เพื่อเตรียมความพร้อม \n และส่งเสริมการปรับตัวเข้าสู่สังคมการทำงาน \n หากได้ศึกษาหรือเข้าใจอิคิไก ก่อนที่จะเลือกเรียน\nหรือเลือกประกอบอาชีพก็จะมีประโยชน์มากยิ่งขึ้น\nและอาจพาเจ้า ออกจากความมัวมืดในคืนนี้ได้`
                        : `พื้นที่ของ "ความหมาย" ในชีวิตและงานของแต่ละบุคคล \n ใช้เพื่อเตรียมความพร้อมและส่งเสริมการปรับตัวเข้าสู่สังคมการทำงาน \n หากได้ศึกษาหรือเข้าใจอิคิไก ก่อนที่จะเลือกเรียนหรือเลือกประกอบอาชีพ\n ก็จะมีประโยชน์มากยิ่งขึ้น และอาจพาเจ้าออกจากความมัวมืดในคืนนี้ได้`
                    }
                    scrollYProgress={scrollYProgress}
                    startProgress={0.7}
                    endProgress={0.8}
                  />
                </m.div>
              </div>
            </div>

            {/* SECTION 2: Submit Cat with Text */}
            <div className="flex justify-end items-center gap-44 self-stretch py-10 md:py-44 portrait:flex-col portrait:flex-[1_0_0] portrait:gap-24 portrait:justify-start">
              {/* Text Section */}
              <div className="flex flex-col items-start gap-14 portrait:md:gap-32 portrait:lg:gap-50">
                <div className="text-base md:text-3xl leading-relaxed  text-center text-slate-100 w-full">
                  <m.div className="mb-0" style={{ opacity: text3_opacity }}>
                    <MysteriousText
                      text={
                        isMobile
                          ? `แต่เจ้าไม่ต้องกังวลไป\nการที่เจ้ายังไม่ค้นพบตัวเองตอนนี้ \n ไม่ใช่เรื่องที่แปลกประหลาด`
                          : `แต่เจ้าไม่ต้องกังวลไปการที่เจ้ายัง ไม่ค้นพบตัวเองตอนนี้ \n ไม่ใช่เรื่องที่แปลกประหลาด`
                      }
                      scrollYProgress={scrollYProgress}
                      startProgress={0.78}
                      endProgress={0.83}
                    />
                  </m.div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center justify-between w-full gap-5 xl:gap-10 portrait:md:gap-16 portrait:lg:gap-30">
                  <m.div
                    className="text-base md:text-3xl leading-relaxed text-center text-slate-100 w-full"
                    style={{ opacity: text4_opacity }}
                  >
                    <MysteriousText
                      text={`เจ้าอยากจะลองไปตามหาอิคิไก \n ของเจ้าดูบ้างไหมล่ะ`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.83}
                      endProgress={0.86}
                    />
                  </m.div>

                  <GradientButton
                    text={isLoading ? "กำลังโหลด..." : "พยักหน้า"}
                    isSelected={!isLoading}
                    onClick={handleSubmit}
                    variant="white"
                  />
                </div>
              </div>
            </div>
          </div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
