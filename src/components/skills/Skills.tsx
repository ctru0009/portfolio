import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaAws, FaFilter } from "react-icons/fa";
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
    { name: "React", icon: <FaReact className="text-3xl text-[#61DAFB]" />, category: "frontend" },
    { name: "TypeScript", icon: <SiTypescript className="text-3xl text-[#3178C6]" />, category: "frontend" },
    { name: "JavaScript", icon: <SiJavascript className="text-3xl text-[#F7DF1E]" />, category: "frontend" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-3xl text-[#06B6D4]" />, category: "frontend" },
    { name: "Node.js", icon: <FaNodeJs className="text-3xl text-[#339933]" />, category: "backend" },
    { name: "Python", icon: <FaPython className="text-3xl text-[#3776AB]" />, category: "backend" },
    { name: "Flask", icon: <SiFlask className="text-3xl text-[#000000]" />, category: "backend" },
    { name: "C#", icon: <TbBrandCSharp className="text-3xl text-[#9B4993]" />, category: "backend" },
    { name: ".NET", icon: <SiDotnet className="text-3xl text-[#502bd4]" />, category: "backend" },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-3xl text-[#336791]" />, category: "database" },
    { name: "MongoDB", icon: <SiMongodb className="text-3xl text-[#47A248]" />, category: "database" },
    { name: "Redis", icon: <SiRedis className="text-3xl text-[#DC382D]" />, category: "database" },
    { name: "SQL", icon: <PiFileSqlLight className="text-3xl text-[#f29111]" />, category: "database" },
    { name: "Docker", icon: <SiDocker className="text-3xl text-[#2496ED]" />, category: "tools" },
    { name: "Git", icon: <FaGitAlt className="text-3xl text-[#F05032]" />, category: "tools" },
    { name: "xUnit/NUnit", icon: <SiXdotorg className="text-3xl text-[#8B0000]" />, category: "tools" },
    { name: "AWS", icon: <FaAws className="text-3xl text-[#FF9900]" />, category: "cloud" },
  ];

  const categories = [
    { id: "all", name: "All Skills", color: "bg-gray-600" },
    { id: "frontend", name: "Frontend", color: "bg-blue-600" },
    { id: "backend", name: "Backend", color: "bg-green-600" },
    { id: "database", name: "Database", color: "bg-purple-600" },
    { id: "tools", name: "Tools", color: "bg-orange-600" },
    { id: "cloud", name: "Cloud", color: "bg-cyan-600" },
  ];

  const filteredSkills = selectedCategory === "all"
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  
  return (
    <div id="skills" className="section-dark py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-100 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are the technologies I work with and have experience in. Click on categories to filter skills.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg transform scale-105`
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="relative group"
            >
              <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 h-full">
                {/* Skill Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-blue-600/20 transition-colors duration-300">
                    {skill.icon}
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="text-gray-100 font-semibold text-center">{skill.name}</h3>

                {/* Hover Details */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 flex flex-col justify-center items-center text-center z-10"
                    >
                      <div className="mb-3">
                        {skill.icon}
                      </div>
                      <h4 className="text-white font-semibold">{skill.name}</h4>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-full border border-blue-600/50">
            <FaFilter className="text-blue-400" />
            <span className="text-blue-300 text-sm">
              Showing {filteredSkills.length} of {skills.length} skills
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
