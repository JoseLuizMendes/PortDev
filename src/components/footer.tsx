"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800/50 py-8 relative overflow-hidden"
    >
      {/* Tech pattern background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-slate-400 text-sm mb-4 md:mb-0 font-mono">
            <span className="text-blue-400">©</span> 2024
            <span className="text-gradient font-semibold"> DevPortfolio</span>
            <span className="text-slate-500">. All rights reserved.</span>
          </div>

          <div className="flex items-center text-slate-400 text-sm">
            <span>Crafted with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500 animate-pulse" />
            <span>& lots of</span>
            <span className="text-blue-400 font-mono mx-1">{"<code/>"}</span>
            <span>by a CS student</span>
          </div>
        </div>

        {/* Tech footer decoration */}
        <div className="flex justify-center mt-4 pt-4 border-t border-slate-800/50">
          <div className="flex space-x-2 text-slate-600 text-xs font-mono">
            <span className="opacity-60">Next.js</span>
            <span>•</span>
            <span className="opacity-60">TypeScript</span>
            <span>•</span>
            <span className="opacity-60">Tailwind</span>
            <span>•</span>
            <span className="opacity-60">Framer Motion</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}