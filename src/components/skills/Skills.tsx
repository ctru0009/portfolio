import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaAws,
  FaFilter,
  FaCode,
  FaServer,
  FaMicrosoft,
  FaMountain,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiDotnet,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiFastify,
  SiPrisma,
  SiGithubactions,
  SiAzuredevops,
} from "react-icons/si";
import { PiFileSqlLight, PiShieldCheck } from "react-icons/pi";
import { TbBrandCSharp } from "react-icons/tb";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "database" | "cloud" | "also";
}

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const skills: Skill[] = [
    {
      name: "React",
      icon: <FaReact className="text-3xl text-[#61DAFB]" />,
      category: "frontend",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-3xl text-[#3178C6]" />,
      category: "frontend",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-3xl text-[#F7DF1E]" />,
      category: "frontend",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-3xl text-[#06B6D4]" />,
      category: "frontend",
    },
    {
      name: "C#",
      icon: <TbBrandCSharp className="text-3xl text-[#9B4993]" />,
      category: "backend",
    },
    {
      name: ".NET",
      icon: <SiDotnet className="text-3xl text-[#502bd4]" />,
      category: "backend",
    },
    {
      name: "ASP.NET Core",
      icon: <FaCode className="text-3xl text-[#E74C3C]" />,
      category: "backend",
    },
    {
      name: "Node.js",
      icon: <FaNodeJs className="text-3xl text-[#339933]" />,
      category: "backend",
    },
    {
      name: "Fastify",
      icon: <SiFastify className="text-3xl text-[#14B8A6]" />,
      category: "backend",
    },
    {
      name: "REST APIs",
      icon: <FaServer className="text-3xl text-[#F97316]" />,
      category: "backend",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="text-3xl text-[#336791]" />,
      category: "database",
    },
    {
      name: "SQL",
      icon: <PiFileSqlLight className="text-3xl text-[#f29111]" />,
      category: "database",
    },
    {
      name: "Redis",
      icon: <SiRedis className="text-3xl text-[#DC382D]" />,
      category: "database",
    },
    {
      name: "Prisma",
      icon: <SiPrisma className="text-3xl text-[#4F46E5]" />,
      category: "database",
    },
    {
      name: "AWS",
      icon: <FaAws className="text-3xl text-[#FF9900]" />,
      category: "cloud",
    },
    {
      name: "Azure",
      icon: <FaMicrosoft className="text-3xl text-[#0078D4]" />,
      category: "cloud",
    },
    {
      name: "Docker",
      icon: <SiDocker className="text-3xl text-[#2496ED]" />,
      category: "cloud",
    },
    {
      name: "GitHub Actions",
      icon: <SiGithubactions className="text-3xl text-[#6E40C9]" />,
      category: "cloud",
    },
    {
      name: "Azure DevOps",
      icon: <SiAzuredevops className="text-3xl text-[#2563EB]" />,
      category: "cloud",
    },
    {
      name: "Git",
      icon: <FaGitAlt className="text-3xl text-[#F05032]" />,
      category: "also",
    },
    {
      name: "AWS Bedrock",
      icon: <FaMountain className="text-3xl text-[#6B7280]" />,
      category: "also",
    },
    {
      name: "Zod",
      icon: <PiShieldCheck className="text-3xl text-[#16A34A]" />,
      category: "also",
    },
  ];

  const categories = [
    { id: "all", name: "All Skills", color: "bg-gray-600" },
    { id: "frontend", name: "Frontend", color: "bg-blue-600" },
    { id: "backend", name: "Backend", color: "bg-green-600" },
    { id: "database", name: "Database", color: "bg-purple-600" },
    { id: "cloud", name: "Cloud", color: "bg-cyan-600" },
    { id: "also", name: "Also", color: "bg-orange-600" },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <div id="skills" className="section-dark py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-100 mb-4">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies I use in professional work across backend, full-stack,
            cloud and applied AI.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-white text-gray-950 shadow-lg shadow-white/10 scale-105"
                  : "bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 border border-white/5 hover:border-white/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.03,
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 h-full relative overflow-hidden">
                {/* Ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Skill Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:bg-gray-700/50 transition-colors duration-300 border border-white/5">
                      {skill.icon}
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-gray-200 font-medium text-center tracking-wide">
                    {skill.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-white/10">
            <FaFilter className="text-gray-400" />
            <span className="text-gray-300 text-sm">
              Showing {filteredSkills.length} of {skills.length} skills
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;