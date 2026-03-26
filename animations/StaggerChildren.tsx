"use client";

import { motion, type Variants } from "motion/react";
import { staggerContainer } from "./variants";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "ul" | "ol";
}

export default function StaggerChildren({
  children,
  className,
  variants = staggerContainer,
  as = "div",
}: StaggerChildrenProps) {
  const Component = motion.create(as);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
