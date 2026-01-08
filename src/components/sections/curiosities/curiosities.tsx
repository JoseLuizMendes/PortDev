"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import card from "../../../../public/Card_Profissional.png";
import { BadgeCheck, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { CuriosityCard } from "./CuriosityCard";
import { curiosities } from "./data";
import { TechEffects } from "@/components/ui/tech-effects";

export default function Curiosities() {
  return (
    <section
      id="curiosities"
      className="py-20 bg-background relative tech-pattern overflow-hidden">
      <TechEffects />
      <div className="container  mx-auto px-6">
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

        <div className="mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
            {/* Área de texto à ESQUERDA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-3 lg:order-1 h-full"
            >
              <div className="space-y-3 text-center">
                <h3 className="text-2xl font-bold">Sobre Mim</h3>

                <p className="text-muted-foreground leading-relaxed">
                  Sou o{" "}
                  <span className="text-foreground font-semibold">José Luiz</span>
                  , alguém movido pela curiosidade — seja na tecnologia, na arte
                  ou na mente humana. Antes do código, sempre fui o cara que
                  queria entender o “porquê” das coisas, e isso acabou me guiando
                  naturalmente para o mundo do desenvolvimento.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  No trabalho, busco foco e intenção. Meu dia começa com café,
                  música no fone e aquela imersão total no que estou construindo.
                  Acredito que consistência e criatividade formam a base de
                  qualquer entrega bem-feita.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Fora das telas, a música é meu ponto de equilíbrio. Aprendi a
                  tocar na pandemia e, desde então, violão, teclado, guitarra,
                  baixo e cajón fazem parte da minha rotina. Ela expandiu minha
                  mente e virou uma das minhas principais fontes de inspiração.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Também sou fascinado por neurociência e por como o cérebro — a
                  máquina mais eficiente que existe — processa o mundo. Esse
                  interesse, junto de finanças e tecnologia, alimenta minha
                  vontade de aprender sempre mais e contribuir de forma real em
                  tudo o que faço.
                </p>
              </div>
            </motion.div>

            {/* Cards de Curiosidades - CENTRO */}
            <div className="grid grid-cols-1 gap-4 order-2 h-full overflow-visible py-2.5 w-full max-w-[400px] mx-auto lg:mx-0">
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

            {/* Imagem - Card Profile - DIREITA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex justify-center mt-1 order-1 lg:order-3 h-full"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px]">
                {/* Card Container com imagem de fundo */}
                <Card className="rounded-3xl md:rounded-4xl w-full border-none bg-transparent shadow-none">
                  <CardContent className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl p-5">
                    {/* Imagem como background */}
                    <div className="relative h-[370px] sm:h-[430px] md:h-[480px]">
                      <Image
                        src={card}
                        alt="José Luiz - Desenvolvedor Full Stack"
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                        priority
                      />

                      {/* Gradiente blur na metade inferior */}
                      <div className="absolute inset-0 bg-gradient-to-t rounded-2xl from-slate-900 via-slate-900/40 to-transparent"></div>
                    </div>

                    {/* Conteúdo sobreposto */}
                    <div className="absolute -bottom-0 sm:-bottom-2 md:-bottom-0 left-4 right-4 px-4 sm:px-5 md:px-6 flex flex-col">
                      {/* Nome e Verificação */}
                      <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          José Luiz
                        </h3>
                        <BadgeCheck
                          size={20}
                          className="w-6 h-6 mt-1.5 text-blue-600"
                        />
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
                      <div className="w-full flex justify-center mb-7">
                        <a
                          href="https://www.linkedin.com/in/jos%C3%A9-luiz-dos-santos-azeredo-mendes-ab5a10283/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full max-w-[250px] bg-white hover:bg-slate-100 text-slate-900 font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group text-sm md:text-base"
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

                      {/* Ações Sociais */}
                      <div className="w-full flex justify-between items-center px-2 mb-3">
                        <button className="group text-slate-300 hover:text-red-500 transition-colors p-2">
                          <Heart
                            size={28}
                            className="group-hover:fill-current transition-all"
                          />
                        </button>
                        <button className="text-slate-300 hover:text-blue-400 transition-colors p-2">
                          <MessageCircle size={28} />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
