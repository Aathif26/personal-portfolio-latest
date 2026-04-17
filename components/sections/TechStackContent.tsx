"use client";

import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TechTooltip } from "@/components/ui/tech-tooltip";
import {
  SiTypescript, SiPython, SiGo, SiRust,
  SiNextdotjs, SiReact, SiFastapi, SiNodedotjs, SiExpress, SiTailwindcss,
  SiPytorch, SiTensorflow, SiLangchain, SiHuggingface, SiOpenai, SiScikitlearn,
  SiGooglecloud, SiDocker, SiKubernetes, SiTerraform, SiVercel,
  SiGit, SiPostgresql, SiRedis, SiMongodb, SiApachekafka, SiGraphql,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbSql } from "react-icons/tb";
import { Code2, Layout, BrainCircuit, Cloud, Wrench } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  TypeScript: <SiTypescript />, Python: <SiPython />, Go: <SiGo />, Rust: <SiRust />,
  SQL: <TbSql />,
  "Next.js": <SiNextdotjs />, React: <SiReact />, FastAPI: <SiFastapi />,
  "Node.js": <SiNodedotjs />, Express: <SiExpress />, "Tailwind CSS": <SiTailwindcss />,
  PyTorch: <SiPytorch />, TensorFlow: <SiTensorflow />, LangChain: <SiLangchain />,
  "Hugging Face": <SiHuggingface />, OpenAI: <SiOpenai />, "scikit-learn": <SiScikitlearn />,
  AWS: <FaAws />, GCP: <SiGooglecloud />, Docker: <SiDocker />,
  Kubernetes: <SiKubernetes />, Terraform: <SiTerraform />, Vercel: <SiVercel />,
  Git: <SiGit />, PostgreSQL: <SiPostgresql />, Redis: <SiRedis />,
  MongoDB: <SiMongodb />, Kafka: <SiApachekafka />, GraphQL: <SiGraphql />,
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
    className: "md:col-span-2 md:row-span-2", 
    description: "The core syntax I use to communicate with machines." 
  },
  frameworks: { 
    className: "md:col-span-1 md:row-span-2", 
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
