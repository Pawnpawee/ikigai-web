import { useAudio } from "@/app/contexts/AudioContext";
import { m } from "framer-motion";

interface Props {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function ChoiceButton({
  text,
  isSelected,
  onClick,
  className = "",
}: Props) {
  const { playSfx } = useAudio();

  const handleClick = () => {
    playSfx("/assets/Sound/Pop Select Button.mp3");
    onClick();
  };

  return (
    <m.button
      onClick={handleClick}
      className={`flex justify-center items-center
        text-base md:text-2xl
        relative rounded-full text-center transition-all
        border md:border-[3px] border-solid whitespace-pre-line caret-transparent
        ${
          isSelected
            ? "bg-white text-black border-white"
            : "bg-transparent border-slate-200 hover:border-white text-white"
        }
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </m.button>
  );
}
