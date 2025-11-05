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
    description: "Experiência em projetos web fullstack",
  },
  {
    icon: Target,
    title: "Foco",
    description: "Sempre buscando aprender novas tecnologias",
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
      styling: ["Tailwind CSS", "Motion"],
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
      "Tenho prioridade em entregar soluções com foco em performance, manutenibilidade e experiência do usuário." +
      " Busco aprender continuamente através de projetos práticos e cursos, e aplico testes e boas práticas de desenvolvimento."
  },
  Colaboração: {
    description:
      "Trabalho bem em equipe e projetos colaborativos, utilizando metodologias ágeis e ferramentas de versionamento para garantir entregas de qualidade.",
  },
};
