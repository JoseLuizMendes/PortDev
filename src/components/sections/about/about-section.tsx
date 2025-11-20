"use client";

import { SplitText } from "@/components/ui/split-text";
import { motion } from "framer-motion";
import { AchievementCard } from "./AchievementCard";
import { achievements, dialogAchievements } from "./data";
import { TechEffects } from "@/components/ui/tech-effects";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-background relative tech-pattern overflow-hidden">
      <TechEffects />
      <div className="container mx-auto px-6 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <SplitText
            text="Sobre Mim"
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 justify-center"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-start">
          {/* Texto sobre */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left lg:pr-12">
            <div className="space-y-4 sm:space-y-5 mb-6">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-center md:text-justify">
                Sou um desenvolvedor full stack em evolução, movido por foco, curiosidade e a vontade de criar soluções que realmente
                façam diferença. Minha jornada na Ciência da Computação tem sido marcada por projetos que me desafiam a unir técnica,
                 propósito e criatividade — sempre buscando alta performance e clareza no que entrego.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-center md:text-justify">
                Exploro o ecossistema do desenvolvimento desde cedo, passando pelo front-end, back-end e agora na construção do meu próprio SaaS.
                Acredito que tecnologia é uma ferramenta poderosa para simplificar a vida das pessoas, automatizar processos
                e abrir caminhos para novas ideias. Por isso, estudo com consistência, observo o mercado e busco entender 
                como transformar conhecimento em impacto real.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-center md:text-justify">
                Além da programação, invisto no desenvolvimento de soft skills — comunicação, proatividade e colaboração — 
                porque sei que grandes projetos nascem quando pessoas trabalham alinhadas. Participar de comunidades, trocar
                 conhecimento e assumir desafios que me tiram da zona de conforto fazem parte do meu crescimento diário.

              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-center md:text-justify">
                Meu objetivo é claro: evoluir até a senioridade, empreender e conquistar liberdade, geográfica e financeira — 
                sempre construindo com propósito e visão de futuro.
              </p>
            </div>
          </motion.div>

          {/* Cards de conquistas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-4 pl-0">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                achievement={achievement}
                index={index}
                dialogData={dialogAchievements}
              />
            ))}
          </motion.div>
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { number: "2+", label: "Anos de Experiência" },
            { number: "5+", label: "Projetos Desenvolvidos" },
            { number: "5+", label: "Tecnologias Dominadas" },
            { number: "∞", label: "Vontade de Aprender" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
