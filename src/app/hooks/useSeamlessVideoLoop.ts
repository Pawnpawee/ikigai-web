"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseSeamlessVideoLoopOptions {
  enabled: boolean;
  loopStartTime: number;
  loopEndTime?: number;
  loopEndThreshold?: number;
}

export function useSeamlessVideoLoop({
  enabled,
  loopStartTime,
  loopEndTime,
  loopEndThreshold = 0.18,
}: UseSeamlessVideoLoopOptions) {
  const primaryVideoRef = useRef<HTMLVideoElement | null>(null);
  const secondaryVideoRef = useRef<HTMLVideoElement | null>(null);
  const isSwapPendingRef = useRef(false);
  const hasLoopStartedRef = useRef(false);

  const [activeVideoIndex, setActiveVideoIndex] = useState<0 | 1>(0);
  const [hasLoopStarted, setHasLoopStarted] = useState(false);

  const getVideoByIndex = useCallback((index: 0 | 1) => {
    return index === 0 ? primaryVideoRef.current : secondaryVideoRef.current;
  }, []);

  const primeVideo = useCallback(
    (video: HTMLVideoElement | null, startTime: number) => {
      if (!video) return;

      video.pause();

      try {
        video.currentTime = startTime;
      } catch {
        //* Some browsers block seeking until metadata is ready; next metadata event will retry.
      }
    },
    [],
  );

  const resetLoop = useCallback(() => {
    hasLoopStartedRef.current = false;
    isSwapPendingRef.current = false;
    setActiveVideoIndex(0);
    setHasLoopStarted(false);

    const primaryVideo = primaryVideoRef.current;
    const secondaryVideo = secondaryVideoRef.current;

    if (primaryVideo) {
      primaryVideo.pause();
      primaryVideo.currentTime = 0;
    }

    if (secondaryVideo) {
      primeVideo(secondaryVideo, loopStartTime);
    }
  }, [loopStartTime, primeVideo]);

  const handleVideoLoadedMetadata = useCallback(
    (index: 0 | 1) => {
      const video = getVideoByIndex(index);
      if (!video) return;

      if (index === 0 && !hasLoopStartedRef.current) {
        return;
      }

      primeVideo(video, loopStartTime);
    },
    [getVideoByIndex, loopStartTime, primeVideo],
  );

  useEffect(() => {
    if (!enabled) {
      resetLoop();
      return;
    }

    const primaryVideo = primaryVideoRef.current;
    const secondaryVideo = secondaryVideoRef.current;

    if (primaryVideo?.paused) {
      void primaryVideo.play();
    }

    primeVideo(secondaryVideo, loopStartTime);
  }, [enabled, loopStartTime, primeVideo, resetLoop]);

  useEffect(() => {
    if (!enabled) return;

    let animationFrameId = 0;

    const syncLoop = () => {
      const currentVideo = getVideoByIndex(activeVideoIndex);
      const nextVideo = getVideoByIndex(activeVideoIndex === 0 ? 1 : 0);

      const loopTriggerTime =
        loopEndTime ??
        (currentVideo && Number.isFinite(currentVideo.duration)
          ? currentVideo.duration - loopEndThreshold
          : Number.POSITIVE_INFINITY);

      if (
        currentVideo &&
        nextVideo &&
        Number.isFinite(currentVideo.duration) &&
        currentVideo.duration > 0 &&
        !isSwapPendingRef.current &&
        currentVideo.currentTime >= loopTriggerTime
      ) {
        isSwapPendingRef.current = true;

        primeVideo(nextVideo, loopStartTime);

        void nextVideo.play().finally(() => {
          const nextIndex = activeVideoIndex === 0 ? 1 : 0;

          setActiveVideoIndex(nextIndex);

          if (!hasLoopStartedRef.current) {
            hasLoopStartedRef.current = true;
            setHasLoopStarted(true);
          }

          window.setTimeout(() => {
            primeVideo(currentVideo, loopStartTime);
            isSwapPendingRef.current = false;
          }, 80);
        });
      }

      animationFrameId = window.requestAnimationFrame(syncLoop);
    };

    animationFrameId = window.requestAnimationFrame(syncLoop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [
    activeVideoIndex,
    enabled,
    getVideoByIndex,
    loopEndTime,
    loopEndThreshold,
    loopStartTime,
    primeVideo,
  ]);

  return {
    activeVideoIndex,
    handleVideoLoadedMetadata,
    hasLoopStarted,
    primaryVideoRef,
    secondaryVideoRef,
  };
}
