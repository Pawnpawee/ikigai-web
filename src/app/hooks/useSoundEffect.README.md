# useSoundEffect Hook - การใช้งาน

Hook สำหรับเล่นเสียง effect พร้อม fade in/out effect แบบ reusable

## การ Import

```typescript
import { useSoundEffect } from "@/app/hooks/useSoundEffect";
```

## Signature

```typescript
function useSoundEffect({
  soundPath: string;           // path ของไฟล์เสียง
  fadeDurationMs?: number;     // ระยะเวลา fade (default: 500ms)
  soundDurationMs?: number;    // ระยะเวลาเสียงทั้งหมด (default: 2500ms)
}): {
  audio: HTMLAudioElement | null;
  playSoundEffect: (onComplete?: () => void) => void;
  stopSoundEffect: () => void;
  fadeAudio: (audioEl: HTMLAudioElement, direction: "in" | "out", onComplete?: () => void) => void;
}
```

## ตัวอย่างการใช้งาน

### 1. การใช้งานพื้นฐาน

```typescript
"use client";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";

export default function MyComponent() {
  const { playSoundEffect, stopSoundEffect } = useSoundEffect({
    soundPath: "/assets/Sound/my-sound.mp3",
  });

  const handleClick = () => {
    playSoundEffect();
  };

  return (
    <button onClick={handleClick}>
      Play Sound
    </button>
  );
}
```

### 2. การกำหนด fade และระยะเวลา

```typescript
const { playSoundEffect } = useSoundEffect({
  soundPath: "/assets/Sound/long-sound.mp3",
  fadeDurationMs: 1000,      // fade 1 วินาที
  soundDurationMs: 5000,     // เสียงยาว 5 วินาที
});
```

### 3. การใช้งานกับ useEffect

```typescript
"use client";
import { useEffect, useState } from "react";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";
import { useAudio } from "@/app/contexts/AudioContext";

export default function AnimatedComponent() {
  const { animationsStarted } = useAudio();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { playSoundEffect, stopSoundEffect } = useSoundEffect({
    soundPath: "/assets/Sound/magical-sparkling.mp3",
    fadeDurationMs: 500,
    soundDurationMs: 2500,
  });

  useEffect(() => {
    if (animationsStarted && !isAnimating) {
      setIsAnimating(true);
      
      // เล่นเสียงหลังจากผ่านไป 2 วินาที
      const timer = setTimeout(() => {
        playSoundEffect(() => {
          console.log("Sound effect completed!");
        });
      }, 2000);

      return () => {
        clearTimeout(timer);
        stopSoundEffect();
      };
    }
  }, [animationsStarted, isAnimating, playSoundEffect, stopSoundEffect]);

  return (
    <div>
      {/* Your animated content */}
    </div>
  );
}
```

### 4. การใช้หลายเสียงพร้อมกัน

```typescript
export default function MultiSoundComponent() {
  const clickSound = useSoundEffect({
    soundPath: "/assets/Sound/click.mp3",
    fadeDurationMs: 200,
    soundDurationMs: 500,
  });

  const hoverSound = useSoundEffect({
    soundPath: "/assets/Sound/hover.mp3",
    fadeDurationMs: 300,
    soundDurationMs: 800,
  });

  return (
    <button
      onClick={() => clickSound.playSoundEffect()}
      onMouseEnter={() => hoverSound.playSoundEffect()}
    >
      Interactive Button
    </button>
  );
}
```

### 5. การควบคุมแบบ manual

```typescript
const { audio, fadeAudio, stopSoundEffect } = useSoundEffect({
  soundPath: "/assets/Sound/my-sound.mp3",
});

// Fade in แบบกำหนดเอง
const handleFadeIn = () => {
  if (audio) {
    fadeAudio(audio, "in", () => {
      console.log("Fade in complete!");
    });
  }
};

// Fade out แบบกำหนดเอง
const handleFadeOut = () => {
  if (audio) {
    fadeAudio(audio, "out", () => {
      console.log("Fade out complete!");
    });
  }
};

// หยุดทันที
const handleStop = () => {
  stopSoundEffect();
};
```

## Features

- ✅ Fade in/out อัตโนมัติ
- ✅ เชื่อมต่อกับ AudioContext (sfxVolume, isMuted)
- ✅ จัดการ cleanup อัตโนมัติ
- ✅ รองรับ callback เมื่อเสียงเล่นจบ
- ✅ ควบคุม volume แบบ real-time
- ✅ หยุดเสียงทันทีได้

## Notes

- Hook จะเคารพการตั้งค่า `sfxVolume` และ `isMuted` จาก AudioContext
- ถ้า `isMuted = true` เสียงจะไม่เล่น แต่ callback ยังทำงานตามปกติ
- การเรียก `playSoundEffect()` จะ return cleanup function สำหรับยกเลิก timer
- ควรเก็บ soundPath ใน constant เพื่อป้องกัน re-render ที่ไม่จำเป็น
