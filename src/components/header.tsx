"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => ["home", "about", "skills", "projects", "experience"] as const,
    []
  );

  const getNavLabel = (item: (typeof navItems)[number]) => {
    switch (item) {
      case "home":
        return "Início";
      case "about":
        return "Sobre";
      case "skills":
        return "Habilidades";
      case "projects":
        return "Projetos";
      case "experience":
        return "Experiência";
    }
  };

  const handleNavigation = (item: string) => {
    if (item === "experience") {
      router.push("/timelineExperience");
    } else {
      // Para outros itens, fazer scroll na página atual
      const element = document.getElementById(item);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg shadow-primary/5"
    >
      <div className="w-full mx-auto px-6 py-4">
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
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleNavigation(item)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 capitalize relative group"
              >
                {getNavLabel(item)}
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
              {/* Mobile menu button */}
              <div className="flex md:hidden items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-card/80 tech-hover"
                  aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-nav"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isMobileMenuOpen ? (
                      <motion.span
                        key="icon-close"
                        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="inline-flex"
                      >
                        <X className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="icon-menu"
                        initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="inline-flex"
                      >
                        <Menu className="h-5 w-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen ? (
            <motion.nav
              id="mobile-nav"
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="mt-4 rounded-xl border border-border bg-card/70 backdrop-blur-md p-2 shadow-lg shadow-primary/10"
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.22 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavigation(item);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-background/60 transition-colors duration-300"
                  >
                    {getNavLabel(item)}
                  </motion.button>
                ))}
              </motion.div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
