import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Footer } from "@/components/footer";
import { TechEffects, SectionDivider } from "@/components/ui/tech-effects";
import Curiosities from "@/components/sections/curiosities/curiosities";
import { GsapScrollProgress } from "@/components/ui/gsap-animations";

export default function Home() {
  return (
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
  );
}
