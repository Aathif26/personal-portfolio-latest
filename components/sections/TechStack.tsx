import { SectionHeading } from "@/components/ui/section-heading";
import config from "@/content/config.json";
const { techStack, techCategories } = config as any;
import { TechStackContent } from "./TechStackContent";

export default function TechStack() {
  return (
    <section id="techstack" className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] opacity-30" />

      <div className="container-narrow">
        <SectionHeading
          label="Technologies"
          title="Tech Stack"
          accentWord="Stack"
          description="A curated selection of tools and technologies I've mastered over the years."
        />

        <TechStackContent techCategories={techCategories} techStack={techStack} />
      </div>
    </section>
  );
}
