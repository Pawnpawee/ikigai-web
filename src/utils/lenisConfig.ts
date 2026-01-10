// utils/lenisConfig.ts

function easeOutQuart(x: number): number {
  return 1 - (1 - x) ** 4;
}

export const getLenisOptions = (isMobile: boolean) => ({
  duration: isMobile ? 1.5 : 1.2,
  easing: easeOutQuart,
  wheelMultiplier: 1.2,
  touchMultiplier: isMobile ? 0.8 : 2,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  smoothTouch: true,
  touchInertiaMultiplier: isMobile ? 3 : 1.5,
});
