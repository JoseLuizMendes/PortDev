"use client";

import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SplitTextChar } from "@/components/ui/split-text";
//import { Beams } from "@/components/ui/beams";
import DecryptedScrambleText from "@/components/ui/DecryptedScrambleText";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import LightRays from "../ui/LightRays";
import { GsapMagnetic } from "../ui/gsap-animations";
import { gsap, getScrollTrigger } from "@/lib/gsap-config";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (id: string) => {
    type LenisLike = {
      scrollTo: (target: unknown, options?: Record<string, unknown>) => void;
    };

    const lenis =
      typeof window !== "undefined"
        ? (window as unknown as { __lenis?: LenisLike }).__lenis
        : undefined;

    const element = document.getElementById(id);
    if (element) {
      if (lenis?.scrollTo) {
        lenis.scrollTo(element, { immediate: false });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useLayoutEffect(() => {
    if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

    const ScrollTrigger = getScrollTrigger();
    if (!ScrollTrigger) return;

    const ctx = gsap.context(() => {
      // Background move slower (down) + slight scale for depth
      gsap.to(bgRef.current, {
        yPercent: 18,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Foreground/content move faster (up) to feel separated
      gsap.to(contentRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    // Garante cálculos corretos após o layout (e Lenis) estabilizarem
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image (fica atrás do LightRays) */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          width={1920}
          height={1080}
          src="/peace.svg"
          alt="bg"
          sizes="100vw"
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Gradient overlay (escurece um pouco o background, mas fica abaixo do conteúdo) */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-slate-900/50" />

      {/* Light rays acima da imagem */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <LightRays
          saturation={2}
          mouseInfluence={0.1}
          fadeDistance={2}
          raysColor="#011228"
          
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-30 container mx-auto px-6 text-center will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-6 mt-20"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl pulse-tech relative overflow-hidden">
            <Image
              className="mx-auto rounded-full overflow-hidden mt-10"
              src="/Dev.jpeg"
              alt="José Luiz"
              width={130}
              height={130}
            />
          </div>
        </motion.div>

        <div className="mb-6" id="hello-hero">
          <SplitTextChar
            text="Olá, eu sou o"
            className="text-2xl md:text-3xl text-slate-300 mb-4 justify-center"
            delay={0.5}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-6"
          >
            <DecryptedScrambleText
              text="José Luiz"
              speed={15}
              maxIterations={12}
              sequential={true}
              revealDirection="start"
              scrambleOnHover={false}
              scrambleSpeed={10}
              playOncePerPageLoadKey="home-name"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
              encryptedClassName="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-400"
              parentClassName="inline-block"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <DecryptedScrambleText
              text="Desenvolvedor Full Stack"
              speed={10}
              maxIterations={6}
              sequential={true}
              revealDirection="start"
              scrambleOnHover={false}
              scrambleSpeed={10}
              playOncePerPageLoadKey="home-role"
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
              encryptedClassName="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-400"
              parentClassName="inline-block"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Sou apaixonado por tecnologia, sempre em busca de novos desafios e
            oportunidades para crescer profissionalmente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <GsapMagnetic strength={0.2}>
            <Button
              size="lg"
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full tech-hover shadow-lg shadow-blue-500/25"
              onClick={() => scrollToSection("projects")}
            >
              Ver Projetos
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </GsapMagnetic>

          <GsapMagnetic strength={0.2}>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600/50 bg-slate-800/50 text-white hover:text-white hover:bg-slate-700/80 hover:border-blue-500/50 px-8 py-3 rounded-full tech-hover backdrop-blur-sm"
              onClick={() => window.open("/curriculo", "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              Currículo
            </Button>
          </GsapMagnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.6 }}
          className="animate-bounce cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="h-6 w-6 text-slate-400 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
