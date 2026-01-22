"use client";

/**
 * GSAP Configuration Module
 * 
 * This module safely registers GSAP plugins for client-side use,
 * preventing SSR hydration errors in Next.js 15.
 * 
 * @module gsap-config
 */

import { gsap } from "gsap";

// Core GSAP plugins
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { TextPlugin } from "gsap/TextPlugin";

// Track initialization state
let isInitialized = false;

/**
 * Registers GSAP plugins safely for client-side use
 * 
 * This function ensures plugins are only registered once
 * and only in the browser environment (not during SSR)
 */
export function registerGSAPPlugins(): void {
  if (typeof window === "undefined") {
    console.warn("GSAP plugins can only be registered in browser environment");
    return;
  }

  if (isInitialized) {
    return;
  }

  // Register all plugins
  gsap.registerPlugin(ScrollTrigger, Observer, Flip, TextPlugin);

  // Configure ScrollTrigger defaults for better performance
  ScrollTrigger.config({
    // Reduce precision for better mobile performance
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true,
  });

  // Set GSAP defaults for better performance
  gsap.defaults({
    ease: "power2.out",
    duration: 0.6,
  });

  isInitialized = true;
}

/**
 * Gets the current GSAP instance
 * 
 * @returns GSAP instance
 */
export function getGSAP() {
  if (typeof window !== "undefined" && !isInitialized) {
    registerGSAPPlugins();
  }
  return gsap;
}

/**
 * Gets ScrollTrigger instance
 * 
 * @returns ScrollTrigger instance or null if not in browser
 */
export function getScrollTrigger() {
  if (typeof window === "undefined") {
    return null;
  }
  if (!isInitialized) {
    registerGSAPPlugins();
  }
  return ScrollTrigger;
}

/**
 * Utility to create a GSAP timeline with common settings
 * 
 * @param config - Timeline configuration
 * @returns GSAP Timeline
 */
export function createTimeline(config?: gsap.TimelineVars) {
  return gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.6,
    },
    ...config,
  });
}

/**
 * Check if device supports high-performance animations
 * Based on reduced motion preferences and device capabilities
 * 
 * @returns true if high-performance animations should be enabled
 */
export function shouldEnableAdvancedAnimations(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // Respect user's reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    return false;
  }

  // Check for touch devices (generally have lower performance)
  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches;

  // Enable advanced animations on desktop, simplify on touch
  return !isTouchDevice;
}

/**
 * Utility to kill all GSAP animations and ScrollTriggers
 * Useful for cleanup when component unmounts
 */
export function killAllGSAP(): void {
  if (typeof window === "undefined") {
    return;
  }

  gsap.killTweensOf("*");
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

// Export GSAP and plugins for direct use
export { gsap, ScrollTrigger, Observer, Flip, TextPlugin };

// Auto-initialize on module load (client-side only)
if (typeof window !== "undefined") {
  registerGSAPPlugins();
}
