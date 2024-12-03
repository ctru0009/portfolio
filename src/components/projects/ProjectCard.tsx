import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ProjectInterface } from "../../data/data";
import ProjectDetails from "./ProjectDetails";
const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectInterface;
  index: number;
}) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <FaExternalLinkAlt className="text-2xl" />
          </a>
        </div>
      </div>

      <ProjectDetails
        title={project.title}
        description={project.description}
        technologies={project.technologies}
      />
    </motion.div>
  );
};

export default ProjectCard;
