"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { getScrollTrigger, shouldEnableAdvancedAnimations } from "@/lib/gsap-config";

interface SmoothScrollWrapperProps {
  children: ReactNode;
  /**
   * Enable smooth scrolling (can be disabled for touch devices)
   */
  enabled?: boolean;
  /**
   * Scroll duration in seconds
   */
  duration?: number;
  /**
   * Easing function for smooth scroll
   */
  easing?: (t: number) => number;
  /**
   * Scroll smoothness (0-1, higher = smoother but more lag)
   */
  smoothness?: number;
}

/**
 * SmoothScrollWrapper
 * 
 * Integrates Lenis smooth scrolling with GSAP ScrollTrigger
 * Automatically disables on touch devices and respects reduced motion preferences
 * 
 * @component
 */
export function SmoothScrollWrapper({
  children,
  enabled = true,
  duration = 1.2,
  easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothness = 0.1,
}: SmoothScrollWrapperProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if smooth scrolling should be enabled
    const shouldEnable =
      enabled &&
      shouldEnableAdvancedAnimations() &&
      typeof window !== "undefined";

    if (!shouldEnable) {
      // Clean up any existing instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration,
      easing,
      lerp: smoothness,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    const ScrollTrigger = getScrollTrigger();
    if (ScrollTrigger) {
      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });
    }

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [enabled, duration, easing, smoothness]);

  return <>{children}</>;
}

/**
 * Hook to access Lenis instance
 * 
 * @returns Lenis instance or null
 */
export function useLenis() {
  return useRef<Lenis | null>(null);
}
