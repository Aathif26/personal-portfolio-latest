"use client";

import { motion, type Variants } from "motion/react";
import config from "@/content/config.json";
const { personalInfo, socialLinks } = config;
import { HiArrowDown, HiEnvelope } from "react-icons/hi2";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HeroStats } from "./HeroStats";
import { HeroData } from "@/types";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <FaGithub size={18} />,
  linkedin: <FaLinkedinIn size={18} />,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.14, delayChildren: 0.3 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const socialStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const socialItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function HeroContent({ content = personalInfo }: { content?: Partial<HeroData> }) {
  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const name = content.name || personalInfo.name;
  const title = content.title || personalInfo.title;
  const description = content.description || personalInfo.tagline;
  const ctaText = content.ctaText || "Get in Touch";

  return (
    <>
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {title}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            <span className="block text-foreground">{name}</span>
            <span className="block accent-highlight mt-1">{personalInfo.highlightText}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-3 max-w-4xl text-base sm:text-lg text-foreground/80 leading-relaxed">
            {description}
          </motion.p>

          <HeroStats />

          <motion.div variants={scalePop} className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => handleScroll("#projects")}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border/60 bg-background/50 backdrop-blur-sm text-foreground font-semibold text-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98] hover:cursor-pointer"
            >
              View Projects
              <HiArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => handleScroll("#contact")}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_40px_oklch(0.7_0.22_145/30%)] hover:scale-[1.03] active:scale-[0.98] hover:cursor-pointer"
            >
              <HiEnvelope size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              {ctaText}
            </button>
          </motion.div>

          <motion.div variants={socialStagger} className="mt-4 flex items-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.platform}
                variants={socialItem}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full border border-border/40 bg-background/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_0_20px_oklch(0.7_0.22_145/15%)] hover:scale-110 active:scale-95"
                aria-label={link.platform}
              >
                {socialIconMap[link.icon]}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => handleScroll("#about")}
          className="group flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <HiArrowDown size={14} />
          </motion.div>
        </button>
      </motion.div>
    </>
  );
}
