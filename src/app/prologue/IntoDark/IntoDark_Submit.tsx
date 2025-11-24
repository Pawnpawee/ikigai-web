"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Lottie from "lottie-react";
import GradientButton from "@/app/components/ui/GradientButton";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import catAnimationData from "../../../../../public/assets/Scene/Scene5/scene5-04/s5-4-cat.json";
import tailAnimationData from "../../../../../public/assets/Scene/Scene5/scene5-02/s5-2-tail.json";

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
  const isPortrait = useIsPortrait();

  // Main container opacity and z-index
  const opacity = useTransform(
    scrollYProgress,
    [0.667, 0.676, 0.944, 1.0],
    [0, 1, 1, 1],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.667, 0.668, 1.0],
    [-1, -1, 10, 10],
  );

  // Circle rotations (like Hero component)
  const circle1_rotate = useTransform(
    scrollYProgress,
    [0.676, 0.73],
    [0, -180],
  ); // Love - Top
  const circle2_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, 90]); // Skill - Left
  const circle3_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, 180]); // Paid - Bottom
  const circle4_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, -90]); // World - Right

  return (
    <div className="sticky top-0 w-full overflow-y-auto pointer-events-none">
      <motion.div
        className="flex items-center justify-center min-h-screen pointer-events-none"
        style={{
          opacity,
          zIndex,
          background: "var(--color-charcoal-black)",
        }}
      >
        <div
          className={`relative w-full pointer-events-auto flex flex-col items-center justify-between overflow-hidden ${
            isPortrait
              ? "aspect-1080/4320 px-5 py-20"
              : "aspect-1920/2160 px-[100px] py-[140px]"
          }`}
        >
          {/* Background Gradients - Absolute positioned */}
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-bg-gradient.svg"
            alt="gradient"
            fill
            className="absolute mix-blend-screen"
            style={{
              inset: isPortrait
                ? "9.61% 0% 60.42% 0%"
                : "-4.97% 16.29% 45.03% 16.29%",
            }}
          />
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-bg-gradient.svg"
            alt="gradient"
            fill
            className="absolute mix-blend-screen"
            style={{
              inset: isPortrait
                ? "68.04% -50% 0.62% -50%"
                : "43.6% -12.07% -6.29% 41.55%",
            }}
          />

          {/* Cloud 1 */}
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-cloud.svg"
            alt="cloud"
            fill
            className="absolute mix-blend-screen"
            style={{
              inset: isPortrait
                ? "45.35% -16.71% 50.9% 47.13%"
                : "47.8% 51.66% 44.68% 9.2%",
            }}
          />

          {/* Line Star 1 */}
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-line-star.svg"
            alt="line star"
            fill
            className="absolute"
            style={{
              inset: isPortrait
                ? "91.57% -6.47% 4.34% 78.06%"
                : "90.39% 47.38% 1.44% 36.63%",
            }}
          />

          {/* Little Stars - Background */}
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-little-star.svg"
            alt="little star"
            fill
            className="absolute"
            style={{
              inset: isPortrait
                ? "72.87% -73.17% 6.28% 16.67%"
                : "55.2% 7.76% 3.09% 4.21%",
            }}
          />
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-little-star.svg"
            alt="little star"
            fill
            className="absolute"
            style={{
              inset: isPortrait
                ? "52.57% 7.25% 28.56% 7.22%"
                : "56.68% 4.2% 5.58% 47.69%",
            }}
          />
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-little-star.svg"
            alt="little star"
            fill
            className="absolute"
            style={{
              inset: isPortrait
                ? "45.23% -32.35% 33.11% -17.04%"
                : "54.1% 3.59% 2.58% 12.38%",
            }}
          />
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-little-star.svg"
            alt="little star"
            fill
            className="absolute"
            style={{
              inset: isPortrait
                ? "25.87% -62.18% 67% 8.89%"
                : "2.41% 4.73% 83.33% 9.05%",
            }}
          />
          <Image
            src="/assets/Scene/Scene5/scene5-04/s5-4-little-star.svg"
            alt="little star"
            fill
            className="absolute"
            style={{
              inset: isPortrait
                ? "29.17% -60.63% 52.17% -5.19%"
                : "9% 1.44% 53.68% 4.53%",
            }}
          />

          {/* SECTION 1: Description with Circle Ikigai */}
          <div className="flex flex-col items-center gap-[30px] relative z-10 w-full shrink-0">
            <p className="typo-text-h3 text-center text-slate-100">
              ถ้าเจ้าหาจุดที่ทั้งสี่สายมาบรรจบกันได้… จะเกิดเป็น
            </p>

            {/* Circle Ikigai with 4 colored circles */}
            <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start">
              {/* World Circle - Top Right */}
              <motion.div
                className="[grid-area:1/1] relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start"
                style={{
                  marginLeft: isPortrait ? "226.97px" : "315.29px",
                  marginTop: isPortrait ? "113.59px" : "157.65px",
                  rotate: circle4_rotate,
                }}
              >
                <Image
                  src="/assets/Scene/Scene5/scene5-04/s5-4-circle-blue.svg"
                  alt="world circle"
                  width={isPortrait ? 302 : 420}
                  height={isPortrait ? 302 : 420}
                  className="[grid-area:1/1] relative"
                />
                <motion.div
                  className="[grid-area:1/1] flex flex-col items-center justify-center gap-2"
                  style={{
                    marginLeft: isPortrait ? "171.15px" : "237.58px",
                    marginTop: isPortrait ? "90.71px" : "125.98px",
                    rotate: useTransform(circle4_rotate, (v) => -v),
                  }}
                >
                  <Image
                    src="/assets/Scene/Scene5/scene5-04/s5-4-star.svg"
                    alt="star"
                    width={isPortrait ? 36 : 50}
                    height={isPortrait ? 36 : 50}
                  />
                  <p className="typo-text-h4 text-center whitespace-pre">
                    สิ่งที่{"\n"}โลกต้องการ
                  </p>
                </motion.div>
              </motion.div>

              {/* Paid Circle - Bottom */}
              <motion.div
                className="[grid-area:1/1] relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start"
                style={{
                  marginLeft: isPortrait ? "113.59px" : "157.64px",
                  marginTop: isPortrait ? "226.97px" : "315.3px",
                  rotate: circle3_rotate,
                }}
              >
                <Image
                  src="/assets/Scene/Scene5/scene5-04/s5-4-circle-orange.svg"
                  alt="paid circle"
                  width={isPortrait ? 302 : 420}
                  height={isPortrait ? 302 : 420}
                  className="[grid-area:1/1] relative"
                />
                <motion.div
                  className="[grid-area:1/1] flex flex-col items-center"
                  style={{
                    marginLeft: isPortrait ? "58.48px" : "81.23px",
                    marginTop: isPortrait ? "184.56px" : "256.33px",
                    width: isPortrait ? "185.93px" : "258px",
                    rotate: useTransform(circle3_rotate, (v) => -v),
                  }}
                >
                  <Image
                    src="/assets/Scene/Scene5/scene5-04/s5-4-coin.svg"
                    alt="coin"
                    width={isPortrait ? 36 : 50}
                    height={isPortrait ? 36 : 50}
                  />
                  <p className="typo-text-h4 text-center w-full">
                    สิ่งที่ทำให้เกิดรายได้
                  </p>
                </motion.div>
              </motion.div>

              {/* Skill Circle - Left */}
              <motion.div
                className="[grid-area:1/1] relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start"
                style={{
                  marginLeft: "0px",
                  marginTop: isPortrait ? "113.59px" : "157.65px",
                  rotate: circle2_rotate,
                }}
              >
                <Image
                  src="/assets/Scene/Scene5/scene5-04/s5-4-circle-pink.svg"
                  alt="skill circle"
                  width={isPortrait ? 302 : 420}
                  height={isPortrait ? 302 : 420}
                  className="[grid-area:1/1] relative"
                />
                <motion.div
                  className="[grid-area:1/1] flex flex-col items-center justify-center gap-2"
                  style={{
                    marginLeft: isPortrait ? "35.91px" : "49.87px",
                    marginTop: isPortrait ? "90.71px" : "125.98px",
                    rotate: useTransform(circle2_rotate, (v) => -v),
                  }}
                >
                  <Image
                    src="/assets/Scene/Scene5/scene5-04/s5-4-diamond.svg"
                    alt="diamond"
                    width={isPortrait ? 34 : 48}
                    height={isPortrait ? 36 : 50}
                  />
                  <p className="typo-text-h4 text-center whitespace-pre">
                    สิ่งที่{"\n"}เราถนัด
                  </p>
                </motion.div>
              </motion.div>

              {/* Love Circle - Top */}
              <motion.div
                className="[grid-area:1/1] relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start"
                style={{
                  marginLeft: isPortrait ? "113.59px" : "157.64px",
                  marginTop: "0px",
                  rotate: circle1_rotate,
                }}
              >
                <Image
                  src="/assets/Scene/Scene5/scene5-04/s5-4-circle-purple.svg"
                  alt="love circle"
                  width={isPortrait ? 302 : 420}
                  height={isPortrait ? 302 : 420}
                  className="[grid-area:1/1] relative"
                />
                <motion.div
                  className="[grid-area:1/1] flex flex-col items-center"
                  style={{
                    marginLeft: isPortrait ? "101.69px" : "141.23px",
                    marginTop: isPortrait ? "40.78px" : "56.63px",
                    width: isPortrait ? "99.39px" : "138px",
                    rotate: useTransform(circle1_rotate, (v) => -v),
                  }}
                >
                  <Image
                    src="/assets/Scene/Scene5/scene5-04/s5-4-heart.svg"
                    alt="heart"
                    width={isPortrait ? 37 : 52}
                    height={isPortrait ? 36 : 50}
                  />
                  <p className="typo-text-h4 text-center w-full">
                    สิ่งที่เรารัก
                  </p>
                </motion.div>
              </motion.div>

              {/* Intersect Text - Center labels */}
              <div
                className="[grid-area:1/1] relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start typo-text-h4 text-center whitespace-pre"
                style={{
                  marginLeft: isPortrait
                    ? "calc(50% - 147.36px)"
                    : "calc(50% - 204.61px)",
                  marginTop: isPortrait ? "149.51px" : "207.63px",
                }}
              >
                <p
                  className="[grid-area:1/1] relative -translate-x-1/2"
                  style={{
                    marginLeft: isPortrait ? "69.87px" : "97px",
                    marginTop: "0px",
                  }}
                >
                  แรงผลักดัน{"\n"}(Passion)
                </p>
                <p
                  className="[grid-area:1/1] relative -translate-x-1/2"
                  style={{
                    marginLeft: isPortrait ? "225px" : "312.5px",
                    marginTop: "0px",
                  }}
                >
                  หน้าที่{"\n"}(Mission)
                </p>
                <p
                  className="[grid-area:1/1] relative -translate-x-1/2"
                  style={{
                    marginLeft: isPortrait ? "227.52px" : "316px",
                    marginTop: isPortrait ? "170.64px" : "237px",
                  }}
                >
                  ทักษะวิชาชีพ{"\n"}(Vocation)
                </p>
                <p
                  className="[grid-area:1/1] relative -translate-x-1/2"
                  style={{
                    marginLeft: isPortrait ? "64.44px" : "89.5px",
                    marginTop: isPortrait ? "170.64px" : "237px",
                  }}
                >
                  อาชีพ{"\n"}(Profession)
                </p>
              </div>
            </div>

            {/* Long description text */}
            <div className="typo-text-h3 text-center text-slate-100 w-full">
              <p className="mb-0">
                พื้นที่ของ "ความหมาย" ในชีวิตและงานของแต่ละบุคคล
              </p>
              <p className="mb-0">
                ใช้เพื่อเตรียมความพร้อมและส่งเสริมการปรับตัวเข้าสู่สังคมการทำงาน
              </p>
              <p className="mb-0">
                หากได้ศึกษาหรือเข้าใจอิคิไก
                ก่อนที่จะเลือกเรียนหรือเลือกประกอบอาชีพ
              </p>
              <p>
                ก็จะมีประโยชน์มากยิ่งขึ้น
                และอาจพาเจ้าออกจากความมัวมืดในคืนนี้ได้
              </p>
            </div>
          </div>

          {/* SECTION 2: Submit Cat with Text */}
          <div
            className={`flex items-center relative z-10 w-full shrink-0 ${isPortrait ? "flex-col gap-10" : "justify-between"}`}
          >
            {/* Cat Frame */}
            <div
              className={`relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start shrink-0 ${isPortrait ? "" : ""}`}
            >
              {/* Light Cat - Glow */}
              <Image
                src="/assets/Scene/Scene5/scene5-04/s5-4-light-cat.svg"
                alt="light cat"
                width={isPortrait ? 244 : 339}
                height={isPortrait ? 226 : 314}
                className="[grid-area:1/1] mix-blend-screen relative"
                style={{
                  marginLeft: isPortrait ? "151.32px" : "210.18px",
                  marginTop: isPortrait ? "150.73px" : "209.33px",
                }}
              />

              {/* Tail Animation */}
              <div
                className="[grid-area:1/1] relative"
                style={{
                  width: isPortrait ? "230.4px" : "320px",
                  height: isPortrait ? "216px" : "300px",
                  marginLeft: isPortrait ? "340.95px" : "473.54px",
                  marginTop: "0px",
                }}
              >
                <Lottie
                  animationData={tailAnimationData}
                  loop={true}
                  className="w-full h-full"
                />
              </div>

              {/* Cat Animation */}
              <div
                className="[grid-area:1/1] relative"
                style={{
                  width: isPortrait ? "360.46px" : "500.64px",
                  height: isPortrait ? "381.05px" : "528.96px",
                  marginLeft: isPortrait ? "16.31px" : "22.65px",
                  marginTop: isPortrait ? "22.38px" : "31.06px",
                }}
              >
                <Lottie
                  animationData={catAnimationData}
                  loop={true}
                  className="w-full h-full"
                />
              </div>

              {/* Cloud 2 - Bottom */}
              <Image
                src="/assets/Scene/Scene5/scene5-04/s5-4-cloud.svg"
                alt="cloud"
                width={isPortrait ? 599 : 832}
                height={isPortrait ? 140 : 195}
                className="[grid-area:1/1] mix-blend-screen relative"
                style={{
                  marginLeft: "0px",
                  marginTop: isPortrait ? "279.76px" : "388.69px",
                }}
              />
            </div>

            {/* Text Section */}
            <div
              className={`flex flex-col items-start relative shrink-0 ${isPortrait ? "gap-[30px] w-full" : "gap-[60px] flex-1 min-w-0"}`}
            >
              <div className="typo-text-h3 text-center text-slate-100 w-full">
                <p className="mb-0">
                  แต่เจ้าไม่ต้องกังวลไปการที่เจ้ายังไม่ค้นพบตัวเองตอนนี้
                </p>
                <p>ไม่ใช่เรื่องที่แปลกประหลาด</p>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col items-center gap-10 w-full">
                <div className="typo-text-h3 text-center text-slate-100 w-full">
                  <p className="mb-0">เจ้าอยากจะลองไปตามหาอิคิไก</p>
                  <p>ของเจ้าดูบ้างไหมล่ะ</p>
                </div>

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
      </motion.div>
    </div>
  );
}
