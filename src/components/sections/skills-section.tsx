"use client";

import { Card, CardContent } from "@/components/ui/card";

import { TechEffects } from "@/components/ui/tech-effects";
import { GsapScrollReveal } from "@/components/ui/gsap-animations";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "../ui/badge";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Next.js", level: 80, category: "Frontend" },
  { name: "JavaScript", level: 70, category: "Frontend" },
  { name: "React", level: 70, category: "Frontend" },
  { name: "TypeScript", level: 60, category: "Frontend" },
  { name: "ShadCN UI", level: 90, category: "Frontend" },
  { name: "React Bits", level: 90, category: "Frontend" },

  // Backend
  { name: "Java", level: 85, category: "Backend" },
  { name: "C#", level: 80, category: "Backend" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Python", level: 70, category: "Backend" },
  { name: "Express", level: 50, category: "Backend" },

  // Database
  { name: "PostgreSQL", level: 85, category: "Database" },
  { name: "SQL Developer", level: 80, category: "Database" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "Oracle", level: 70, category: "Database" },

  // Frameworks
  { name: "Spring", level: 75, category: "Frameworks" },
  { name: "ASP.NET", level: 60, category: "Frameworks" },
  { name: ".NET", level: 55, category: "Frameworks" },
  { name: "Entity Framework", level: 55, category: "Frameworks" },

  // Tools
  { name: "Git", level: 85, category: "Tools" },
  { name: "Azure DevOps", level: 70, category: "Tools" },
  { name: "Postman", level: 60, category: "Tools" },
  { name: "Docker", level: 25, category: "Tools" },
];

const categories = ["Frontend", "Backend", "Database", "Frameworks", "Tools"];

// Cores temáticas para cada categoria
const CATEGORY_COLORS = {
  Frontend: {
    primary: "var(--chart-1)",
    gradient: [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ],
  },
  Backend: {
    primary: "var(--chart-2)",
    gradient: [
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
      "var(--chart-1)",
    ],
  },
  Database: {
    primary: "var(--chart-3)",
    gradient: [
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
      "var(--chart-1)",
      "var(--chart-2)",
    ],
  },
  Frameworks: {
    primary: "var(--chart-4)",
    gradient: [
      "var(--chart-4)",
      "var(--chart-5)",
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
    ],
  },
  Tools: {
    primary: "var(--chart-5)",
    gradient: [
      "var(--chart-5)",
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
    ],
  },
};

const CHART_THEME = {
  grid: "var(--border)",
  tick: "var(--muted-foreground)",
  tooltipBackground: "var(--card)",
  tooltipText: "var(--foreground)",
};

export function SkillsSection() {
  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getCategoryRadarData = (category: string) => {
    return getSkillsByCategory(category).map(skill => ({
      skill: skill.name,
      level: skill.level,
      fullMark: 100,
    }));
  };

  const getCategoryColor = (category: string) => {
    return CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS].primary;
  };

  const renderChart = (category: string) => {
    const categoryColor = getCategoryColor(category);

    return (
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={getCategoryRadarData(category)} outerRadius={105}>
          <PolarGrid stroke={CHART_THEME.grid} />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: CHART_THEME.tick, fontSize: 11 }}
            tickSize={18}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[10, 100]}
            tick={{ fill: CHART_THEME.tick, fontSize: 10 }}
          />
          <Radar
            name="Nível"
            dataKey="level"
            stroke={categoryColor}
            fill={categoryColor}
            fillOpacity={0.45}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: CHART_THEME.tooltipBackground,
              border: `1px solid ${categoryColor}`,
              borderRadius: "8px",
              color: CHART_THEME.tooltipText,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <section
      id="skills"
      className="py-20 bg-background relative tech-pattern overflow-hidden">
      <TechEffects />
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <GsapScrollReveal
              key={category}
              animation="fadeUp"
              delay={categoryIndex * 0.08}
              className={category === "Tools" ? "lg:col-span-2" : ""}
            >
              <Card className="group rounded-xl border border-border/60 bg-card/40 shadow-none!">
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
                  <h3 className="text-2xl font-bold text-gradient mb-6 text-center group-hover:scale-105 transition-transform duration-300">
                    {category === "Frontend"
                      ? "Frontend"
                      : category === "Backend"
                      ? "Backend"
                      : category === "Database"
                      ? "DataBase"
                      : category === "Frameworks"
                      ? "Frameworks"
                      : "Tools"}
                  </h3>

                  {renderChart(category)}
                </CardContent>
              </Card>
            </GsapScrollReveal>
          ))}
        </div>

        {/* Seção de aprendizado contínuo */}
        <GsapScrollReveal animation="fadeUp" className="mt-10 text-center">
          <Card className="rounded-xl border border-blue-500/20 bg-transparent relative overflow-hidden shadow-none!">
            <div className="absolute inset-0 "></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 pulse-tech">
                  🚀
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  Sempre Aprendendo
                </h3>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center">
                A tecnologia está em constante evolução, e eu também! Atualmente
                estou explorando novas tecnologias e expandindo meus
                conhecimentos.
              </p>

              <GsapScrollReveal
                animation="scaleUp"
                stagger={0.06}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                {[
                  "Rest API",
                  "Java",
                  "C#",
                  "Spring Boot",
                  "JavaScript",
                  "Next.js",
                  "React",
                  "Prisma ORM",
                  ".NET",
                  "ASP.NET",
                  "Node.js",
                  "Express",
                  "Python",                
                  "SQL Developer",
                  "PostgreSQL",
                ].map((tech) => (
                  <Badge
                  variant={"default"}
                    key={tech}
                    className="px-4 py-2 bg-brand-indigo text-primary rounded-full text-sm  cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </GsapScrollReveal>
            </CardContent>
          </Card>
        </GsapScrollReveal>
      </div>
    </section>
  );
}
