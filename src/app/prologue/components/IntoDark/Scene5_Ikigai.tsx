"use client";
import { motion, MotionValue, useTransform } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

// Asset paths from Figma exports
const IMG_LIGHT_CAT = "/assets/Scene/Intro/f63e1f9ab9b4e793c37ea565bc3c713faaf6afeb.svg";
const IMG_VECTOR = "/assets/Scene/Intro/218c5432bb0bd5b93d429f5272e671a5134dae17.svg";
const IMG_VECTOR1 = "/assets/Scene/Intro/5a5753d6fa26464c240a308543ae0c90e310ddfc.svg";
const IMG_VECTOR2 = "/assets/Scene/Intro/bd561cba42a880e75871f2c56c8ac097d6111e59.svg";
const IMG_VECTOR3 = "/assets/Scene/Intro/6fe26a8a819b9fc00673d64d699efdb09c29dcde.svg";
const IMG_CATFACE = "/assets/Scene/Intro/07489bc015f7e637d12f490b82f2d80768ab0c39.svg";
const IMG_LITTLE_STAR_1 = "/assets/Scene/Intro/6e112e5b8d6d64d0a9909d316bcfce7cdf28bb53.svg";
const IMG_LITTLE_STAR_2 = "/assets/Scene/Intro/c5390452c708efa08ad335d252e4c7b610194502.svg";
const IMG_LITTLE_STAR_3 = "/assets/Scene/Intro/a20a90037e5e38a345514df5d615ca2e646198b1.svg";
// Add other asset paths as needed...

export default function Scene5Ikigai({ scrollYProgress }: Props) {
  // Fade the background art in/out 
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.3], [0, 1, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 bg-[var(--foundation-black,#0b1e23)]"
      data-name="scene5-ikigai-01 2"
      data-node-id="254:4281"
    >
      {/* Base glowing cat */}
      <motion.div 
        className="absolute mix-blend-screen"
        style={{
          top: "36.52%",
          left: "16.03%",
          right: "56.38%",
          bottom: "14.43%"
        }}
        data-name="Light Cat"
        data-node-id="254:4282"
      >
        <motion.img
          src={IMG_LIGHT_CAT}
          alt=""
          className="block max-w-none w-full h-full"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.div>

      {/* Star constellations */}
      {/* Star line 1 */}
      <motion.div 
        className="absolute"
        style={{
          top: "16.72%",
          left: "24.98%",
          right: "64.45%",
          bottom: "63.93%"
        }}
        data-name="Star line 1"
        data-node-id="254:4283"
      >
        <motion.div
          className="absolute inset-[16.72%_68.95%_80.87%_29.7%]"
          data-name="Vector"
          data-node-id="254:4284"
        >
          <motion.img
            src={IMG_VECTOR}
            alt=""
            className="block max-w-none w-full h-full"
            animate={{
              filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
        {/* Add other star line 1 elements */}
      </motion.div>

      {/* Little stars */}
      <motion.div
        className="absolute inset-[33.49%_65.8%_37.37%_8.24%]"
        data-name="Little Star 2"
        data-node-id="254:4301"
      >
        <motion.img
          src={IMG_LITTLE_STAR_2}
          alt=""
          className="block max-w-none w-full h-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-[8.86%_75.72%_77.75%_10.92%]"
        data-name="Little Star 1"
        data-node-id="254:4307"
      >
        <motion.img
          src={IMG_LITTLE_STAR_1}
          alt=""
          className="block max-w-none w-full h-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-[57.7%_51.38%_17.55%_42.11%]"
        data-name="Little Star 3"
        data-node-id="254:4311"
      >
        <motion.img
          src={IMG_LITTLE_STAR_3}
          alt=""
          className="block max-w-none w-full h-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {/* Cat face */}
      <motion.div
        className="absolute inset-[55.08%_58.94%_40.92%_31.16%]"
        data-name="Catface"
        data-node-id="254:4735"
      >
        <motion.img
          src={IMG_CATFACE}
          alt=""
          className="block max-w-none w-full h-full"
          animate={{
            scale: [1, 1.05, 1],
            filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.div>

      {/* Additional sections can be added following the same pattern */}
    </motion.div>
  );
}