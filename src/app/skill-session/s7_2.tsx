"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import type { AnimationItem } from "lottie-web";
import { useCallback, useMemo, useRef, useState } from "react";
import { HiCheck, HiOutlineX } from "react-icons/hi";
import ChoiceButton from "@/app/components/button/ChoiceButton";
import GradientButton from "@/app/components/button/GradientButton";
import InputButton from "@/app/components/button/InputButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import {
  SCENE_S7_2_ITEMS,
  SOFT_SKILLS_OPTIONS,
} from "@/app/data/scene_s7_2.data";
import { getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S7_2Data {
  selectedSoftSkills: string[];
  customSoftSkills: string[];
}

interface S7_2Props {
  scrollYProgress: MotionValue<number>;
  //? ส่ง data เมื่อเลือกครบ, ส่ง null เมื่อ unselect ต่ำกว่า threshold
  onCompleted?: (data: S7_2Data | null) => void;
}

// ────────────────────────────────────────────────────
//  Constants
// ────────────────────────────────────────────────────

const MIN_SELECTIONS = 1;

// ────────────────────────────────────────────────────
//  Main Component: S7_2 (Soft Skills - ChoiceButton Grid)
// ────────────────────────────────────────────────────

export default function S7_2({ scrollYProgress, onCompleted }: S7_2Props) {
  const { isMobile } = useDevice();

  //? State Management
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [customSoftSkills, setCustomSoftSkills] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const totalSelected = selectedSoftSkills.length + customSoftSkills.length;

  // ─── Animation Timeline (0-1 within 200vh) ───

  //? Main container opacity / zIndex
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [-1, 10, 10, -1],
  );

  //? 1. pattern (animGroup 1)
  const patternOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  //? 2. star (animGroup 2)
  const starOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  //? 3. painting (animGroup 3)
  const paintingOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

  //? 4. Question text
  const questionOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const questionY = useTransform(scrollYProgress, [0.15, 0.25], [30, 0]);

  //? 5. Choices grid
  const choicesOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const choicesY = useTransform(scrollYProgress, [0.25, 0.4], [30, 0]);

  //? Painting Lottie: ping-pong (เล่นไป-กลับ)
  //? ใช้ loop=false + complete event เพื่อหลีกเลี่ยงการกระตุกจาก loop restart
  const handlePaintingRef = useCallback((instance: AnimationItem | null) => {
    if (instance) {
      instance.addEventListener("complete", () => {
        instance.setDirection(instance.playDirection === 1 ? -1 : 1);
        instance.play();
      });
    }
  }, []);

  //? Animation Map for SceneLayer background
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: patternOpacity },
      2: { opacity: starOpacity },
      3: { opacity: paintingOpacity },
    }),
    [patternOpacity, starOpacity, paintingOpacity],
  );

  // ─── Handlers ───

  //? ใช้ ref เก็บ onCompleted เพื่อหลีกเลี่ยง stale closure (แบบเดียวกับ s7_1)
  const onCompletedRef = useRef(onCompleted);
  onCompletedRef.current = onCompleted;

  const customSoftSkillsRef = useRef(customSoftSkills);
  customSoftSkillsRef.current = customSoftSkills;

  const selectedSoftSkillsRef = useRef(selectedSoftSkills);
  selectedSoftSkillsRef.current = selectedSoftSkills;

  const handleSkillToggle = useCallback((skill: string) => {
    setError("");
    setSelectedSoftSkills((prev) => {
      const next = prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill];

      //? แจ้ง parent ทุกครั้งที่สถานะเปลี่ยน (ครบ/ไม่ครบ)
      if (next.length + customSoftSkillsRef.current.length >= MIN_SELECTIONS) {
        queueMicrotask(() => {
          onCompletedRef.current?.({
            selectedSoftSkills: next,
            customSoftSkills: customSoftSkillsRef.current,
          });
        });
      } else {
        //! Unselect ต่ำกว่า threshold → แจ้ง parent ให้ล็อค scroll กลับ
        queueMicrotask(() => {
          onCompletedRef.current?.(null);
        });
      }

      return next;
    });
  }, []);

  const handleAddCustom = useCallback(() => {
    setShowInput(true);
  }, []);

  const handleCustomSubmit = useCallback(() => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setError("กรุณากรอกชื่อทักษะ");
      return;
    }

    if (trimmed.length > 50) {
      setError("ชื่อทักษะต้องไม่เกิน 50 ตัวอักษร");
      return;
    }

    const lowerTrimmed = trimmed.toLowerCase();

    if (customSoftSkills.some((s) => s.toLowerCase() === lowerTrimmed)) {
      setError("ทักษะนี้มีอยู่แล้ว");
      return;
    }

    if (SOFT_SKILLS_OPTIONS.some((s) => s.toLowerCase() === lowerTrimmed)) {
      setError("ทักษะนี้มีอยู่ในตัวเลือกแล้ว");
      return;
    }

    setCustomSoftSkills((prev) => {
      const next = [...prev, trimmed];

      //? เมื่อเลือกครบตาม MIN_SELECTIONS → เรียก onCompleted ทันที
      if (
        selectedSoftSkillsRef.current.length + next.length >=
        MIN_SELECTIONS
      ) {
        queueMicrotask(() => {
          onCompletedRef.current?.({
            selectedSoftSkills: selectedSoftSkillsRef.current,
            customSoftSkills: next,
          });
        });
      }

      return next;
    });
    setInputValue("");
    setShowInput(false);
    setError("");
  }, [inputValue, customSoftSkills]);

  const handleCustomCancel = useCallback(() => {
    setInputValue("");
    setShowInput(false);
    setError("");
  }, []);

  const handleRemoveCustom = useCallback((skill: string) => {
    setCustomSoftSkills((prev) => {
      const next = prev.filter((s) => s !== skill);

      //? เช็คว่ายังครบ threshold หรือไม่หลังลบ custom skill
      if (selectedSoftSkillsRef.current.length + next.length < MIN_SELECTIONS) {
        queueMicrotask(() => {
          onCompletedRef.current?.(null);
        });
      } else {
        queueMicrotask(() => {
          onCompletedRef.current?.({
            selectedSoftSkills: selectedSoftSkillsRef.current,
            customSoftSkills: next,
          });
        });
      }

      return next;
    });
  }, []);

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen overflow-hidden"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen  portrait:w-auto">
        <SceneLayer
          items={SCENE_S7_2_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* Painting Lottie (overlay on static painting) */}
          {/*? Figma: lottie frame at (71, 286) inside painting, size 298.25×259.27 */}
          <m.div
            className="absolute"
            style={{
              //? Desktop: (133.97+71)/1920, (70.83+286)/1080, 298.25/1920, 259.27/1080
              //? Mobile: (318.97+71)/1080, (903.83+286)/1920, 298.25/1080, 259.27/1920
              width: isMobile ? "27.62%" : "15.53%",
              height: isMobile ? "13.50%" : "24.01%",
              left: isMobile ? "36.11%" : "10.68%",
              top: isMobile ? "61.97%" : "33.04%",
              opacity: paintingOpacity,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene7/03/s7-painting.json")}
              className="w-full h-full"
              loop={false}
              playTrigger={paintingOpacity}
              getRef={handlePaintingRef}
            />
          </m.div>

          {/* Content Layer */}
          <div className="absolute inset-0">
            {isMobile ? (
              <div className="flex flex-col items-center justify-center w-full h-full pt-9 md:pt-18">
                {/*? Text frame*/}
                <div className="w-full h-full shrink-0 flex flex-col items-center px-13 md:px-5 gap-6 md:gap-10">
                  {/*? Question — Figma 810:11145 */}
                  <m.div
                    className="w-full shrink-0 flex flex-col items-center  select-none"
                    style={{ opacity: questionOpacity, y: questionY }}
                  >
                    <MysteriousText
                      text={
                        "เลือกสิ่งที่เจ้าคิดว่าเจ้ามี 3 อย่าง\nถ้าไม่แน่ใจ ให้เลือกสิ่งที่คิดว่าทำได้ดี \n ณ ตอนนี้? (Soft Skills)"
                      }
                      scrollYProgress={scrollYProgress}
                      startProgress={0.15}
                      endProgress={0.25}
                      className="text-white text-sm md:text-lg 2xl:text-2xl  leading-normal text-center"
                    />
                    {/*? Counter */}
                    <m.p
                      className={`text-center mt-1 sm:mt-2 select-none text-xs md:text-base xl:text-lg  ${
                        error ? "text-red-400 font-bold" : "text-gray-300"
                      }`}
                      style={{ opacity: choicesOpacity }}
                    >
                      {error ||
                        `เลือกแล้ว ${totalSelected} (ขั้นต่ำ ${MIN_SELECTIONS} อย่าง)`}
                    </m.p>
                  </m.div>

                  {/*? Choice grid */}
                  <m.div
                    className="w-full shrink-0 content-center flex flex-wrap gap-[15px_10px] md:gap-[25px_15px]  items-center justify-center"
                    style={{ opacity: choicesOpacity, y: choicesY }}
                  >
                    {SOFT_SKILLS_OPTIONS.map((skill) => (
                      <ChoiceButton
                        key={skill}
                        text={skill}
                        isSelected={selectedSoftSkills.includes(skill)}
                        onClick={() => handleSkillToggle(skill)}
                        className="px-3 py-2 text-xs md:text-lg 2xl:text-2xl"
                      />
                    ))}
                    {customSoftSkills.map((skill) => (
                      <ChoiceButton
                        key={`custom-${skill}`}
                        text={skill}
                        isSelected={true}
                        onClick={() => handleRemoveCustom(skill)}
                        className="px-3 py-2 text-xs md:text-lg 2xl:text-2xl"
                      />
                    ))}
                    {!showInput ? (
                      <GradientButton
                        text="+ เพิ่มทักษะ"
                        onClick={handleAddCustom}
                        variant="default"
                        isSelected={true}
                        className="py-2! text-xs md:text-lg 2xl:text-2xl"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <InputButton
                          value={inputValue}
                          onChange={setInputValue}
                          placeholder="ระบุทักษะ"
                          maxLength={50}
                          className="py-2! text-xs md:text-lg 2xl:text-2xl"
                        />
                        <GradientButton
                          text=""
                          isSelected={true}
                          onClick={handleCustomSubmit}
                          variant="white"
                          className="p-3!"
                        >
                          <HiCheck />
                        </GradientButton>
                        <GradientButton
                          text=""
                          isSelected={true}
                          onClick={handleCustomCancel}
                          variant="transparent"
                          className="p-3!"
                        >
                          <HiOutlineX />
                        </GradientButton>
                      </div>
                    )}
                  </m.div>
                </div>
              </div>
            ) : (
              /* ─── Desktop Layout (Figma pixel-perfect) ─── */

              <div className="absolute inset-0 flex items-center justify-center">
                {/*? Painting spacer — Figma 810:9161 */}
                <div
                  className="w-[23.02%] shrink-0 aspect-442/938"
                  aria-hidden="true"
                />

                {/*? Text frame — Figma 810:9128 */}
                <div className="w-[62.5%] shrink-0 flex flex-col items-center justify-center">
                  {/*? Question — Figma 810:9129 */}
                  <m.div
                    className="w-full shrink-0 px-[9.46%] mb-[5%] flex flex-col items-center select-none"
                    style={{ opacity: questionOpacity, y: questionY }}
                  >
                    <MysteriousText
                      text={
                        "เลือกสิ่งที่เจ้าคิดว่าเจ้ามี 3 อย่าง \n ถ้าไม่แน่ใจ ให้เลือกสิ่งที่คิดว่าทำได้ดี ณ ตอนนี้? (Soft Skills)"
                      }
                      scrollYProgress={scrollYProgress}
                      startProgress={0.15}
                      endProgress={0.25}
                      className="text-white text-sm md:text-lg 2xl:text-2xl  leading-normal text-center"
                    />

                    {/*? Counter (functional, not in Figma — sits inside question block) */}
                    <m.p
                      className={`text-center mt-1 sm:mt-2 select-none text-xs md:text-base xl:text-lg ${
                        error ? "text-red-400 font-bold" : "text-gray-300"
                      }`}
                      style={{ opacity: choicesOpacity }}
                    >
                      {error ||
                        `เลือกแล้ว ${totalSelected} (ขั้นต่ำ ${MIN_SELECTIONS} อย่าง)`}
                    </m.p>
                  </m.div>

                  {/*? Choice grid — Figma 810:9131 */}
                  <m.div
                    className="w-full shrink-0 content-center flex flex-wrap justify-center gap-y-9 gap-x-10"
                    style={{ opacity: choicesOpacity, y: choicesY }}
                  >
                    {SOFT_SKILLS_OPTIONS.map((skill) => (
                      <ChoiceButton
                        key={skill}
                        text={skill}
                        isSelected={selectedSoftSkills.includes(skill)}
                        onClick={() => handleSkillToggle(skill)}
                        className="px-5 py-3 text-sm md:text-lg 2xl:text-2xl"
                      />
                    ))}
                    {customSoftSkills.map((skill) => (
                      <ChoiceButton
                        key={`custom-${skill}`}
                        text={skill}
                        isSelected={true}
                        onClick={() => handleRemoveCustom(skill)}
                        className="px-5 py-3 text-sm md:text-lg 2xl:text-2xl"
                      />
                    ))}
                    {!showInput ? (
                      <GradientButton
                        text="+ เพิ่มทักษะ"
                        onClick={handleAddCustom}
                        variant="default"
                        isSelected={true}
                        className="py-3!"
                      />
                    ) : (
                      <div className="flex items-center gap-x-[1.67%] shrink-0">
                        <InputButton
                          value={inputValue}
                          onChange={setInputValue}
                          placeholder="ระบุทักษะ"
                          maxLength={20}
                          className="text-sm md:text-lg 2xl:text-2xl"
                        />
                        <GradientButton
                          text=""
                          isSelected={true}
                          onClick={handleCustomSubmit}
                          variant="white"
                          className="p-3!"
                        >
                          <HiCheck />
                        </GradientButton>
                        <GradientButton
                          text=""
                          isSelected={true}
                          onClick={handleCustomCancel}
                          variant="transparent"
                          className="p-3!"
                        >
                          <HiOutlineX />
                        </GradientButton>
                      </div>
                    )}
                  </m.div>
                </div>
              </div>
            )}
          </div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
