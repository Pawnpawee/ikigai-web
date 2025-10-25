// components/Star.tsx
"use client";
import { motion } from 'framer-motion';
import React from 'react';

interface StarProps {
  size: number;
  initialDelay: number;
  initialTop: number;
  initialLeft: number;
}

const Star: React.FC<StarProps> = ({ size, initialDelay, initialTop, initialLeft }) => {
  const duration = 2 + Math.random() * 3; 
  const delay = initialDelay + Math.random() * 2; 

  // สุ่มตำแหน่งใหม่สำหรับการเคลื่อนที่
  const randomX = () => Math.random() * 20 - 10; // -10 ถึง +10
  const randomY = () => Math.random() * 20 - 10; // -10 ถึง +10

  return (
    <motion.div
      style={{
        position: 'absolute',
        background: 'white', 
        borderRadius: '50%',
        width: size,
        height: size,
        top: `${initialTop}%`,
        left: `${initialLeft}%`,
      }}
      initial={{ opacity: 0, x: 0, y: 0 }} 
      animate={{ 
        opacity: [0, 1, 0.5, 1, 0.3, 1, 0], 
        x: [0, randomX(), randomX(), randomX(), 0],
        y: [0, randomY(), randomY(), randomY(), 0],
      }}
      transition={{
        duration: duration * 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay: delay,
      }}
    />
  );
};

export default Star;