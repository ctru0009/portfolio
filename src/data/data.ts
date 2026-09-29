import projectImage5 from "../assets/images/project5.webp";
import projectImage6 from "../assets/images/project6.webp";

import venueOpsImage from "../assets/images/project-venue-ops.webp";
import catalogueQaImage from "../assets/images/project-catalogue-qa.webp";
import tradeflowImage from "../assets/images/project-tradeflow.webp";
import ccswapImage from "../assets/images/project-ccswap.webp";
import expenseReportImage from "../assets/images/project-expense-report.webp";
import invoiceApprovalImage from "../assets/images/project-invoice-approval.webp";

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
  image?: string;
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
  {
    title: "VenueOps Lite",
    description:
      "A catering enquiry workflow where the model interprets and software acts: an OpenRouter tool call turns each Google Sheets row into a schema-validated extraction, deterministic rules enforce notice and minimum-order constraints, and a human approves every reply — with at most one follow-up and an append-only activity log.",
    image: venueOpsImage,
    technologies: [
      "TypeScript",
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "OpenRouter",
      "Docker",
    ],
    githubLink: "https://github.com/ctru0009/venue-ops",
    liveLink: "https://github.com/ctru0009/venue-ops",
  },
  {
    title: "LLM-Assisted Catalogue QA",
    description:
      "An n8n-orchestrated catalogue QA workflow that keeps rules and models in their lanes: deterministic validation runs first and only ambiguous taxonomy reaches an OpenAI-compatible model, whose Zod-validated suggestion still waits for human approval.",
    image: catalogueQaImage,
    technologies: [
      "TypeScript",
      "Fastify",
      "n8n",
      "Zod",
      "OpenAI-compatible API",
      "Docker",
    ],
    githubLink: "https://github.com/ctru0009/llm-assisted-catalogue-qa",
    liveLink: "https://github.com/ctru0009/llm-assisted-catalogue-qa",
  },
  {
    title: "TradeFlow — Electrical Enquiry Intake",
    description:
      "A consultancy-style demo that sits in front of a fictional electrical shop's job system: free text becomes a structured summary, routine jobs are created, incomplete ones park for review, emergency language blocks approval until acknowledged, and quote follow-ups are tracked as explicit state instead of memory.",
    image: tradeflowImage,
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Zod",
    ],
    githubLink: "https://github.com/ctru0009/tradeflow",
    liveLink: "https://tradeflow-fawn-three.vercel.app",
  },
  {
    title: "ccswap",
    description:
      "A single-binary Go CLI that switches Claude Code between provider profiles such as Anthropic, Z.ai, Ollama Cloud and OpenRouter. Every swap rewrites ~/.claude/settings.json atomically and never touches permissions, MCP servers or other config.",
    image: ccswapImage,
    technologies: ["Go", "CLI", "Claude Code", "OpenRouter"],
    githubLink: "https://github.com/ctru0009/ccswap",
    liveLink: "https://github.com/ctru0009/ccswap",
  },
  {
    title: "pocket-lab",
    description:
      "An installer that keeps AI coding sessions reachable from your phone: run the machine always-on, connect over Tailscale, and get ntfy or Telegram notifications for task completion, input-needed and sub-agent events.",
    technologies: ["Bash", "PowerShell", "Tailscale", "ntfy", "Telegram"],
    githubLink: "https://github.com/ctru0009/pocket-lab",
    liveLink: "https://github.com/ctru0009/pocket-lab",
  },
  {
    title: "Expense Report Management System",
    description:
      "A full-stack expense workflow with JWT auth, a state-machine review flow and admin approval. Receipt uploads are extracted through an OpenAI-compatible service behind an interface, so the AI path can be swapped or mocked without touching the workflow.",
    image: expenseReportImage,
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/ctru0009/expense-report-managemen-system",
    liveLink: "https://github.com/ctru0009/expense-report-managemen-system",
  },
  {
    title: "Invoice Approval Dashboard",
    description:
      "A design-to-code proof of concept: the dashboard was composed visually in Pencil.dev with its Shadcn template, then generated into a working React + Tailwind page through the Pencil MCP server.",
    image: invoiceApprovalImage,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI", "Pencil.dev"],
    githubLink: "https://github.com/ctru0009/invoice-approval-dashboard",
    liveLink: "https://github.com/ctru0009/invoice-approval-dashboard",
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