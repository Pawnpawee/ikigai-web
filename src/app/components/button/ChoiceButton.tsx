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
  return (
    <m.button
      onClick={onClick}
      className={`flex justify-center items-center
        text-base md:text-2xl
        relative rounded-full px-10 text-center transition-all
        border md:border-[3px] border-solid whitespace-pre-line
        
        max-w-2xs
        min-h-10

        lg:max-w-md lg:min-w-md
        lg:min-h-28
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
