"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type BookPage = {
  id: number;
  eyebrow: string;
  title: string;
  body: string;
};

const pages: BookPage[] = [
  {
    id: 1,
    eyebrow: "Identidade",
    title: "Construo com estética, clareza e intenção",
    body: "Sou José Luiz. Minha forma de criar combina profundidade técnica com sensibilidade de produto para transformar ideias em experiências memoráveis.",
  },
  {
    id: 2,
    eyebrow: "Processo",
    title: "Foco profundo com execução consistente",
    body: "Trabalho melhor em ciclos de concentração: contexto claro, decisões objetivas e entrega bem acabada. Isso aumenta velocidade sem comprometer qualidade.",
  },
  {
    id: 3,
    eyebrow: "Energia Criativa",
    title: "Disciplina e repertório em evolução",
    body: "Música e estudo contínuo alimentam meu repertório criativo. Essa combinação me mantém presente, curioso e com olhar autoral para cada projeto.",
  },
  {
    id: 4,
    eyebrow: "Visão",
    title: "Tecnologia com leitura estratégica",
    body: "Neurociência, IA e finanças ampliam meu pensamento sobre sistemas complexos. Levo esse olhar para construir soluções mais humanas e eficientes.",
  },
];

export function CuriosityBookCard() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalPages = pages.length;

  const nextPage = () => {
    setDirection(1);
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setPageIndex((prev) => (prev + 1) % totalPages);
    }, 8000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pageIndex, totalPages]);

  return (
    <div className="space-y-5 text-center lg:text-left rounded-2xl border border-border/70 bg-card/35 backdrop-blur-md p-6 lg:p-7">
      <div className="inline-flex mx-auto lg:mx-0 items-center gap-2 text-primary">
        <Sparkles size={16} />
        <span className="text-sm font-medium">Direção criativa + técnica</span>
      </div>

      <div className="relative perspective-[1800px] min-h-67.5">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={pages[pageIndex].id}
            custom={direction}
            initial={{
              opacity: 0,
              rotateY: direction > 0 ? -95 : 95,
              x: direction > 0 ? 18 : -18,
              filter: "blur(3px)",
            }}
            animate={{
              opacity: 1,
              rotateY: 0,
              x: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              rotateY: direction > 0 ? 95 : -95,
              x: direction > 0 ? -18 : 18,
              filter: "blur(3px)",
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl border border-border/70 bg-background/75 p-5 sm:p-6 shadow-xs"
            style={{ transformStyle: "preserve-3d", transformOrigin: direction > 0 ? "left center" : "right center" }}
          >
            <div className="absolute inset-y-2 left-0 w-px bg-primary/20" />

            <p className="text-xs uppercase tracking-[0.22em] text-primary/80 mb-3">
              {pages[pageIndex].eyebrow}
            </p>

            <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-3">
              {pages[pageIndex].title}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {pages[pageIndex].body}
            </p>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-xs text-muted-foreground">
          Página {pageIndex + 1} de {totalPages}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={prevPage}
            className="border-border/70 bg-background/60 hover:bg-accent/70"
            aria-label="Página anterior"
          >
            <ChevronLeft />
            Prev
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={nextPage}
            className="border-border/70 bg-background/60 hover:bg-accent/70"
            aria-label="Próxima página"
          >
            Next
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
