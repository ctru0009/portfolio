import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPlay, FaTimes } from "react-icons/fa";
import { ProjectInterface } from "../../data/data";

interface ProjectCardProps {
  project: ProjectInterface;
  index: number;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const isLiveDemo = project.liveLink !== project.githubLink;

  return (
    <>
      <div
        className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative group h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80" />

          {/* Interactive overlay */}
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              onClick={(e) => e.stopPropagation()}
              title="View Source Code"
            >
              <FaGithub className="text-xl text-white" />
            </a>

            {isLiveDemo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPreview(true);
                }}
                className="p-3 bg-blue-600/80 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                title="Live Preview"
              >
                <FaPlay className="text-xl text-white" />
              </button>
            )}

            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              onClick={(e) => e.stopPropagation()}
              title="Open in New Tab"
            >
              <FaExternalLinkAlt className="text-xl text-white" />
            </a>
          </div>

          {/* Technology badges overlay */}
          <div className="absolute top-2 right-2 flex flex-wrap gap-1 max-w-[60%]">
            {project.technologies.slice(0, 2).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 2 && (
              <span className="bg-gray-600/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                +{project.technologies.length - 2}
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-100 mb-2 flex items-center gap-2">
            {project.title}
            {isLiveDemo && (
              <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-600/50">
                Live
              </span>
            )}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md text-sm hover:bg-blue-600/50 hover:text-white transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-gray-100">{project.title} - Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-400" />
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <FaPlay className="text-4xl text-blue-500 mb-4 mx-auto" />
                    <p className="text-gray-400 mb-4">Live preview would open here</p>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaExternalLinkAlt />
                      Open Live Demo
                    </a>
                  </div>
                </div>

                <div className="text-gray-300">
                  <p>{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;