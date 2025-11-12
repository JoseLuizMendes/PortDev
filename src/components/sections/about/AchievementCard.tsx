"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Achievement, DialogAchievements } from "./types";

// Renderizador de conteúdo específico por tipo
function renderDialogContent(title: string, dialogData: DialogAchievements) {
  switch (title) {
    case "Formação": {
      const data = dialogData.Formação;
      return (
        <div className="space-y-1">
          <p className="font-semibold text-blue-300">{data.course}</p>
          <div className="grid grid-cols-2 text-slate-400">
            <p>Universidade: {data.institution}</p>
            <p>
              Status: <span className="text-emerald-400">{data.status}</span>
            </p>
            {data.start && <p>Desde: {data.start}</p>}
            {data.end && <p>Até: {data.end}</p>}
          </div>
        </div>
      );
    }

    case "Stack": {
      const data = dialogData.Stack;
      return (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-3">
            {/* Frontend */}
            <div className="space-y-1">
              <h4 className="font-bold text-blue-300 mb-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Frontend
              </h4>
              <div className="space-y-0 text-slate-300 pl-2">
                <p className="text-slate-400">Lang:</p>
                <p className="font-medium">{data.frontend.language}</p>
                <p className="text-slate-400 mt-1">Framework:</p>
                <div className="flex flex-wrap gap-1">
                  {data.frontend.framework.map((item, idx) => (
                    <span key={idx} className=" py-0">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 mt-1">Style:</p>
                <div className="flex flex-wrap gap-1">
                  {data.frontend.styling && (
                    <span className="py-0">{data.frontend.styling}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-1">
              <h4 className="font-bold text-cyan-300 mb-2 flex items-center gap-1">
                <span className="w-1.5 h-1 bg-cyan-400 rounded-full"></span>
                Backend
              </h4>
              <div className="space-y-0 text-slate-300 pl-2">
                <p className="text-slate-400">Lang:</p>
                <p className="font-medium">{data.backend.language}</p>
                <p className="text-slate-400 mt-1">Framework:</p>
                <div className="flex flex-wrap gap-1">
                  {data.backend.framework.map((item, idx) => (
                    <span key={idx} className="py-0">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 mt-1">Database:</p>
                <p className="font-medium">{data.backend.database}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "Foco": {
      const data = dialogData.Foco;
      return (
        <div className="space-y-0">
          <p className="text-slate-300">{data.description}</p>
        </div>
      );
    }

    case "Colaboração": {
      const data = dialogData.Colaboração;
      return (
        <div className="space-y-0">
          <p className="text-slate-300">{data.description}</p>
        </div>
      );
    }

    default:
      return (
        <p className="text-slate-400 text-sm">Informações não disponíveis.</p>
      );
  }
}

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  dialogData: DialogAchievements;
}

export function AchievementCard({
  achievement,
  dialogData,
}: AchievementCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="w-full h-64"
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {/* Front side - Card inicial */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="w-full h-full"
          animate={{
            opacity: isFlipped ? 0 : 1,
            pointerEvents: isFlipped ? "none" : "auto",
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-card hover:border-blue-500/50 transition-all duration-300 h-full tech-hover group">
            <CardContent className="p-0 text-center relative flex flex-col justify-between h-full">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <achievement.icon className="h-8 w-8 text-blue-400 group-hover:text-blue-300" />
              </div>
              <div>
                <h3 className="text-white font-semibold group-hover:text-blue-100">
                  {achievement.title}
                </h3>
                <p className="text-slate-400 p-2 text-sm group-hover:text-slate-300">
                  {achievement.description}
                </p>
              </div>
              <p className="text-slate-400 text-xs group-hover:text-slate-300 text-center italic">
                Passe o mouse para mais detalhes ✨
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back side - Dados detalhados */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            rotateY: 180,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          className="w-full h-full"
          animate={{
            opacity: isFlipped ? 1 : 0,
            pointerEvents: isFlipped ? "auto" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-card border-blue-500/30 transition-all duration-300 h-full tech-hover group bg-slate-900/60">
            <CardContent className="pt-0 px-6 pb-2 h-full flex flex-col justify-start overflow-hidden">
              <h3 className="text-white font-semibold mb-2 text-center pb-2 border-b border-slate-700/50">
                {achievement.title}
              </h3>
              <div className="text-slate-300 text-sm font-semibold space-y-1 flex-grow overflow-y-auto">
                {renderDialogContent(achievement.title, dialogData)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
