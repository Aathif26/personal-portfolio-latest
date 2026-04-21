export interface NavLink {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number; // 0–100
  category: "ai" | "frontend" | "backend" | "devops" | "database";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  imageUrl: string;
  category: "AI" | "Web" | "Full-Stack" | "Infrastructure" | "Data";
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface TechItem {
  name: string;
  category: "languages" | "frameworks" | "ai_ml" | "cloud" | "tools";
  description?: string;
  experience?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Capability {
  icon: string;
  title: string;
  description: string;
  iconBg?: string;
  tags?: string[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
export interface HeroData {
  name: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  highlightText: string;
}
