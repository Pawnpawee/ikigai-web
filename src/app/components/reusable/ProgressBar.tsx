import { type MotionValue, m, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { getImgPath } from "@/utils/cloudinaryUtils";
import Icon from "./Icon";

const ICONS = [
  { src: getImgPath("Icon/love.webp"), alt: "Love" },
  { src: getImgPath("Icon/skill.webp"), alt: "Skill" },
  { src: getImgPath("Icon/world.webp"), alt: "World" },
  { src: getImgPath("Icon/paid.webp"), alt: "Paid" },
];

const STEPS = [
  "/prologue", // 0
  "/love-session", // 1
  "/skill-session", // 2
  "/world-session", // 3
  "/paid-session", // 4
  "/journey-temple", // 5
];

const GRADIENT =
  "linear-gradient(90deg, #FFF 0%, var(--Red-500, #EC4151) 17.18%, var(--Purple-500, #8D31FD) 38.92%, var(--Green-500, #38804D) 60.91%, #FFBC0C 82.81%, #FFF 100%)";

function getStepIndex(path: string): number {
  for (let i = STEPS.length - 1; i >= 0; i--) {
    if (path.startsWith(STEPS[i])) return i;
  }
  return 0;
}

interface ProgressBarProps {
  scrollYProgress: MotionValue<number>;
}

export default function ProgressBar({ scrollYProgress }: ProgressBarProps) {
  const pathname = usePathname();
  const stepIdx = getStepIndex(pathname);
  const totalSteps = STEPS.length - 1;

  //? Animate fill: base progress + scroll progress within step
  // Each step is 1/totalSteps
  const base = stepIdx / totalSteps;
  const next = (stepIdx + 1) / totalSteps;

  const fillWidth = useTransform(
    scrollYProgress,
    [0, 1],
    [`${base * 100}%`, `${next * 100}%`],
  );

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 z-40 pointer-events-none">
      <div className="relative w-full h-full">
        {/* Gradient Bar */}
        <div
          className="absolute left-0 top-0 w-full h-1.5 rounded-full bg-linear-to-r"
          style={{ background: "rgba(255, 255, 255, 0.1)" }}
        />
        {/* Fill */}
        <m.div
          className="absolute left-0 top-0 h-1.5 rounded-full overflow-hidden"
          style={{ width: fillWidth }}
        >
          <div className="h-full w-screen" style={{ background: GRADIENT }} />
        </m.div>

        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
          {/* Icons */}
          {ICONS.map((icon, index) => {
            const iconStep = index + 1;
            const leftPercent = (iconStep / totalSteps) * 100;
            const isReached = stepIdx >= iconStep;

            return (
              <div
                key={icon.alt}
                className={`absolute bottom-0 transition-opacity duration-500 ease-in-out ${
                  isReached ? "opacity-100" : "opacity-60"
                }`}
                style={{
                  left: `${leftPercent}%`,
                  transform: "translate(-50%, 0)",
                }}
              >
                <Icon src={icon.src} alt={icon.alt} size={15} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
