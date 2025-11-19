"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import GradientButton from "../../../components/ui/GradientButton";

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
  // Container opacity and zIndex
  const containerOpacity = useTransform(
    scrollYProgress,
    [0.667, 0.676, 0.944, 1.0],
    [0, 1, 1, 1]
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.667, 0.668, 1.0],
    [-1, -1, 10, 10]
  );

  // Layer 1: Background gradients (0.667-0.690)
  const bgGradient1Opacity = useTransform(
    scrollYProgress,
    [0.667, 0.676, 0.690],
    [0, 1, 1]
  );
  const bgGradient2Opacity = useTransform(
    scrollYProgress,
    [0.671, 0.683, 0.695],
    [0, 1, 1]
  );

  // Layer 2: Clouds (0.678-0.697)
  const cloudsOpacity = useTransform(
    scrollYProgress,
    [0.678, 0.690, 0.697],
    [0, 1, 1]
  );

  // Layer 3: Stars (0.683-0.707)
  const starsOpacity = useTransform(
    scrollYProgress,
    [0.683, 0.695, 0.707],
    [0, 1, 1]
  );

  // Layer 4: Cat and Light Cat (0.690-0.723)
  const catOpacity = useTransform(
    scrollYProgress,
    [0.690, 0.702, 0.723],
    [0, 1, 1]
  );

  // Layer 5: Four circles (0.697-0.746)
  const circlesOpacity = useTransform(
    scrollYProgress,
    [0.697, 0.713, 0.746],
    [0, 1, 1]
  );

  // Layer 6: Ikigai diagram text (0.730-0.779)
  const diagramTextOpacity = useTransform(
    scrollYProgress,
    [0.730, 0.746, 0.779],
    [0, 1, 1]
  );

  // Layer 7: Top explanation text (0.746-0.796)
  const topTextOpacity = useTransform(
    scrollYProgress,
    [0.746, 0.763, 0.796],
    [0, 1, 1]
  );

  // Layer 8: Middle explanation text (0.763-0.813)
  const middleTextOpacity = useTransform(
    scrollYProgress,
    [0.763, 0.779, 0.813],
    [0, 1, 1]
  );

  // Layer 9: Bottom explanation text (0.779-0.829)
  const bottomTextOpacity = useTransform(
    scrollYProgress,
    [0.779, 0.796, 0.829],
    [0, 1, 1]
  );

  // Layer 10: Final question text (0.813-0.852)
  const finalTextOpacity = useTransform(
    scrollYProgress,
    [0.813, 0.829, 0.852],
    [0, 1, 1]
  );

  // Layer 11: Button (0.863-1.0)
  const buttonOpacity = useTransform(
    scrollYProgress,
    [0.863, 0.880, 1.0],
    [0, 1, 1]
  );

  return (
    <div className="sticky top-0 w-full pointer-events-none">
      <motion.div
        className="flex items-start justify-center bg-[#101518] pointer-events-none"
        style={{ opacity: containerOpacity, zIndex }}
      >
        <div
          className="relative w-screen pointer-events-auto overflow-hidden"
          style={{
            aspectRatio: "1920 / 2160",
          }}
        >
          {/* Layer 1: Background Gradient 1 - Top area */}
          <motion.div
            style={{ opacity: bgGradient1Opacity }}
            className="absolute top-[-4.97%] left-[16.29%] right-[16.29%] bottom-[45.03%] mix-blend-screen pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/bggradient1.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Layer 1: Background Gradient 2 - Bottom right area */}
          <motion.div
            style={{ opacity: bgGradient2Opacity }}
            className="absolute top-[43.6%] left-[-12.07%] right-[41.55%] bottom-[-6.29%] mix-blend-screen pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/bggradient2.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Layer 2: Clouds */}
          <motion.div
            style={{ opacity: cloudsOpacity }}
            className="absolute top-[47.8%] left-[51.66%] right-[9.2%] bottom-[44.68%] mix-blend-screen pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Cloud1.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: cloudsOpacity }}
            className="absolute top-[81.28%] left-[4.45%] right-[52.2%] bottom-[9.68%] mix-blend-screen pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Cloud2.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Layer 3: Little Stars - scattered across */}
          <motion.div
            style={{ opacity: starsOpacity }}
            className="absolute top-[2.41%] left-[4.73%] right-[9.05%] bottom-[83.33%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Little star2.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: starsOpacity }}
            className="absolute top-[54.1%] left-[3.59%] right-[12.38%] bottom-[2.58%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Little star1.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: starsOpacity }}
            className="absolute top-[55.2%] left-[4.21%] right-[7.76%] bottom-[3.09%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Little star.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: starsOpacity }}
            className="absolute top-[56.68%] left-[47.69%] right-[4.2%] bottom-[5.58%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Little star2-1.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: starsOpacity }}
            className="absolute top-[8.99%] left-[1.44%] right-[4.53%] bottom-[53.68%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Little star1-1.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Layer 4: Light Cat - glow effect */}
          <motion.div
            style={{ opacity: catOpacity }}
            className="absolute top-[72.98%] left-[15.4%] right-[66.97%] bottom-[12.5%] mix-blend-screen pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Light Cat.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Layer 4: Cat - main character */}
          <motion.div
            style={{ opacity: catOpacity }}
            className="absolute top-[64.29%] left-[5.77%] right-[57.47%] bottom-[11.71%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/cat.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: catOpacity }}
            className="absolute top-[70.22%] left-[5.66%] right-[79.84%] bottom-[27.23%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/cat face.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Layer 4: Line star - animated star lines */}
          <motion.div
            style={{ opacity: catOpacity }}
            className="absolute top-[90.39%] left-[36.63%] right-[47.38%] bottom-[1.44%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/Line star1.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Layer 5: Four Circles with Icons */}
          <motion.div
            style={{ opacity: circlesOpacity }}
            className="absolute top-[6.17%] left-[39.31%] right-[38.83%] bottom-[74.4%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/love circle.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: circlesOpacity }}
            className="absolute top-[13.47%] left-[47.52%] right-[30.62%] bottom-[67.1%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/world circle.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: circlesOpacity }}
            className="absolute top-[20.77%] left-[39.31%] right-[38.83%] bottom-[59.8%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/paid circle.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: circlesOpacity }}
            className="absolute top-[13.47%] left-[31.1%] right-[47.04%] bottom-[67.1%] pointer-events-none"
          >
            <Image
              src="/assets/Scene/Scene5/scene5-04/skill circle.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* สิ่งที่เรารัก - Love - บนสุด (top: 190px from container start) */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              top: "8.8%", // 190px / 2160
              left: "46.63%", // 676px / 1449.6px (container width)
              transform: "translateX(-50%)",
            }}
          >
            <p className="typo-text-h5 text-white text-center whitespace-nowrap">
              สิ่งที่เรารัก
            </p>
          </div>

          {/* สิ่งที่โลกต้องการ - World - ขวา (top: 417px, left: 930px from container) */}
          <div
            className="absolute flex flex-col items-center justify-center"
            style={{
              top: "19.31%", // 417px / 2160
              left: "64.19%", // 930px / 1449.6px
            }}
          >
            <p className="typo-text-h5 text-white text-center whitespace-pre-line">
              {"สิ่งที่\nโลกต้องการ"}
            </p>
          </div>

          {/* สิ่งที่ทำให้เกิดรายได้ - Paid - ล่างสุด (top: 705px, left: 616px from container) */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              top: "32.64%", // 705px / 2160
              left: "42.51%", // 616px / 1449.6px
              transform: "translateX(-50%)",
            }}
          >
            <p className="typo-text-h5 text-white text-center whitespace-nowrap">
              สิ่งที่ทำให้เกิดรายได้
            </p>
          </div>

          {/* สิ่งที่เราถนัด - Skill - ซ้าย (top: 417px, left: 427px from container) */}
          <div
            className="absolute flex flex-col items-center justify-center"
            style={{
              top: "19.31%", // 417px / 2160
              left: "29.47%", // 427px / 1449.6px
            }}
          >
            <p className="typo-text-h5 text-white text-center whitespace-pre-line">
              {"สิ่งที่\nเราถนัด"}
            </p>
          </div>

          {/* แรงผลักดัน - Passion */}
          <div
            className="absolute"
            style={{
              top: "15.79%", // 341px / 2160
              left: "calc(50% - 7.11%)", // 50% - 103px/1449.6
              transform: "translateX(-50%)",
            }}
          >
            <p className="typo-text-h5 text-white text-center whitespace-pre-line">
              {"แรงผลักดัน\n(Passion)"}
            </p>
          </div>

          {/* หน้าที่ - Mission */}
          <div
            className="absolute"
            style={{
              top: "15.79%", // 341px / 2160
              left: "calc(50% + 7.76%)", // 50% + 112.5px/1449.6
              transform: "translateX(-50%)",
            }}
          >
            <p className="typo-text-h5 text-white text-center whitespace-pre-line">
              {"หน้าที่\n(Mission)"}
            </p>
          </div>

          {/* ทักษะวิชาชีพ - Vocation */}
          <div
            className="absolute"
            style={{
              top: "26.76%", // 578px / 2160
              left: "calc(50% + 8%)", // 50% + 116px/1449.6
              transform: "translateX(-50%)",
            }}
          >
            <p className="typo-text-h5 text-white text-center whitespace-pre-line">
              {"ทักษะวิชาชีพ\n(Vocation)"}
            </p>
          </div>

          {/* อาชีพ - Profession */}
          <div
            className="absolute"
            style={{
              top: "26.76%", // 578px / 2160
              left: "calc(50% - 7.62%)", // 50% - 110.5px/1449.6
              transform: "translateX(-50%)",
            }}
          >
            <p className="typo-text-h5 text-white text-center whitespace-pre-line">
              {"อาชีพ\n(Profession)"}
            </p>
          </div>

          {/* Layer 7: Top Text - Ikigai condition */}
          <motion.div
            style={{
              opacity: topTextOpacity,
              top: "2.27%", // 49px / 2160
            }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <p className="typo-text-h4 text-white text-center whitespace-nowrap">
              ถ้าเจ้าหาจุดที่ทั้งสี่สายมาบรรจบกันได้… จะเกิดเป็น
            </p>
          </motion.div>

          {/* Layer 8: Middle Text - Ikigai definition */}
          <motion.div
            style={{
              opacity: middleTextOpacity,
              top: "41.71%", // 901px / 2160
            }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="typo-text-h4 text-white text-center">
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
              <p className="mb-0">
                ก็จะมีประโยชน์มากยิ่งขึ้น
                และอาจพาเจ้าออกจากความมัวมืดในคืนนี้ได้
              </p>
            </div>
          </motion.div>

          {/* Layer 9: Bottom Text - Reassurance */}
          <motion.div
            style={{
              opacity: bottomTextOpacity,
              top: "66.53%", // 1437px / 2160
            }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="typo-text-h4 text-white text-center">
              <p className="mb-0">
                แต่เจ้าไม่ต้องกังวลไปการที่เจ้ายังไม่ค้นพบตัวเองตอนนี้
              </p>
              <p className="mb-0">ไม่ใช่เรื่องที่แปลกประหลาด</p>
              <p className="mb-0">เจ้าสามารถค้นหาตัวเองได้ตลอดชีวิต</p>
              <p className="mb-0">อิคิไกเป็นเพียงแนวทางเท่านั้น</p>
            </div>
          </motion.div>

          {/* Layer 10: Final Question */}
          <motion.div
            style={{
              opacity: finalTextOpacity,
              top: "82.27%", // 1777px / 2160
              width: "42.55%", // 817px / 1920
            }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <p className="typo-text-h4 text-white text-center">
              เจ้าอยากจะลองไปตามหาอิคิไก ของเจ้าดูบ้างไหมล่ะ
            </p>
          </motion.div>

          {/* Layer 11: Button */}
          <motion.div
            style={{
              opacity: buttonOpacity,
              top: "85.97%", // 1857px / 2160
            }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <GradientButton
              text="พยักหน้า"
              isSelected={false}
              onClick={handleSubmit}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
