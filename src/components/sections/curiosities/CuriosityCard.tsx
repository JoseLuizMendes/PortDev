"use client";

import { LucideIcon } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { GsapScrollReveal } from "@/components/ui/gsap-animations";

interface CuriosityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function CuriosityCard({
  icon: Icon,
  title,
  description,
  index,
}: CuriosityCardProps) {
  const animationByIndex = index % 2 === 0 ? "fadeUp" : "fadeRight";

  return (
    <GsapScrollReveal
      animation={animationByIndex}
      delay={index * 0.08}
      duration={0.65}
      className="group transition-transform duration-300 hover:-translate-y-1"
    >
      <ElectricBorder
        color="hsl(var(--primary))"
        speed={1}
        chaos={0.06}
        thickness={0.03}
        glowIntensity={0.16}
        className="relative min-h-40 backdrop-blur-md rounded-2xl p-5 bg-card/25 border border-border/40 transition-all duration-300"
        style={{ borderRadius: "0.75rem" }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
              {title}
            </h3>
          </div>

          <div className="h-px w-full bg-border/60 mb-3" />

          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </ElectricBorder>
    </GsapScrollReveal>
  );
}
