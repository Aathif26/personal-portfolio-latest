"use client";

import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TechTooltipProps {
  name: string;
  description?: string;
  experience?: string;
  children: React.ReactNode;
  className?: string;
}

export const TechTooltip = ({
  name,
  description,
  experience,
  children,
  className,
}: TechTooltipProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -top-24 z-50 flex flex-col items-center justify-center rounded-xl bg-black border border-white/10 p-3 shadow-2xl min-w-[200px]"
          >
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-white/10 rotate-45" />
            
            <div className="flex flex-col gap-1 text-center">
              <span className="text-white font-bold text-sm tracking-tight">{name}</span>
              <div className="flex items-center justify-center gap-1.5 pt-1 border-t border-white/10 mt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary">{experience}</span>
              </div>
              <p className="text-neutral-400 text-[11px] mt-1 leading-relaxed px-1">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-30">{children}</div>
    </div>
  );
};
