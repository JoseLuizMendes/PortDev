"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
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
      className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg shadow-primary/5"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gradient"
          >
            {"<DevIn/>"}
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {["home", "about", "skills", "projects"].map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => scrollToSection(item)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 capitalize relative group"
              >
                {item === "home"
                  ? "Início"
                  : item === "about"
                  ? "Sobre"
                  : item === "skills"
                  ? "Habilidades"
                  : "Projetos"}
              </motion.button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-card/80 tech-hover"
                onClick={() =>
                  window.open("https://github.com/JoseLuizMendes", "_blank")
                }
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-card/80 tech-hover"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/jos%C3%A9-luiz-dos-santos-azeredo-mendes-ab5a10283/",
                    "_blank"
                  )
                }
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <ModeToggle />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
