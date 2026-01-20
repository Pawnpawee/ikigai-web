"use client";

import {
  type MotionValue,
  m,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import ChoiceButton from "@/app/components/button/ChoiceButton";
import GradientButton from "@/app/components/button/GradientButton";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { useAudio } from "@/app/contexts/AudioContext";
import { SCENE_S6_4_ITEMS } from "@/app/data/scene_s6_4.data";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import { useDevice } from "../contexts/DeviceContext";

interface S6_4Props {
  scrollYProgress: MotionValue<number>;
}

export default function S6_4({ scrollYProgress }: S6_4Props) {
  const { isMobile } = useDevice();
  const { playSfx } = useAudio();
  const hasPlayedSound = useRef(false);

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showContinueButton, setShowContinueButton] = useState(false);

  //? Animation Timeline (700vh total for s6_4Ref)
  //? 0-50vh (0-0.071): Ground fade in
  //? 50-100vh (0.071-0.143): Tree back + tree + leaves fade in
  //? 100-200vh (0.143-0.286): Cat-human fade in
  //? 200-700vh (0.286-1.0): Tree slide loop (walking effect) + Text
  //? After choice selected: Text fade out
  //? After text fade out: Continue button fade in

  const opacity = useTransform(scrollYProgress, [0, 0.1, 1.0], [0, 1, 1]);
  const zIndex = useTransform(scrollYProgress, [0, 0.5, 1], [-1, 10, 10]);

  //? Group 1: Ground (0-50vh = 0-0.071)
  const groundOpacity = useTransform(
    scrollYProgress,
    [0, 0.036, 0.071],
    [0, 1, 1],
  );

  //? Group 2: Tree back + Tree + Leaves (50-100vh = 0.071-0.143)
  const treeOpacity = useTransform(
    scrollYProgress,
    [0.071, 0.107, 0.143],
    [0, 1, 1],
  );

  //? Tree slide left animation - single loop: slide out left, reset from right, back to center
  //? Starts after cat appears (0.286), ends before text (0.5)
  const treeX = useTransform(
    scrollYProgress,
    [0.286, 0.52, 0.52, 0.75, 0.9],
    isMobile ? [500, -2000, 2000, 500, -2000] : [0, -1950, 1950, 0, -1950],
  );

  //? Tree subtle vertical movement (bounce effect while walking)
  const treeY = useTransform(
    scrollYProgress,
    [0.286, 0.52, 0.52, 0.75, 0.9],
    [0, 100, 100, 0, 100],
  );

  //? Group 2: Tree back + Tree + Leaves (50-100vh = 0.071-0.143)
  const tree2Opacity = useTransform(
    scrollYProgress,
    [0.071, 0.107, 0.143],
    [0, 1, 1],
  );

  //? Tree slide left animation - single loop: slide out left, reset from right, back to center
  //? Starts after cat appears (0.286), ends before text (0.5)
  const tree2X = useTransform(
    scrollYProgress,
    [0.286, 0.52, 0.75, 0.75, 0.9],
    isMobile ? [2000, 500, -2000, 2000, 0] : [1920, 0, -1920, 1920, 0],
  );

  //? Tree subtle vertical movement (bounce effect while walking)
  const tree2Y = useTransform(
    scrollYProgress,
    [0.286, 0.52, 0.75, 0.75, 0.9],
    [100, 0, 100, 100, 0],
  );

  //? Group 3: Cat-Human (100-200vh = 0.143-0.286)
  const catHumanOpacity = useTransform(
    scrollYProgress,
    [0.143, 0.214, 0.286],
    [0, 1, 1],
  );

  //? Group 4: Text + Choice buttons (350-550vh = 0.5-0.785)
  const textOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.643, 0.785],
    [0, 1, 1],
  );

  //? Continue button opacity (appears after choice selected)
  const continueButtonOpacity = useTransform(() => {
    if (showContinueButton) {
      return 1;
    }
    return 0;
  });

  //? Animation Map for SceneLayer
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: groundOpacity },
      2: { opacity: treeOpacity, x: treeX, y: treeY },
      3: { opacity: catHumanOpacity },
      4: { opacity: tree2Opacity, x: tree2X, y: tree2Y },
    }),
    [
      groundOpacity,
      treeOpacity,
      treeX,
      treeY,
      tree2Opacity,
      tree2X,
      tree2Y,
      catHumanOpacity,
    ],
  );

  //? Play walking sound when cat-human appears
  useMotionValueEvent(catHumanOpacity, "change", (latest) => {
    if (latest >= 0.5 && !hasPlayedSound.current) {
      playSfx(getAudioUrl("Sound/6/walking-on-leaves.mp3"));
      hasPlayedSound.current = true;
    }
  });

  //? Handle choice selection
  const handleChoiceSelect = (choice: string) => {
    setSelectedChoice(choice);
    //? Show continue button immediately when selected
    setShowContinueButton(true);
  };

  //? Handle continue button click
  const handleContinue = () => {
    window.location.href = "/skill-session";
  };

  const choices = [
    { id: "yes", text: "ได้" },
    { id: "no", text: "ไม่ได้" },
    { id: "unsure", text: "ไม่แน่ใจ" },
  ];

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen bg-s6-4 overflow-hidden"
      style={{ opacity, zIndex }}
    >
      <m.div
        className={`flex items-center h-screen w-screen portrait:w-auto ${
          isMobile ? "justify-center" : "justify-end"
        }`}
      >
        <SceneLayer
          items={SCENE_S6_4_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* Lottie: Cat-Human */}
          <m.div
            className="absolute"
            style={{
              left: isMobile ? "0.37%" : "34.01%",
              bottom: isMobile ? "18.55%" : "7.58%",
              width: isMobile ? "91.23%" : "32.75%",
              height: isMobile ? "36.74%" : "41.69%",
              opacity: catHumanOpacity,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene6/04/s6-human-cat.json")}
              className="w-full h-full"
              loop
              playTrigger={catHumanOpacity}
            />
          </m.div>

          {/* Lottie: Leave*/}
          <m.div
            className="absolute -z-2"
            style={{
              width: isMobile ? "245.27%" : "88.05%",
              height: isMobile ? "19.03%" : "21.59%",
              right: isMobile ? "-106.10%" : "-8.87%",
              bottom: isMobile ? "38.76%" : "30.51%",
              opacity: treeOpacity,
              x: tree2X,
              y: tree2Y,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene6/04/s6-leave.json")}
              className="w-full h-full"
              loop
              playTrigger={treeOpacity}
            />
          </m.div>

          {/* Text and Choice Buttons Container */}
          <div className="flex flex-col items-center justify-between h-screen w-full gap-12">
            <m.div
              className="flex flex-col items-center gap-12 pt-30 md:pt-50 "
              style={{
                opacity: textOpacity,
              }}
            >
              {/* Question Text */}
              <div className="flex flex-col items-center text-center text-white">
                <div className="text-lg md:text-3xl lg:text-4xl leading-relaxed">
                  <MysteriousText
                    text="ดูเหมือนจะเป็นงานอดิเรกที่ดีเลยนะ"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.6}
                    endProgress={0.75}
                  />
                  <br />
                  <MysteriousText
                    text={
                      isMobile
                        ? "แล้วสิ่งที่เจ้ารักนี้ช่วยให้เจ้า \n เดินตามความฝันได้รึเปล่า?"
                        : "แล้วสิ่งที่เจ้ารักนี้ช่วยให้เจ้าเดินตามความฝันได้รึเปล่า?"
                    }
                    scrollYProgress={scrollYProgress}
                    startProgress={0.76}
                    endProgress={0.9}
                  />
                </div>
              </div>

              {/* Choice Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10 w-full">
                {choices.map((choice) => (
                  <ChoiceButton
                    key={choice.id}
                    text={choice.text}
                    isSelected={selectedChoice === choice.id}
                    onClick={() => handleChoiceSelect(choice.id)}
                    className="px-8 py-2 md:px-16 md:py-4 text-sm md:text-2xl lg:text-3xl"
                  />
                ))}
              </div>
            </m.div>

            {/* Continue Button */}
            <m.div
              className="flex w-full justify-end portrait:justify-center px-25 lg:px-50 portrait:py-20"
              style={{ opacity: continueButtonOpacity }}
              initial={{ y: 20 }}
              animate={{ y: showContinueButton ? 0 : 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton
                text="ไปต่อ"
                isSelected={true}
                onClick={handleContinue}
                variant="default"
                className="text-lg md:text-2xl lg:text-3xl"
              >
                <HiOutlineChevronDown className="ml-2" />
              </GradientButton>
            </m.div>
          </div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
