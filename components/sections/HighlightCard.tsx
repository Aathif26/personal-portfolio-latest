"use client";

import { motion } from "motion/react";
import { type LucideIcon } from "lucide-react";

interface HighlightItem {
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function HighlightCard({ item }: { item: HighlightItem }) {
  const Icon = item.icon;
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="surface-1 rounded-3xl p-4 md:p-6 border border-border/40 hover:border-primary/40 transition-all duration-300 group overflow-hidden relative cursor-default shadow-sm hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Icon Wrapper */}
      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 group-hover:text-primary/70 transition-colors">
            {item.category}
          </span>
          <h4 className="text-xl font-display font-bold text-foreground mt-1">
            {item.title}
          </h4>
        </div>

        {/* Hover revelation description */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
          <div className="overflow-hidden">
            <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/50">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle corner glow */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
    </motion.div>
  );
}
