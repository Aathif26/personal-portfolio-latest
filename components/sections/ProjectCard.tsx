"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  layoutIdSuffix: string;
}

export function ProjectCard({ project, onClick, layoutIdSuffix }: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`card-${project.id}-${layoutIdSuffix}`}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col surface-1 hover:surface-2 rounded-3xl cursor-pointer transition-all duration-500 border border-border/50 hover:accent-glow overflow-hidden bg-background shadow-lg h-full max-w-full"
    >
      <motion.div
        layoutId={`image-${project.id}-${layoutIdSuffix}`}
        className="relative overflow-hidden h-48 sm:h-56 shrink-0"
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            variant="accent"
            className="bg-primary/20 backdrop-blur-md border-primary/20 text-[9px] uppercase font-black px-2 py-0.5 text-white"
          >
            {project.category}
          </Badge>
        </div>
      </motion.div>

      <div className="flex-1 p-6 md:p-8 flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {project.techStack.slice(0, 2).map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="py-1 px-3 bg-secondary/30 backdrop-blur-sm border-border/90 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                >
                  <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/50">
                    {tech}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
          <motion.h3
            layoutId={`title-${project.id}-${layoutIdSuffix}`}
            className="font-display font-semibold text-foreground text-xl tracking-relaxed mb-2 group-hover:text-primary transition-colors mt-3"
          >
            {project.title}
          </motion.h3>
          <div className="flex items-center justify-between">
            <motion.p
              layoutId={`description-${project.id}-${layoutIdSuffix}`}
              className="text-muted-foreground text-sm leading-relaxed line-clamp-2 max-w-2/3"
            >
              {project.description}
            </motion.p>
            <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Global Glow Effect */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
