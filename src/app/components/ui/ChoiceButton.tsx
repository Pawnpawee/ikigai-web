import { motion } from "framer-motion";

interface Props {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ChoiceButton({ label, isSelected, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        border-2 rounded-full px-4 py-2 text-sm font-medium transition-all 
        ${
          isSelected
            ? "bg-white text-black border-white "
            : "bg-transparent border-gray-500 hover:border-white text-white"
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}