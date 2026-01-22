"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";

interface DecryptedTextGSAPProps {
  /**
   * Text to display and decrypt
   */
  text: string;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Characters to use for scrambling
   */
  characters?: string;
  /**
   * CSS class for final revealed text
   */
  className?: string;
  /**
   * CSS class for scrambled text
   */
  scrambledClassName?: string;
  /**
   * Trigger animation on mount (default: true)
   */
  animateOnMount?: boolean;
}

/**
 * DecryptedTextGSAP
 * 
 * GSAP-based text decryption/scramble effect
 * Uses manual scramble logic since ScrambleTextPlugin requires GSAP Club
 * 
 * Features:
 * - Progressive character reveal
 * - Scramble animation
 * - Strong TypeScript typing
 * - Performance optimized (no excessive rerenders)
 * 
 * @component
 */
export default function DecryptedTextGSAP({
  text,
  delay = 0,
  duration = 1.5,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
  className = "",
  scrambledClassName = "opacity-60",
  animateOnMount = true,
}: DecryptedTextGSAPProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const [revealProgress, setRevealProgress] = useState(0);

  useGSAP(
    () => {
      if (!containerRef.current || !animateOnMount) return;

      // Check for reduced motion
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setDisplayText(text);
        setRevealProgress(1);
        return;
      }

      // Create animation timeline
      const tl = gsap.timeline({ delay });

      // Animate progress from 0 to 1
      tl.to(
        {},
        {
          duration,
          ease: "power2.inOut",
          onUpdate: function () {
            const progress = this.progress();
            setRevealProgress(progress);

            // Calculate how many characters should be revealed
            const revealedCount = Math.floor(progress * text.length);

            // Create scrambled text
            const scrambled = text
              .split("")
              .map((char, index) => {
                // Keep spaces
                if (char === " ") return " ";

                // Reveal characters progressively
                if (index < revealedCount) {
                  return char;
                }

                // Scramble unrevealed characters
                return characters[Math.floor(Math.random() * characters.length)];
              })
              .join("");

            setDisplayText(scrambled);
          },
          onComplete: () => {
            setDisplayText(text);
            setRevealProgress(1);
          },
        }
      );

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [text, delay, duration, characters, animateOnMount] }
  );

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${className}`}
      aria-label={text}
    >
      {/* Screen reader text */}
      <span className="sr-only">{text}</span>

      {/* Visual text */}
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealed = index < revealProgress * text.length;
          return (
            <span
              key={`${index}-${char}`}
              className={isRevealed ? "" : scrambledClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
