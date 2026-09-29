import { ProjectsData } from "./data";

export interface SearchIndexEntry {
  label: string;
  targetId: string;
  keywords?: string[];
}

const skillNames = [
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "C#",
  ".NET",
  "ASP.NET Core",
  "Node.js",
  "Fastify",
  "REST APIs",
  "PostgreSQL",
  "SQL",
  "Redis",
  "Prisma",
  "AWS",
  "Azure",
  "Docker",
  "GitHub Actions",
  "Azure DevOps",
  "Git",
  "AWS Bedrock",
  "Zod",
];

export const skillTargetId = (name: string) =>
  `skill-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const skillKeywords: Record<string, string[]> = {
  "C#": ["backend"],
  ".NET": ["backend"],
  "ASP.NET Core": ["backend"],
  "Node.js": ["backend"],
  Fastify: ["backend"],
  PostgreSQL: ["database", "backend"],
  AWS: ["cloud"],
  Azure: ["cloud"],
  Docker: ["cloud"],
  "GitHub Actions": ["CI/CD"],
  "Azure DevOps": ["CI/CD", "cloud"],
  "AWS Bedrock": ["applied AI", "LLM"],
};

const projectKeywords: Record<string, string[]> = {
  "resource-planning": ["applied AI", "Gemini", "planning"],
  "ai-product-enrichment": ["AI", "data enrichment"],
  "venueops-lite": ["applied AI", "AI", "catering workflow"],
  "catalogue-qa": ["LLM", "applied AI", "taxonomy"],
  tradeflow: ["electrical enquiries", "job intake"],
  ccswap: ["AI", "Go CLI", "Claude Code"],
  "pocket-lab": ["remote development", "task notifications"],
  "expense-report": ["backend", "receipt processing"],
  "invoice-approval": ["frontend", "dashboard design"],
};

const sectionEntries: SearchIndexEntry[] = [
  { label: "Home", targetId: "home" },
  {
    label: "About",
    targetId: "about",
    keywords: ["Melbourne", "experience"],
  },
  { label: "Skills", targetId: "skills" },
  {
    label: "Work Experience",
    targetId: "works",
    keywords: ["AI Registrar", "Jung Talents", "backend", "CI/CD", "cloud"],
  },
  { label: "Projects", targetId: "projects" },
  {
    label: "Contact",
    targetId: "contact",
    keywords: ["CV", "resume", "Melbourne"],
  },
];

const skillEntries: SearchIndexEntry[] = skillNames.map((name) => ({
  label: name,
  targetId: skillTargetId(name),
  keywords: skillKeywords[name],
}));

const projectEntries: SearchIndexEntry[] = ProjectsData.map((project) => ({
  label: project.title,
  targetId: `project-${project.id}`,
  keywords: [...project.technologies, ...(projectKeywords[project.id] ?? [])],
}));

export const searchIndex: SearchIndexEntry[] = [
  ...sectionEntries,
  ...skillEntries,
  ...projectEntries,
];
