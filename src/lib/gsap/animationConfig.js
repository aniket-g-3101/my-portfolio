/**
 * ============================================================
 * SHARED ANIMATION CONFIGURATION SYSTEM
 * ============================================================
 * Centralized motion tokens for GSAP, ScrollTrigger, and UI animation.
 * Enforces unified timing, eliminates magic numbers, and provides
 * tailored mobile-reduced & prefers-reduced-motion profiles.
 */

// ── DESKTOP DURATION CONSTANTS (seconds) ──
export const DURATION = Object.freeze({
  micro: 0.15,      // Hover effects, button presses, badge toggles
  short: 0.3,       // Tabs, dropdowns, underline expansions, tooltips
  medium: 0.6,      // Card lifts, modal transitions, drawer panels
  section: 0.85,    // Standard section reveals & staggered container reveals
  hero: 1.15,       // Hero master sequence choreography
  ambient: 8.0,     // Gentle idle pulses, orbital rotations, ambient breath
});

// ── DESKTOP EASING CONSTANTS ──
export const EASING = Object.freeze({
  entrance: "power3.out",       // Smooth deceleration for elements entering view
  exit: "power2.in",            // Quick, crisp departure when scrolling past/dismissing
  ambient: "sine.inOut",        // Natural harmonic oscillations for idle loops
  cinematic: "power4.out",      // High-inertia fluid curve for signature pieces (Hub/Hero)
  snappy: "expo.out",           // Ultra-responsive immediate settling for interactive controls
  smooth: "power2.out",         // Standard comfortable ease
  spring: "back.out(1.4)",      // Controlled elastic landing without excessive wobble
  cubicBezier: [0.16, 1, 0.3, 1], // Cubic-bezier equivalent for Framer Motion parity
});

// ── DESKTOP STAGGER PRESETS (seconds) ──
export const STAGGER = Object.freeze({
  micro: 0.03,      // Word / character splits
  fast: 0.06,       // List items, icon rows, badge pills
  medium: 0.1,      // Content groups, paragraphs, metric counters
  cards: 0.12,      // Bento cards, project items, certificate items
  nodes: 0.08,      // Circular hub workflow nodes
  section: 0.15,    // Major section block choreography
});

// ── DESKTOP TRANSLATE DISTANCES (pixels) ──
export const DISTANCE = Object.freeze({
  xs: 6,
  sm: 15,
  md: 30,
  lg: 50,
  xl: 80,
});

// ── MOBILE-REDUCED MOTION TOKENS ──
// Mobile devices run a snappier, less computationally heavy motion profile
export const MOBILE_CONFIG = Object.freeze({
  DURATION: Object.freeze({
    micro: 0.1,
    short: 0.2,
    medium: 0.4,
    section: 0.55,
    hero: 0.75,
    ambient: 10.0,
  }),
  EASING: Object.freeze({
    entrance: "power2.out",
    exit: "power1.in",
    ambient: "sine.inOut",
    cinematic: "power3.out",
    snappy: "power2.out",
    smooth: "power1.out",
    spring: "power2.out",
  }),
  STAGGER: Object.freeze({
    micro: 0.015,
    fast: 0.03,
    medium: 0.05,
    cards: 0.06,
    nodes: 0.04,
    section: 0.08,
  }),
  DISTANCE: Object.freeze({
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 36,
  }),
  // Feature flags for mobile rendering performance
  DISABLE_PARALLAX: true,
  DISABLE_BLUR: true,       // Prevents mobile WebKit compositing drops
  DISABLE_3D: true,
  MAX_ACTIVE_PARTICLES: 150,
});

// ── PREFERS-REDUCED-MOTION PROFILE ──
// Strictly disables disruptive transforms & scrubbing for accessibility
export const REDUCED_MOTION_CONFIG = Object.freeze({
  DURATION: Object.freeze({
    micro: 0.001,
    short: 0.001,
    medium: 0.001,
    section: 0.001,
    hero: 0.001,
    ambient: 0.001,
  }),
  EASING: Object.freeze({
    entrance: "none",
    exit: "none",
    ambient: "none",
    cinematic: "none",
    snappy: "none",
    smooth: "none",
    spring: "none",
  }),
  STAGGER: Object.freeze({
    micro: 0,
    fast: 0,
    medium: 0,
    cards: 0,
    nodes: 0,
    section: 0,
  }),
  DISTANCE: Object.freeze({
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
  }),
  DISABLE_PARALLAX: true,
  DISABLE_BLUR: true,
  DISABLE_3D: true,
  DISABLE_ALL_TRANSFORMS: true,
});

// ── SCROLLTRIGGER SHARED TOGGLE ACTIONS & SCRUB PRESETS ──
export const SCROLL_PRESETS = Object.freeze({
  // Reversible entrance for standard sections (enters on down, reverses cleanly on up)
  reversible: {
    toggleActions: "play reverse play reverse",
    start: "top 82%",
    end: "bottom 18%",
  },
  // Play once on enter, keep settled
  settleOnce: {
    toggleActions: "play none none none",
    start: "top 80%",
    once: true,
  },
  // Scrub config for smooth physics
  scrubSmooth: 0.8, // 0.8s smooth catching-up scrub
  scrubDirect: true, // 1:1 direct scroll lock
});

/**
 * Helper to detect runtime motion environment
 */
export function getMotionPreferences() {
  if (typeof window === "undefined") {
    return { isMobile: false, isReducedMotion: false };
  }

  const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return { isMobile, isReducedMotion };
}

/**
 * Returns the resolved animation config for the current execution context
 */
export function getAnimationConfig() {
  const { isMobile, isReducedMotion } = getMotionPreferences();

  if (isReducedMotion) {
    return {
      duration: REDUCED_MOTION_CONFIG.DURATION,
      easing: REDUCED_MOTION_CONFIG.EASING,
      stagger: REDUCED_MOTION_CONFIG.STAGGER,
      distance: REDUCED_MOTION_CONFIG.DISTANCE,
      isMobile,
      isReducedMotion: true,
      flags: REDUCED_MOTION_CONFIG,
    };
  }

  if (isMobile) {
    return {
      duration: MOBILE_CONFIG.DURATION,
      easing: MOBILE_CONFIG.EASING,
      stagger: MOBILE_CONFIG.STAGGER,
      distance: MOBILE_CONFIG.DISTANCE,
      isMobile: true,
      isReducedMotion: false,
      flags: MOBILE_CONFIG,
    };
  }

  return {
    duration: DURATION,
    easing: EASING,
    stagger: STAGGER,
    distance: DISTANCE,
    isMobile: false,
    isReducedMotion: false,
    flags: {
      DISABLE_PARALLAX: false,
      DISABLE_BLUR: false,
      DISABLE_3D: false,
    },
  };
}

export default {
  DURATION,
  EASING,
  STAGGER,
  DISTANCE,
  MOBILE_CONFIG,
  REDUCED_MOTION_CONFIG,
  SCROLL_PRESETS,
  getMotionPreferences,
  getAnimationConfig,
};
