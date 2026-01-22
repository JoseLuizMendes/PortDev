"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { createTimeline, shouldEnableAdvancedAnimations } from "@/lib/gsap-config";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import DecryptedTextGSAP from "@/components/ui/DecryptedTextGSAP";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * HeroExperience
 * 
 * Refactored hero section with GSAP animations and ethereal background effects
 * Features:
 * - GSAP timeline entrance sequence
 * - Mouse-reactive ethereal light pillar background
 * - Portrait integration with blend modes
 * - Responsive with simplified mobile experience
 * 
 * @component
 */
export function HeroExperience() {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const [isAdvancedEnabled, setIsAdvancedEnabled] = useState(false);

  // Check if advanced animations should be enabled
  useEffect(() => {
    setIsAdvancedEnabled(shouldEnableAdvancedAnimations());
  }, []);

  // Entrance animation with GSAP
  useGSAP(
    () => {
      if (!containerRef.current || !contentRef.current) return;

      const tl = createTimeline();

      // Fade in background
      tl.from(backgroundRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // Portrait entrance
      tl.from(
        portraitRef.current,
        {
          scale: 0.5,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.4)",
        },
        "-=0.5"
      );

      // Content entrance (stagger children)
      const children = contentRef.current.children;
      tl.from(
        children,
        {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  // Mouse tracking for ethereal effect
  useEffect(() => {
    if (!isAdvancedEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isAdvancedEnabled]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ethereal Light Pillar Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 opacity-0"
        aria-hidden="true"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Animated light pillar - reacts to mouse */}
        {isAdvancedEnabled && (
          <div
            className="absolute inset-0 opacity-40 transition-transform duration-700 ease-out"
            style={{
              background: `radial-gradient(
                ellipse ${40 + mousePos.x * 20}% ${50 + mousePos.y * 30}% at ${mousePos.x * 100}% ${mousePos.y * 100}%,
                rgba(59, 130, 246, 0.3) 0%,
                rgba(147, 51, 234, 0.2) 25%,
                transparent 70%
              )`,
            }}
          />
        )}

        {/* Static fallback for mobile */}
        {!isAdvancedEnabled && (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-purple-950/20 to-transparent" />
        )}

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-6 text-center">
        {/* Portrait with blend effects */}
        <div ref={portraitRef} className="mb-6 mt-20">
          <div className="relative w-32 h-32 mx-auto">
            {/* Portrait image */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl shadow-blue-500/25">
              <Image
                className="w-full h-full object-cover"
                src="/Dev.jpeg"
                alt="Jose Luiz Portrait"
                width={130}
                height={130}
                style={{ mixBlendMode: "screen" }}
                priority
              />
              {/* Overlay gradient for blend effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-600/30 to-transparent mix-blend-overlay" />
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 blur-xl -z-10" />
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-4">
          <p className="text-2xl md:text-3xl text-slate-300">Olá, eu sou o</p>
        </div>

        {/* Name with GSAP DecryptedText */}
        <div className="mb-6">
          <DecryptedTextGSAP
            text="José Luiz"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
            delay={0.5}
          />
        </div>

        {/* Title with GSAP DecryptedText */}
        <div className="mb-8">
          <DecryptedTextGSAP
            text="Desenvolvedor Full Stack"
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
            delay={1}
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Sou apaixonado por tecnologia, sempre em busca de novos
            desafios e oportunidades para crescer profissionalmente.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300"
            onClick={() => scrollToSection("projects")}
          >
            Ver Projetos
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-slate-600/50 bg-slate-800/50 text-white hover:text-white hover:bg-slate-700/80 hover:border-blue-500/50 px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300"
            onClick={() => window.open("/curriculo", "_blank")}
          >
            <Download className="mr-2 h-4 w-4" />
            Currículo
          </Button>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-bounce cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="h-6 w-6 text-slate-400 mx-auto" />
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </section>
  );
}
