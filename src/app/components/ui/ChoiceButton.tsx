import { motion } from "framer-motion";

interface Props {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function ChoiceButton({ text, isSelected, onClick, className = "" }: Props) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        typo-text-h4
        relative rounded-full px-16 py-4 text-center transition-all
        border-[3px] border-solid
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