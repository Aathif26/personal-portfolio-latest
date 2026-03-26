"use client";

import { motion } from "motion/react";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { Experience as ExperienceType } from "@/types";

export function ExperienceContent({ displayItems }: { displayItems: ExperienceType[] }) {
  const timelineData = displayItems.map((exp) => ({
    title: exp.period.split(" — ")[0],
    content: (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group relative"
      >
        <div className="surface-1 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_oklch(0.7_0.22_145/8%)] gradient-border">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-medium">{exp.company}</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                </div>
              </div>
              <div className="flex sm:justify-end">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  Full-time
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {exp.description}
            </p>

            <div className="space-y-3 mt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Key Achievements</h4>
              <ul className="grid grid-cols-1 gap-3">
                {exp.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-muted-foreground group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0 group-hover/item:bg-primary transition-colors" />
                    <span className="group-hover/item:text-foreground transition-colors duration-200">
                      {ach}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    ),
  }));

  return <Timeline data={timelineData} />;
}
