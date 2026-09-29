import { ProjectInterface } from "../../data/data";
import TagChip from "../mac/TagChip";

interface ProjectCardProps {
  project: ProjectInterface;
  onPreview: () => void;
}

const hatchedClass =
  "aspect-[2.8/1] w-full [background-image:repeating-conic-gradient(#ececec_0%_25%,#fbfbfb_0%_50%)] [background-size:8px_8px]";

const linkClass =
  "underline underline-offset-[3px] hover:bg-ink hover:text-paper hover:decoration-paper";

const ProjectCard = ({ project, onPreview }: ProjectCardProps) => {
  const hasLiveDemo = project.liveLink !== project.githubLink;

  return (
    <article className="relative flex flex-col border-2 border-ink bg-paper shadow-hard-callout hover:shadow-hard">
      <div className="mac-titlebar-stripes m-1 flex h-4 flex-shrink-0 items-center px-1">
        <span className="mx-auto truncate bg-paper px-1.5 py-px text-[9px]">
          {project.title}
        </span>
      </div>

      <div className="mx-2.5 mt-1.5 flex-shrink-0 border border-ink">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="block w-full"
            loading="lazy"
          />
        ) : (
          <div className={hatchedClass} aria-hidden="true" />
        )}
      </div>

      <h3 className="px-2.5 pt-2 text-[11px] font-normal">
        {project.title}
      </h3>

      <p className="line-clamp-3 px-2.5 pt-1 text-[10px] leading-[1.6] text-muted">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 px-2.5 pt-2">
        {project.technologies.map((technology, index) => (
          <TagChip key={index}>{technology}</TagChip>
        ))}
      </div>

      <div className="mt-auto flex gap-3 px-2.5 pb-2.5 pt-2 text-[10px]">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-10 ${linkClass}`}
        >
          GitHub ↗
        </a>
        {hasLiveDemo ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative z-10 ${linkClass}`}
          >
            Live ↗
          </a>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onPreview}
        aria-label={`Preview ${project.title}`}
        className="absolute inset-0 cursor-pointer"
      />
    </article>
  );
};

export default ProjectCard;
