import projectImage1 from "../assets/images/project1.png";
import projectImage2 from "../assets/images/project2.png";
import projectImage3 from "../assets/images/project3.png";

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


const HeroData = {
  avatarURL: "https://i.pravatar.cc/300",
  name: "Cong Chuong Truong",
  title: "Fresh Software Engineer",
  location: "Melbourne, Australia",
  email: "truongcongchuong123@gmail.com",
  linkedin: "https://www.linkedin.com/in/congchuongtruong/",
  github: "https://github.com/ctru0009",
  resume: "",
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

const ProjectsData= [
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
];
export { HeroData, AboutData, ProjectsData};
export type { HeroDataInterface, AboutDataInterface, ProjectInterface, EducationInterface };
