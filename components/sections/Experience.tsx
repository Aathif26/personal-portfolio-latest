import { SectionHeading } from "@/components/ui/section-heading";
import { Experience as ExperienceType } from "@/types";
import { ExperienceContent } from "./ExperienceContent";

export default function Experience({ items }: { items?: ExperienceType[] }) {
  const displayItems = items || [];
  
  return (
    <section id="experience" className="section-padding-sm relative overflow-hidden">
      {/* Background Orbs for depth */}
      <div className="orb w-96 h-96 bg-primary/5 top-1/4 -right-48" />
      <div className="orb w-72 h-72 bg-primary/3 bottom-1/4 -left-36" />

      <div className="container-narrow relative z-10">
        <SectionHeading
          label="Career"
          title="Professional Journey"
          accentWord="Journey"
          description="A track record of building impactful systems at scale."
        />

        <div>
          <ExperienceContent displayItems={displayItems} />
        </div>
      </div>
    </section>
  );
}
