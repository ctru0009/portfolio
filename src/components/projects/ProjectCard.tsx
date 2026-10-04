import { ProjectInterface } from "../../data/data";
import { linkClass } from "../mac/linkClass";

interface ProjectCardProps {
  project: ProjectInterface;
  featured: boolean;
  imageSize?: { width: number; height: number };
  onDetails: () => void;
}

const ProjectCard = ({
  project,
  featured,
  imageSize,
  onDetails,
}: ProjectCardProps) => {
  const hasLiveDemo = project.liveLink !== project.githubLink;

  if (!featured) {
    return (
      <article className="relative px-2.5 py-3 hover:bg-chrome">
        <h4 className="text-13 font-normal">{project.title}</h4>

        <p className="mt-1 max-w-[90ch] text-12 text-muted">
          {project.summary}
        </p>

        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-11">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative z-10 inline-flex min-h-[44px] items-center ${linkClass}`}
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          {hasLiveDemo ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative z-10 inline-flex min-h-[44px] items-center ${linkClass}`}
            >
              Live demo <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          <span aria-hidden="true" className="underline underline-offset-[3px]">
            Details
          </span>
        </div>

        <button
          type="button"
          onClick={onDetails}
          aria-label={`Details - ${project.title}`}
          className="absolute inset-0 cursor-pointer"
        />
      </article>
    );
  }

  return (
    <article className="relative flex h-full flex-col border-2 border-ink bg-paper shadow-hard-sm hover:shadow-hard-callout">
      <div className="mac-titlebar-stripes m-1 flex h-4 flex-shrink-0 items-center px-1">
        <h4 className="mx-auto truncate bg-paper px-1.5 py-px text-10 font-normal">
          {project.title}
        </h4>
      </div>

      {project.image && imageSize ? (
        <div className="mx-2.5 mt-1.5 aspect-[2.8/1] flex-shrink-0 border border-ink">
          <img
            src={project.image}
            width={imageSize.width}
            height={imageSize.height}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover grayscale"
          />
        </div>
      ) : null}

      <p className="max-w-[70ch] px-2.5 pt-2 text-13">{project.summary}</p>

      <div className="mt-auto flex items-center justify-between gap-3 px-2.5 pb-2.5 pt-2 text-11">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-10 inline-flex min-h-[44px] items-center ${linkClass}`}
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
        {hasLiveDemo ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative z-10 inline-flex min-h-[44px] items-center ${linkClass}`}
          >
            Live demo <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <span aria-hidden="true" className="underline underline-offset-[3px]">
          Details
        </span>
      </div>

      <button
        type="button"
        onClick={onDetails}
        aria-label={`Details - ${project.title}`}
        className="absolute inset-0 cursor-pointer"
      />
    </article>
  );
};

export default ProjectCard;
