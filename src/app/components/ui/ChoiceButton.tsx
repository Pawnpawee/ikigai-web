import { motion } from "framer-motion";

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
    <motion.button
      onClick={onClick}
      className={`flex justify-center items-center
        typo-text-h5
        relative rounded-full px-10 text-center transition-all
        border-[3px] border-solid
        
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
    </motion.button>
  );
}
