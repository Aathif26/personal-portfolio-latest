import config from "@/content/config.json";
const { personalInfo } = config;
import { AboutContent } from "./AboutContent";

export default function About({ content }: { content?: string }) {
  const bio = content || personalInfo.bio;
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-background/50">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none opacity-30" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.1] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />

      <AboutContent bio={bio} />
    </section>
  );
}
