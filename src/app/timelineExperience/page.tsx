import { TechEffects } from "@/components/ui/tech-effects";
import { TimelineExperienceSection } from "@/components/sections/timeline-experience-section";

export default function TimelineExperiencePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <TechEffects />
      <main className="relative z-10 pt-24">
        <TimelineExperienceSection />
      </main>
    </div>
  );
}
