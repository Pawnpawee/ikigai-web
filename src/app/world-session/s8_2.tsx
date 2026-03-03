"use client";

import {
  AnimatePresence,
  type MotionValue,
  m,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import {
  ARROW_L_SRC,
  ARROW_R_SRC,
  CARD_FRAME_SRC,
  GIFT_CARDS,
  ITEMS_PER_PAGE,
  MIN_GIFT_SELECTIONS,
  S8_2_QUESTION,
  S8_2_QUESTION_MOBILE,
  SCENE_S8_2_ITEMS,
  SELECTED_FRAME_SRC,
} from "@/app/data/scene_s8_2.data";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import { useAudio } from "../contexts/AudioContext";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S8_2Data {
  selectedGifts: string[];
  customGifts: string[];
}

interface S8_2Props {
  scrollYProgress: MotionValue<number>;
  onCompleted?: (data: S8_2Data | null) => void;
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
//  Gift Card Component
// ────────────────────────────────────────────────────

function GiftCard({
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
      className="flex flex-col items-center justify-center cursor-pointer w-[23.56%] portrait:w-[55%] gap-3 md:gap-5"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/*? Card Frame */}
      <div className="relative w-full aspect-396/428 transition-all duration-300">
        {/*? Frame border — switches to selected_frame when selected */}
        <Image
          src={isSelected ? SELECTED_FRAME_SRC : CARD_FRAME_SRC}
          alt=""
          fill
          sizes="25vw"
          className="w-full z-10 pointer-events-none"
        />

        {/*? Gift illustration inside the frame */}
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

      <div className="flex items-start justify-center overflow-visible">
        {/*? Card label below the frame */}
        <p
          className={`
					text-white text-center text-xs md:text-base lg:text-xl
					leading-tight select-none px-1 whitespace-pre-line min-w-max
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
    <div className="flex items-center justify-center gap-2 md:gap-3">
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            type="button"
            key={`dot-page-${pageNum}`}
            onClick={() => onPageChange(i)}
            className={`
						rounded-full transition-all duration-300 cursor-pointer
						${
              currentPage === i
                ? "w-2 h-2 md:w-3.5 md:h-3.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                : "w-1.5 h-1.5 md:w-3 md:h-3 bg-white/30 hover:bg-white/50"
            }
					`}
            aria-label={`Go to page ${pageNum}`}
          />
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────
//  Main Component: S8_2 (Select Gifts — Carousel)
//  Figma: Desktop 867:7249, Mobile 867:13163
//  Uses bg-s8-2 green gradient + bgelement SceneLayer
//  Animation: fade in → bg → question → carousel → fade out
// ────────────────────────────────────────────────────

export default function S8_2({ scrollYProgress, onCompleted }: S8_2Props) {
  const { isMobile } = useDevice();
  const { playSfx } = useAudio();

  //? Carousel State
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedGifts, setSelectedGifts] = useState<string[]>([]);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const totalPages = Math.ceil(GIFT_CARDS.length / ITEMS_PER_PAGE);

  //? Get cards for the current page
  const currentCards = useMemo(
    () =>
      GIFT_CARDS.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE,
      ),
    [currentPage],
  );

  // ─── Animation Timeline (0-1 within 200vh) ───

  //? Main container opacity / zIndex
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [-1, 10, 10, -1],
  );

  //? 1. bgelement (animGroup 1)
  const bgElementOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  //? 2. Question text
  const questionOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const questionY = useTransform(scrollYProgress, [0.1, 0.2], [30, 0]);

  //? 3. Carousel area
  const carouselOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const carouselY = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);

  //? Animation Map for SceneLayer background
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: bgElementOpacity },
    }),
    [bgElementOpacity],
  );

  // ─── Refs (avoid stale closures) ───

  const onCompletedRef = useRef(onCompleted);
  onCompletedRef.current = onCompleted;

  // ─── Handlers ───

  const handleCardToggle = useCallback(
    (label: string) => {
      playSfx(getAudioUrl("Sound/Pop_Select_Button.mp3"));
      setSelectedGifts((prev) => {
        const next = prev.includes(label)
          ? prev.filter((g) => g !== label)
          : [...prev, label];

        //? เมื่อเลือกครบตาม MIN_GIFT_SELECTIONS → เรียก onCompleted ทันที
        if (next.length >= MIN_GIFT_SELECTIONS) {
          //? ใช้ queueMicrotask เพื่อเรียกหลัง setState เสร็จ (ไม่ setState ซ้อน)
          queueMicrotask(() => {
            onCompletedRef.current?.({
              selectedGifts: next,
              customGifts: [],
            });
          });
        } else {
          //? เมื่อเลือกไม่ครบ → แจ้ง parent ให้ล็อค scroll กลับ
          queueMicrotask(() => {
            onCompletedRef.current?.(null);
          });
        }

        return next;
      });
    },
    [playSfx],
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page < 0 || page >= totalPages || page === currentPage) return;
      playSfx(getAudioUrl("Sound/Pop_Select_Button.mp3"));
      setSlideDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
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
      className="fixed flex justify-center top-0 h-screen w-screen bg-s8-2 overflow-hidden"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto">
        <SceneLayer
          items={SCENE_S8_2_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
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
                text={isMobile ? S8_2_QUESTION_MOBILE : S8_2_QUESTION}
                scrollYProgress={scrollYProgress}
                startProgress={0.1}
                endProgress={0.2}
                className="text-white text-sm md:text-lg lg:text-2xl leading-normal text-center"
              />
              {/*? Selection Counter */}
              <m.p
                className="text-center mt-1 sm:mt-2 select-none text-xs md:text-base xl:text-lg text-gray-300"
                style={{ opacity: carouselOpacity }}
              >
                เลือกแล้ว {selectedGifts.length} (ตอบได้หลายข้อ ขั้นต่ำ{" "}
                {MIN_GIFT_SELECTIONS} อย่าง เพื่อเลื่อนไปยังส่วนถัดไป)
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
                  disabled={currentPage === 0}
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
                      {currentCards.map((card) => (
                        <GiftCard
                          key={card.id}
                          imageSrc={card.imageSrc}
                          label={card.label}
                          isSelected={selectedGifts.includes(card.label)}
                          onClick={() => handleCardToggle(card.label)}
                        />
                      ))}
                    </m.div>
                  </AnimatePresence>
                </div>

                {/* Right Arrow */}
                <CarouselArrow
                  direction="right"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                />
              </div>

              {/* Dot Navigation */}
              <div className="mt-3 sm:mt-5 md:mt-10">
                <DotNavigation
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={goToPage}
                />
              </div>
            </m.div>
          </div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
