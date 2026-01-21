"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import {
  HiCheck,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineX,
} from "react-icons/hi";
import ChoiceButton from "@/app/components/button/ChoiceButton";
import InputButton from "@/app/components/button/InputButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { ACTIVITIES, SCENE_S6_1_ITEMS } from "@/app/data/scene_s6_1.data";
import { getJsonUrl } from "@/utils/cloudinaryUtils";
import GradientButton from "../components/button/GradientButton";
import LazyLottie from "../components/reusable/LazyLottie";
import { useDevice } from "../contexts/DeviceContext";

export interface S6_1Data {
  selectedHobbies: string[];
  customHobbies: string[];
  topThreeHobbies: string[];
}

interface S6_1Props {
  scrollYProgress: MotionValue<number>;
  playerName?: string;
  onCompleted?: (data: S6_1Data) => void;
}

const MIN_SELECTIONS = 1;
const MAX_SELECTIONS = 5;
const STEP2_MAX_SELECTIONS = 3;

export default function S6_1({
  scrollYProgress,
  playerName = "เจ้า",
  onCompleted,
}: S6_1Props) {
  const { isMobile } = useDevice();

  //? State Management
  const [step, setStep] = useState(1); // 1 = เลือก 5, 2 = เลือก 3
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [customHobbies, setCustomHobbies] = useState<string[]>([]);
  const [topThreeHobbies, setTopThreeHobbies] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activitiesError, setActivitiesError] = useState("");

  //? Animation Timeline (0-1 within 300vh)
  // Main container
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.985, 1],
    [0, 1, 1, 0],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.049, 0.05, 0.95, 0.951],
    [-1, -1, 10, 10, -1],
  );

  // 1. bg + animation (0-0.1)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // 2. Text top (0.1-0.15)
  const textTopOpacity = useTransform(scrollYProgress, [0.1, 0.15], [0, 1]);
  const textTopY = useTransform(scrollYProgress, [0.1, 0.15], [30, 0]);

  // 3. Tree4 (0.15-0.2)
  const tree4Opacity = useTransform(scrollYProgress, [0.15, 0.2], [0, 1]);
  const tree4Y = useTransform(scrollYProgress, [0.15, 0.2], [50, 0]);

  // 4. Tree3 (0.2-0.25)
  const tree3Opacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);
  const tree3Y = useTransform(scrollYProgress, [0.2, 0.25], [50, 0]);

  // 5. Tree2 (0.25-0.3)
  const tree2Opacity = useTransform(scrollYProgress, [0.25, 0.3], [0, 1]);
  const tree2Y = useTransform(scrollYProgress, [0.25, 0.3], [50, 0]);

  // 6. Tree1 (0.3-0.35)
  const tree1Opacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);
  const tree1Y = useTransform(scrollYProgress, [0.3, 0.35], [50, 0]);

  // 7. Leave (0.35-0.4)
  const leaveOpacity = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);
  const leaveY = useTransform(scrollYProgress, [0.35, 0.4], [30, 0]);

  // 8. Paper (0.4-0.5)
  const paperOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const paperScale = useTransform(scrollYProgress, [0.4, 0.5], [0.9, 1]);

  // 9. Text bottom + choices (0.5-0.65)
  const textBottomOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const textBottomY = useTransform(scrollYProgress, [0.5, 0.6], [30, 0]);
  const choicesOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const choicesY = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);

  //? Animation Map
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: bgOpacity },
      3: { opacity: tree4Opacity, y: tree4Y },
      4: { opacity: tree3Opacity, y: tree3Y },
      5: { opacity: tree2Opacity, y: tree2Y },
      6: { opacity: tree1Opacity, y: tree1Y },
      7: { opacity: leaveOpacity, y: leaveY },
      8: { opacity: paperOpacity, scale: paperScale },
    }),
    [
      bgOpacity,
      tree4Opacity,
      tree4Y,
      tree3Opacity,
      tree3Y,
      tree2Opacity,
      tree2Y,
      tree1Opacity,
      tree1Y,
      leaveOpacity,
      leaveY,
      paperOpacity,
      paperScale,
    ],
  );

  //? Handlers
  const handleActivityToggle = (label: string) => {
    setActivitiesError("");

    setSelectedHobbies((prev) => {
      if (prev.includes(label)) {
        return prev.filter((actLabel) => actLabel !== label);
      }

      // ตรวจสอบรวมกับ custom activities
      if (prev.length + customHobbies.length >= MAX_SELECTIONS) {
        setActivitiesError(`เลือกได้สูงสุด ${MAX_SELECTIONS} กิจกรรม`);
        return prev;
      }

      return [...prev, label];
    });
  };

  const handleAddCustomActivity = () => {
    if (selectedHobbies.length + customHobbies.length >= MAX_SELECTIONS) {
      setActivitiesError(`เลือกได้สูงสุด ${MAX_SELECTIONS} กิจกรรม`);
      return;
    }
    setShowInput(true);
  };

  const handleCustomActivitySubmit = () => {
    if (!inputValue.trim()) {
      setActivitiesError("กรุณากรอกชื่อกิจกรรม");
      return;
    }

    // ตรวจสอบความยาว
    if (inputValue.trim().length > 30) {
      setActivitiesError("ชื่อกิจกรรมต้องไม่เกิน 30 ตัวอักษร");
      return;
    }

    // ตรวจสอบว่าซ้ำกับ custom activities ที่มีอยู่แล้วหรือไม่
    if (
      customHobbies.some(
        (act) => act.toLowerCase() === inputValue.trim().toLowerCase(),
      )
    ) {
      setActivitiesError("กิจกรรมนี้มีอยู่แล้ว");
      return;
    }

    // ตรวจสอบว่าซ้ำกับ ACTIVITIES ในระบบหรือไม่
    if (
      ACTIVITIES.some(
        (act: { label: string }) =>
          act.label.toLowerCase() === inputValue.trim().toLowerCase(),
      )
    ) {
      setActivitiesError("กิจกรรมนี้มีอยู่ในตัวเลือกแล้ว");
      return;
    }

    if (selectedHobbies.length + customHobbies.length >= MAX_SELECTIONS) {
      setActivitiesError(`เลือกได้สูงสุด ${MAX_SELECTIONS} กิจกรรม`);
      return;
    }

    setCustomHobbies((prev) => [...prev, inputValue.trim()]);
    setInputValue("");
    setShowInput(false);
    setActivitiesError("");
  };

  const handleCustomActivityCancel = () => {
    setInputValue("");
    setShowInput(false);
  };

  const handleProceedToStep2 = () => {
    setStep(2);
    setActivitiesError("");
  };

  const handleSecondStepToggle = (activity: string) => {
    setActivitiesError("");

    setTopThreeHobbies((prev) => {
      if (prev.includes(activity)) {
        return prev.filter((a) => a !== activity);
      }

      if (prev.length >= STEP2_MAX_SELECTIONS) {
        setActivitiesError(`เลือกได้สูงสุด ${STEP2_MAX_SELECTIONS} กิจกรรม`);
        return prev;
      }

      return [...prev, activity];
    });
  };

  const handleBacktoStep1 = () => {
    setStep(1);
    setTopThreeHobbies([]);
    setActivitiesError("");
  };

  const totalSelected = selectedHobbies.length + customHobbies.length;

  //? Filter activities: แสดงทั้งหมด แต่เมื่อเพิ่ม custom activities ให้ลดอันที่ไม่ได้เลือกออกทีละ 1
  const visibleActivities = (() => {
    // ถ้ายังไม่มี custom activities ให้แสดงทั้งหมด
    if (customHobbies.length === 0) {
      return ACTIVITIES;
    }

    // กรองเฉพาะอันที่ยังไม่ได้เลือก แล้วลดออกตามจำนวน custom
    const unselectedCount = ACTIVITIES.filter(
      (act: { label: string }) => !selectedHobbies.includes(act.label),
    ).length;

    const itemsToRemove = customHobbies.length;

    // คงเรียงลำดับเดิม แต่ซ่อนอันที่ไม่ได้เลือกจากท้ายสุด
    return ACTIVITIES.filter((act: { label: string }, index: number) => {
      const isSelected = selectedHobbies.includes(act.label);
      if (isSelected) return true; // แสดงอันที่เลือกเสมอ

      // นับ index ของอันที่ไม่ได้เลือกในรายการทั้งหมด
      const unselectedIndex = ACTIVITIES.slice(0, index + 1).filter(
        (a: { label: string }) => !selectedHobbies.includes(a.label),
      ).length;

      // แสดงถ้ายังไม่เกินจำนวนที่ต้องซ่อน
      return unselectedIndex <= unselectedCount - itemsToRemove;
    });
  })();

  const top = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.8, 1],
    ["0vh", "-30vh", "-50vh", "-80vh", "-100vh"],
  );

  return (
    <m.div className="sticky w-full overflow-hidden" style={{ top }}>
      <m.div
        className="flex items-center justify-center bg-s6 min-h-screen "
        style={{ opacity, zIndex }}
      >
        <SceneLayer
          items={SCENE_S6_1_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 3840" : "1920 / 2160"}
        >
          {/* Star (Lottie) */}
          {isMobile && (
            <m.div
              className="absolute"
              style={{
                width: "100%",
                height: "100%",
                left: "0%",
                top: "0%",
                opacity: bgOpacity,
              }}
            >
              <LazyLottie
                src={getJsonUrl("Scene/Scene6/02/s6-2_mobile.json")}
                className="w-full h-full"
                loop
                playTrigger={bgOpacity}
              />
            </m.div>
          )}

          {!isMobile && (
            <m.div
              className="absolute"
              style={{
                width: "100%",
                height: "100%",
                left: "0%",
                top: "0%",
                opacity: bgOpacity,
              }}
            >
              <LazyLottie
                src={getJsonUrl("Scene/Scene6/02/s6-2.json")}
                className="w-full h-full"
                loop
                playTrigger={bgOpacity}
              />
            </m.div>
          )}

          {/* Text Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-20">
            {/* Text Top */}
            <m.div
              className="flex items-center justify-center w-full py-40 md:py-100 lg:py-120 xl:py-80 select-none"
              style={{
                opacity: textTopOpacity,
                y: textTopY,
              }}
            >
              <MysteriousText
                text={
                  isMobile
                    ? `ก่อนจะเดินทางด้วยกัน\nข้าอยากรู้ว่า${playerName}เป็นมาอย่างไร\nนอกจากชื่อ${playerName}แล้ว…`
                    : `ก่อนจะเดินทางด้วยกัน ข้าอยากรู้ว่า${playerName}เป็นมาอย่างไร นอกจากชื่อ${playerName}แล้ว…`
                }
                scrollYProgress={scrollYProgress}
                startProgress={0.1}
                endProgress={0.2}
                className="text-white text-lg md:text-3xl lg:text-4xl leading-normal text-center"
              />
            </m.div>

            {/* Text Bottom */}
            <m.div
              className="absolute flex flex-col gap-5 pl-4 md:pl-8 lg:pl-10 pr-6 md:pr-15 lg:pr-23 xl:pr-30 items-center justify-center"
              style={{
                opacity: textBottomOpacity,
                y: textBottomY,
                left: isMobile ? "14.25%" : "8.54%",
                top: isMobile ? "53.38%" : "53.36%",
                width: isMobile ? "76.93%" : "83.35%",
                height: isMobile ? "43.98%" : "42.97%",
                maxHeight: isMobile ? "43.98%" : "42.97%",
              }}
            >
              {!isMobile ? (
                <div className="flex flex-col gap-5">
                  {/* Question */}
                  <div className="flex flex-col items-center text-center text-white leading-normal select-none shrink-0 mt-5">
                    {step === 1 ? (
                      <>
                        <MysteriousText
                          text="เลือกสิ่งที่เจ้าทำแล้วรู้สึกไม่เคยเบื่อหรือทำให้เจ้าใจเต้นเสมอ"
                          scrollYProgress={scrollYProgress}
                          startProgress={0.5}
                          endProgress={0.55}
                          className="text-4xl leading-normal"
                        />
                        <p
                          className={`text-xl mt-2 ${
                            activitiesError ? "text-red-500 font-bold" : ""
                          }`}
                        >
                          {activitiesError ||
                            `เลือกแล้ว ${totalSelected}/${MAX_SELECTIONS} กิจกรรม (ขั้นต่ำ ${MIN_SELECTIONS} กิจกรรม)`}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="text-4xl leading-normal whitespace-pre-wrap">
                          {`เลือก 3 สิ่งที่เจ้าจะทำมันอยู่ดี \n แม้ว่าเจ้าจะไม่ได้อะไรตอบแทนเลยก็ตาม?`}
                        </div>
                        <p
                          className={`text-xl mt-2 ${
                            activitiesError ? "text-red-500 font-bold" : ""
                          }`}
                        >
                          {activitiesError ||
                            `เลือกแล้ว ${topThreeHobbies.length}/${STEP2_MAX_SELECTIONS} กิจกรรม`}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Choices (scroll ได้) */}
                  <div className="flex flex-col gap-5 w-full mt-5 ">
                    <m.div
                      className="flex flex-wrap gap-[30px_40px] items-start justify-center"
                      style={{
                        opacity: choicesOpacity,
                        y: choicesY,
                      }}
                    >
                      {step === 1 ? (
                        <>
                          {/* Activity Buttons */}
                          {visibleActivities.map(
                            (activity: { id: number; label: string }) => (
                              <ChoiceButton
                                key={activity.id}
                                text={activity.label}
                                isSelected={selectedHobbies.includes(
                                  activity.label,
                                )}
                                onClick={() =>
                                  handleActivityToggle(activity.label)
                                }
                                className="px-5 py-3 text-2xl"
                              />
                            ),
                          )}

                          {/* Custom Activities Display */}
                          {customHobbies.map((activity) => (
                            <ChoiceButton
                              key={`custom-${activity}`}
                              text={activity}
                              isSelected={true}
                              onClick={() => {
                                setCustomHobbies((prev) =>
                                  prev.filter((a) => a !== activity),
                                );
                              }}
                              className="px-5 py-3 text-2xl"
                            />
                          ))}

                          {/* Add Custom Activity Button or Input */}
                          {!showInput ? (
                            <GradientButton
                              text="+ เพิ่มกิจกรรม"
                              onClick={handleAddCustomActivity}
                              disabled={totalSelected >= MAX_SELECTIONS}
                              variant="default"
                              isSelected={true}
                            />
                          ) : (
                            <div className="flex items-center gap-2 xl:gap-4">
                              <InputButton
                                value={inputValue}
                                onChange={setInputValue}
                                placeholder="ระบุกิจกรรม"
                                maxLength={20}
                                className="text-2xl"
                              />
                              <GradientButton
                                text=""
                                isSelected={true}
                                onClick={handleCustomActivitySubmit}
                                variant="white"
                                className="p-3!"
                              >
                                <HiCheck />
                              </GradientButton>
                              <GradientButton
                                text=""
                                isSelected={true}
                                onClick={handleCustomActivityCancel}
                                variant="transparent"
                                className="p-3!"
                              >
                                <HiOutlineX />
                              </GradientButton>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {/* Step 2: แสดงเฉพาะ 5 อันที่เลือกจาก Step 1 */}
                          {selectedHobbies.map((label) => (
                            <ChoiceButton
                              key={label}
                              text={label}
                              isSelected={topThreeHobbies.includes(label)}
                              onClick={() => handleSecondStepToggle(label)}
                              className="px-5 py-3"
                            />
                          ))}

                          {customHobbies.map((activity) => (
                            <ChoiceButton
                              key={`step2-${activity}`}
                              text={activity}
                              isSelected={topThreeHobbies.includes(activity)}
                              onClick={() => handleSecondStepToggle(activity)}
                              className="px-5 py-3"
                            />
                          ))}
                        </>
                      )}
                    </m.div>

                    {/* Proceed Button Container */}
                    <m.div
                      className="flex w-full justify-end py-2 px-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity:
                          step === 1 && totalSelected === MAX_SELECTIONS
                            ? 1
                            : 0,
                        y:
                          step === 1 && totalSelected === MAX_SELECTIONS
                            ? 0
                            : 20,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Proceed Button */}
                      {step === 1 && totalSelected === MAX_SELECTIONS && (
                        <GradientButton
                          text="ไปต่อ"
                          isSelected={true}
                          onClick={handleProceedToStep2}
                          variant="white"
                          className="text-2xl"
                        >
                          <HiOutlineChevronDown className="ml-2" />
                        </GradientButton>
                      )}
                    </m.div>

                    <div className="flex w-full justify-between p-6">
                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: step === 2 ? 1 : 0,
                          y: step === 2 ? 0 : 20,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {step === 2 && (
                          <GradientButton
                            text="กลับไป"
                            isSelected={true}
                            onClick={handleBacktoStep1}
                            variant="white"
                            className="text-2xl"
                          >
                            <HiOutlineChevronUp className="ml-2" />
                          </GradientButton>
                        )}
                      </m.div>

                      {/* Proceed Button for Step 2 */}
                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity:
                            topThreeHobbies.length === STEP2_MAX_SELECTIONS
                              ? 1
                              : 0,
                          y:
                            topThreeHobbies.length === STEP2_MAX_SELECTIONS
                              ? 0
                              : 20,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {topThreeHobbies.length === STEP2_MAX_SELECTIONS && (
                          <GradientButton
                            text="ไปต่อ"
                            isSelected={true}
                            onClick={() => {
                              if (onCompleted) {
                                onCompleted({
                                  selectedHobbies,
                                  customHobbies,
                                  topThreeHobbies,
                                });
                              }
                            }}
                            variant="white"
                            className="text-2xl"
                          >
                            <HiOutlineChevronDown className="ml-2" />
                          </GradientButton>
                        )}
                      </m.div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Question (คงที่) - Mobile */}
                  <div className="flex flex-col items-center text-center text-white font-normal leading-normal select-none shrink-0 mt-5">
                    {step === 1 ? (
                      <>
                        <MysteriousText
                          text={
                            "เลือกสิ่งที่เจ้าทำแล้วรู้สึกไม่เคยเบื่อ\nหรือทำให้เจ้าใจเต้นเสมอ"
                          }
                          scrollYProgress={scrollYProgress}
                          startProgress={0.5}
                          endProgress={0.55}
                          className="text-lg md:text-3xl lg:text-4xl leading-normal"
                        />
                        <p
                          className={`text-xs md:text-xl lg:text-2xl mt-2 ${
                            activitiesError ? "text-red-500 font-bold" : ""
                          }`}
                        >
                          {activitiesError ||
                            `เลือกแล้ว ${totalSelected}/${MAX_SELECTIONS} กิจกรรม (ขั้นต่ำ ${MIN_SELECTIONS} กิจกรรม)`}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="text-lg md:text-3xl lg:text-4xl leading-normal whitespace-pre-wrap">
                          {`เลือก 3 สิ่งที่เจ้าจะทำมันอยู่ดี \n แม้ว่าเจ้าจะไม่ได้อะไรตอบแทนเลยก็ตาม?`}
                        </div>
                        <p
                          className={`text-xs md:text-xl lg:text-2xl mt-2 ${
                            activitiesError ? "text-red-500 font-bold" : ""
                          }`}
                        >
                          {activitiesError ||
                            `เลือกแล้ว ${topThreeHobbies.length}/${STEP2_MAX_SELECTIONS} กิจกรรม`}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Choices (scroll ได้) - Mobile */}
                  <div className="flex flex-col gap-2 md:gap-5 overflow-y-auto overflow-x-hidden w-full mt-5">
                    <m.div
                      className="flex flex-wrap gap-[14px_18px] md:gap-[30px_40px] lg:gap-[40px_30px]    items-start justify-center"
                      style={{
                        opacity: choicesOpacity,
                        y: choicesY,
                      }}
                    >
                      {step === 1 ? (
                        <>
                          {/* Activity Buttons */}
                          {visibleActivities.map(
                            (activity: { id: number; label: string }) => (
                              <ChoiceButton
                                key={activity.id}
                                text={activity.label}
                                isSelected={selectedHobbies.includes(
                                  activity.label,
                                )}
                                onClick={() =>
                                  handleActivityToggle(activity.label)
                                }
                                className="px-1 md:px-5 py-0 md:py-3 w-26 md:w-auto h-12 md:h-auto text-sm md:text-2xl lg:text-3xl"
                              />
                            ),
                          )}

                          {/* Custom Activities Display */}
                          {customHobbies.map((activity) => (
                            <ChoiceButton
                              key={`custom-${activity}`}
                              text={activity}
                              isSelected={true}
                              onClick={() => {
                                setCustomHobbies((prev) =>
                                  prev.filter((a) => a !== activity),
                                );
                              }}
                              className="px-1 md:px-5 py-0 md:py-3 w-26 md:w-auto h-12 md:h-auto text-sm md:text-2xl lg:text-3xl"
                            />
                          ))}

                          {/* Add Custom Activity Button or Input */}
                          {!showInput ? (
                            <GradientButton
                              text="+ เพิ่มกิจกรรม"
                              onClick={handleAddCustomActivity}
                              disabled={totalSelected >= MAX_SELECTIONS}
                              variant="default"
                              isSelected={true}
                              className="text-sm md:text-2xl lg:text-3xl"
                            />
                          ) : (
                            <div className="flex items-center gap-2 md:gap-4">
                              <InputButton
                                value={inputValue}
                                onChange={setInputValue}
                                placeholder="ระบุกิจกรรม"
                                maxLength={20}
                                className="text-sm md:text-2xl lg:text-3xl"
                              />
                              <GradientButton
                                text=""
                                isSelected={true}
                                onClick={handleCustomActivitySubmit}
                                variant="white"
                                className="p-3! md:p-6 lg:p-8"
                              >
                                <HiCheck />
                              </GradientButton>
                              <GradientButton
                                text=""
                                isSelected={true}
                                onClick={handleCustomActivityCancel}
                                variant="transparent"
                                className="p-3! md:p-6 lg:p-8"
                              >
                                <HiOutlineX />
                              </GradientButton>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {/* Step 2: แสดงเฉพาะ 5 อันที่เลือกจาก Step 1 */}
                          {selectedHobbies.map((label) => (
                            <ChoiceButton
                              key={label}
                              text={label}
                              isSelected={topThreeHobbies.includes(label)}
                              onClick={() => handleSecondStepToggle(label)}
                              className="px-1 md:px-5 py-0 md:py-3 w-26 md:w-auto h-12 md:h-auto text-sm md:text-2xl lg:text-3xl"
                            />
                          ))}

                          {customHobbies.map((activity) => (
                            <ChoiceButton
                              key={`step2-${activity}`}
                              text={activity}
                              isSelected={topThreeHobbies.includes(activity)}
                              onClick={() => handleSecondStepToggle(activity)}
                              className="px-1 md:px-5 py-0 md:py-3 w-26 md:w-auto h-12 md:h-auto text-sm md:text-2xl lg:text-3xl"
                            />
                          ))}
                        </>
                      )}
                    </m.div>

                    {/* Proceed Button Container */}
                    <m.div
                      className="flex w-full justify-center py-2 px-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity:
                          step === 1 && totalSelected === MAX_SELECTIONS
                            ? 1
                            : 0,
                        y:
                          step === 1 && totalSelected === MAX_SELECTIONS
                            ? 0
                            : 20,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Proceed Button */}
                      {step === 1 && totalSelected === MAX_SELECTIONS && (
                        <GradientButton
                          text="ไปต่อ"
                          isSelected={true}
                          onClick={handleProceedToStep2}
                          variant="white"
                          className="text-lg md:text-2xl lg:text-3xl"
                        >
                          <HiOutlineChevronDown className="ml-2" />
                        </GradientButton>
                      )}
                    </m.div>

                    <div className="flex justify-center py-2 px-6">
                      <div className="flex flex-col gap-5 md:gap-10">
                        <m.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: step === 2 ? 1 : 0,
                            y: step === 2 ? 0 : 20,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          {step === 2 && (
                            <GradientButton
                              text="กลับไป"
                              isSelected={true}
                              onClick={handleBacktoStep1}
                              variant="white"
                              className="text-lg md:text-2xl lg:text-3xl"
                            >
                              <HiOutlineChevronUp className="ml-2" />
                            </GradientButton>
                          )}
                        </m.div>

                        {/* Proceed Button for Step 2 */}
                        <m.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity:
                              topThreeHobbies.length === STEP2_MAX_SELECTIONS
                                ? 1
                                : 0,
                            y:
                              topThreeHobbies.length === STEP2_MAX_SELECTIONS
                                ? 0
                                : 20,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          {topThreeHobbies.length === STEP2_MAX_SELECTIONS && (
                            <GradientButton
                              text="ไปต่อ"
                              isSelected={true}
                              onClick={() => {
                                if (onCompleted) {
                                  onCompleted({
                                    selectedHobbies: [
                                      ...selectedHobbies,
                                      ...customHobbies,
                                    ],
                                    customHobbies,
                                    topThreeHobbies,
                                  });
                                }
                              }}
                              variant="white"
                              className="text-lg md:text-2xl lg:text-3xl"
                            >
                              <HiOutlineChevronDown className="ml-2" />
                            </GradientButton>
                          )}
                        </m.div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </m.div>
          </div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
