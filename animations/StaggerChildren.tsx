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

const sharedProps = (variants: Variants, className?: string) => ({
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, amount: 0.15 },
  variants,
  className: cn(className),
});

export default function StaggerChildren({
  children,
  className,
  variants = staggerContainer,
  as = "div",
}: StaggerChildrenProps) {
  if (as === "ul") {
    return <motion.ul {...sharedProps(variants, className)}>{children}</motion.ul>;
  }
  if (as === "ol") {
    return <motion.ol {...sharedProps(variants, className)}>{children}</motion.ol>;
  }
  return <motion.div {...sharedProps(variants, className)}>{children}</motion.div>;
}
