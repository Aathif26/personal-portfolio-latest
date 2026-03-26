import { SectionHeading } from "@/components/ui/section-heading";
import { ContactContent } from "./ContactContent";

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="container-narrow">
        <SectionHeading
          label="Get In Touch"
          title="Contact Me"
          accentWord="Contact"
          description="Have a project idea or want to collaborate? Let's talk."
        />

        <ContactContent />
      </div>
    </section>
  );
}
