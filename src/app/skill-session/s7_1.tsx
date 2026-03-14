"use client";

import {
  AnimatePresence,
  type MotionValue,
  m,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiCheck, HiOutlineX } from "react-icons/hi";
import GradientButton from "@/app/components/button/GradientButton";
import InputButton from "@/app/components/button/InputButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { useAudio } from "@/app/contexts/AudioContext";
import {
  ARROW_L_SRC,
  ARROW_R_SRC,
  CARD_FRAME_SRC,
  HARD_SKILL_CARDS,
  ITEMS_PER_PAGE,
  SCENE_S7_1_ITEMS,
  SELECTED_FRAME_SRC,
} from "@/app/data/scene_s7_1.data";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useDevice } from "../contexts/DeviceContext";

export interface S7_1Data {
  selectedHardSkills: string[];
  customHardSkills: string[];
}

interface S7_1Props {
  scrollYProgress: MotionValue<number>;
  //? ส่ง data เมื่อเลือกครบ, ส่ง null เมื่อ unselect ต่ำกว่า threshold
  onCompleted?: (data: S7_1Data | null) => void;
}

const MIN_SELECTIONS = 1;
const MAX_SELECTIONS = 3;
const ADD_SKILL_CARD_ID = "custom-add-skill";

interface DisplayCard {
  id: string;
  label: string;
  imageSrc?: string;
  isAddCard?: boolean;
  isCustomSkillCard?: boolean;
  customSkillValue?: string;
}

