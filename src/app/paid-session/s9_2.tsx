"use client";

import {
  AnimatePresence,
  type MotionValue,
  m,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import { useAudio } from "../contexts/AudioContext";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S9_2Data {
  selectedJobCards: string[];
}

interface S9_2Props {
  scrollYProgress: MotionValue<number>;
  onCompleted?: (data: S9_2Data | null) => void;
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
  onViewMore,
}: {
  avatarSrc: string;
  category: string;
  jobs: string[];
  isSelected: boolean;
  onClick: () => void;
  onViewMore: () => void;
}) {
  return (
    <div className="flex flex-col  w-[26.81%] portrait:w-[62%] gap-1 md:gap-2 relative z-20">
      <m.button
        type="button"
        onClick={onClick}
        //? Desktop: 450.40/1680 = 26.81%, Mobile: 389.35/1080 = 36.05% (Parent handles width now)
        className="flex flex-col  cursor-pointer w-full gap-0"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/*? Card Frame — aspect 450.40/520.11 ≈ aspect-450/520 */}
        <div className="relative w-full aspect-450/520 transition-all duration-300 flex items-center justify-start">
          {/*? Frame border image — switches to selected_frame when selected */}
          <Image
            src={isSelected ? SELECTED_FRAME_SRC : CARD_FRAME_SRC}
            alt=""
            fill
            sizes="25vw"
            className="w-full pointer-events-none z-0"
          />

          {/*? Inner content: Avatar + labels */}
          <div className="relative z-10 flex flex-col items-center w-full p-[3%] md:p-[5%]">
            {/*? Avatar illustration — 314.16/450.40 = 69.75% width, aspect 314/280 */}
            <div className="relative aspect-314/280 overflow-hidden w-[65%]">
              <Image
                src={avatarSrc}
                alt={category}
                fill
                sizes="20vw"
                className="object-contain"
              />
            </div>

            {/*? Text labels — category + top 3 jobs */}
            <div className="flex flex-col items-center w-full gap-1 xl:gap-2 h-full mt-[5%]">
              <p
                className={`
                  flex items-center justify-center text-center text-[10px] min-[376px]:text-xs md:text-base 2xl:text-xl select-none w-full align-middle whitespace-pre-line
                  transition-colors duration-300 h-[2.5em] leading-tight
                  ${isSelected ? "text-yellow-300 font-semibold" : "text-white/90"}
                `}
              >
                {category}
              </p>
              <p className="text-center text-[9px] min-[376px]:text-[10px] md:text-sm text-black line-clamp-2 select-none px-4 h-[2.5em] leading-tight">
                {jobs.slice(0, 3).join(" · ")}
                {jobs.length > 3 && ` +${jobs.length - 3}`}
              </p>
              {/* Button below card for Desktop */}
              {/* Show "ดูเพิ่มเติม" if jobs > 3 OR the string length of the first 3 jobs is too long (causing line-clamp "...") */}
              {(jobs.length > 3 ||
                jobs.slice(0, 3).join(" · ").length > 35) && (
                <div className="hidden md:block relative z-25 ">
                  <button
                    type="button"
                    className="text-white text-[10px] md:text-xs xl:text-sm underline opacity-80 hover:opacity-100 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewMore();
                    }}
                  >
                    ดูเพิ่มเติม
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </m.button>
    </div>
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
//  Main Component: S9_2 (Job Cards Carousel)
// ────────────────────────────────────────────────────

export default function S9_2({ scrollYProgress, onCompleted }: S9_2Props) {
  const { isMobile } = useDevice();
  const { playSfx } = useAudio();

  //? Carousel State
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [viewMoreJobs, setViewMoreJobs] = useState<{
    category: string;
    jobs: string[];
  } | null>(null);

  const totalPages = Math.ceil(JOB_CARDS.length / ITEMS_PER_PAGE);

  //? Preload all card images เพื่อให้ icon ขึ้นเร็วเมื่อเลื่อนหน้า carousel
  useEffect(() => {
    const sources = [
      CARD_FRAME_SRC,
      SELECTED_FRAME_SRC,
      ARROW_L_SRC,
      ARROW_R_SRC,
      ...JOB_CARDS.map((c) => c.avatarSrc),
    ];
    for (const src of sources) {
      const img = new window.Image();
      img.src = src;
    }
  }, []);

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

  const handleCardToggle = useCallback(
    (category: string) => {
      playSfx(getAudioUrl("Sound/Pop_Select_Button.mp3"));
      setSelectedCards((prev) => {
        //? Single-select: เลือกได้แค่ 1 ใบ — กดซ้ำ = ยกเลิก
        const isDeselecting = prev.includes(category);
        const next = isDeselecting ? [] : [category];

        if (next.length >= MIN_SELECTIONS) {
          queueMicrotask(() => {
            onCompletedRef.current?.({ selectedJobCards: next });
          });
        } else {
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
      className="fixed flex justify-center top-0 h-screen w-screen overflow-hidden bg-[linear-gradient(180deg,#ffd064_2.82%,#efbd5a_10.35%,#cd9345_29.15%,#b17234_47.95%,#9d5a27_65.82%,#924b20_82.74%,#8e471e_96.84%)]"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto">
        <SceneLayer
          items={SCENE_S9_2_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* Content Layer */}
          <div className="absolute inset-0 flex flex-col items-center justify-start p-[8%] portrait:p-[3%] portrait:pt-[13%]">
            {/*? Question Text — Desktop: (120,130) = 6.25%, 12.04% */}
            <m.div
              className="flex flex-col items-center justify-center w-full select-none py-[2%] portrait:py-0"
              style={{ opacity: questionOpacity, y: questionY }}
            >
              <MysteriousText
                text={S9_2_QUESTION_TEXT}
                scrollYProgress={scrollYProgress}
                startProgress={0.15}
                endProgress={0.25}
                className="text-white text-xs min-[376px]:text-sm md:text-lg 2xl:text-2xl leading-normal text-center"
              />
              {/*? Selection Counter */}
              <m.p
                className="text-center mt-1 sm:mt-2 select-none text-[10px] min-[376px]:text-xs md:text-base xl:text-lg text-white"
                style={{ opacity: carouselOpacity }}
              >
                {selectedCards.length > 0
                  ? `เลือกเพียง 1 สาขา คุณเลือก: ${selectedCards[0]}`
                  : "กรุณาเลือก 1 สาขา"}
              </m.p>
            </m.div>

            {/*? Carousel Area: Arrows + Cards + Dots */}
            <m.div
              className="flex flex-col items-center justify-center w-full mb-5"
              style={{ opacity: carouselOpacity, y: carouselY }}
            >
              {/*? Carousel Row: Arrow + Cards + Arrow */}
              {/*? Desktop: 1680/1920 = 87.5%, aspect 1680/520 */}
              {/*? Mobile: 706.73/1080 = 65.44%, aspect 706/1428 */}
              <div
                className="flex items-center justify-center
                w-[87.5%] aspect-1680/520 portrait:w-[68%] portrait:aspect-706/1428"
              >
                {/* Left Arrow */}
                <CarouselArrow
                  direction="left"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={false}
                />

                {/* Cards Container */}
                <div className="flex w-full h-full mt-[3%]">
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
                      className="flex justify-center items-start portrait:items-center portrait:flex-col w-full h-full gap-3 md:gap-5"
                    >
                      {currentCards.map((card) => (
                        <JobAvatarCard
                          key={card.id}
                          avatarSrc={card.avatarSrc}
                          category={card.category}
                          jobs={card.jobs}
                          isSelected={selectedCards.includes(card.category)}
                          onClick={() => handleCardToggle(card.category)}
                          onViewMore={() =>
                            setViewMoreJobs({
                              category: card.category,
                              jobs: card.jobs,
                            })
                          }
                        />
                      ))}
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
              <div className="pointer-events-auto relative z-10 mt-2 portrait:mt-4">
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

      {/* Jobs Preview Modal */}
      <AnimatePresence>
        {viewMoreJobs && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setViewMoreJobs(null)}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white text-black w-full max-w-2xl rounded-2xl p-6 md:p-10 shadow-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setViewMoreJobs(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                ✕
              </button>

              <div className="flex flex-col items-center">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-[#8e471e] pr-6 w-full">
                  {viewMoreJobs.category}
                </h3>

                <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-h-[60vh] overflow-y-auto w-full custom-scrollbar pr-2">
                  {viewMoreJobs.jobs.map((job) => (
                    <span
                      key={job}
                      className="bg-yellow-50 border border-yellow-700/20 text-[#8e471e] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm shadow-sm"
                    >
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}
