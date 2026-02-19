import { TechEffects } from "@/components/ui/tech-effects";
import { TimelineExperienceSection } from "@/components/sections/timeline-experience-section";
import { getTimelineItems } from "@/lib/timeline";

export default async function TimelineExperiencePage() {
  const items = await getTimelineItems();

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <TechEffects />
      <main className="relative z-10 pt-24">
        <TimelineExperienceSection items={items} />
      </main>
    </div>
  );
}
