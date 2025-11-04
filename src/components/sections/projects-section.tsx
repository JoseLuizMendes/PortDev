"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SplitText } from "@/components/ui/split-text";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import proj1 from "../../../public/Capa.png";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  demoUrl: string;
  githubUrl?: string;
  technologies: string[];
}

// Dados de exemplo - você pode substituir por seus projetos reais
const projects: Project[] = [
  {
    id: 1,
    title: "Barber Pro",
    description: "Descrição do seu primeiro projeto. Uma aplicação web moderna com funcionalidades incríveis.",
    image: proj1,
    demoUrl: "https://seu-projeto-1.com",
    githubUrl: "https://github.com/seu-usuario/projeto-1",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  /*{
    id: 2,
    title: "Projeto 2",
    description: "Descrição do seu segundo projeto. Uma aplicação mobile com design responsivo.",
    image: "/api/placeholder/400/300",
    demoUrl: "https://seu-projeto-2.com",
    githubUrl: "https://github.com/seu-usuario/projeto-2",
    technologies: ["React Native", "JavaScript", "Node.js"],
  },
  {
    id: 3,
    title: "Projeto 3",
    description: "Descrição do seu terceiro projeto. Um sistema web completo com backend robusto.",
    image: "/api/placeholder/400/300",
    demoUrl: "https://seu-projeto-3.com",
    githubUrl: "https://github.com/seu-usuario/projeto-3",
    technologies: ["Python", "Django", "PostgreSQL", "Docker"],
  },
  {
    id: 4,
    title: "Projeto 4",
    description: "Descrição do seu quarto projeto. Uma API RESTful com documentação completa.",
    image: "/api/placeholder/400/300",
    demoUrl: "https://seu-projeto-4.com",
    githubUrl: "https://github.com/seu-usuario/projeto-4",
    technologies: ["Node.js", "Express", "MongoDB", "Swagger"],
  },*/
];

export function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-slate-900/50 relative tech-pattern overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SplitText
            text="Meus Projetos"
            className="text-4xl md:text-5xl font-bold text-white mb-6 justify-center"
          />
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Aqui estão alguns dos projetos que desenvolvi durante minha jornada como estudante.
            Clique em qualquer projeto para ver mais detalhes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="glass-card hover:border-blue-500/50 transition-all duration-500 overflow-hidden group cursor-pointer tech-hover">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <div className="w-full h-64 relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
                      {/* Imagem do projeto */}
                      {project.image && typeof project.image === 'object' ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : typeof project.image === 'string' ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : null}
                      {/* Efeito tech de fundo */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Overlay com links */}
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <div className="flex space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.demoUrl, "_blank");
                            }}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </motion.button>
                          
                          {project.githubUrl && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.githubUrl, "_blank");
                              }}
                              className="bg-slate-700/80 hover:bg-slate-600/80 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border border-slate-500/50"
                            >
                              <Github className="h-5 w-5" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-t from-slate-900/50 to-transparent">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-400 mb-4 line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-slate-800/60 text-slate-300 rounded-full border border-slate-700/50 group-hover:border-blue-500/30 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 text-lg">
            Mais projetos em desenvolvimento... 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}