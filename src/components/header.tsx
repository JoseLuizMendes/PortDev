"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ModeToggle } from "@/components/ui/toggle-theme";

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 shadow-lg shadow-blue-500/5"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gradient"
          >
            {"<PortDev/>"}
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {["home", "about", "skills", "projects"].map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => scrollToSection(item)}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 capitalize relative group"
              >
                {item === "home" ? "Início" : 
                 item === "about" ? "Sobre" :
                 item === "skills" ? "Habilidades" : "Projetos"}
              </motion.button>
            ))}
          </nav>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-4"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/80 tech-hover"
              onClick={() => window.open("https://github.com/JoseLuizMendes", "_blank")}
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/80 tech-hover"
              onClick={() => window.open("https://www.linkedin.com/in/jos%C3%A9-luiz-dos-santos-azeredo-mendes-ab5a10283/", "_blank")}
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/80 tech-hover"
              onClick={() => window.open("mailto:seu@email.com")}
            >
              <Mail className="h-5 w-5" />
            </Button>
            <ModeToggle />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}