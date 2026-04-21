import { SectionHeading } from "@/components/ui/section-heading";
import projectsData from "@/content/projects.json";
const projects = projectsData as any;
import type { Project } from "@/types";
import { ProjectsContent } from "./ProjectsContent";

export default function Projects({ initialProjects = projects }: { initialProjects?: Project[] }) {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="orb w-[500px] h-[500px] bg-primary/5 -top-40 -right-40 opacity-40" />
      <div className="orb w-[400px] h-[400px] bg-primary/10 -bottom-20 -left-20 opacity-30" style={{ animationDelay: "-5s" }} />

      <div className="container-narrow relative">
        <SectionHeading
          label="Portfolio"
          title="Curated Projects"
          accentWord="Projects"
          description="A selection of works blending aesthetic design with technical engineering."
        />

        <ProjectsContent initialProjects={initialProjects} />
      </div>
    </section>
  );
}
