import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getMotionPreferences } from '../lib/gsap/animationConfig';

// Register GSAP ScrollTrigger plugin safely once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useLenis — High-performance single-instance smooth scroll hook
 * Fully integrated with the GSAP ticker, driving ScrollTrigger updates.
 * React Strict Mode safe with clean teardown.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const { isReducedMotion, isMobile } = getMotionPreferences();

    // Initialize single Lenis instance
    const lenis = new Lenis({
      duration: isReducedMotion ? 0.001 : isMobile ? 0.85 : 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
      syncTouchLerp: 0.075,
      infinite: false,
      autoRaf: false, // Driven strictly by GSAP ticker
      autoResize: true,
      prevent: (node) => {
        // Never hijack scrolling inside nested scroll containers / modals
        return (
          node.hasAttribute("data-lenis-prevent") ||
          node.closest('[data-lenis-prevent="true"]') !== null
        );
      },
    });

    lenisRef.current = lenis;

    // 1. Sync Lenis scroll with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // 2. Drive Lenis through GSAP ticker (Zero duplicate RAF loops)
    const updateTicker = (time) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 3. Ensure ScrollTrigger recache once fonts are ready
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (isMounted) {
          ScrollTrigger.refresh();
        }
      });
    }

    // 4. Handle window load & resize for crisp ScrollTrigger alignment
    const handleWindowLoad = () => {
      if (isMounted) {
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener('load', handleWindowLoad);

    // Debounced resize refresh so ScrollTrigger stays pixel-aligned while resizing
    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (isMounted) {
          ScrollTrigger.refresh();
        }
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount (Strict Mode Safe)
    return () => {
      isMounted = false;
      if (resizeTimer) window.clearTimeout(resizeTimer);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

/**
 * scrollToSection — Smooth scroll to element by ID using active Lenis instance
 */
export function scrollToSection(sectionId, lenisRef, offset = -75) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const { isReducedMotion } = getMotionPreferences();

  if (lenisRef?.current) {
    lenisRef.current.scrollTo(element, {
      offset,
      duration: isReducedMotion ? 0.001 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      immediate: isReducedMotion,
    });
  } else {
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: isReducedMotion ? 'instant' : 'smooth' });
  }
}



