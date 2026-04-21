"use client";

import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/types";
import { RefObject } from "react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  layoutIdSuffix: string;
  modalRef: RefObject<HTMLDivElement | null>;
}

export function ProjectModal({ project, onClose, layoutIdSuffix, modalRef }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 grid place-items-center z-[100] p-4 md:p-8"
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl h-full w-full z-50"
            onClick={onClose}
          />

          <motion.button
            key={`button-${project.id}-${layoutIdSuffix}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex absolute top-4 right-4 md:top-6 md:right-6 items-center justify-center bg-surface-3 border border-border rounded-full h-10 w-10 md:h-12 md:w-12 z-[110] hover:bg-surface-2 transition-all shadow-xl active:scale-90 hover:cursor-pointer"
            onClick={onClose}
          >
            <CloseIcon />
          </motion.button>

          <motion.div
            layoutId={`card-${project.id}-${layoutIdSuffix}`}
            ref={modalRef}
            className="w-full max-w-4xl h-fit max-h-[90vh] flex flex-col md:flex-row surface-2 rounded-[2.5rem] overflow-hidden border border-border/50 noise-bg shadow-2xl relative z-[100]"
          >
            {/* Image Section */}
            <motion.div
              layoutId={`image-${project.id}-${layoutIdSuffix}`}
              className="relative w-full md:w-[45%] h-48 md:h-auto overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-border/50"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-2/80 via-transparent to-transparent opacity-60" />

              {/* Floating Tech Stack Overlay */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((tech) => (
                  <Badge
                    key={tech}
                    variant="default"
                    className="bg-surface-3/80 backdrop-blur-md border-border/50 text-[10px] uppercase tracking-wider font-bold"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col min-w-0 bg-surface-2/50 backdrop-blur-sm overflow-y-auto">
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="space-y-1">
                    <motion.h3
                      layoutId={`title-${project.id}-${layoutIdSuffix}`}
                      className="font-display font-bold text-foreground text-2xl lg:text-3xl tracking-tight leading-tight"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${project.id}-${layoutIdSuffix}`}
                      className="text-primary font-medium text-sm"
                    >
                      {project.description}
                    </motion.p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-border px-3 py-1"
                    >
                      <span className="font-mono text-xs">{tech}</span>
                    </Badge>
                  ))}
                </div>

                <div className="space-y-4">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-base md:text-lg leading-relaxed"
                  >
                    {project.longDescription}
                  </motion.p>
                </div>
              </div>

              <div className="mt-auto p-8 pt-4 border-t border-border/20 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>

                {project.githubUrl && (<motion.a
                  layout
                  href={project.liveUrl || "#"}
                  target="_blank"
                  className="px-10 py-4 text-sm rounded-full font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all accent-glow shrink-0 active:scale-95 shadow-xl shadow-primary/20 flex items-center gap-2 group"
                >
                  <span>View Project</span>
                  <HiArrowTopRightOnSquare className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CloseIcon = () => (
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
    className="h-6 w-6 text-foreground"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);
