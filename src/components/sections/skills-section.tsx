"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SplitText } from "@/components/ui/split-text";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

  // Backend
  { name: "Java", level: 85, category: "Backend" },
  { name: "C#", level: 80, category: "Backend" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Python", level: 70, category: "Backend" },
  { name: "Express", level: 50, category: "Backend" },

  // Database
  { name: "SQL Developer", level: 80, category: "Database" },
  { name: "PostgreSQL", level: 75, category: "Database" },
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

export function SkillsSection() {
  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category);
  };

  // Preparar dados radar para uma categoria específica
  const getCategoryRadarData = (category: string) => {
    return getSkillsByCategory(category).map((skill) => ({
      skill: skill.name,
      level: skill.level,
      fullMark: 100,
    }));
  };

  return (
    <section
      id="skills"
      className="py-20 bg-background/95 relative tech-pattern"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SplitText
            text="Habilidades Técnicas"
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 justify-center"
          />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino e utilizo em meus projetos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className={category === "Tools" ? "lg:col-span-2" : ""}
            >
              <Card className="glass-card backdrop-blur-md tech-hover group">
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

                  {/* Gráfico Radar para cada categoria */}
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={getCategoryRadarData(category)}>
                      <PolarGrid stroke="#475569" />
                      <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fill: "#cbd5e1", fontSize: 11 }}
                        tickSize={17}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[10, 100]}
                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                      />
                      <Radar
                        name="Nível"
                        dataKey="level"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #3b82f6",
                          borderRadius: "8px",
                          color: "#e2e8f0",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Seção de aprendizado contínuo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Card className="glass-card border-blue-500/20 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl mr-4 pulse-tech">
                  🚀
                </div>
                <h3 className="text-2xl font-bold text-gradient">
                  Sempre Aprendendo
                </h3>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center">
                A tecnologia está em constante evolução, e eu também! Atualmente
                estou explorando novas tecnologias e expandindo meus
                conhecimentos.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  "Rest API",
                  "Java",
                  "Spring Boot",
                  "JavaScript",
                  "Next.js",
                  "React",
                  "Prisma",
                  "PostgreSQL",
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 glass-card text-card-foreground rounded-full text-sm border-primary/20 tech-hover cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
