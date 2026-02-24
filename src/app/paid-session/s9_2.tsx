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
  ITEMS_PER_PAGE,
  JOB_CARDS,
  MIN_SELECTIONS,
  S9_2_QUESTION_TEXT,
  SCENE_S9_2_ITEMS,
  SELECTED_FRAME_SRC,
} from "@/app/data/scene_s9_2.data";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S9_2Data {
  selectedJobCards: string[];
}

interface S9_2Props {
  scrollYProgress: MotionValue<number>;
  onCompleted?: (data: S9_2Data) => void;
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
        z-10 flex items-center justify-center shrink-0
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
//  Job Avatar Card Component
// ────────────────────────────────────────────────────

function JobAvatarCard({
  avatarSrc,
  category,
  jobs,
  isSelected,
  onClick,
}: {
  avatarSrc: string;
  category: string;
  jobs: string[];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      //? Desktop: 450.40/1680 = 26.81%, Mobile: 389.35/1080 = 36.05%
      className="flex flex-col items-center justify-center cursor-pointer
        w-[26.81%] portrait:w-[69%] gap-0"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/*? Card Frame — aspect 450.40/520.11 ≈ aspect-450/520 */}
      <div className="relative w-full aspect-450/520 transition-all duration-300">
        {/*? Frame border image — switches to selected_frame when selected */}
        <Image
          src={isSelected ? SELECTED_FRAME_SRC : CARD_FRAME_SRC}
          alt=""
          fill
          sizes="25vw"
          className="w-full pointer-events-none"
        />

        {/*? Inner content: Avatar + labels */}
        <div
          className="absolute flex flex-col items-center
          inset-x-[15.12%] top-[7.30%] bottom-[3%] gap-[3.90%]"
        >
          {/*? Avatar illustration — 314.16/450.40 = 69.75% width, aspect 314/280 */}
          <div className="relative w-full aspect-314/280 overflow-hidden shrink-0 portrait:w-[80%]">
            <Image
              src={avatarSrc}
              alt={category}
              fill
              sizes="20vw"
              className="object-contain"
            />
          </div>

          {/*? Text labels — category + top 3 jobs */}
          <div className="flex flex-col items-center w-full gap-[4%] h-full">
            <p
              className={`
                flex items-center justify-center text-center text-[10px] min-[375px]:text-xs md:text-base lg:text-xl select-none w-[140%] min-h-[50%] align-middle whitespace-pre-line
                 transition-colors duration-300
                ${isSelected ? "text-yellow-300 font-semibold" : "text-white/90"}
              `}
            >
              {category}
            </p>
            <p className="text-center text-[9px] min-[375px]:text-xs md:text-sm lg:text-base text-black line-clamp-2 select-none">
              {jobs.slice(0, 3).join(" · ")}
              {jobs.length > 3 && ` +${jobs.length - 3}`}
            </p>
          </div>
        </div>
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
//  Main Component: S9_2 (Job Cards Carousel)
// ────────────────────────────────────────────────────

export default function S9_2({ scrollYProgress, onCompleted }: S9_2Props) {
  const { isMobile } = useDevice();

  //? Carousel State
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const totalPages = Math.ceil(JOB_CARDS.length / ITEMS_PER_PAGE);

  //? Get cards for the current page
  const currentCards = useMemo(
    () =>
      JOB_CARDS.slice(
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

  //? animGroup 1: element_bg
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  //? animGroup 2: bgelement
  const bgElementOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  //? Question text
  const questionOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const questionY = useTransform(scrollYProgress, [0.15, 0.25], [30, 0]);

  //? Carousel area
  const carouselOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const carouselY = useTransform(scrollYProgress, [0.25, 0.4], [40, 0]);

  //? Animation Map for SceneLayer background
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: bgOpacity },
      2: { opacity: bgElementOpacity },
    }),
    [bgOpacity, bgElementOpacity],
  );

  // ─── Handlers ───

  const onCompletedRef = useRef(onCompleted);
  onCompletedRef.current = onCompleted;

  const handleCardToggle = useCallback((category: string) => {
    setSelectedCards((prev) => {
      const next = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      //? เมื่อเลือกครบตาม MIN_SELECTIONS → เรียก onCompleted ทันที
      if (next.length >= MIN_SELECTIONS) {
        queueMicrotask(() => {
          onCompletedRef.current?.({ selectedJobCards: next });
        });
      }

      return next;
    });
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 0 || page >= totalPages || page === currentPage) return;
      setSlideDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
    },
    [totalPages, currentPage],
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
      className="fixed flex justify-center top-0 h-screen w-screen overflow-hidden bg-s9-2"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto">
        <SceneLayer
          items={SCENE_S9_2_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* Content Layer */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-start
            p-[6.25%] portrait:p-0 portrait:pt-[6.97%] portrait:gap-[2%]"
          >
            {/*? Question Text — Desktop: (120,130) = 6.25%, 12.04% */}
            <m.div
              className="flex flex-col items-center justify-center w-full select-none
                py-[3%] portrait:py-0"
              style={{ opacity: questionOpacity, y: questionY }}
            >
              <MysteriousText
                text={S9_2_QUESTION_TEXT}
                scrollYProgress={scrollYProgress}
                startProgress={0.15}
                endProgress={0.25}
                className="text-white text-base md:text-2xl lg:text-3xl leading-normal text-center"
              />
              {/*? Selection Counter */}
              <m.p
                className="text-center mt-1 sm:mt-2 select-none text-xs md:text-base xl:text-lg text-white"
                style={{ opacity: carouselOpacity }}
              >
                เลือกแล้ว {selectedCards.length} สาขา (ขั้นต่ำ {MIN_SELECTIONS}{" "}
                อย่าง)
              </m.p>
            </m.div>

            {/*? Carousel Area: Arrows + Cards + Dots */}
            <m.div
              className="flex flex-col items-center justify-center w-full h-full"
              style={{ opacity: carouselOpacity, y: carouselY }}
            >
              {/*? Carousel Row: Arrow + Cards + Arrow */}
              {/*? Desktop: 1680/1920 = 87.5%, aspect 1680/520 */}
              {/*? Mobile: 706.73/1080 = 65.44%, aspect 706/1428 */}
              <div
                className="flex items-center justify-center
                w-[87.5%] aspect-1680/520 portrait:w-[65.44%] portrait:aspect-706/1428"
              >
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
                      className="flex justify-center items-center
                        gap-[2.38%] portrait:flex-col portrait:gap-[2.80%]
                        w-full h-full"
                    >
                      {currentCards.map((card) => (
                        <JobAvatarCard
                          key={card.id}
                          avatarSrc={card.avatarSrc}
                          category={card.category}
                          jobs={card.jobs}
                          isSelected={selectedCards.includes(card.category)}
                          onClick={() => handleCardToggle(card.category)}
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
