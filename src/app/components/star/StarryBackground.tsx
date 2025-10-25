// components/StarryBackground.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Star from './star';
import { useAudio } from '@/app/contexts/AudioContext';

const NUM_STARS = 500; 

interface StarData {
  id: number;
  size: number;
  top: number;
  left: number;
  initialDelay: number;
}

const StarryBackground: React.FC = () => {
  const [stars, setStars] = useState<StarData[]>([]);
  const { animationsStarted } = useAudio();

  useEffect(() => {
    if (animationsStarted) {
      const newStars: StarData[] = Array.from({ length: NUM_STARS }).map((_, i) => ({
        id: i,
        size: Math.random() * 2 + 1, 
        top: Math.random() * 100, 
        left: Math.random() * 100, 
        initialDelay: Math.random() * 5,
      }));
      setStars(newStars);
    }
  }, [animationsStarted]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '1000vh',
        overflow: 'hidden', 
        zIndex: 1, 
        pointerEvents: 'none',
      }}
    >
      {stars.map(star => (
        <Star
          key={star.id}
          size={star.size}
          initialDelay={star.initialDelay}
          initialTop={star.top}
          initialLeft={star.left}
        />
      ))}
    </div>
  );
};

export default StarryBackground;