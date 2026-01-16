"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import { useMemo } from "react";

import ChoiceButton from "@/app/components/button/ChoiceButton";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { REASONS, SCENE_INTODARK_2_ITEMS } from "@/app/data/scene_intoDark_2";
import { useDeviceCheck } from "@/app/hooks/useDeviceCheck";

interface ChoicesProps {
  scrollYProgress: MotionValue<number>;
  playerName: string;
  selectedReasons: number[];
  handleReasonToggle: (id: number) => void;
  reasonsError: string;
}

export default function IntoDarkChoices({
  scrollYProgress,
  playerName,
  selectedReasons,
  handleReasonToggle,
  reasonsError,
}: ChoicesProps) {
  const { isMobile } = useDeviceCheck();

  // Main container opacity and z-index - ปรับให้ตรงกับ 600vh (0.167-0.500)
  const opacity = useTransform(
    scrollYProgress,
    [0.167, 0.179, 0.389, 0.7, 0.8],
    [0, 1, 1, 1, 0]
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.168, 0.179, 0.493, 0.5],
    [-1, -1, 10, 10, -1]
  );

  // Background gradients - Layer 1 (earliest)
  const bgGradient = useTransform(scrollYProgress, [0.179, 0.213], [50, 0]);
  const bgGradientOpacity = useTransform(
    scrollYProgress,
    [0.179, 0.213],
    [0, 1]
  );

  // Stars - Layer 2
  const starsY = useTransform(scrollYProgress, [0.196, 0.237], [50, 0]);
  const starsOpacity = useTransform(scrollYProgress, [0.196, 0.237], [0, 1]);

  // Cat (main character) - Layer 4
  const catY = useTransform(scrollYProgress, [0.226, 0.282], [100, 0]);
  const catOpacity = useTransform(scrollYProgress, [0.226, 0.282], [0, 1]);
  const catScale = useTransform(
    scrollYProgress,
    [0.226, 0.254, 0.282],
    [0.9, 1, 1]
  );

  // Text content - Layer 6
  const textOpacity = useTransform(scrollYProgress, [0.282, 0.327], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.282, 0.327], [30, 0]);

  // Choice buttons - Layer 7 (latest)
  const choicesOpacity = useTransform(scrollYProgress, [0.31, 0.35], [0, 1]);
  const choicesY = useTransform(scrollYProgress, [0.31, 0.35], [30, 0]);

  // Additional text sections
  const text2Opacity = useTransform(scrollYProgress, [0.42, 0.44], [0, 1]);
  const text3Opacity = useTransform(scrollYProgress, [0.44, 0.46], [0, 1]);
  const text4Opacity = useTransform(scrollYProgress, [0.46, 0.48], [0, 1]);
  const text5Opacity = useTransform(scrollYProgress, [0.48, 0.5], [0, 1]);

  //? Animation Map - matches animGroup in scene_intoDark_2.data.ts
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: bgGradientOpacity, y: bgGradient },
      2: { opacity: starsOpacity, y: starsY },
      4: { opacity: catOpacity, y: catY, scale: catScale },
    }),
    [
      bgGradientOpacity,
      bgGradient,
      starsOpacity,
      starsY,
      catOpacity,
      catY,
      catScale,
    ]
  );

  return (
    <div className="sticky top-0 w-full overflow-hidden">
      <m.div
        className="flex items-center justify-center bg-black min-h-screen"
        style={{ opacity, zIndex }}
      >
        <SceneLayer
          items={SCENE_INTODARK_2_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 3840" : "1920 / 2160"}
        >
          {/* Main Cat (Lottie) */}
          <m.div
            className="absolute"
            style={{
              right: isMobile ? "-4.63%" : "13.93%",
              bottom: isMobile ? "24.97%" : "13.36%",
              width: isMobile ? "101.39%" : "64.62%",
              height: isMobile ? "35.57%" : "64.52%",
              y: catY,
              opacity: catOpacity,
              scale: catScale,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene5/02/s5-2-cat-starline.json"
              className="w-full h-full"
              loop
              playTrigger={catOpacity}
            />
          </m.div>

          {/* Top Content - Welcome Section (node-id: 497:3458) */}
          <m.div
            className="absolute flex flex-col items-start w-screen pointer-events-auto"
            style={{
              y: textY,
              opacity: textOpacity,
            }}
          >
            {/* Welcome box with padding (node-id: 497:3459) */}
            <div
              className={`flex flex-col items-center justify-center text-center text-white w-full px-0 ${
                isMobile
                  ? "pt-10 pb-[30px] lg:pt-[120px] lg:pb-[50px] gap-2"
                  : "py-[100px] 2xl:py-[150px] gap-4"
              }`}
            >
              {/* Main welcome text (node-id: 497:3460) */}
              <div className="leading-normal text-lg md:text-3xl w-full">
                <div className="mb-0">
                  <MysteriousText
                    text="ยินดีที่ได้รู้จัก"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.282}
                    endProgress={0.293}
                  />
                  {playerName ? <b> {playerName}</b> : " (ชื่อผู้เล่น)"}{" "}
                  <>{isMobile ? <br /> : null}</>
                  <MysteriousText
                    text="มีหลายชีวิตเหลือเกินที่หลงเข้ามาในที่นี้"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.293}
                    endProgress={0.305}
                  />
                </div>
                <div>
                  <MysteriousText
                    text="เจ้าตกลงมาที่นี่เพราะเหตุใดละ"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.305}
                    endProgress={0.316}
                  />
                </div>
              </div>
              {/* Subtitle text (node-id: 497:3461) */}
              <div className="text-sm md:text-xl w-full">
                <p className={reasonsError ? "text-red-500 font-bold" : ""}>
                  {reasonsError || "(ตอบอย่างน้อย 1 ข้อ)"}
                </p>
              </div>
            </div>

            {/* Choice Buttons Section (node-id: 497:3462) */}
            <m.div
              className={`flex px-[5%] w-screen ${
                isMobile
                  ? "flex-col justify-center items-center gap-[15px] lg:gap-[50px]"
                  : "items-start justify-between"
              }`}
              style={{
                y: choicesY,
                opacity: choicesOpacity,
              }}
            >
              <div className="flex flex-col gap-[15px] md:gap-[50px] xl:gap-[100px]">
                {/* Choice button 1 (node-id: 478:910) */}
                <ChoiceButton
                  text={REASONS[0].text}
                  isSelected={selectedReasons.includes(REASONS[0].id)}
                  onClick={() => handleReasonToggle(REASONS[0].id)}
                  className="max-w-2xs
        min-h-10
        lg:max-w-md lg:min-w-md
        lg:min-h-28 px-10"
                />
                {/* Choice button 3 (node-id: 478:911) */}
                <ChoiceButton
                  text={REASONS[2].text}
                  isSelected={selectedReasons.includes(REASONS[2].id)}
                  onClick={() => handleReasonToggle(REASONS[2].id)}
                  className="max-w-2xs
        min-h-10
        lg:max-w-md lg:min-w-md
        lg:min-h-28 px-10"
                />
                {/* Choice button 6 (node-id: 478:912) */}
                <ChoiceButton
                  text={REASONS[5].text}
                  isSelected={selectedReasons.includes(REASONS[5].id)}
                  onClick={() => handleReasonToggle(REASONS[5].id)}
                  className="max-w-2xs
        min-h-10
        lg:max-w-md lg:min-w-md
        lg:min-h-28 px-10"
                />
              </div>
              <div className="flex flex-col gap-[15px] md:gap-[50px] xl:gap-[100px]">
                {/* Choice button 2 (node-id: 478:907) */}
                <ChoiceButton
                  text={REASONS[1].text}
                  isSelected={selectedReasons.includes(REASONS[1].id)}
                  onClick={() => handleReasonToggle(REASONS[1].id)}
                  className="max-w-2xs
        min-h-10
        lg:max-w-md lg:min-w-md
        lg:min-h-28 px-10"
                />
                {/* Choice button 5 (node-id: 478:908) */}
                <ChoiceButton
                  text={REASONS[4].text}
                  isSelected={selectedReasons.includes(REASONS[4].id)}
                  onClick={() => handleReasonToggle(REASONS[4].id)}
                  className="max-w-2xs
        min-h-10
        lg:max-w-md lg:min-w-md
        lg:min-h-28 px-10"
                />
                {/* Choice button 4 (node-id: 478:909) */}
                <ChoiceButton
                  text={REASONS[3].text}
                  isSelected={selectedReasons.includes(REASONS[3].id)}
                  onClick={() => handleReasonToggle(REASONS[3].id)}
                  className="max-w-2xs
        min-h-10
        lg:max-w-md lg:min-w-md
        lg:min-h-28 px-10"
                />
              </div>
            </m.div>
          </m.div>

          {/* End Content Container (node-id: 497:3447) */}
          <m.div
            className={`absolute bottom-0 flex w-screen flex-col items-center justify-center pointer-events-auto ${
              isMobile
                ? "gap-[50px] md:gap-[120px] py-[10%] md:py-[20%]"
                : "gap-[150px] py-[8%]"
            }`}
          >
            {/* Text 2 - First message (node-id: 497:3448, 497:3449) */}
            <m.div
              className="flex items-center justify-start portrait:justify-center self-stretch px-[11.98%]"
              style={{ opacity: text2Opacity }}
            >
              <div className="text-white text-center whitespace-pre-line leading-normal text-lg md:text-3xl">
                <MysteriousText
                  text={`โอ้… ถูกครอบงำจาก\nความกังวลสินะ`}
                  scrollYProgress={scrollYProgress}
                  startProgress={0.372}
                  endProgress={0.387}
                />
              </div>
            </m.div>

            {/* Text 3 & 4 Container (node-id: 497:3450) */}
            <div
              className={`flex text-white text-center leading-normal text-lg md:text-3xl ${
                isMobile
                  ? "flex-col gap-[50px] md:gap-[120px] w-screen"
                  : "justify-between items-center w-[84.74%]"
              }`}
            >
              {/* Text 3 (node-id: 497:3451) */}
              <m.div style={{ opacity: text3Opacity }}>
                <div className="mb-0 whitespace-pre-line">
                  <MysteriousText
                    text={`ข้าเห็นหลายคนที่ตกลงมาที่นี่ก็\nเพราะเช่นนี้แหละ`}
                    scrollYProgress={scrollYProgress}
                    startProgress={0.387}
                    endProgress={0.402}
                  />
                </div>
              </m.div>
              {/* Text 4 (node-id: 497:3452) */}
              <m.div style={{ opacity: text4Opacity }}>
                <div className="mb-0 whitespace-pre-line">
                  <MysteriousText
                    text={`ในโลกนี้มีเส้นทางทั้งสี่\nที่ร้อยเรียงชีวิตไว้ด้วยกัน`}
                    scrollYProgress={scrollYProgress}
                    startProgress={0.402}
                    endProgress={0.417}
                  />
                </div>
              </m.div>
            </div>

            {/* Text 5 - Final question (node-id: 497:3453, 497:3454) */}
            {/* md: text-h3: 48px */}
            <m.div
              className="flex items-center justify-center w-full"
              style={{ opacity: text5Opacity }}
            >
              <div className="leading-normal text-lg md:text-3xl text-white">
                <MysteriousText
                  text="…เส้นทางทั้งสี่?"
                  scrollYProgress={scrollYProgress}
                  startProgress={0.417}
                  endProgress={0.432}
                />
              </div>
            </m.div>
          </m.div>
        </SceneLayer>
      </m.div>
    </div>
  );
}
