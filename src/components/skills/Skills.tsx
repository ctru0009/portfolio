import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaAws,
  FaFilter,
  FaRobot,
  FaMagic,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiDotnet,
  SiFlask,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiXdotorg,
} from "react-icons/si";
import { PiFileSqlLight } from "react-icons/pi";
import { TbBrandCSharp } from "react-icons/tb";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "database" | "tools" | "cloud";
}

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
      name: "Node.js",
      icon: <FaNodeJs className="text-3xl text-[#339933]" />,
      category: "backend",
    },
    {
      name: "Python",
      icon: <FaPython className="text-3xl text-[#3776AB]" />,
      category: "backend",
    },
    {
      name: "Flask",
      icon: <SiFlask className="text-3xl text-[#000000]" />,
      category: "backend",
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
      name: "PostgreSQL",
      icon: <SiPostgresql className="text-3xl text-[#336791]" />,
      category: "database",
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-3xl text-[#47A248]" />,
      category: "database",
    },
    {
      name: "Redis",
      icon: <SiRedis className="text-3xl text-[#DC382D]" />,
      category: "database",
    },
    {
      name: "SQL",
      icon: <PiFileSqlLight className="text-3xl text-[#f29111]" />,
      category: "database",
    },
    {
      name: "Docker",
      icon: <SiDocker className="text-3xl text-[#2496ED]" />,
      category: "tools",
    },
    {
      name: "Git",
      icon: <FaGitAlt className="text-3xl text-[#F05032]" />,
      category: "tools",
    },
    {
      name: "xUnit/NUnit",
      icon: <SiXdotorg className="text-3xl text-[#8B0000]" />,
      category: "tools",
    },
    {
      name: "AWS",
      icon: <FaAws className="text-3xl text-[#FF9900]" />,
      category: "cloud",
    },
    {
      name: "Claude Code",
      icon: <FaMagic className="text-3xl text-[#D97706]" />,
      category: "tools",
    },
    {
      name: "Agentic Engineering",
      icon: <FaRobot className="text-3xl text-[#8B5CF6]" />,
      category: "tools",
    },
    {
      name: "AI-Assisted Dev",
      icon: <FaRobot className="text-3xl text-[#10B981]" />,
      category: "tools",
    },
  ];

  const categories = [
    { id: "all", name: "All Skills", color: "bg-gray-600" },
    { id: "frontend", name: "Frontend", color: "bg-blue-600" },
    { id: "backend", name: "Backend", color: "bg-green-600" },
    { id: "database", name: "Database", color: "bg-purple-600" },
    { id: "tools", name: "Tools", color: "bg-orange-600" },
    { id: "cloud", name: "Cloud", color: "bg-cyan-600" },
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
            Here are the technologies I work with. Click on categories to filter
            skills.
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
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
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

                {/* Hover Details */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-center items-center text-center z-10"
                    >
                      <div className="mb-3">{skill.icon}</div>
                      <h4 className="text-white font-semibold">{skill.name}</h4>
                    </motion.div>
                  )}
                </AnimatePresence>
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
