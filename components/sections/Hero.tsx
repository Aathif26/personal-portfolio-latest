import config from "@/content/config.json";
const { personalInfo } = config;
import WaveCanvas from "@/components/layout/wavycanvas";
import { HeroContent } from "./HeroContent";
import { HeroData } from "@/types";

export default function Hero({ content = personalInfo }: { content?: Partial<HeroData> }) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden"
      role="region"
      aria-label="Hero section"
    >
      <WaveCanvas />

      <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/4 -top-20 h-[400px] w-[600px] rounded-full bg-primary/8 blur-[120px] animate-pulse animation-duration-[8s]" />
        <div className="absolute right-1/4 -top-40 h-[500px] w-[700px] rounded-full bg-accent/5 blur-[140px] animate-pulse animation-duration-[12s]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />

      <HeroContent content={content} />
    </section>
  );
}
