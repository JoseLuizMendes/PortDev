import { Coffee, Music, Gamepad2, BookOpen, Laptop, Music2 } from "lucide-react";
import { CuriosityItem } from "./types";

export const curiosities: CuriosityItem[] = [
  {
    icon: Coffee,
    title: "Café & Código",
    description: "Manhãs e tardes produtivas começam sempre com um bom café",
  },
  {
    icon: Music,
    title: "Música ao Programar",
    description: "Lo-fi e eletrônica são minha trilha sonora, mas silêncio quando preciso focar",
  },
  {
    icon: Gamepad2,
    title: "Gamer nas Horas Vagas",
    description: "FPS é minha válvula de escape para relaxar depois do código",
  },
  {
    icon: BookOpen,
    title: "Curioso por Natureza",
    description: "Neurociência, finanças e tecnologia são alguns dos meus interesses",
  },
  {
    icon: Music2,
    title: "Música na Veia",
    description: "Violão, guitarra, teclado e cavaquinho fazem parte do meu dia a dia",
  },
  {
    icon: Laptop,
    title: "Trabalho Remoto",
    description: "Flexibilidade é essencial para equilibrar produtividade e criatividade",
  },
];
