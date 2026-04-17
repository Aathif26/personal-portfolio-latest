"use client";

import { motion } from "motion/react";

import { Variants } from "motion/react";

const heroStats = [
  { value: "2+", label: "Years" },
  { value: "10+", label: "Projects" }
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export function HeroStats() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-6 grid grid-cols-3 gap-6 sm:gap-10 rounded-2xl border border-border/30 bg-background/40 backdrop-blur-sm px-6 py-4 sm:px-10 sm:py-5"
    >
      {heroStats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-xl sm:text-2xl font-display font-semibold text-foreground">
            {stat.value}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-[0.2em]">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
