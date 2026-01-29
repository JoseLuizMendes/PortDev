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
  return (
    <GsapScrollReveal
      animation="fadeUp"
      delay={index * 0.08}
      duration={0.5}
      className="group transition-transform duration-200 hover:-translate-y-1"
    >
      <ElectricBorder
        color="#1e40af"
        speed={1}
        chaos={0.1}
        thickness={0.03}
        className="h-full bg-card/50 backdrop-blur-sm rounded-xl p-5 transition-all duration-300"
        style={{ borderRadius: "0.75rem" }}
      >
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              {title}
            </h3>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </ElectricBorder>
    </GsapScrollReveal>
  );
}
