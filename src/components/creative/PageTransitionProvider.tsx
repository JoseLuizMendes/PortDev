"use client";

import { ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { createTimeline, shouldEnableAdvancedAnimations } from "@/lib/gsap-config";

interface PageTransitionProviderProps {
  children: ReactNode;
}

/**
 * PageTransitionProvider
 * 
 * Provides cinematographic page transitions for Next.js App Router
 * Uses curtain effect for route changes
 * 
 * Features:
 * - Curtain wipe transition between pages
 * - Respects reduced motion preferences
 * - SSR safe
 * - Proper cleanup on unmount
 * 
 * @component
 */
export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef<string>(pathname);

  // Handle route transitions
  useGSAP(
    () => {
      // Skip on initial mount
      if (prevPathnameRef.current === pathname) {
        return;
      }

      // Check if advanced animations are enabled
      if (!shouldEnableAdvancedAnimations()) {
        prevPathnameRef.current = pathname;
        return;
      }

      const tl = createTimeline();

      // Close curtains (exit)
      tl.set([curtainLeftRef.current, curtainRightRef.current], {
        x: "0%",
        display: "block",
      })
        .to(contentRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(
          curtainLeftRef.current,
          {
            x: "0%",
            duration: 0.5,
            ease: "power3.inOut",
          },
          "-=0.2"
        )
        .to(
          curtainRightRef.current,
          {
            x: "0%",
            duration: 0.5,
            ease: "power3.inOut",
          },
          "<"
        );

      // Open curtains (enter)
      tl.to(contentRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(curtainLeftRef.current, {
          x: "-100%",
          duration: 0.6,
          ease: "power3.inOut",
        })
        .to(
          curtainRightRef.current,
          {
            x: "100%",
            duration: 0.6,
            ease: "power3.inOut",
          },
          "<"
        )
        .set([curtainLeftRef.current, curtainRightRef.current], {
          display: "none",
        });

      prevPathnameRef.current = pathname;

      return () => {
        tl.kill();
      };
    },
    { dependencies: [pathname], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Content */}
      <div ref={contentRef}>{children}</div>

      {/* Curtain - Left */}
      <div
        ref={curtainLeftRef}
        className="fixed top-0 left-0 w-1/2 h-full bg-slate-950 z-[9998] pointer-events-none hidden"
        style={{ transform: "translateX(-100%)" }}
        aria-hidden="true"
      />

      {/* Curtain - Right */}
      <div
        ref={curtainRightRef}
        className="fixed top-0 right-0 w-1/2 h-full bg-slate-950 z-[9998] pointer-events-none hidden"
        style={{ transform: "translateX(100%)" }}
        aria-hidden="true"
      />
    </div>
  );
}
