"use client";

import { SplitText } from "@/components/ui/split-text";
import { AchievementCard } from "./AchievementCard";
import { achievements, dialogAchievements } from "./data";
import { TechEffects } from "@/components/ui/tech-effects";
import { GsapScrollReveal } from "@/components/ui/gsap-animations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const focusTags = [
  "Arquitetura Full Stack",
  "Performance",
  "UX orientada a valor",
  "SaaS Builder",
  "Aprendizado contínuo",
  "Colaboração de produto",
];

const aboutStats = [
  { number: "2+", label: "Anos de Experiência" },
  { number: "5+", label: "Projetos Desenvolvidos" },
  { number: "5+", label: "Tecnologias Dominadas" },
  { number: "∞", label: "Vontade de Aprender" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-background relative tech-pattern overflow-hidden">
      <TechEffects />
      <div className="container mx-auto px-6">
        <GsapScrollReveal animation="fadeUp" className="text-center mb-12 sm:mb-16">
          <SplitText
            text="Sobre Mim"
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 justify-center"
          />
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Full stack em evolução, construindo soluções com foco em clareza,
            performance e impacto real.
          </p>
        </GsapScrollReveal>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <GsapScrollReveal
            animation="fadeLeft"
            className="lg:col-span-7 text-center md:text-left"
          >
            <Card className="rounded-xl border border-border/60 bg-card/40 shadow-none">
              <CardContent className="p-5 sm:p-8">
                <GsapScrollReveal
                  animation="fadeUp"
                  stagger={0.12}
                  className="space-y-4 sm:space-y-5"
                >
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-center md:text-justify">
                    Sou um desenvolvedor full stack em evolução, movido por foco,
                    curiosidade e a vontade de criar soluções que realmente façam
                    diferença. Minha jornada na Ciência da Computação é marcada por
                    projetos que unem técnica, propósito e criatividade.
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-center md:text-justify">
                    Exploro front-end, back-end e produto, com atenção especial à
                    experiência de uso e à performance. Hoje, direciono essa energia
                    para construir meu próprio SaaS e gerar impacto prático para
                    pessoas e negócios.
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-center md:text-justify">
                    Também invisto em soft skills como comunicação, proatividade e
                    colaboração, porque os melhores resultados surgem de times
                    alinhados. Meu objetivo é evoluir até a senioridade e empreender
                    com liberdade e visão de longo prazo.
                  </p>
                </GsapScrollReveal>

                <GsapScrollReveal
                  animation="scaleUp"
                  stagger={0.05}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {focusTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </GsapScrollReveal>
              </CardContent>
            </Card>
          </GsapScrollReveal>

          <GsapScrollReveal
            animation="fadeRight"
            stagger={0.06}
            className="lg:col-span-5 grid grid-cols-2 gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-4"
          >
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                achievement={achievement}
                index={index}
                dialogData={dialogAchievements}
              />
            ))}
          </GsapScrollReveal>
        </div>

        <GsapScrollReveal
          animation="fadeUp"
          stagger={0.08}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {aboutStats.map((stat) => (
            <Card
              key={stat.label}
              className="rounded-xl border border-border/60 bg-card/40 shadow-none"
            >
              <CardContent className="p-4 sm:p-5 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </GsapScrollReveal>
      </div>
    </section>
  );
}
