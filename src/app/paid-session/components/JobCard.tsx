import { motion } from "framer-motion";

interface Props {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function JobCard({ label, isSelected, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      className={`p-3 sm:p-4 border-2 rounded-xl text-center text-xs sm:text-sm transition-all h-24 sm:h-28 md:h-32 flex items-center justify-center ${
        isSelected
          ? "bg-white text-black border-white scale-105"
          : "bg-black/20 border-gray-500 hover:border-white text-white"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  );
}
