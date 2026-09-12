import { WorkData } from "../../data/data";
import WorkCard from "./WorkCard";
import { motion } from "framer-motion";

const Work = () => {
  return (
    <div id="works" className="section-light py-20 px-4 sm:px-6">
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
              Work Experience
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Full-stack software engineering, production AI systems, cloud
            delivery and technical review.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="overflow-x-auto pb-8 hide-scrollbar">
            <div className="flex justify-center gap-6 min-w-max">
              {WorkData.map((work, index) => (
                <WorkCard key={index} work={work} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Work;
