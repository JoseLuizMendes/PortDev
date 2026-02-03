"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { AboutSection } from "@/components/sections/about/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Footer } from "@/components/footer";
import { TechEffects, SectionDivider } from "@/components/ui/tech-effects";
import Curiosities from "@/components/sections/curiosities/curiosities";

import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  // Não mostrar preloader se veio da experiência cinematográfica
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    // Verificar se veio da experiência cinematográfica
    const fromCinematic = sessionStorage.getItem('from-cinematic') === 'true';
    if (fromCinematic) {
      sessionStorage.removeItem('from-cinematic');
      setShowPreloader(false);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <TechEffects />
        <Header />
        <main className="relative z-10">
          <HeroSection />
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <Curiosities />
          <SectionDivider />
          <SkillsSection />
          <SectionDivider />
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
