"use client";

import { motion, type Variants } from "motion/react";
import { fadeInUp } from "./variants";
import { cn } from "@/lib/utils";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  id?: string;
}

export default function MotionSection({
  children,
  className,
  variants = fadeInUp,
  id,
}: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