// ────────────────────────────────────────────────────
//  Carousel Navigation Arrow
// ────────────────────────────────────────────────────

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        z-10 flex items-center justify-center
        aspect-39/79 w-[2.5%] portrait:w-[6.2%]
        transition-opacity duration-300
        ${disabled ? "opacity-20 cursor-default" : "opacity-80 hover:opacity-100 cursor-pointer"}
      `}
      whileTap={disabled ? {} : { scale: 0.9 }}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
    >
      {/*? Arrow image matching Figma */}
      <Image
        src={direction === "left" ? ARROW_L_SRC : ARROW_R_SRC}
        alt={direction === "left" ? "Previous" : "Next"}
        width={48}
        height={80}
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </m.button>
  );
}

// ────────────────────────────────────────────────────
//  Skill Card Component
// ────────────────────────────────────────────────────

function SkillCard({
  imageSrc,
  label,
  isSelected,
  onClick,
}: {
  imageSrc: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center cursor-pointer w-[23.56%] portrait:w-[55%] gap-3 lg:gap-5"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/*? Card Frame  */}
      <div className="relative w-full aspect-396/428 transition-all duration-300">
        {/*? Frame border image — switches to selected_frame when selected */}
        <Image
          src={isSelected ? SELECTED_FRAME_SRC : CARD_FRAME_SRC}
          alt=""
          fill
          sizes="25vw"
          className="w-full z-10 pointer-events-none"
        />

        {/*? Skill illustration inside the frame */}
        <div className="absolute inset-[15%] flex items-center justify-center overflow-hidden">
          <Image
            src={imageSrc}
            alt={label}
            fill
            sizes="30vw"
            className="object-contain"
          />
        </div>
      </div>

      <div className="w-full flex items-start justify-center overflow-visible">
        {/*? Card label below the frame */}
        <p
          className={`
          text-white text-center text-xs md:text-base 2xl:text-xl
          leading-tight select-none px-1 text-nowrap
          transition-colors duration-300
          ${isSelected ? "text-yellow-300 font-semibold" : "text-white/90"}
        `}
        >
          {label}
        </p>
      </div>
    </m.button>
  );
}

// ────────────────────────────────────────────────────
//  Add Skill Card — 3 states: before_add / after_click_add
// ────────────────────────────────────────────────────

function AddSkillCard({
  onAdd,
  disabled,
}: {
  onAdd: (value: string) => string | null;
  disabled: boolean;
}) {
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleConfirm = () => {
    const error = onAdd(inputValue);
    if (error === null) {
      setIsInputMode(false);
      setInputValue("");
      setErrorMsg(null);
    } else {
      setErrorMsg(error);
    }
  };

  const handleCancel = () => {
    setIsInputMode(false);
    setInputValue("");
    setErrorMsg(null);
  };

  if (!isInputMode) {
    //? before_add: รูปการ์ด + ปกติ
    return (
      <m.button
        type="button"
        onClick={() => setIsInputMode(true)}
        disabled={disabled}
        className="flex flex-col items-center justify-center cursor-pointer w-[23.56%] portrait:w-[55%] gap-3 lg:gap-5 disabled:opacity-60 disabled:cursor-not-allowed"
        whileHover={disabled ? {} : { scale: 1.03 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label="เพิ่มทักษะ"
      >
        <div className="relative w-full aspect-396/428 transition-all duration-300">
          <Image
            src={CARD_FRAME_SRC}
            alt=""
            fill
            sizes="25vw"
            className="w-full z-10 pointer-events-none"
          />
          <div className="absolute inset-[15%] z-20 flex items-center justify-center">
            <span className="text-yellow-200 text-5xl md:text-7xl leading-none">
              +
            </span>
          </div>
        </div>
        <p className="text-white text-center text-xs md:text-base 2xl:text-xl leading-tight select-none px-1 text-nowrap">
          เพิ่มทักษะ
        </p>
      </m.button>
    );
  }

  //? after_click_add: input pill + confirm / cancel
  return (
    <m.div
      className="flex flex-col items-center justify-center w-[23.56%] portrait:w-[55%] gap-3 lg:gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <div className="relative w-full aspect-396/428 transition-all duration-300">
        <Image
          src={CARD_FRAME_SRC}
          alt=""
          fill
          sizes="25vw"
          className="w-full z-10 pointer-events-none"
        />
        <div className="absolute inset-[15%] z-20 flex flex-col items-center justify-center gap-2 px-2">
          <div className="flex flex-col w-full items-center gap-5">
            <InputButton
              value={inputValue}
              onChange={(value) => {
                setInputValue(value);
                setErrorMsg(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleConfirm();
                }
                if (e.key === "Escape") handleCancel();
              }}
              placeholder="ระบุทักษะ"
              maxLength={30}
              className="w-full px-2! md:px-6! py-2! text-xs md:text-base 2xl:text-xl"
            />
            <div className="flex gap-3">
              <GradientButton
                text=""
                isSelected={true}
                onClick={handleConfirm}
                variant="white"
                className="p-2! md:p-3!"
              >
                <HiCheck className="text-xs md:text-base 2xl:text-xl" />
              </GradientButton>
              <GradientButton
                text=""
                isSelected={true}
                onClick={handleCancel}
                variant="transparent"
                className="p-2! md:p-3!"
              >
                <HiOutlineX className="text-xs md:text-base 2xl:text-xl" />
              </GradientButton>
            </div>
            {errorMsg && (
              <p className="text-rose-300 text-[10px] md:text-xs 2xl:text-sm text-center leading-tight px-1">
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="text-white text-center text-xs md:text-base 2xl:text-xl leading-tight select-none px-1 text-nowrap">
        เพิ่มทักษะ
      </p>
    </m.div>
  );
}

// ────────────────────────────────────────────────────
//  Custom Skill Card — 1 skill per card
// ────────────────────────────────────────────────────

function CustomSkillCard({
  skill,
  onRemove,
}: {
  skill: string;
  onRemove: (skill: string) => void;
}) {
  return (
    <m.button
      type="button"
      onClick={() => onRemove(skill)}
      title={`คลิกเพื่อลบ: ${skill}`}
      aria-label={`ลบทักษะ ${skill}`}
      className="flex flex-col items-center justify-center cursor-pointer w-[23.56%] portrait:w-[55%] gap-3 lg:gap-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative w-full aspect-396/428 transition-all duration-300">
        <Image
          src={SELECTED_FRAME_SRC}
          alt=""
          fill
          sizes="25vw"
          className="w-full z-10 pointer-events-none"
        />
        <div className="absolute inset-[15%] z-20 flex flex-col items-center justify-center gap-2 px-2">
          <div className="w-full px-3 md:px-5 py-2 md:py-3 text-xs md:text-lg 2xl:text-2xl text-white transition-colors truncate">
            {skill}
          </div>
        </div>
      </div>
      <p className="text-yellow-200 text-center text-xs md:text-base 2xl:text-xl leading-tight select-none px-1 text-nowrap">
        ทักษะที่เพิ่มเอง
      </p>
    </m.button>
  );
}

// ────────────────────────────────────────────────────
//  Dot Navigation
// ────────────────────────────────────────────────────

function DotNavigation({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-0 md:gap-1">
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            type="button"
            key={`dot-page-${pageNum}`}
            onClick={() => onPageChange(i)}
            className="p-2 md:p-2.5 cursor-pointer"
            aria-label={`Go to page ${pageNum}`}
          >
            <span
              className={`
              block rounded-full transition-all duration-300
              ${
                currentPage === i
                  ? "w-2 h-2 md:w-3.5 md:h-3.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  : "w-1.5 h-1.5 md:w-3 md:h-3 bg-white/30 hover:bg-white/60"
              }
            `}
            />
          </button>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────
//  Main Component: S7_1 (Hard Skills Carousel)
// ────────────────────────────────────────────────────

export default function S7_1({ scrollYProgress, onCompleted }: S7_1Props) {
  const { isMobile } = useDevice();
  const { playSfx } = useAudio();

  //? Carousel State
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const totalSelections = selectedSkills.length + customSkills.length;

  //? inject custom-skills-list card เมื่อมีทักษะที่เพิ่มเอง
  const displayCards = useMemo<DisplayCard[]>(() => {
    const cards: DisplayCard[] = [
      ...HARD_SKILL_CARDS,
      ...customSkills.map((skill) => ({
        id: `custom-skill-${skill}`,
        label: "ทักษะที่เพิ่มเอง",
        isCustomSkillCard: true,
        customSkillValue: skill,
      })),
    ];
    if (totalSelections < MAX_SELECTIONS) {
      cards.push({
        id: ADD_SKILL_CARD_ID,
        label: "เพิ่มทักษะ",
        isAddCard: true,
      });
    }
    return cards;
  }, [customSkills, totalSelections]);

  const totalPages = Math.ceil(displayCards.length / ITEMS_PER_PAGE);

  //? Clamp currentPage เมื่อการ์ดหายออกจาก displayCards
  useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(displayCards.length / ITEMS_PER_PAGE) - 1,
    );
    if (currentPage > maxPage) setCurrentPage(maxPage);
  }, [displayCards.length, currentPage]);

  //? Preload all card images เพื่อให้ icon ขึ้นเร็วเมื่อเลื่อนหน้า carousel
  useEffect(() => {
    const sources = [
      CARD_FRAME_SRC,
      SELECTED_FRAME_SRC,
      ARROW_L_SRC,
      ARROW_R_SRC,
      ...HARD_SKILL_CARDS.map((c) => c.imageSrc),
    ];
    for (const src of sources) {
      const img = new window.Image();
      img.src = src;
    }
  }, []);

  //? Get cards for the current page
  const currentCards = useMemo(
    () =>
      displayCards.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE,
      ),
    [currentPage, displayCards],
  );

  // ─── Animation Timeline (0-1 within 200vh) ───

  //? Main container opacity / zIndex
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [-1, 10, 10, -1],
  );

  //? 1. bgcircle (animGroup 1)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  //? 2. starlight (animGroup 2)
  const starlightOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  //? 3. Question text
  const questionOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const questionY = useTransform(scrollYProgress, [0.15, 0.25], [30, 0]);

  //? 4. Carousel area
  const carouselOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const carouselY = useTransform(scrollYProgress, [0.25, 0.4], [40, 0]);

  //? Animation Map for SceneLayer background
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: bgOpacity },
    }),
    [bgOpacity],
  );

  // ─── Handlers ───

  //? ใช้ ref เก็บ onCompleted เพื่อหลีกเลี่ยง stale closure
  const onCompletedRef = useRef(onCompleted);
  onCompletedRef.current = onCompleted;

  const emitCompletion = useCallback(
    (nextSelected: string[], nextCustom: string[]) => {
      const total = nextSelected.length + nextCustom.length;
      if (total >= MIN_SELECTIONS && total <= MAX_SELECTIONS) {
        queueMicrotask(() => {
          onCompletedRef.current?.({
            selectedHardSkills: nextSelected,
            customHardSkills: nextCustom,
          });
        });
        return;
      }

      queueMicrotask(() => {
        onCompletedRef.current?.(null);
      });
    },
    [],
  );

  const handleCardToggle = useCallback(
    (label: string) => {
      playSfx(getAudioUrl("Sound/Pop_Select_Button.mp3"));
      setValidationMessage(null);
      setSelectedSkills((prev) => {
        if (prev.includes(label)) {
          const next = prev.filter((s) => s !== label);
          emitCompletion(next, customSkills);
          return next;
        }

        if (prev.length + customSkills.length >= MAX_SELECTIONS) {
          setValidationMessage(`เลือกได้สูงสุด ${MAX_SELECTIONS} อย่าง`);
          return prev;
        }

        const next = [...prev, label];
        emitCompletion(next, customSkills);
        return next;
      });
    },
    [playSfx, customSkills, emitCompletion],
  );

  //? handleAddSkill: ส่งผ่าน AddSkillCard เพื่อ validate และเพิ่มทักษะ
  //? Return null = สำเร็จ, return string = error message แสดงใน card
  const handleAddSkill = useCallback(
    (value: string): string | null => {
      const trimmed = value.trim();
      if (!trimmed) return "กรุณากรอกชื่อทักษะก่อนเพิ่ม";
      if (trimmed.length > 30) return "ชื่อทักษะต้องไม่เกิน 30 ตัวอักษร";
      const normalized = trimmed.toLowerCase();
      if (
        selectedSkills.some((s) => s.toLowerCase() === normalized) ||
        customSkills.some((s) => s.toLowerCase() === normalized)
      ) {
        return "ทักษะนี้มีอยู่แล้ว";
      }
      if (selectedSkills.length + customSkills.length >= MAX_SELECTIONS) {
        return `เลือกได้สูงสุด ${MAX_SELECTIONS} อย่าง`;
      }
      playSfx(getAudioUrl("Sound/Pop_Select_Button.mp3"));
      const nextCustom = [...customSkills, trimmed];
      setCustomSkills(nextCustom);
      emitCompletion(selectedSkills, nextCustom);
      return null;
    },
    [selectedSkills, customSkills, playSfx, emitCompletion],
  );

  const handleRemoveCustomSkill = useCallback(
    (skill: string) => {
      playSfx(getAudioUrl("Sound/Pop_Select_Button.mp3"));
      const nextCustom = customSkills.filter((item) => item !== skill);
      setCustomSkills(nextCustom);
      setValidationMessage(null);
      emitCompletion(selectedSkills, nextCustom);
    },
    [customSkills, selectedSkills, playSfx, emitCompletion],
  );

  const goToPage = useCallback(
    (page: number) => {
      const next = ((page % totalPages) + totalPages) % totalPages;
      if (next === currentPage) return;
      playSfx(getAudioUrl("Sound/Pop_Select_Button.mp3"));
      setSlideDirection(page > currentPage ? 1 : -1);
      setCurrentPage(next);
    },
    [totalPages, currentPage, playSfx],
  );

  // ─── Carousel slide variants ───
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen bg-[linear-gradient(0deg,#28286f_0%,#26276b_23%,#222461_43%,#1b1f4f_62%,#121836_80%,#060f16_97%,#040e11_100%)] overflow-hidden"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen  portrait:w-auto">
        <SceneLayer
          items={SCENE_S7_1_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* Starlight (Lottie) */}
          {isMobile ? (
            <m.div
              className="absolute"
              style={{
                width: "87.63%",
                height: "22.01%",
                left: "6.18%",
                top: "-9.82%",
                opacity: starlightOpacity,
              }}
            >
              <LazyLottie
                src={getJsonUrl("Scene/Scene7/02/s7-starlight-mb.json")}
                className="w-full h-full"
                loop
                playTrigger={starlightOpacity}
              />
            </m.div>
          ) : (
            <m.div
              className="absolute"
              style={{
                width: "90.12%",
                height: "39.13%",
                left: "4.94%",
                top: "-0.35%",
                opacity: starlightOpacity,
              }}
            >
              <LazyLottie
                src={getJsonUrl("Scene/Scene7/02/s7-starlight.json")}
                className="w-full h-full"
                loop
                playTrigger={starlightOpacity}
              />
            </m.div>
          )}

          {/* Content Layer */}
          <div className="absolute inset-0 flex flex-col items-center justify-start p-[6.7%] portrait:p-0 portrait:pt-[15.74%] portrait:gap-[2%]">
            {/*? Question Text */}
            <m.div
              className="flex flex-col items-center justify-center w-full select-none py-[4.6%] portrait:py-0"
              style={{
                opacity: questionOpacity,
                y: questionY,
              }}
            >
              <MysteriousText
                text={
                  "จงเลือกสิ่งที่เจ้าถนัดมากที่สุด อย่างน้อย 1 อย่าง และไม่เกิน 3 อย่าง \n ถ้าไม่แน่ใจ ให้เลือกสิ่งที่คิดว่าทำได้ดี ณ ตอนนี้ ? (Hard Skills)"
                }
                scrollYProgress={scrollYProgress}
                startProgress={0.15}
                endProgress={0.25}
                className="text-white text-sm md:text-lg 2xl:text-2xl leading-normal text-center"
              />
              {/*? Selection Counter */}
              <m.p
                className="text-center mt-1 sm:mt-2 select-none text-xs md:text-base xl:text-lg text-gray-300"
                style={{ opacity: carouselOpacity }}
              >
                เลือกแล้ว {totalSelections}/{MAX_SELECTIONS} (ขั้นต่ำ{" "}
                {MIN_SELECTIONS} อย่าง เพื่อเลื่อนไปยังส่วนถัดไป)
              </m.p>
            </m.div>

            {/*? Carousel Area: Arrows + Cards + Dots */}
            <m.div
              className="flex flex-col items-center justify-center w-full h-full"
              style={{ opacity: carouselOpacity, y: carouselY }}
            >
              {/* Carousel Row: Arrow + Cards + Arrow */}
              <div className="flex items-center justify-center w-[87.5%] aspect-1680/506 portrait:w-[65%] portrait:aspect-713/1398">
                {/* Left Arrow */}
                <CarouselArrow
                  direction="left"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={false}
                />

                {/* Cards Container */}
                <div className="flex w-full h-full">
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <m.div
                      key={`page-${currentPage}`}
                      custom={slideDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="flex justify-center items-center gap-[5%] portrait:flex-col portrait:gap-[1.56%] w-full h-full"
                    >
                      {currentCards.map((card) =>
                        card.isCustomSkillCard && card.customSkillValue ? (
                          <CustomSkillCard
                            key={card.id}
                            skill={card.customSkillValue}
                            onRemove={handleRemoveCustomSkill}
                          />
                        ) : card.isAddCard ? (
                          <AddSkillCard
                            key={card.id}
                            onAdd={handleAddSkill}
                            disabled={totalSelections >= MAX_SELECTIONS}
                          />
                        ) : (
                          <SkillCard
                            key={card.id}
                            imageSrc={card.imageSrc ?? ""}
                            label={card.label}
                            isSelected={selectedSkills.includes(card.label)}
                            onClick={() => handleCardToggle(card.label)}
                          />
                        ),
                      )}
                    </m.div>
                  </AnimatePresence>
                </div>

                {/* Right Arrow */}
                <CarouselArrow
                  direction="right"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={false}
                />
              </div>

              {/* Dot Navigation */}
              <div className="mt-3 sm:mt-5 md:mt-10 pointer-events-auto relative z-10">
                <DotNavigation
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={goToPage}
                />
              </div>

              {validationMessage && (
                <p className="mt-2 text-center text-xs md:text-sm text-rose-300 pointer-events-none">
                  {validationMessage}
                </p>
              )}
            </m.div>
          </div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
