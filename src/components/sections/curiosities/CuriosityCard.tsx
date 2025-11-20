"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <ElectricBorder
        color="#1e40af"
        speed={1}
        chaos={0.25}
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
    </motion.div>
  );
}
