import Lenis from 'lenis';
import { gsap } from "gsap";

let lenis = null;

// Initializes smooth scrolling with Lenis.
// Function to set up smooth scrolling.
export const initSmoothScrolling = () => {
  // Initialize Lenis for smooth scroll effects. Lerp value controls the smoothness.
  lenis = new Lenis({ lerp: 0.15 });
  
  // Make lenis globally accessible for stopping/starting from anywhere
  window.lenis = lenis;
  
  // Ensure GSAP animations are in sync with Lenis' scroll frame updates.
  gsap.ticker.add(time => {
    lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis.
  });

  // Turn off GSAP's default lag smoothing to avoid conflicts with Lenis.
  gsap.ticker.lagSmoothing(0);
};

// Utility functions to stop/start Lenis from anywhere in your app
export const stopLenisScroll = () => {
  if (lenis) {
    lenis.stop();
  }
};

export const startLenisScroll = () => {
  if (lenis) {
    lenis.start();
  }
};