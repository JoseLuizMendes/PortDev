"use client";

import { Button } from "@/components/ui/button";
import GlassSurface from "@/components/ui/GlassSurface";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type LenisLike = {
  scrollTo: (target: unknown, options?: Record<string, unknown>) => void;
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [isMdUp, setIsMdUp] = useState(true);

  const navItems = useMemo(
    () => ["home", "about", "curiosities", "skills", "projects", "experience"] as const,
    []
  );

  const getNavLabel = (item: (typeof navItems)[number]) => {
    switch (item) {
      case "home":
        return "Início";
      case "about":
        return "Sobre";
      case "curiosities":
        return "Curiosidades";
      case "skills":
        return "Habilidades";
      case "projects":
        return "Projetos";
      case "experience":
        return "Experiência";
    }
  };

  const scrollToSection = useCallback(
    (id: string, behavior: ScrollBehavior = "smooth") => {
      if (typeof window === "undefined") return;

      const element = document.getElementById(id);
      if (!element) return;

      const headerOffset = headerRef.current?.offsetHeight ?? 80;
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;

      if (lenis?.scrollTo) {
        lenis.scrollTo(element, {
          offset: -headerOffset,
          immediate: behavior === "auto",
        });
        return;
      }

      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior });
    },
    []
  );

  const tryScrollToHash = useCallback(
    (hash: string, behavior: ScrollBehavior = "auto") => {
      if (typeof window === "undefined") return;
      const raw = hash.startsWith("#") ? hash.slice(1) : hash;
      const id = decodeURIComponent(raw);
      if (!id) return;

      let attempts = 0;
      const maxAttempts = 40; // ~2s (40 * 50ms)

      const tick = () => {
        attempts += 1;
        const el = document.getElementById(id);
        if (el) {
          scrollToSection(id, behavior);
          return;
        }
        if (attempts < maxAttempts) {
          window.setTimeout(tick, 50);
        }
      };

      window.setTimeout(tick, 0);
    },
    [scrollToSection]
  );

  // Quando navega para a home com hash (ex.: "/#projects"), faz o scroll após a página montar.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") return;
    if (!window.location.hash) return;

    tryScrollToHash(window.location.hash, "smooth");
  }, [pathname, tryScrollToHash]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousOverflow = document.documentElement.style.overflow;
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = previousOverflow;
    }

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavigation = useCallback(
    (item: (typeof navItems)[number]) => {
      if (item === "experience") {
        router.push("/timelineExperience");
        return;
      }

      // Se não estiver na home, navega com hash e o useEffect acima faz o scroll.
      if (pathname !== "/") {
        router.push(`/#${item}`);
        return;
      }

      // Home: scroll direto.
      scrollToSection(item, "smooth");
    },
    [pathname, router, scrollToSection]
  );

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 p-4 w-full z-50"
    >
      <div className="mx-auto w-full max-w-7xl">
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={50}
          opacity={1}
          saturation={1}
          blur={isMdUp ? 30 : 18}
          brightness={100}
          displace={isMdUp ? 5 : 2}
          distortionScale={isMdUp ? 300 : 120}
          className="mx-auto w-full items-center justify-center"
        >
          <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-muted-foreground"
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
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 capitalize relative group cursor-pointer"
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
          </div>
        </GlassSurface>

        {/* Mobile dropdown (fora do GlassSurface para evitar recalcular filtro ao expandir) */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen ? (
            <motion.nav
              id="mobile-nav"
              key="mobile-nav"
              initial={{ opacity: 0, y: -8, scaleY: 0.98 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="md:hidden mt-3 overflow-hidden"
            >
              <div className="rounded-xl border border-border bg-card/70 backdrop-blur-md p-2 shadow-lg shadow-primary/10">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ delay: 0.03 + index * 0.03, duration: 0.18 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.setTimeout(() => {
                        handleNavigation(item);
                      }, 50);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-background/60 transition-colors duration-300"
                  >
                    {getNavLabel(item)}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
