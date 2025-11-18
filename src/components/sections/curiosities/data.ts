import { Coffee, Headphones, ClockPlus, BookOpen, Laptop, Music2 } from "lucide-react";
import { CuriosityItem } from "./types";

export const curiosities: CuriosityItem[] = [
  {
    icon: Coffee,
    title: "Café & Código",
    description: "Manhãs e tardes produtivas começam sempre com um bom café",
  },
  {
    icon: Headphones,
    title: "Música ao Programar",
    description: "Lo-fi e eletrônica são minha trilha sonora, mas silêncio quando preciso focar",
  },
  {
    icon: ClockPlus,
    title: "Horas Vagas",
    description: "Gosto de relaxar depois do código, pode ser um jogo ou um filme",
  },
  {
    icon: BookOpen,
    title: "Curioso por Natureza",
    description: "Neurociência, finanças e tecnologia são alguns dos meus interesses",
  },
  {
    icon: Music2,
    title: "Música na Veia",
    description: "Violão, guitarra, teclado fazem parte do meu dia a dia",
  },
  {
    icon: Laptop,
    title: "Trabalho Remoto",
    description: "Flexibilidade é essencial para equilibrar produtividade e criatividade",
  },
];
