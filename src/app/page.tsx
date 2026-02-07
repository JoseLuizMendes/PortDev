"use client";

import { useCallback, useState } from "react";
import { Header } from "@/components/header";
import { AboutSection } from "@/components/sections/about/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Footer } from "@/components/footer";
import { TechEffects, SectionDivider } from "@/components/ui/tech-effects";
import Curiosities from "@/components/sections/curiosities/curiosities";

import { HeroSection } from "@/components/sections/hero-section";
//import { IntroFlow } from "@/components/intro/IntroFlow";

export default function Home() {
  //const [introDone, setIntroDone] = useState(false);
  //const handleIntroComplete = useCallback(() => setIntroDone(true), []);

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
      
      {/*{!introDone && <IntroFlow onComplete={handleIntroComplete} />}

      {introDone && (
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
      )}*/}
    </>
  );
}
