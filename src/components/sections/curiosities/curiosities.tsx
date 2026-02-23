"use client";

import { SplitText } from "@/components/ui/split-text";
import { CuriosityCard } from "./CuriosityCard";
import { curiosities } from "./data";
import { TechEffects } from "@/components/ui/tech-effects";
import ProfileCard from "@/components/ui/ProfileCard";
import { GsapScrollReveal } from "@/components/ui/gsap-animations";

export default function Curiosities() {
  return (
    <section
      id="curiosities"
      className="py-20 bg-background relative tech-pattern overflow-hidden"
    >
      <TechEffects />
      <div className="container  mx-auto px-6">
        <GsapScrollReveal
          animation="fadeUp"
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <SplitText
            text="Curiosidades"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 justify-center"
          />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Um pouco mais sobre mim além do código
          </p>
        </GsapScrollReveal>

        <div className="mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
            {/* Área de texto à ESQUERDA */}
            <div className="order-3 lg:order-1 h-full">
              <GsapScrollReveal
                animation="fadeLeft"
                className="space-y-3 text-center"
              >
                <h3 className="text-2xl font-bold">Sobre Mim</h3>

                <p className="text-muted-foreground leading-relaxed">
                  Sou o{" "}
                  <span className="text-foreground font-semibold">
                    José Luiz
                  </span>
                  , alguém movido pela curiosidade — seja na tecnologia, na arte
                  ou na mente humana. Antes do código, sempre fui o cara que
                  queria entender o “porquê” das coisas, e isso acabou me
                  guiando naturalmente para o mundo do desenvolvimento.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  No trabalho, busco foco e intenção. Meu dia começa com café,
                  música no fone e aquela imersão total no que estou
                  construindo. Acredito que consistência e criatividade formam a
                  base de qualquer entrega bem-feita.
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
              </GsapScrollReveal>
            </div>

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
            <div className="order-1 py-18 lg:order-3 w-full max-w-sm lg:max-w-105 mx-auto self-start object-cover flex flex-col items-center">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
