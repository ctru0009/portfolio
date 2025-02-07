import { motion } from "framer-motion";
import { WorkInterface } from "../../data/data";

const WorkCard = ({
  work,
  index,
}: {
  work: WorkInterface;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-gray-800/50 rounded-xl p-6 w-[350px] hover:transform hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-100">{work.title}</h3>
          <p className="text-gray-400">{work.company}</p>
          <p className="text-sm text-gray-500">{work.period}</p>
        </div>

        <div className="flex-grow">
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            {work.responsibilities.map((responsibility, idx) => (
              <li key={idx}>{responsibility}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {work.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;