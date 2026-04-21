import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import { getHero, getAbout, getProjects, getCapabilities, getExperience } from "@/lib/content";
import About from "@/components/sections/About";
import Capabilities from "@/components/sections/Capabilities";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default async function Home() {
  const heroContent = await getHero();
  const aboutContent = await getAbout();
  const projectsContent = await getProjects();
  const capabilitiesContent = await getCapabilities();
  const experienceContent = await getExperience();

  return (
    <>
      <Navbar />
      <main>
        <Hero content={heroContent || undefined} />
        <About content={aboutContent || undefined} />
        <Capabilities items={capabilitiesContent || undefined} />
        <Projects initialProjects={projectsContent || undefined} />
        <Experience items={experienceContent || undefined} />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
