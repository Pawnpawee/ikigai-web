// utils/lenisConfig.ts

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

export const getLenisOptions = (isMobile: boolean) => ({
  duration: isMobile ? 0 : 1.2, 
  easing: easeOutQuart,
  wheelMultiplier: 1.2, 
  touchMultiplier: 2, 
  orientation: 'vertical' as const, 
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  smoothTouch: true, 
  touchInertiaMultiplier: 1.5, 
});