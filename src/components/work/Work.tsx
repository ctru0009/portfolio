import { WorkData } from "../../data/data";
import WorkCard from "../works/WorkCard";

const Work = () => {
  return (
    <>
      <div id="work" className="section-light py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Work Experience
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My professional journey and experience in software development.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-x-auto pb-8 hide-scrollbar">
              <div className="flex gap-6 min-w-max">
                {WorkData.map((work, index) => (
                  <WorkCard key={index} work={work} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
