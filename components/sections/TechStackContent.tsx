"use client";

import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TechTooltip } from "@/components/ui/tech-tooltip";
import {
  SiTypescript, SiPython,
  SiNextdotjs, SiReact, SiFastapi, SiTailwindcss,
  SiPytorch, SiTensorflow, SiLangchain, SiHuggingface, SiOpenai, SiScikitlearn,
  SiGooglecloud, SiDocker, SiVercel,
  SiGit, SiPostgresql, SiMongodb,
  SiJavascript,
  SiStrapi,
  SiGithubactions,
  SiFigma,
  SiPostman,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbSql } from "react-icons/tb";
import { Code2, Layout, BrainCircuit, Cloud, Wrench } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  JavaScript: <SiJavascript />, 
  TypeScript: <SiTypescript />, 
  Python: <SiPython />,
  SQL: <TbSql />,
  "Next.js": <SiNextdotjs />, 
  "React.js": <SiReact />, 
  FastAPI: <SiFastapi />,
  "Tailwind CSS": <SiTailwindcss />,
  LangChain: <SiLangchain />,
  "Hugging Face": <SiHuggingface />, 
  OpenAI: <SiOpenai />,
  AWS: <FaAws />, 
  Docker: <SiDocker />,
  Vercel: <SiVercel />,
  Git: <SiGit />, 
  "GitHub Actions": <SiGithubactions />,
  PostgreSQL: <SiPostgresql />,
  MongoDB: <SiMongodb />,
  "Strapi CMS": <SiStrapi />,
  "LLM Integration": <SiOpenai />,
  Figma: <SiFigma />,
  Postman: <SiPostman />
};

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code2 className="w-6 h-6" />,
  frameworks: <Layout className="w-6 h-6" />,
  ai_ml: <BrainCircuit className="w-6 h-6" />,
  cloud: <Cloud className="w-6 h-6" />,
  tools: <Wrench className="w-6 h-6" />,
};

const bentoConfigs: Record<string, { className: string; description: string }> = {
  languages: { 
    className: "md:col-span-1 md:row-span-1", 
    description: "The core syntax I use to communicate with machines." 
  },
  frameworks: { 
    className: "md:col-span-1 md:row-span-1", 
    description: "Powerful libraries and frameworks that speed up development." 
  },
  ai_ml: { 
    className: "md:col-span-1 md:row-span-1", 
    description: "Building the brains of modern applications." 
  },
  cloud: { 
    className: "md:col-span-1 md:row-span-1", 
    description: "Scalable infrastructure and cloud-native solutions." 
  },
  tools: {
    className: "md:col-span-1 md:row-span-1",
    description: "Essential utilities and database systems."
  },
  database: {
    className: "md:col-span-1 md:row-span-1",
    description: "Database systems and CMS platforms."
  },
};

interface TechStackItem {
  name: string;
  category: string;
  description?: string;
  experience?: string;
}

export function TechStackContent({ 
  techCategories, 
  techStack 
}: { 
  techCategories: Record<string, string>, 
  techStack: TechStackItem[] 
}) {
  return (
    <BentoGrid>
      {Object.entries(techCategories).map(([key, label]) => {
        const items = techStack.filter((t) => t.category === key);
        const config = bentoConfigs[key as keyof typeof bentoConfigs];
        
        return (
          <BentoGridItem
            key={key}
            title={label}
            description={config.description}
            icon={categoryIcons[key as keyof typeof categoryIcons]}
            className={config.className}
          >
            <div className="flex flex-wrap gap-3 mt-4">
              {items.map((tech) => (
                <TechTooltip
                  key={tech.name}
                  name={tech.name}
                  description={tech.description}
                  experience={tech.experience}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:border-primary/30"
                  >
                    <span className="text-xl text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      {iconMap[tech.name] ?? "⚙️"}
                    </span>
                    <span className="text-xs font-medium dark:text-neutral-400 group-hover:text-foreground">
                      {tech.name}
                    </span>
                  </motion.div>
                </TechTooltip>
              ))}
            </div>
          </BentoGridItem>
        );
      })}
    </BentoGrid>
  );
}
