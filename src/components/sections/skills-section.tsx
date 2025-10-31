"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SplitText } from "@/components/ui/split-text";
import { motion } from "framer-motion";

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
  { name: "Spring", level: 60, category: "Frameworks" },
  { name: "ASP.NET", level: 60, category: "Frameworks" },
  { name: ".NET", level: 60, category: "Frameworks" },
  { name: "Entity Framework", level: 60, category: "Frameworks" },

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

  const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex justify-between mb-2">
        <span className="text-slate-300 font-medium">{skill.name}</span>
        <span className="text-blue-400 text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-slate-800/60 rounded-full h-3 backdrop-blur-sm border border-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{
            duration: 1.5,
            delay: index * 0.1 + 0.2,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 h-3 rounded-full shadow-lg shadow-blue-500/25 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="skills"
      className="py-20 bg-slate-900/30 relative tech-pattern"
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
            className="text-4xl md:text-5xl font-bold text-white mb-6 justify-center"
          />
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
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

                  {/* Tools card: mostrar habilidades em grid 2 colunas; outros: lista vertical */}
                  {category === "Tools" ? (
                    <div className="grid grid-cols-2 gap-6">
                      {getSkillsByCategory(category).map((skill) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          viewport={{ once: true }}
                          className="text-center mb-16"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-200 font-medium">
                              {skill.name}
                            </span>
                            <span className="text-blue-400 text-sm">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-800/60 rounded-full h-3 backdrop-blur-sm border border-slate-700/50">
                            <div
                              style={{ width: `${skill.level}%` }}
                              className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 h-3 rounded-full shadow-lg shadow-blue-500/25 relative overflow-hidden"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getSkillsByCategory(category).map((skill, index) => (
                        <SkillBar
                          key={skill.name}
                          skill={skill}
                          index={index}
                        />
                      ))}
                    </div>
                  )}
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
          className="mt-16 text-center"
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
              <p className="text-slate-300 text-lg max-w-2xl mx-auto text-center">
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
                  "PostgreSQL",
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 glass-card text-slate-200 rounded-full text-sm border-blue-500/20 tech-hover cursor-default"
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
