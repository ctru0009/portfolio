export interface SearchIndexEntry {
  label: string;
  section: string;
  target: string;
}

export const itemId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const searchIndex: SearchIndexEntry[] = [
  { label: "React", section: "skills", target: "skill-frontend" },
  { label: "TypeScript", section: "skills", target: "skill-frontend" },
  { label: "JavaScript", section: "skills", target: "skill-frontend" },
  { label: "Tailwind CSS", section: "skills", target: "skill-frontend" },
  { label: "C#", section: "skills", target: "skill-backend" },
  { label: ".NET", section: "skills", target: "skill-backend" },
  { label: "ASP.NET Core", section: "skills", target: "skill-backend" },
  { label: "Node.js", section: "skills", target: "skill-backend" },
  { label: "Fastify", section: "skills", target: "skill-backend" },
  { label: "REST APIs", section: "skills", target: "skill-backend" },
  { label: "PostgreSQL", section: "skills", target: "skill-database" },
  { label: "SQL", section: "skills", target: "skill-database" },
  { label: "Redis", section: "skills", target: "skill-database" },
  { label: "Prisma", section: "skills", target: "skill-database" },
  { label: "AWS", section: "skills", target: "skill-cloud" },
  { label: "Azure", section: "skills", target: "skill-cloud" },
  { label: "Docker", section: "skills", target: "skill-cloud" },
  { label: "GitHub Actions", section: "skills", target: "skill-cloud" },
  { label: "Azure DevOps", section: "skills", target: "skill-cloud" },
  { label: "Git", section: "skills", target: "skill-also" },
  { label: "AWS Bedrock", section: "skills", target: "skill-also" },
  { label: "Zod", section: "skills", target: "skill-also" },
  {
    label: "AI-Powered Resource Planning System",
    section: "projects",
    target: "project-ai-powered-resource-planning-system",
  },
  {
    label: "AI Product Data Enrichment Pipeline",
    section: "projects",
    target: "project-ai-product-data-enrichment-pipeline",
  },
  {
    label: "React",
    section: "projects",
    target: "project-ai-powered-resource-planning-system",
  },
  {
    label: "JavaScript",
    section: "projects",
    target: "project-ai-powered-resource-planning-system",
  },
  {
    label: "Node.js",
    section: "projects",
    target: "project-ai-powered-resource-planning-system",
  },
  {
    label: "Express",
    section: "projects",
    target: "project-ai-powered-resource-planning-system",
  },
  {
    label: "Gemini API",
    section: "projects",
    target: "project-ai-powered-resource-planning-system",
  },
  {
    label: "Zod",
    section: "projects",
    target: "project-ai-powered-resource-planning-system",
  },
  {
    label: "SQLite",
    section: "projects",
    target: "project-ai-powered-resource-planning-system",
  },
  {
    label: "TypeScript",
    section: "projects",
    target: "project-ai-product-data-enrichment-pipeline",
  },
  {
    label: "CSV",
    section: "projects",
    target: "project-ai-product-data-enrichment-pipeline",
  },
  {
    label: "VenueOps Lite",
    section: "projects",
    target: "project-venueops-lite",
  },
  {
    label: "LLM-Assisted Catalogue QA",
    section: "projects",
    target: "project-llm-assisted-catalogue-qa",
  },
  {
    label: "TradeFlow - Electrical Enquiry Intake",
    section: "projects",
    target: "project-tradeflow-electrical-enquiry-intake",
  },
  { label: "ccswap", section: "projects", target: "project-ccswap" },
  { label: "pocket-lab", section: "projects", target: "project-pocket-lab" },
  {
    label: "Expense Report Management System",
    section: "projects",
    target: "project-expense-report-management-system",
  },
  {
    label: "Invoice Approval Dashboard",
    section: "projects",
    target: "project-invoice-approval-dashboard",
  },
  { label: "NestJS", section: "projects", target: "project-venueops-lite" },
  { label: "Next.js", section: "projects", target: "project-venueops-lite" },
  { label: "PostgreSQL", section: "projects", target: "project-venueops-lite" },
  { label: "Prisma", section: "projects", target: "project-venueops-lite" },
  { label: "OpenRouter", section: "projects", target: "project-venueops-lite" },
  { label: "Docker", section: "projects", target: "project-venueops-lite" },
  {
    label: "Fastify",
    section: "projects",
    target: "project-llm-assisted-catalogue-qa",
  },
  {
    label: "n8n",
    section: "projects",
    target: "project-llm-assisted-catalogue-qa",
  },
  {
    label: "OpenAI-compatible API",
    section: "projects",
    target: "project-llm-assisted-catalogue-qa",
  },
  { label: "Go", section: "projects", target: "project-ccswap" },
  { label: "CLI", section: "projects", target: "project-ccswap" },
  { label: "Claude Code", section: "projects", target: "project-ccswap" },
  {
    label: "Tailwind CSS",
    section: "projects",
    target: "project-tradeflow-electrical-enquiry-intake",
  },
  {
    label: "Shadcn UI",
    section: "projects",
    target: "project-invoice-approval-dashboard",
  },
  {
    label: "Pencil.dev",
    section: "projects",
    target: "project-invoice-approval-dashboard",
  },
  { label: "Bash", section: "projects", target: "project-pocket-lab" },
  { label: "PowerShell", section: "projects", target: "project-pocket-lab" },
  { label: "Tailscale", section: "projects", target: "project-pocket-lab" },
  { label: "ntfy", section: "projects", target: "project-pocket-lab" },
  { label: "Telegram", section: "projects", target: "project-pocket-lab" },
  {
    label: "AI Engineer (Contractor)",
    section: "works",
    target: "work-ai-registrar",
  },
  { label: "AI Registrar", section: "works", target: "work-ai-registrar" },
  {
    label: "Software Engineer",
    section: "works",
    target: "work-jung-talents",
  },
  { label: "Jung Talents", section: "works", target: "work-jung-talents" },
];
