import { FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiDotnet,
} from "react-icons/si";
import { PiFileSqlLight } from "react-icons/pi";
import SkillItem from "./SkillItem";
const Skills = () => {
  const skills = [
    { name: "React", icon: <FaReact className="text-4xl text-[#61DAFB]" /> },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-4xl text-[#3178C6]" />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-4xl text-[#F7DF1E]" />,
    },
    { name: "Node.js", icon: <FaNodeJs className="text-4xl text-[#339933]" /> },
    { name: "Python", icon: <FaPython className="text-4xl text-[#3776AB]" /> },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-4xl text-[#06B6D4]" />,
    },
    { name: "Git", icon: <FaGitAlt className="text-4xl text-[#F05032]" /> },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-4xl text-[#47A248]" />,
    },
    { name: "C# .NET", icon: <SiDotnet className="text-4xl text-[#502bd4]" /> },
    {
      name: "SQL",
      icon: <PiFileSqlLight className="text-4xl text-[#f29111]" />,
    },
  ];

  return (
    <div id="skills" className="section-dark py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-100 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are the technologies I work with and have experience in.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
