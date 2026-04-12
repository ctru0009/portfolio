import { motion } from "framer-motion";
import { WorkInterface } from "../../data/data";

const WorkCard = ({ work, index }: { work: WorkInterface; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 w-[380px] border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
    >
      <div className="flex flex-col h-full">
        <div className="mb-6 pb-6 border-b border-white/5">
          <h3 className="text-2xl font-medium text-white mb-2">{work.title}</h3>
          <p className="text-gray-400 text-lg mb-1">{work.company}</p>
          <p className="text-sm text-gray-500 tracking-wide uppercase">
            {work.period}
          </p>
        </div>

        <div className="flex-grow mb-6">
          <ul className="space-y-3">
            {work.responsibilities.map((responsibility, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-gray-400 leading-relaxed"
              >
                <span className="text-white/20 mt-1.5">•</span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {work.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-sm bg-gray-800/50 text-gray-300 rounded-lg border border-white/5 font-normal tracking-wide hover:bg-gray-700/50 hover:text-white transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
