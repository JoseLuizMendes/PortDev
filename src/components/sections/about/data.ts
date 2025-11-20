import { Code2, GraduationCap, Target, Users } from "lucide-react";
import { Achievement, DialogAchievements } from "./types";

export const achievements: Achievement[] = [
  {
    icon: GraduationCap,
    title: "Formação",
    description: "Cursando Ciência da Computação",
  },
  {
    icon: Code2,
    title: "Stack",
    description: "Experiência em projetos",
  },
  {
    icon: Target,
    title: "Foco",
    description: "Scientia potentia est - Conhecimento é poder",
  },
  {
    icon: Users,
    title: "Colaboração",
    description: "Trabalho bem em equipe e projetos colaborativos",
  },
];

export const dialogAchievements: DialogAchievements = {
  Formação: {
    mode: "Bacharelado",
    course: "Ciência da Computação",
    start: "2024/1",
    end: "2027/2",
    institution: "FAESA",
    currentPeriod: "4º Período",
    status: "Cursando",
  },
  Stack: {
    frontend: {
      language: "JavaScript",
      framework: ["Next.js", "React"],
      styling: "Tailwind CSS",
    },
    backend: {
      language: "Java",
      framework: ["Spring", "Express"],
      database: "PostgreSQL",
      api: "REST",
    },
    description:
      "Desenvolvimento de aplicações web fullstack com foco em performance e usabilidade.",
  },
  Foco: {
    description:
      "Busco aprimorar tanto as soft skills quanto as hard skills, enquanto me preparo para alcançar a senioridade e empreender. Full stack focado em criar soluções inteligentes, com alta performance e liberdade como princípios."
  },
  Colaboração: {
    description:
      "Clareza na comunicação, colaboração proativa e curiosidade: minha base para trabalhar bem em equipe e entregar com qualidade."
  },
};
