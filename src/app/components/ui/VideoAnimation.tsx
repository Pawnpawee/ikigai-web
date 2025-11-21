"use client";

import { useEffect, useRef } from "react";

interface VideoAnimationProps {
  webmSrc: string;
  movSrc: string;
  className?: string;
}

export const VideoAnimation = ({ webmSrc, movSrc, className = "" }: VideoAnimationProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // บังคับเล่น video เมื่อพร้อม
    const playVideo = () => {
      video.play().catch((err) => {
        console.error("Video autoplay failed:", err);
      });
    };

    // เล่นเมื่อ video พร้อม
    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  return (
    <div className={`relative w-full mx-auto ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
        className="w-full h-auto object-contain pointer-events-none"
        onError={(e) => console.error("Video failed to load:", e)}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={movSrc} type='video/quicktime; codecs="hvc1"' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};