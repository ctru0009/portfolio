import { ProjectInterface } from "../../data/data";
import { linkClass } from "../mac/linkClass";
import TagChip from "../mac/TagChip";

interface ProjectCardProps {
  project: ProjectInterface;
  onPreview: () => void;
}

const ProjectCard = ({ project, onPreview }: ProjectCardProps) => {
  const hasLiveDemo = project.liveLink !== project.githubLink;

  return (
    <article
      data-project-id={project.id}
      className="relative flex flex-col border-2 border-ink bg-paper shadow-hard-sm hover:shadow-hard-callout"
    >
      <div className="mac-titlebar-stripes m-1 flex h-4 flex-shrink-0 items-center px-1">
        <span className="mx-auto truncate bg-paper px-1.5 py-px text-10">
          {project.title}
        </span>
      </div>

      {project.image ? (
        <div className="mx-2.5 mt-1.5 flex-shrink-0 border border-ink">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="block w-full"
            loading="lazy"
          />
        </div>
      ) : null}

      <p className="px-2.5 pt-2 text-11 text-muted">{project.summary}</p>

      <div className="flex flex-wrap gap-1 px-2.5 pt-2">
        {project.technologies.map((technology, index) => (
          <TagChip key={index}>{technology}</TagChip>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 px-2.5 pb-2.5 pt-2 text-10">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-10 inline-flex min-h-[44px] items-center ${linkClass}`}
        >
          GitHub ↗
        </a>
        {hasLiveDemo ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative z-10 inline-flex min-h-[44px] items-center ${linkClass}`}
          >
            Live ↗
          </a>
        ) : null}
        <span aria-hidden="true" className="underline underline-offset-[3px]">
          Preview…
        </span>
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
