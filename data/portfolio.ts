import type {
  NavLink,
  Skill,
  Project,
  Experience,
  TechItem,
  SocialLink,
  Capability,
} from "@/types";

// ── Navigation ──────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Contact", href: "#contact" },
];

// ── Personal Info ───────────────────────────────────────────
export const personalInfo = {
  name: "Alex Chen",
  title: "AI Engineer & Full-Stack Architect",
  tagline: "Building intelligent systems at the intersection of AI and scalable architecture",
  highlightText: "Full Stack Developer",
  bio: `I'm a Staff-level engineer specializing in AI systems and full-stack architecture. 
  With 8+ years of experience spanning machine learning, distributed systems, and modern web platforms, 
  I design solutions that bridge cutting-edge AI research with production-grade engineering. 
  My work focuses on building intelligent, scalable products that push the boundaries of 
  what's possible at the intersection of AI and software architecture.`,
  email: "alex@example.com",
  resumeUrl: "/resume.pdf",
};

// ── Skills ──────────────────────────────────────────────────
export const skills: Skill[] = [
  { name: "Machine Learning", level: 95, category: "ai" },
  { name: "Deep Learning / NLP", level: 92, category: "ai" },
  { name: "LLM Fine-tuning", level: 90, category: "ai" },
  { name: "Computer Vision", level: 85, category: "ai" },
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 93, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Motion / Animation", level: 88, category: "frontend" },
  { name: "Node.js / Express", level: 92, category: "backend" },
  { name: "Python / FastAPI", level: 94, category: "backend" },
  { name: "GraphQL", level: 85, category: "backend" },
  { name: "System Design", level: 90, category: "backend" },
  { name: "AWS / GCP", level: 88, category: "devops" },
  { name: "Docker / K8s", level: 86, category: "devops" },
  { name: "CI/CD Pipelines", level: 84, category: "devops" },
  { name: "PostgreSQL", level: 90, category: "database" },
  { name: "Redis", level: 85, category: "database" },
  { name: "MongoDB", level: 82, category: "database" },
];

// ── AI & Full-Stack Capabilities ────────────────────────────
export const aiCapabilities: Capability[] = [
  {
    icon: "brain",
    title: "LLM Systems",
    description:
      "Design and deploy production LLM pipelines — from fine-tuning and RAG architectures to prompt engineering and evaluation frameworks.",
  },
  {
    icon: "cpu",
    title: "ML Infrastructure",
    description:
      "Build scalable ML platforms with feature stores, model registries, and automated training pipelines on cloud-native infrastructure.",
  },
  {
    icon: "eye",
    title: "Computer Vision",
    description:
      "Develop real-time vision systems for object detection, segmentation, and visual understanding using state-of-the-art architectures.",
  },
  {
    icon: "messageSquare",
    title: "NLP & Conversational AI",
    description:
      "Create intelligent conversational agents, semantic search systems, and text analytics pipelines powered by transformer models.",
  },
];

export const fullStackCapabilities: Capability[] = [
  {
    icon: "layers",
    title: "System Architecture",
    description:
      "Design distributed systems with microservices, event-driven architectures, and domain-driven design patterns at enterprise scale.",
  },
  {
    icon: "globe",
    title: "Web Platforms",
    description:
      "Build high-performance web applications with Next.js, React Server Components, and edge-first rendering strategies.",
  },
  {
    icon: "database",
    title: "Data Engineering",
    description:
      "Architect data pipelines and storage systems — from real-time streaming to analytical warehouses with optimized query patterns.",
  },
  {
    icon: "shield",
    title: "DevOps & Security",
    description:
      "Implement zero-trust security models, GitOps workflows, and infrastructure-as-code with full observability stacks.",
  },
];

