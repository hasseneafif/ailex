// smoothscroll.js
import Lenis from 'lenis';
import { gsap } from "gsap";

let lenis = null;

// Detect if device is low-end/mobile

// Initialize smooth scrolling
export const initSmoothScrolling = () => {
  if (lenis) return;

  // Use duration-based smoothing instead of lerp for consistent low-end performance
  lenis = new Lenis({
    duration: 1, // shorter duration on low-end devices
    smooth: true,
    smoothWheel: true,
    smoothTouch: true,
    wheelMultiplier: 1,
    touchMultiplier: 1, 
    infinite: false,
  });

  // Make globally accessible
  (window).lenis = lenis;

  if (isLowEndDevice()) {
    // Use requestAnimationFrame for low-end devices
    const rafLoop = (time) => {
      lenis.raf(time);
      requestAnimationFrame(rafLoop);
    };
    requestAnimationFrame(rafLoop);
  } else {
    // Use GSAP ticker on desktop for syncing animations
    gsap.ticker.add(time => {
      lenis.raf(time * 1000); // GSAP uses seconds, Lenis needs ms
    });
    gsap.ticker.lagSmoothing(0);
  }
};

// Stop / Start utility functions
export const stopLenisScroll = () => {
  if (lenis) lenis.stop();
};

export const startLenisScroll = () => {
  if (lenis) lenis.start();
};
