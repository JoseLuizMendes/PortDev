"use client";

import { SplitText } from "@/components/ui/split-text";
import { CuriosityCard } from "./CuriosityCard";
import { CuriosityBookCard } from "./CuriosityBookCard";
import { curiosities } from "./data";
import { TechEffects } from "@/components/ui/tech-effects";
import ProfileCard from "@/components/ui/ProfileCard";
import {
  GsapParallax,
  GsapScrollReveal,
} from "@/components/ui/gsap-animations";
import { Badge } from "@/components/ui/badge";
import { CircleQuestionMark } from "lucide-react";

export default function Curiosities() {
  return (
    <section
      id="curiosities"
      className="py-20 lg:py-24 bg-background relative tech-pattern overflow-hidden isolate"
    >
      <TechEffects />

      <div className="absolute inset-0 -z-10">
        <GsapParallax
          speed={0.18}
          direction="up"
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-3xl h-192 rounded-full bg-primary/10 blur-3xl"
        >
          <div />
        </GsapParallax>
        <GsapParallax
          speed={0.12}
          direction="down"
          className="absolute top-1/3 -left-28 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
        >
          <div />
        </GsapParallax>
        <GsapParallax
          speed={0.15}
          direction="up"
          className="absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        >
          <div />
        </GsapParallax>
      </div>

      <div className="container mx-auto px-6">
        <GsapScrollReveal
          animation="fadeUp"
          className="text-center mb-10 md:mb-14 lg:mb-16"
        >
          <Badge className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/25 backdrop-blur-sm">
            <CircleQuestionMark size={14} />
            <span>Além do portfólio</span>
          </Badge>

          <SplitText
            text="Identidade, processo e visão"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 justify-center"
          />

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Uma leitura rápida de como penso, crio e evoluo para entregar com
            mais precisão.
          </p>
        </GsapScrollReveal>

        <div className="mx-auto max-w-350">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 xl:gap-12 items-start">
            {/* Área de texto à ESQUERDA */}
            <div className="order-3 lg:order-1 h-full">
              <GsapScrollReveal animation="fadeLeft">
                <CuriosityBookCard />
              </GsapScrollReveal>
            </div>

            {/* Cards de Curiosidades - CENTRO */}
            <GsapScrollReveal
              animation="fadeUp"
              stagger={0.1}
              className="grid grid-cols-1 gap-4 sm:gap-5 content-start order-2 overflow-visible w-full max-w-100 mx-auto lg:mx-0"
            >
              {curiosities.map((item, index) => (
                <CuriosityCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              ))}
            </GsapScrollReveal>

            {/* Imagem - Card Profile - DIREITA */}
            <GsapScrollReveal
              animation="fadeRight"
              className="order-1 py-4 lg:py-8 lg:order-3 w-full max-w-sm lg:max-w-105 mx-auto self-start object-cover flex flex-col items-center"
            >
              <ProfileCard
                className="w-full"
                avatarUrl="/Card_Profissional.png"
                avatarOffsetY={10}
                name="José Luiz"
                title="Desenvolvedor Full Stack"
                enableTilt={true}
                behindGlowEnabled={true}
                enableMobileTilt={true}
                showUserInfo={true}
                behindGlowSize="50%"
                behindGlowColor="rgba(38,70,94)"
              />
            </GsapScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
