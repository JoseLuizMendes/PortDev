"use client";

import LogoLoop from "@/components/ui/LogoLoop";
import { GsapScrollReveal } from "@/components/ui/gsap-animations";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiJavascript,
} from "react-icons/si";

export function Footer() {
  const techLogos = [
    { node: <SiJavascript className="w-8 h-8" />, title: "JavaScript", ariaLabel: "JavaScript" },
    { node: <SiNextdotjs className="w-8 h-8" />, title: "Next.js", ariaLabel: "Next.js" },
    { node: <SiReact className="w-8 h-8" />, title: "React", ariaLabel: "React" },
    { node: <SiTypescript className="w-8 h-8" />, title: "TypeScript", ariaLabel: "TypeScript" },
    { node: <SiTailwindcss className="w-8 h-8" />, title: "Tailwind CSS", ariaLabel: "Tailwind CSS" },
    { node: <SiFramer className="w-8 h-8" />, title: "Framer Motion", ariaLabel: "Framer Motion" },
    { node: <SiNodedotjs className="w-8 h-8" />, title: "Node.js", ariaLabel: "Node.js" },
    { node: <SiPostgresql className="w-8 h-8" />, title: "PostgreSQL", ariaLabel: "PostgreSQL" },
  ];

  return (
    <GsapScrollReveal animation="fadeUp">
      <footer className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800/50 py-8 relative overflow-hidden">
      {/* Tech pattern background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-linear-to-b from-transparent via-purple-500/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-slate-400 text-sm mb-4 md:mb-0 font-mono text-center">
          <span className="text-primary/80">©</span> {new Date().getFullYear()}
          <span className="text-primary/80 font-semibold italic"> DevPortfolio</span>
          <span className="text-slate-500">. All rights reserved.</span>
        </div>

        {/* Tech footer decoration */}
        <div className="mt-8 pt-6 border-t border-slate-800/50">
          <p className="text-slate-500 text-xs text-center mb-4 font-mono">
            Desenvolvido com
          </p>
          <LogoLoop
            logos={techLogos}
            speed={20}
            direction="left"
            logoHeight={32}
            gap={48}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={false}
            className="text-slate-400 hover:text-primary/60 transition-colors"
          />
        </div>
      </div>
      </footer>
    </GsapScrollReveal>
  );
}
