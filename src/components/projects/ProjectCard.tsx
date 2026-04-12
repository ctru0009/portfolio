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
      <article
        className="group relative bg-gray-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black/50 focus:outline-none focus:ring-2 focus:ring-white/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="article"
        aria-label={`Project: ${project.title}`}
      >
        <div className="relative group h-56 overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

          {/* Interactive overlay */}
          <div
            className={`absolute inset-0 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/10"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <FaGithub className="text-xl text-white" />
            </a>

            {isLiveDemo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPreview(true);
                }}
                className="p-3 bg-white/10 rounded-full hover:bg-white/15 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                aria-label={`View live preview of ${project.title}`}
              >
                <FaPlay className="text-xl text-white" />
              </button>
            )}

            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/10"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open live demo of ${project.title} in new tab`}
            >
              <FaExternalLinkAlt className="text-xl text-white" />
            </a>
          </div>

          {/* Technology badges overlay */}
          <div className="absolute top-3 right-3 flex flex-wrap gap-1 max-w-[60%]">
            {project.technologies.slice(0, 2).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm border border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 2 && (
              <span className="bg-gray-700/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
                +{project.technologies.length - 2}
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
            {project.title}
            {isLiveDemo && (
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-full border border-emerald-500/20">
                Live
              </span>
            )}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-md border border-white/5 text-sm hover:bg-gray-700/50 hover:text-white transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.title}`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="document"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3
                  id={`modal-title-${project.title}`}
                  className="text-xl font-semibold text-gray-100"
                >
                  {project.title} - Preview
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close preview modal"
                >
                  <FaTimes className="text-gray-400" />
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <FaPlay className="text-4xl text-blue-500 mb-4 mx-auto" />
                    <p className="text-gray-400 mb-4">
                      Live preview would open here
                    </p>
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
