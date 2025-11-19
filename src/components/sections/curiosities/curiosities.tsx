"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import personal from "../../../../public/personal.png";
import { BadgeCheck } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { CuriosityCard } from "./CuriosityCard";
import { curiosities } from "./data";

export default function Curiosities() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <SplitText
            text="Curiosidades"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 justify-center"
          />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Um pouco mais sobre mim além do código
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[auto_340px_1fr] gap-6 md:gap-8 lg:gap-0 items-start mx-auto">
          {/* Cards de Curiosidades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 order-2 lg:order-1 max-w-[600px] lg:pr-8">
            {curiosities.map((item, index) => (
              <CuriosityCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={index}
              />
            ))}
          </div>

          {/* Imagem - Card Profile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex justify-center order-1 lg:order-2 mb-8 lg:mb-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px]">
              {/* Card Container com imagem de fundo */}
              <Card className="rounded-3xl md:rounded-4xl h-[420px] sm:h-[480px] md:h-[535px] p-1.5 md:p-2">
                  <CardContent className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl h-full">
                    {/* Imagem como background */}
                    <div className="relative h-[370px] sm:h-[430px] md:h-[480px]">
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      {/* Nome e Verificação */}
                      <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          José Luiz
                        </h3>
                        <BadgeCheck
                        size={20}
                
                        className="w-6 h-6 mt-1.5 text-blue-600" />
                      </div>

                      {/* Profissão */}
                      <p className="text-slate-200 text-sm sm:text-base mb-4 md:mb-6 leading-relaxed font-medium">
                        Desenvolvedor Full Stack
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 text-slate-300">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
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
                          <span className="font-semibold text-xs sm:text-sm">
                            5+ Projetos
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
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
                          <span className="font-semibold text-xs sm:text-sm">
                            5+ Tecnologias
                          </span>
                        </div>
                      </div>

                      {/* Botão */}
                      <a 
                        href="https://www.linkedin.com/in/jos%C3%A9-luiz-dos-santos-azeredo-mendes-ab5a10283/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group text-sm md:text-base"
                      >
                        Contate-me
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
                      </a>
                    </div>
                  </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Área de texto à direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-3 lg:block lg:pl-40"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Sobre Mim
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Sou um desenvolvedor determinado, criativo e sociável, apaixonado por transformar
                ideias em soluções reais. O que me move é identificar problemas e criar maneiras
                de resolvê-los — e quando não sei como, eu aprendo.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Além da programação, sou curioso por natureza: neurociência, finanças e música
                fazem parte da minha rotina. Toco violão, guitarra, teclado e carron — afinal,
                criatividade não tem limites!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
