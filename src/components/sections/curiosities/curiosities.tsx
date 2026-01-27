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
import ProfileCard from "@/components/ui/ProfileCard";

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
            <div className="grid grid-cols-1 gap-4 order-2 h-full overflow-visible py-2.5 w-full max-w-100 mx-auto lg:mx-0">
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
            <ProfileCard
              avatarUrl="/public/Card_Profissional.png"            
              name="José Luiz"
              title="Desenvolvedor Front-end"
              enableTilt
              behindGlowEnabled={true}
              className="order-1 lg:order-3 max-w-[300px] mx-auto lg:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