export const projects: Project[] = [
  {
    id: "neural-search",
    title: "NeuralSearch Engine",
    description:
      "AI-powered semantic search platform processing 10M+ documents with sub-200ms latency.",
    longDescription:
      "Built a production semantic search engine leveraging transformer embeddings, HNSW indexing, and a hybrid retrieval pipeline. The system handles 10M+ documents with p99 latency under 200ms and supports real-time index updates.",
    techStack: ["Python", "FastAPI", "PyTorch", "Pinecone", "React", "Redis"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    category: "AI",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 1
  },
  {
    id: "llm-orchestrator",
    title: "LLM Orchestration Platform",
    description:
      "Enterprise platform for managing, evaluating, and deploying LLM workflows at scale.",
    longDescription:
      "Designed a multi-tenant platform for orchestrating LLM chains, A/B testing prompts, managing model versioning, and monitoring inference costs. Reduced prompt iteration cycles from days to hours.",
    techStack: ["Next.js", "TypeScript", "Python", "LangChain", "PostgreSQL", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4638d9f8e?auto=format&fit=crop&q=80&w=800",
    category: "AI",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 2
  },
  {
    id: "real-time-analytics",
    title: "Real-Time Analytics Dashboard",
    description:
      "High-throughput analytics dashboard processing 1M+ events/sec with live visualizations.",
    longDescription:
      "Engineered a real-time analytics platform with Apache Kafka event streaming, ClickHouse OLAP storage, and a WebSocket-driven React dashboard displaying live metrics with sub-second refresh.",
    techStack: ["React", "D3.js", "Node.js", "Kafka", "ClickHouse", "WebSocket"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    category: "Data",
    githubUrl: "https://github.com",
    featured: true,
    order: 3
  },
  {
    id: "vision-pipeline",
    title: "Computer Vision Pipeline",
    description:
      "Edge-deployed vision system for real-time object detection and tracking at 60fps.",
    longDescription:
      "Built an optimized computer vision pipeline using YOLO and DeepSORT for real-time multi-object tracking. Deployed on edge devices with TensorRT optimization achieving 60fps inference.",
    techStack: ["Python", "PyTorch", "TensorRT", "OpenCV", "CUDA", "FastAPI"],
    imageUrl: "https://images.unsplash.com/photo-1527430297724-4687b40c74c8?auto=format&fit=crop&q=80&w=800",
    category: "AI",
    githubUrl: "https://github.com",
    featured: false,
    order: 4
  },
  {
    id: "microservices-platform",
    title: "Cloud-Native Microservices",
    description:
      "Event-driven microservices platform serving 50K+ concurrent users with 99.99% uptime.",
    longDescription:
      "Architected a cloud-native platform with 12 microservices, event-driven communication via RabbitMQ, distributed tracing, and auto-scaling on Kubernetes. Achieved 99.99% uptime SLA.",
    techStack: ["Go", "gRPC", "Kubernetes", "Terraform", "Prometheus", "Grafana"],
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
    category: "Infrastructure",
    githubUrl: "https://github.com",
    featured: false,
    order: 5
  },
  {
    id: "ai-code-review",
    title: "AI Code Review Assistant",
    description:
      "Intelligent code review tool that analyzes PRs for bugs, security issues, and style.",
    longDescription:
      "Created an AI-powered code review assistant integrated with GitHub that analyzes pull requests for potential bugs, security vulnerabilities, and coding style. Uses fine-tuned LLMs for contextual code understanding.",
    techStack: ["TypeScript", "Next.js", "Python", "GPT-4", "GitHub API", "PostgreSQL"],
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    category: "Full-Stack",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    order: 6
  },
];

// ── Experience ──────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: "staff-eng",
    role: "Staff AI Engineer",
    company: "TechCorp AI",
    period: "2022 — Present",
    description:
      "Leading AI platform architecture and driving adoption of ML-powered features across the product suite.",
    achievements: [
      "Architected LLM infrastructure serving 5M+ daily requests with 99.9% uptime",
      "Led team of 8 engineers building next-gen AI features, increasing user engagement by 40%",
      "Designed RAG pipeline reducing hallucination rate by 65% in production",
      "Established ML engineering best practices adopted across 4 product teams",
    ],
  },
  {
    id: "senior-eng",
    role: "Senior Full-Stack Engineer",
    company: "ScaleUp Inc.",
    period: "2020 — 2022",
    description:
      "Owned end-to-end architecture for the core product, from database to UI.",
    achievements: [
      "Rebuilt the frontend with Next.js, improving Core Web Vitals scores by 60%",
      "Migrated monolith to microservices, reducing deploy times from 45min to 3min",
      "Implemented real-time features serving 50K concurrent WebSocket connections",
      "Mentored 5 junior engineers through architectural design reviews",
    ],
  },
  {
    id: "ml-eng",
    role: "Machine Learning Engineer",
    company: "DataFlow Labs",
    period: "2018 — 2020",
    description:
      "Built production ML systems for NLP and recommendation engines.",
    achievements: [
      "Developed NLP pipeline processing 2M+ documents daily with 94% accuracy",
      "Built recommendation engine increasing click-through rates by 35%",
      "Reduced model training costs by 50% through infrastructure optimization",
      "Published internal ML toolkit used by 20+ data scientists",
    ],
  },
  {
    id: "sde",
    role: "Software Development Engineer",
    company: "CloudBase",
    period: "2016 — 2018",
    description:
      "Full-stack development on cloud infrastructure management platform.",
    achievements: [
      "Built React component library used across 3 product teams",
      "Designed RESTful APIs handling 10K+ requests/sec",
      "Implemented CI/CD pipeline reducing release cycle from weekly to daily",
    ],
  },
];

// ── Tech Stack ──────────────────────────────────────────────
export const techStack: TechItem[] = [
  // Languages
  { name: "TypeScript", category: "languages", description: "Static typing for modern JS", experience: "Expert" },
  { name: "Python", category: "languages", description: "Versatile language for AI & backend", experience: "Expert" },
  { name: "Go", category: "languages", description: "Efficient systems programming", experience: "Advanced" },
  { name: "Rust", category: "languages", description: "Memory safety & performance", experience: "Intermediate" },
  { name: "SQL", category: "languages", description: "Relational data management", experience: "Advanced" },
  // Frameworks
  { name: "Next.js", category: "frameworks", description: "React framework for production", experience: "Expert" },
  { name: "React", category: "frameworks", description: "UI component library", experience: "Expert" },
  { name: "FastAPI", category: "frameworks", description: "Modern Python web framework", experience: "Expert" },
  { name: "Node.js", category: "frameworks", description: "JavaScript runtime for backend", experience: "Advanced" },
  { name: "Express", category: "frameworks", description: "Minimalist Node.js framework", experience: "Advanced" },
  { name: "Tailwind CSS", category: "frameworks", description: "Utility-first CSS framework", experience: "Expert" },
  // AI / ML
  { name: "PyTorch", category: "ai_ml", description: "Deep learning framework", experience: "Advanced" },
  { name: "TensorFlow", category: "ai_ml", description: "End-to-end ML platform", experience: "Advanced" },
  { name: "LangChain", category: "ai_ml", description: "Building LLM applications", experience: "Advanced" },
  { name: "Hugging Face", category: "ai_ml", description: "Models and datasets hub", experience: "Advanced" },
  { name: "OpenAI", category: "ai_ml", description: "Large Language Models", experience: "Advanced" },
  { name: "scikit-learn", category: "ai_ml", description: "Machine learning in Python", experience: "Advanced" },
  // Cloud
  { name: "AWS", category: "cloud", description: "Global cloud platform", experience: "Advanced" },
  { name: "GCP", category: "cloud", description: "Google's cloud infrastructure", experience: "Advanced" },
  { name: "Docker", category: "cloud", description: "Containerization platform", experience: "Advanced" },
  { name: "Kubernetes", category: "cloud", description: "Container orchestration", experience: "Intermediate" },
  { name: "Terraform", category: "cloud", description: "Infrastructure as Code", experience: "Advanced" },
  { name: "Vercel", category: "cloud", description: "Frontend deployment platform", experience: "Expert" },
  // Tools
  { name: "Git", category: "tools", description: "Version control system", experience: "Expert" },
  { name: "PostgreSQL", category: "tools", description: "Advanced relational database", experience: "Advanced" },
  { name: "Redis", category: "tools", description: "In-memory data store", experience: "Advanced" },
  { name: "MongoDB", category: "tools", description: "NoSQL document database", experience: "Intermediate" },
  { name: "Kafka", category: "tools", description: "Event streaming platform", experience: "Intermediate" },
  { name: "GraphQL", category: "tools", description: "Query language for APIs", experience: "Advanced" },
];

// ── Social Links ────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com", icon: "github" },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
];

// ── Tech Stack Category Labels ──────────────────────────────
export const techCategories: Record<TechItem["category"], string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  ai_ml: "AI / ML",
  cloud: "Cloud & Infra",
  tools: "Tools & Data",
};
