import projectImage5 from "../assets/images/project5.webp";
import projectImage6 from "../assets/images/project6.webp";

import avatar from "../assets/images/avatar.webp";

interface HeroDataInterface {
  avatarURL: string;
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  resume: string;
}

interface EducationInterface {
  degree: string;
  school: string;
  period: string;
}

interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
}

interface AboutDataInterface {
  education: EducationInterface[];
}

interface NavigationInterface {
  name: string;
  link: string;
}

interface WorkInterface {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

const NavigationData: NavigationInterface[] = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Work Experience", link: "#works" },
  { name: "Projects", link: "#projects" },
  { name: "Contacts", link: "#contact" },
];

const HeroData = {
  // avatarURL: "https://i.pravatar.cc/300",
  avatarURL: avatar,
  name: "Cong Chuong Truong",
  title: "Software Engineer",
  location: "Melbourne, Australia",
  email: "truongcongchuong123@gmail.com",
  linkedin: "https://www.linkedin.com/in/congchuongtruong/",
  github: "https://github.com/ctru0009",
  resume:
    "https://drive.google.com/file/d/1AW3Mq0g6_rypW3C3K0cEpBbvGI6b6Gq3/view?usp=sharing",
};

const AboutData = {
  education: [
    {
      degree: "Bachelor of Computer Science",
      school: "Monash University",
      period: "2021–2024",
    },
  ],
};

const WorkData: WorkInterface[] = [
  {
    title: "AI Engineer (Contractor)",
    company: "AI Registrar",
    location: "Australia · Remote",
    period: "2026–Present",
    responsibilities: [
      "Built clinical workflow features across patient triage, provider matching, referrals and clinician-facing AI-assisted experiences in a multi-tenant TypeScript/React/Node.js platform.",
      "Migrated clinical AI workloads to Australian-region AWS Bedrock with workload-specific routing and fail-closed provider and configuration validation.",
      "Designed safeguards around structured model output, provider boundaries, graceful degradation and privacy-sensitive processing so AI failures or configuration errors could not silently become unsafe application behaviour.",
      "Took on technical review alongside implementation, reviewing changes for architecture, security, regression risk, test quality and production readiness.",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Fastify",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "AWS Bedrock",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    title: "Software Engineer",
    company: "Jung Talents",
    location: "Remote",
    period: "January 2023 – February 2026",
    responsibilities: [
      "Led the .NET 8 → .NET 9 upgrade across the core API surface, updating dependencies, resolving breaking changes and expanding regression coverage.",
      "Refactored high-traffic ASP.NET Core endpoints using caching and query shaping, improving average dashboard response time by 10%.",
      "Built Azure DevOps CI/CD pipelines for build, test and deployment to Azure App Services and Azure Functions.",
      "Reworked EF Core queries and database access patterns to reduce unnecessary database load on reporting workloads.",
    ],
    technologies: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "Entity Framework Core",
      "PostgreSQL",
      "Redis",
      "Azure",
      "Docker",
      "Azure DevOps",
    ],
  },
];

const ProjectsData = [
  {
    title: "AI-Powered Resource Planning System",
    description:
      "A resource-planning MVP where capacity, dependency and skill constraints are enforced in application code while Gemini provides bounded impact and risk analysis. Zod validates model responses before they reach the React UI, and deterministic planning remains available without AI-generated analysis.",
    image: projectImage5,
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "Express",
      "Gemini API",
      "Zod",
      "SQLite",
    ],
    githubLink: "https://github.com/ctru0009/resource-planning-system",
    liveLink: "https://github.com/ctru0009/resource-planning-system",
  },
  {
    title: "AI Product Data Enrichment Pipeline",
    description:
      "A TypeScript CLI that classifies DummyJSON product records with Gemini. Every model response is Zod-validated; batches retry with backoff; checkpoints and row-level isolation mean a bad row or provider blip does not kill the run.",
    image: projectImage6,
    technologies: [
      "Node.js",
      "TypeScript",
      "Gemini API",
      "Zod",
      "CSV",
    ],
    githubLink: "https://github.com/ctru0009/ai-enrichment-pipeline",
    liveLink: "https://github.com/ctru0009/ai-enrichment-pipeline",
  },
];
export { HeroData, AboutData, ProjectsData, WorkData, NavigationData };
export type {
  HeroDataInterface,
  AboutDataInterface,
  ProjectInterface,
  EducationInterface,
  WorkInterface,
  NavigationInterface,
};