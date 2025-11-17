import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Footer } from "@/components/footer";
import { TechEffects, SectionDivider } from "@/components/ui/tech-effects";
import Curiosities from "@/components/sections/curiosities/curiosities";

export default function Home() {
  return (
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
  );
}
