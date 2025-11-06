import projectImage1 from "../assets/images/project1.webp";
import projectImage2 from "../assets/images/project2.webp";
import projectImage3 from "../assets/images/project3.webp";
import projectImage4 from "../assets/images/project4.webp";
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
    "https://drive.google.com/file/d/1TGV0oxRqULVMKm_lp5_CT4Te5xR0FnUi/view?usp=sharing",
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
    title: "Junior Software Engineer",
    company: "Jung Talents (Remote)",
    period: "February 2024 - January 2025 ",
    responsibilities: [
      "Participated in .NET 8 to .NET 9 migration, updating dependencies and testing components across the application, contributing to a 15% overall performance improvement.",
      "Optimized ASP.NET Core APIs under mentorship, implementing caching and refactoring endpoints that improved response times by 10%.",
      "Improved database query performance by 15% by writing efficient Entity Framework Core queries and applying LINQ best practices with guidance from senior developers.",
      "Configured Azure CI/CD pipelines, managed App Services and Functions, and troubleshooting deployment issues.",
      "Containerized applications using Docker and Docker Compose, creating consistent development environments and documenting setup procedures for the team.",
      "Contributed to Redis caching implementation, working with senior developers to identify cacheable data and implement strategies that reduced database queries by 20%.",
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
      "CI/CD",
    ],
  },
];

const ProjectsData = [
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
