"use client";

import { useEffect, useRef } from "react";

interface VideoAnimationProps {
  webmSrc: string;
  movSrc: string;
  className?: string;
}

export const VideoAnimation = ({
  webmSrc,
  movSrc,
  className = "",
}: VideoAnimationProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch((err) => {
        console.error("Video autoplay failed:", err);
      });
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  // ⭐ ฟังก์ชันจัดการ Loop ด้วยตัวเอง
  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
      // สามารถใส่ setTimeout ตรงนี้ถ้าต้องการให้หยุดรอก่อนวน loop
      // setTimeout(() => {
      video.currentTime = 0;
      video.play();
      // }, 0);
    }
  };

  return (
    <div className={`relative w-full mx-auto ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        // ❌ loop // เอา loop ออก เพื่อให้ event onEnded ทำงาน
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        onEnded={handleVideoEnded} // ⭐ สั่งให้ Loop เมื่อเล่นจบจริงๆ เท่านั้น
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
        className="w-full h-auto object-contain pointer-events-none"
        onError={(e) => console.error("Video failed to load:", e)}
      >
        {/* ⭐ เอา MOV ขึ้นก่อนเพื่อให้ iOS/Mac เลือกใช้ไฟล์ที่ดีที่สุด */}
        <source src={movSrc} type='video/quicktime; codecs="hvc1"' />
        <source src={webmSrc} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
