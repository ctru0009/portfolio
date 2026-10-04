import { WorkInterface } from "../../data/data";
import TagChip from "../mac/TagChip";

interface WorkCardProps {
  work: WorkInterface;
}

const WorkCard = ({ work }: WorkCardProps) => {
  return (
    <article className="border-2 border-ink">
      <div className="flex flex-col gap-0.5 border-b border-ink bg-chrome px-2.5 py-2 text-11 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:gap-2.5">
        <span>
          {work.title} - {work.company}
        </span>
        <span className="whitespace-nowrap tabular-nums">{work.period}</span>
      </div>

      <p className="px-2.5 pt-1.5 text-10 text-muted">{work.location}</p>

      <ul className="mb-2 mt-1.5 max-w-[70ch] list-disc space-y-1 pl-[26px] pr-2.5 text-12">
        {work.responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1 px-2.5 pb-2.5">
        {work.technologies.map((technology, index) => (
          <TagChip key={index}>{technology}</TagChip>
        ))}
      </div>
    </article>
  );
};

export default WorkCard;
