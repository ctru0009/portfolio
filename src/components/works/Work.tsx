import { WorkData } from "../../data/data";
import StepTitle from "../mac/StepTitle";
import WorkCard from "./WorkCard";

const Work = () => {
  return (
    <div id="works" className="px-[25px] py-6 min-[800px]:px-[30px]">
      <StepTitle number={3} label="Work" />

      <p className="mb-4 text-[12px] leading-[1.75]">
        Full-stack software engineering, production AI systems, cloud delivery
        and technical review.
      </p>

      <div className="flex flex-col gap-3.5">
        {WorkData.map((work, index) => (
          <WorkCard key={index} work={work} />
        ))}
      </div>
    </div>
  );
};

export default Work;
