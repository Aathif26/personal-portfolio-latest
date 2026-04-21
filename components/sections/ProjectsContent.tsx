"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { CategoryFilters } from "./CategoryFilters";

export function ProjectsContent({ initialProjects }: { initialProjects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const categories = ["All", ...Array.from(new Set(initialProjects.map((p) => p.category)))];

  const filteredProjects = selectedCategory === "All"
    ? initialProjects
    : initialProjects.filter((p) => p.category === selectedCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  return (
    <>
      <ProjectModal
        project={active}
        onClose={() => setActive(null)}
        layoutIdSuffix={id}
        modalRef={ref}
      />

      <CategoryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setActive(project)}
              layoutIdSuffix={id}
            />
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < filteredProjects.length && (
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="group relative px-12 py-4 rounded-full bg-surface-2 border border-border/50 font-bold text-sm uppercase tracking-widest hover:border-primary/50 transition-all active:scale-95 flex items-center gap-3 overflow-hidden shadow-xl"
          >
            <span className="relative z-10">Read More Projects</span>
            <div className="relative z-10 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
              <ArrowRightIcon className="w-3 h-3 text-primary group-hover:text-white transition-colors" />
            </div>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] transition-opacity" />
          </button>
        </div>
      )}
    </>
  );
}

export const ArrowRightIcon = ({ className }: { className?: string }) => (
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
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
