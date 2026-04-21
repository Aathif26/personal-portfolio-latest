import { SectionHeading } from "@/components/ui/section-heading";
import { CapabilitiesContent } from "./CapabilitiesContent";

interface CapabilityItem {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  tags: string[];
  className?: string;
}

export default function Capabilities({ items }: { items?: CapabilityItem[] }) {
  const displayItems = items || [];

  return (
    <section id="capabilities" className="section-padding relative overflow-hidden bg-background/50">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[140px] opacity-40 animate-pulse animation-duration-[10s]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[140px] opacity-30 animate-pulse animation-duration-[12s]" />
      </div>

      <div className="container-narrow relative z-10">
        <SectionHeading
          label="Expertise"
          title="Specialized Capabilities"
          accentWord="Capabilities"
          description="Bridging the gap between cutting-edge engineering and production-grade intelligent systems."
        />

        <CapabilitiesContent displayItems={displayItems} />
      </div>
    </section>
  );
}
