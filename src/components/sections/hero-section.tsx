"use client";

import { Button } from "@/components/ui/button";
import { SplitTextChar } from "@/components/ui/split-text";
import DecryptedText from "@/components/ui/DecryptedText";
import { Beams } from "@/components/ui/beams";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Beams />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl pulse-tech relative overflow-hidden">
            <Image
              className="mx-auto rounded-full overflow-hidden mt-10"
              src="/Dev.jpeg"
              alt="Logo"
              width={130}
              height={60}
            />
          </div>
        </motion.div>

        <div className="mb-6">
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
            <DecryptedText
              text="José Luiz"
              speed={60}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              animateOn="both"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
              encryptedClassName="text-4xl md:text-6xl lg:text-7xl font-bold "
              parentClassName="inline-block"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <DecryptedText
              text="Desenvolvedor Full Stack"
              speed={30}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              animateOn="both"
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
              encryptedClassName="text-3xl md:text-5xl lg:text-6xl font-bold"
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
            Sou apaixonado por tecnologia, sempre em busca de novos
            desafios e oportunidades para crescer profissionalmente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full tech-hover shadow-lg shadow-blue-500/25"
            onClick={() => scrollToSection("projects")}
          >
            Ver Projetos
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-slate-600/50 bg-slate-800/50 text-white hover:text-white hover:bg-slate-700/80 hover:border-blue-500/50 px-8 py-3 rounded-full tech-hover backdrop-blur-sm"
            onClick={() => window.open("/curriculo", "_blank")}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
    </section>
  );
}
