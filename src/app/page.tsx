"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { HeroExperience } from "@/components/creative/HeroExperience";
import { PreloaderSplashScreen } from "@/components/creative/PreloaderSplashScreen";
import { AboutSection } from "@/components/sections/about/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Footer } from "@/components/footer";
import { TechEffects, SectionDivider } from "@/components/ui/tech-effects";
import Curiosities from "@/components/sections/curiosities/curiosities";
<<<<<<< HEAD
import { GsapScrollProgress } from "@/components/ui/gsap-animations";
=======
import { HeroSection } from "@/components/sections/hero-section";
>>>>>>> 7bb71fbfeebe502d04a3045871062795b82cde54

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GsapScrollProgress color="rgb(99, 102, 241)" height={3} position="top" />
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
=======
    <>
      {showPreloader && (
        <PreloaderSplashScreen onComplete={() => setShowPreloader(false)} />
      )}
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
>>>>>>> 7bb71fbfeebe502d04a3045871062795b82cde54
  );
}
