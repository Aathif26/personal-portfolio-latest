"use client";

import { motion } from "motion/react";
import { Rocket, Users, Briefcase, GraduationCap } from "lucide-react";
import { HighlightCard } from "./HighlightCard";

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const highlights = [
  {
    category: "Innovation",
    title: "AI-First",
    description: "Integrating LLMs, RAG systems, and automated agent workflows into production applications.",
    icon: Rocket,
  },
  {
    category: "Impact",
    title: "User-Centric",
    description: "Focusing on intuitive UX and high-performance interfaces that solve real user pain points efficiently.",
    icon: Users,
  },
  {
    category: "Experience",
    title: "Full Stack",
    description: "End-to-end ownership from database architecture to frontend polish with modern frameworks.",
    icon: Briefcase,
  },
  {
    category: "Learning",
    title: "Continuous",
    description: "Staying at the forefront of emerging tech, from vector databases to edge computing paradigms.",
    icon: GraduationCap,
  },
];

export function AboutContent({ bio }: { bio: string }) {
  return (
    <div className="container-narrow relative z-10">
      <header className="mb-8 md:mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground inline-block relative">
            Who I Am
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-linear-to-r from-primary to-accent rounded-full" />
          </h2>
        </motion.div>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
      >
        {/* Bio — Left Column (5/12) */}
        <motion.div variants={fadeInLeft} className="lg:col-span-6 space-y-10 lg:pr-8">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              From Hello World to AI Systems
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg lg:text-xl font-light whitespace-pre-wrap">
              {bio}
            </p>
          </div>

          <div className="relative pl-8 py-4 border-l-2 border-primary/30 italic text-muted-foreground text-lg leading-relaxed bg-primary/5 rounded-r-2xl pr-6">
            &quot;The best software is the one that solves the problem so well, you forget it&apos;s there.&quot;
          </div>
        </motion.div>

        {/* Highlights Grid — Right Column (7/12) */}
        <motion.div
          variants={fadeInRight}
          className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          {highlights.map((item) => (
            <HighlightCard key={item.title} item={item} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
