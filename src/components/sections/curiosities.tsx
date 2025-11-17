"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import ElectricBorder from "@/components/ElectricBorder";
import personal from "../../../public/personal.png";
import { Code2, Coffee, Music, Gamepad2, BookOpen, Laptop } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const curiosities = [
  {
    icon: Coffee,
    title: "Café & Código",
    description: "Acredito que café e código são a combinação perfeita",
  },
  {
    icon: Music,
    title: "Música ao Programar",
    description: "Lo-fi e música eletrônica são minha trilha sonora favorita",
  },
  {
    icon: Gamepad2,
    title: "Gamer nas Horas Vagas",
    description: "Jogos também são uma forma de entender lógica e design",
  },
  {
    icon: BookOpen,
    title: "Leitor Assíduo",
    description: "Sempre aprendendo com livros técnicos e blogs de tech",
  },
  {
    icon: Code2,
    title: "Open Source",
    description: "Contribuo para projetos open source sempre que possível",
  },
  {
    icon: Laptop,
    title: "Trabalho Remoto",
    description: "Flexibilidade e produtividade são minha prioridade",
  },
];

export default function Curiosities() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SplitText
            text="Curiosidades"
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 justify-center"
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Um pouco mais sobre mim além do código
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 items-center max-w-7xl mx-auto">
          {/* Cards de Curiosidades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1 lg:pl-8">
            {curiosities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <ElectricBorder
                  color="#06b6d4"
                  speed={1}
                  chaos={0.3}
                  thickness={2}
                  className="h-full bg-card/50 backdrop-blur-sm rounded-xl p-5 transition-all duration-300"
                  style={{ borderRadius: "0.75rem" }}
                >
                  <div className="relative">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>

                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ElectricBorder>
              </motion.div>
            ))}
          </div>

          {/* Imagem - Card Profile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex justify-center order-1 lg:order-2 lg:justify-center"
          >
            <div className="relative max-w-[340px] w-full">
              {/* Card Container com imagem de fundo */}
              <Card>
                <CardContent>
                  <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
                    {/* Imagem como background */}
                    <div className="relative h-[530px]">
                      <Image
                        src={personal}
                        alt="José Luiz - Desenvolvedor Full Stack"
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                        priority
                      />

                      {/* Gradiente blur na metade inferior */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    </div>

                    {/* Conteúdo sobreposto */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Nome e Verificação */}
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-2xl font-bold text-white">
                          José Luiz
                        </h3>
                        <svg
                          className="w-6 h-6 text-blue-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>

                      {/* Profissão */}
                      <p className="text-slate-200 text-base mb-6 leading-relaxed font-medium">
                        Desenvolvedor Full Stack
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-6 mb-6 text-slate-300">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-semibold text-sm">
                            10+ Projetos
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          <span className="font-semibold text-sm">
                            5+ Tecnologias
                          </span>
                        </div>
                      </div>

                      {/* Botão */}
                      <button className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group">
                        Ver Projetos
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
