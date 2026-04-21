"use client";

import { motion, type Variants } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  IconLayout,
  IconServer,
  IconBrain,
  IconTerminal2,
} from "@tabler/icons-react";

const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const tagStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  layout: <IconLayout className="w-6 h-6 text-blue-500" strokeWidth={1.5} />,
  server: <IconServer className="w-6 h-6 text-emerald-500" strokeWidth={1.5} />,
  brain: <IconBrain className="w-6 h-6 text-purple-500" strokeWidth={1.5} />,
  terminal: <IconTerminal2 className="w-6 h-6 text-orange-500" strokeWidth={1.5} />,
};

interface CapabilityItem {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  tags: string[];
  className?: string;
}

export function CapabilitiesContent({ displayItems }: { displayItems: CapabilityItem[] }) {
  return (
    <motion.div
      variants={containerStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <BentoGrid className="max-w-6xl mx-auto grid-cols-1 md:grid-cols-2">
        {displayItems.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <BentoGridItem
              title={item.title}
              description={item.description}
              className={cn(
                "surface-1 border-border/40 hover:border-primary/30 transition-all duration-500",
                item.className
              )}
              icon={
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
                  item.iconBg
                )}>
                  {ICON_MAP[item.icon] || <IconLayout className="w-6 h-6" />}
                </div>
              }
            >
              <motion.div 
                variants={tagStagger}
                className="flex flex-wrap gap-2 mt-4"
              >
                {item.tags.map((tag) => (
                  <motion.div key={tag} variants={tagVariants}>
                    <Badge variant="outline" className="py-1 px-3 bg-secondary/30 backdrop-blur-sm border-border/30 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                      <span className="font-mono text-sm tracking-tight">{tag}</span>
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </BentoGridItem>
          </motion.div>
        ))}
      </BentoGrid>
    </motion.div>
  );
}
