import projectImage1 from "../assets/images/project1.png";
import projectImage2 from "../assets/images/project2.png";
import projectImage3 from "../assets/images/project3.png";
import projectImage4 from "../assets/images/project4.png";
import avatar from "../assets/images/avatar.jpg";

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
    "https://drive.google.com/file/d/1MEt0dJyai3xAXE5YcUtbwKkxIdVD3G3r/view",
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
    company: "Jung Talents",
    period: "Feb 2024 - Present",
    responsibilities: [
      "Optimized backend performance by migrating GreenBench's system from .NET 8 to .NET 9, improving API response times by 25% and reducing database calls by 50% with Redis caching.",
      "Enhanced front-end efficiency by resolving React re-rendering issues (React.memo, useCallback, useMemo), cutting UI lag by 40% across the platform.",
      "Built and deployed full-stack applications, including the PTE Master learning platform using TypeScript, React, Docker, and PostgreSQL, improving scalability and deployment consistency.",
    ],
    technologies: [
      "React",
      "TypeScript",
      ".NET",
      "PostgreSQL",
      "Docker",
      "Redis",
      "C#",
      "AWS",
      "Git",
      "Tailwind CSS",
    ],
  },
];

const ProjectsData = [
  {
    title: "Document Management System",
    description:
      "A document management system with user authentication, file uploads, and access control.",
    image: projectImage1,
    technologies: ["Typescript", "React", "Flask", "PosgreSQL", "TailwindCSS"],
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
      "PosgreSQL",
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
      "A simple Fizz Game that replaces numbers with specific words for multiples of numbers (e.g. 3 and 5 are replaced with Fizz and Buzz).",
    image: projectImage4,
    technologies: [
      "Typescript",
      "React",
      "ASP.NET",
      "SignalR",
      "PosgreSQL",
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
