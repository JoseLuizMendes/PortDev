"use client";

import CardSwap, { Card as SwapCard, type CardSwapHandle } from "@/components/ui/CardSwap";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/ui/split-text";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import proj1 from "../../../public/CapaBarber.png";
import proj2 from "../../../public/CapaCasamento.png";
import proj3 from "../../../public/CapaTerraCerta.png";
import { TechEffects } from "../ui/tech-effects";
import { GsapScrollReveal } from "../ui/gsap-animations";
import { useMemo, useRef, useState } from "react";

interface Project {
  id: number;
  title: string;
  category: string; // Adicionado para categorizar (ex: Fullstack, Frontend)
  description: string;
  image: string | StaticImageData;
  demoUrl: string;
  githubUrl?: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Barber Pro",
    category: "SaaS / Gestão",
    description:
      "Sistema completo de gestão para barbearias com agendamento em tempo real, dashboard financeiro e notificações automáticas via WhatsApp.",
    image: proj1,
    demoUrl: "https://github.com/JoseLuizMendes/barber-pro",
    githubUrl: "https://github.com/JoseLuizMendes/barber-pro",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind",
      "Prisma",
      "PostgreSQL",
    ],
  },
  {
    id: 2,
    title: "Casamento dos Sonhos",
    category: "Eventos / Social",
    description:
      "Plataforma interativa para convidados com confirmação de presença (RSVP), lista de presentes integrada e galeria de memórias em tempo real.",
    image: proj2,
    demoUrl: "https://github.com/JoseLuizMendes",
    githubUrl: "https://github.com/JoseLuizMendes",
    technologies: ["React", "Node.js", "Framer Motion", "Stripe API"],
  },
  {
    id: 3,
    title: "Terra Certa",
    category: "Agrotech / Hackathon",
    description:
      "Vencedor do Hackathon: Solução de IoT e Dashboard para monitoramento de pesticidas, promovendo agricultura de precisão e sustentabilidade.",
    image: proj3,
    demoUrl: "https://github.com/JoseLuizMendes/TerraCerta",
    githubUrl: "https://github.com/JoseLuizMendes/TerraCerta",
    technologies: ["Python", "Django", "Docker", "IoT Integration"],
  },
];

export function ProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const cardSwapRef = useRef<CardSwapHandle | null>(null);
  const activeProject = useMemo(
    () => projects[activeProjectIndex] ?? projects[0],
    [activeProjectIndex],
  );

  const handleNextMobile = () => {
    setActiveProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrevMobile = () => {
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Funções de navegação manual
  const handleNext = () => {
    cardSwapRef.current?.next();
  };

  const handlePrev = () => {
    cardSwapRef.current?.prev();
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <TechEffects />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <GsapScrollReveal animation="fadeUp" className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            <Layers size={14} />
            <span>Portfólio</span>
          </div>
          <SplitText
            text="Projetos em Destaque"
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 justify-center tracking-tight"
          />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Uma coleção de soluções tecnológicas desenvolvidas para resolver
            problemas reais.
          </p>
        </GsapScrollReveal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna da Esquerda: Detalhes do Projeto */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <GsapScrollReveal animation="fadeRight" delay={0.2}>
              {/* Wrapper com key força a re-renderização e animação ao trocar de projeto */}
              <div
                key={activeProject.id}
                className="flex flex-col gap-6 animate-in slide-in-from-left-8 fade-in duration-500"
              >
                {/* Contador e Categoria */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="text-sm font-mono text-primary/80">
                    {String(activeProject.id).padStart(2, "0")}{" "}
                    <span className="text-muted-foreground">
                      / {String(projects.length).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    {activeProject.category}
                  </span>
                </div>

                {/* Título e Descrição */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                    {activeProject.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2 py-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-md border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-wrap gap-4 mt-2">
                  <Button
                    onClick={() => window.open(activeProject.demoUrl, "_blank")}
                    className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                    size="lg"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Projeto
                  </Button>

                  {activeProject.githubUrl && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open(activeProject.githubUrl, "_blank")
                      }
                      className="gap-2 hover:bg-secondary/80"
                      size="lg"
                    >
                      <Github className="h-4 w-4" />
                      Repositório
                    </Button>
                  )}
                </div>
              </div>

              {/* Controles de Navegação (Extra UX) - apenas desktop (no mobile fica abaixo da imagem) */}
              <div className="hidden lg:flex items-center gap-4 mt-12 pt-6 border-t border-border/40">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  className="rounded-full hover:bg-primary/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="text-sm text-muted-foreground">Navegar</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="rounded-full hover:bg-primary/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </GsapScrollReveal>
          </div>
          {/*
            Desktop (máximo): 560 × 420 (4:3)
            Mobile (mínimo): 280 × 210 (4:3)
          */}
          {/* Coluna da Direita: Card Swap Visual */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {/* Glow Effect behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Mobile: card estático (evita que o CardSwap quebre layout e reduz jank) */}
            <div className="w-full lg:hidden">
              <GsapScrollReveal animation="scaleUp" delay={0.15}>
                <div className="mx-auto w-full max-w-[520px]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-card/40 backdrop-blur-xl shadow-2xl">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 92vw, 520px"
                      quality={80}
                      placeholder="blur"
                      priority={activeProjectIndex === 0}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">
                        {activeProject.category.split("/")[0]}
                      </p>
                      <h4 className="text-xl font-bold text-white leading-tight">
                        {activeProject.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevMobile}
                      className="rounded-full hover:bg-primary/10"
                      aria-label="Projeto anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <span className="text-sm text-muted-foreground">Navegar</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextMobile}
                      className="rounded-full hover:bg-primary/10"
                      aria-label="Próximo projeto"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </GsapScrollReveal>
            </div>

            {/* Desktop: CardSwap */}
            <div className="relative w-full hidden lg:block" style={{ minHeight: 520 }}>
              <GsapScrollReveal animation="scaleUp" delay={0.3}>
                <CardSwap
                  ref={cardSwapRef}
                  width="clamp(360px, 45vw, 560px)"
                  height="clamp(270px, 33.75vw, 420px)"
                  cardDistance={50}
                  verticalDistance={60}
                  delay={8000}
                  startImmediately
                  pauseOnHover
                  skewAmount={3}
                  easing="elastic"
                  onSwap={(frontIdx) => setActiveProjectIndex(frontIdx)}
                  useZ={false}
                  className="relative mx-auto translate-x-6 translate-y-8"
                >
                  {projects.map((project, idx) => (
                    <SwapCard
                      key={project.id}
                      role="button"
                      tabIndex={0}
                      customClass="group bg-card/40 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl rounded-xl"
                    >
                      <div className="relative w-full h-full">
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 45vw, 560px"
                            quality={85}
                            placeholder="blur"
                            priority={idx === 0}
                          />
                        )}

                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">
                            {project.category.split("/")[0]}
                          </p>
                          <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {project.title}
                          </h4>
                          <p className="text-white/60 text-sm line-clamp-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            Clique para ver detalhes
                          </p>
                        </div>
                      </div>
                    </SwapCard>
                  ))}
                </CardSwap>
              </GsapScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
