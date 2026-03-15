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
import { useDevice } from "@/app/contexts/DeviceContext";
import { SCENE_INTODARK_4_ITEMS } from "@/app/data/scene_intoDark_4";
import { getImgPath, getJsonUrl } from "@/utils/cloudinaryUtils";

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
  const { isMobile } = useDevice();

  const [scrollOffsets, setScrollOffsets] = useState({
    mid: "0vh",
    final: "0vh",
  });

  useEffect(() => {
    const calculateScroll = () => {
      // คำนวณสัดส่วนความสูงของ SceneLayer (อิงตาม containerAspectRatio)
      const aspectMultiplier = isMobile ? 3840 / 1080 : 2160 / 1920;

      // คำนวณว่า Content สูงกี่ px
      const containerHeight = window.innerWidth * aspectMultiplier;

      // หาความยาวส่วนที่ล้นหน้าจอลงไปข้างล่าง
      const overflowPx = Math.max(0, containerHeight - window.innerHeight);

      // แปลง px กลับมาเป็นหน่วย vh ที่พอดีเป๊ะกับขอบล่าง
      const finalVh = -(overflowPx / window.innerHeight) * 100;

      setScrollOffsets({
        mid: `${finalVh / 2}vh`, // จุดกึ่งกลาง
        final: `${finalVh}vh`, // จุดสิ้นสุด
      });
    };

    calculateScroll();
    window.addEventListener("resize", calculateScroll);
    return () => window.removeEventListener("resize", calculateScroll);
  }, [isMobile]);

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.666, 0.668, 1.0],
    [-1, -1, 10, 10],
  );

  // ชุด 1: Cat animation (0.667-0.676)

  const bgOpacity = useTransform(scrollYProgress, [0.67, 0.7], [0, 1]);

  const catOpacity = useTransform(scrollYProgress, [0.667, 0.83], [0, 1]);
  const catY = useTransform(scrollYProgress, [0.667, 0.83], [50, 0]);

  // ชุด 2: Cloud animation (0.676-0.69)
  const cloudOpacity = useTransform(scrollYProgress, [0.676, 0.69], [0, 1]);

  // ชุด 3: Ikigai Circle (0.676-0.73)
  const circle1_rotate = useTransform(scrollYProgress, [0.67, 0.7], [0, -180]); // Love - Top
  const circle2_rotate = useTransform(scrollYProgress, [0.67, 0.7], [0, 90]); // Skill - Left
  const circle3_rotate = useTransform(scrollYProgress, [0.67, 0.7], [90, 0]); // Paid - Bottom
  const circle4_rotate = useTransform(scrollYProgress, [0.67, 0.7], [0, -90]); // World - Right

  const subText_opacity = useTransform(scrollYProgress, [0.67, 0.7], [0, 1]);
  const subText_y = useTransform(scrollYProgress, [0.67, 0.7], [30, 0]);

  // Text opacity animations - appear sequentially
  const text1_opacity = useTransform(scrollYProgress, [0.67, 0.68], [0, 1]); // "ถ้าเจ้าหาจุด..."
  const text2_opacity = useTransform(
    scrollYProgress,
    isMobile ? [0.6, 0.75] : [0.7, 0.8],
    [0, 1],
  ); // Description

  const text3_opacity = useTransform(
    scrollYProgress,
    isMobile ? [0.8, 0.85] : [0.87, 0.92],
    [0, 1],
  ); // "แต่เจ้าไม่ต้องกังวล..."

  const text4_opacity = useTransform(
    scrollYProgress,
    isMobile ? [0.85, 0.9] : [0.93, 0.98],
    [0, 1],
  ); // "เจ้าอยากจะลองไปตามหา..."

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
    [bgOpacity, catOpacity, catY, cloudOpacity],
  );

  const top = useTransform(
    scrollYProgress,
    [0.667, 0.7, 1],
    ["0vh", scrollOffsets.mid, scrollOffsets.final],
  );

  return (
    <m.div className="sticky top-0 w-full overflow-hidden" style={{ top }}>
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
              opacity: catOpacity,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene5/04/s5-4-cat-starline.json")}
              className="w-full h-full"
              loop
              playTrigger={catOpacity}
            />
          </m.div>

          {/* ===== description section (Figma: node 723:388 / 723:188) ===== */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              left: isMobile ? "10.51%" : "5.21%",
              top: isMobile ? "6.51%" : "3.82%",
              width: isMobile ? "78.98%" : "89.58%",
              gap: isMobile ? "3.13%" : "1.56%",
            }}
          >
            {/* Text 1: "ถ้าเจ้าหาจุดที่..." */}
            <m.div
              className="text-base md:text-3xl leading-relaxed text-center text-slate-100 shrink-0"
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

            {/* Circle Ikigai with 4 colored circles */}
            <div className="w-[400px] md:w-[735px] h-[400px] md:h-[735px] flex flex-col items-center justify-center relative shrink-0">
              <IkigaiCircle
                className="scale-50 md:scale-80 2xl:scale-100"
                imageSrc={getImgPath("Scene/Hero/world-circle.webp")}
                iconSrc={getImgPath("Icon/world.webp")}
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
                alwaysShowTooltip={true}
              />

              <IkigaiCircle
                className="scale-50 md:scale-80 2xl:scale-100"
                imageSrc={getImgPath("Scene/Hero/paid-circle.webp")}
                iconSrc={getImgPath("Icon/paid.webp")}
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
                alwaysShowTooltip={true}
              />

              <IkigaiCircle
                className="scale-50 md:scale-80 2xl:scale-100"
                imageSrc={getImgPath("Scene/Hero/skill-circle.webp")}
                iconSrc={getImgPath("Icon/skill.webp")}
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
                alwaysShowTooltip={true}
              />

              <IkigaiCircle
                className="scale-50 md:scale-80 2xl:scale-100"
                imageSrc={getImgPath("Scene/Hero/love-circle.webp")}
                iconSrc={getImgPath("Icon/love.webp")}
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
                alwaysShowTooltip={true}
              />

              {/* Intersect Text - Center labels */}
              <m.div
                className="text-xs md:text-base leading-relaxed text-center flex flex-col justify-between items-center w-[45%] h-[35%]"
                style={{ opacity: subText_opacity, y: subText_y }}
              >
                <div className="flex justify-between w-full">
                  <div className="text-white relative">
                    <MysteriousText
                      text={`แรงผลักดัน\n(Passion)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.67}
                      endProgress={0.7}
                    />
                  </div>
                  <div className="text-white relative">
                    <MysteriousText
                      text={`หน้าที่\n(Mission)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.67}
                      endProgress={0.7}
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-white relative">
                    <MysteriousText
                      text={`ทักษะวิชาชีพ\n(Vocation)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.67}
                      endProgress={0.7}
                    />
                  </div>
                  <div className="text-white relative">
                    <MysteriousText
                      text={`อาชีพ\n(Profession)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.67}
                      endProgress={0.7}
                    />
                  </div>
                </div>
              </m.div>
            </div>

            {/* Long description text */}
            <div className="text-sm md:text-2xl 2xl:text-3xl leading-relaxed text-center text-slate-100 w-full shrink-0">
              <m.div style={{ opacity: text2_opacity }}>
                <MysteriousText
                  text={
                    isMobile
                      ? `พื้นที่ของ "ความหมาย" ในชีวิต \n และงานของแต่ละบุคคล ใช้เพื่อเตรียมความพร้อม \n และส่งเสริมการปรับตัวเข้าสู่สังคมการทำงาน \n หากได้ศึกษาหรือเข้าใจอิคิไก ก่อนที่จะเลือกเรียน\nหรือเลือกประกอบอาชีพก็จะมีประโยชน์มากยิ่งขึ้น\nและอาจพาเจ้า ออกจากความมัวมืดในคืนนี้ได้`
                      : `พื้นที่ของ "ความหมาย" ในชีวิตและงานของแต่ละบุคคล \n ใช้เพื่อเตรียมความพร้อมและส่งเสริมการปรับตัวเข้าสู่สังคมการทำงาน \n หากได้ศึกษาหรือเข้าใจอิคิไก ก่อนที่จะเลือกเรียนหรือเลือกประกอบอาชีพ\n ก็จะมีประโยชน์มากยิ่งขึ้น และอาจพาเจ้าออกจากความมัวมืดในคืนนี้ได้`
                  }
                  scrollYProgress={scrollYProgress}
                  startProgress={isMobile ? 0.65 : 0.7}
                  endProgress={isMobile ? 0.7 : 0.85}
                />
              </m.div>
            </div>
          </div>

          {/* ===== cat-submit section (Figma: node 723:472 / 723:217) ===== */}
          <div
            className="absolute flex flex-col gap-6 md:gap-12 2xl:gap-[60px]"
            style={{
              left: isMobile ? "11.46%" : undefined,
              right: isMobile ? undefined : "5.2%",
              top: isMobile ? "54.82%" : "68.40%",
              width: isMobile ? "77.07%" : undefined,
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            {/* Text 3: "แต่เจ้าไม่ต้องกังวล..." */}
            <div className="text-base md:text-2xl 2xl:text-3xl leading-relaxed text-center text-slate-100 w-full">
              <m.div style={{ opacity: text3_opacity }}>
                <MysteriousText
                  text={
                    isMobile
                      ? `แต่เจ้าไม่ต้องกังวลไป\nการที่เจ้ายังไม่ค้นพบตัวเองตอนนี้ \n ไม่ใช่เรื่องที่แปลกประหลาด`
                      : `แต่เจ้าไม่ต้องกังวลไปการที่เจ้ายัง ไม่ค้นพบตัวเองตอนนี้ \n ไม่ใช่เรื่องที่แปลกประหลาด`
                  }
                  scrollYProgress={scrollYProgress}
                  startProgress={isMobile ? 0.8 : 0.87}
                  endProgress={isMobile ? 0.85 : 0.92}
                />
              </m.div>
            </div>

            {/* ตามหา ikigai CTA */}
            <div className="flex flex-col items-center w-full gap-6 md:gap-12 2xl:gap-[60px]">
              <m.div
                className="text-base md:text-2xl 2xl:text-3xl leading-relaxed text-center text-slate-100 w-full"
                style={{ opacity: text4_opacity }}
              >
                <MysteriousText
                  text={`เจ้าอยากจะลองไปตามหาอิคิไก \n ของเจ้าดูบ้างไหมล่ะ`}
                  scrollYProgress={scrollYProgress}
                  startProgress={isMobile ? 0.85 : 0.93}
                  endProgress={isMobile ? 0.9 : 0.98}
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
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
