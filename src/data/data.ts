import projectImage1 from "../assets/images/project1.webp";
import projectImage2 from "../assets/images/project2.webp";
import projectImage3 from "../assets/images/project3.webp";
import projectImage4 from "../assets/images/project4.webp";
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
  coursework: string[];
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
    "https://drive.google.com/file/d/1tjrRalxRuRZdhDb-qW7Fltlp-IgISvQy/view?usp=sharing",
};

const AboutData = {
  education: [
    {
      degree: "Bachelor of Computer Science",
      school: "Monash University",
      period: "2021 - 2024",
      coursework: [
        "Fundamentals of algorithms",
        "Algorithms and data structures",
        "Object-oriented design and implementation",
        "Systems development",
        "Databases",
        "Programming paradigms",
        "Parallel computing",
        "Full stack development",
        "Advanced data structures and algorithms",
      ],
    },
  ],
};

const WorkData: WorkInterface[] = [
  {
    title: "Software Engineer",
    company: "Jung Talents (Remote)",
    period: "February 2024 - February 2026",
    responsibilities: [
      "Led the .NET 8 to .NET 9 upgrade across the core API surface. Updated dependencies, resolved breaking changes, and expanded test coverage.",
      "Refactored high-traffic ASP.NET Core endpoints with caching and query shaping. Improved average response time by 10% for the customer dashboard.",
      "Rewrote EF Core queries using compiled queries and proper indexing. Reduced database CPU by 15% on reporting workloads.",
      "Built Azure DevOps pipelines for build, test, and deploy to App Services and Functions.",
      "Containerized the full stack with Docker. Wrote setup docs that reduced new developer onboarding from a day to under an hour.",
      "Introduced Claude Code into daily workflow for test generation, code review, and documentation. Used it to scaffold xUnit tests, enforce coding standards, and propose refactors, which increased my feature throughput while keeping coverage above 80%.",
    ],
    technologies: [
      ".NET",
      "Docker",
      "Redis",
      "C#",
      "Azure",
      "Git",
      "Entity Framework Core",
      "LINQ",
      "CI/CD",
      "Claude Code",
    ],
  },
];

const ProjectsData = [
    {
    title: "AI-Powered Resource Planning System",
    description:
      "A hybrid architecture system where SQL and business rules handle deterministic planning while Gemini provides probabilistic risk scoring. Uses Zod schemas as a strict contract between AI output and the frontend, with graceful degradation and exponential backoff retry when the AI service is down.",
    image: projectImage5,
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Gemini API",
      "Zod",
      "PostgreSQL",
    ],
    githubLink: "https://github.com/ctru0009/resource-planning-system",
    liveLink: "https://github.com/ctru0009/resource-planning-system",
  },
  {
    title: "AI Product Data Enrichment Pipeline",
    description:
      "A batch pipeline that classifies product data with Gemini, protected by Zod validation on every response. Implements exponential backoff with jitter and incremental writes per batch to respect rate limits and avoid data loss. Designed for partial failure — bad rows are logged and skipped, pipeline always completes with valid output.",
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
    title: "Document Management System",
    description:
      "A document management system with user authentication, file uploads, and access control.",
    image: projectImage1,
    technologies: ["Typescript", "React", "Flask", "PostgreSQL", "TailwindCSS"],
    githubLink: "https://github.com/ctru0009/document-management",
    liveLink: "https://github.com/ctru0009/document-management",
  },
  {
    title: "Quiz App",
    description:
      "A quiz app with user authentication, quiz creation, quiz taking and quiz review.",
    image: projectImage2,
    technologies: [
      "Typescript",
      "React",
      "ASP.NET",
      "PostgreSQL",
      "TailwindCSS",
    ],
    githubLink: "https://github.com/ctru0009/QuizWebApp",
    liveLink: "https://github.com/ctru0009/QuizWebApp",
  },
  {
    title: "Event Management App",
    description:
      "An web application that used the MEAN stack to manage the events and event categories",
    image: projectImage3,
    technologies: [
      "Typescript",
      "Angular",
      "Node.js",
      "Express",
      "MongoDB",
      "Bootstrap",
    ],
    githubLink: "https://github.com/ctru0009/events-management-app",
    liveLink: "https://github.com/ctru0009/events-management-app",
  },
  {
    title: "Fizz Buzz Game",
    description:
      "A web-based FizzBuzz game with real-time updates, session management, and customizable game rules.",
    image: projectImage4,
    technologies: [
      "Typescript",
      "React",
      "ASP.NET",
      "SignalR",
      "Redis",
      "PostgreSQL",
      "TailwindCSS",
    ],
    githubLink: "https://github.com/ctru0009/FizzBuzz",
    liveLink: "https://github.com/ctru0009/FizzBuzz",
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
