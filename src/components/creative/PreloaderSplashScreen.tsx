"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { createTimeline } from "@/lib/gsap-config";

interface PreloaderSplashScreenProps {
  /**
   * Callback when preloader animation completes
   */
  onComplete?: () => void;
  /**
   * Maximum duration in milliseconds (default: 5000ms)
   */
  maxDuration?: number;
}

/**
 * PreloaderSplashScreen
 * 
 * Cinematographic splash screen with GSAP timeline animation
 * Inspired by https://www.ousmaneballondor.fr/
 * 
 * Features:
 * - Animated monogram "JL" and name "Jose Luiz"
 * - Maximum 5 second duration
 * - Curtain/opening reveal transition
 * - Respects prefers-reduced-motion
 * 
 * @component
 */
export function PreloaderSplashScreen({
  onComplete,
  maxDuration = 10000,
}: PreloaderSplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Check for reduced motion preference
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        // Skip animation if reduced motion is preferred
        handleComplete();
        return;
      }

      // Create main timeline
      const tl = createTimeline({
        onComplete: handleComplete,
      });

      // Monogram entrance (0-1.5s)
      tl.from(monogramRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -180,
        duration: 1,
        ease: "back.out(1.7)",
      })
        .to(monogramRef.current, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(monogramRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });

      // Name entrance (1.5-3s)
      tl.from(
        nameRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Hold for a moment (3-3.5s)
      tl.to({}, { duration: 0.5 });

      // Fade out content (3.5-4s)
      tl.to([monogramRef.current, nameRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
      });

      // Curtain reveal (4-5s)
      tl.to(
        curtainLeftRef.current,
        {
          x: "-100%",
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.2"
      ).to(
        curtainRightRef.current,
        {
          x: "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        "<"
      );

      // Maximum duration timeout
      const timeout = setTimeout(() => {
        tl.kill();
        handleComplete();
      }, maxDuration);

      return () => {
        clearTimeout(timeout);
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  function handleComplete() {
    setIsVisible(false);
    if (onComplete) {
      setTimeout(onComplete, 100);
    }
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      aria-label="Loading animation"
      role="status"
    >
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Monogram "JL" */}
        <div
          ref={monogramRef}
          className="relative"
          aria-hidden="true"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <span className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
              JL
            </span>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 blur-2xl -z-10" />
        </div>

        {/* Name */}
        <div
          ref={nameRef}
          className="text-center"
          aria-hidden="true"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Jose Luiz
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mt-2">
            Desenvolvedor Full Stack
          </p>
        </div>
      </div>

      {/* Curtain Effect - Left */}
      <div
        ref={curtainLeftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-slate-950 z-20"
        aria-hidden="true"
      />

      {/* Curtain Effect - Right */}
      <div
        ref={curtainRightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-slate-950 z-20"
        aria-hidden="true"
      />

      {/* Accessible loading text */}
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
