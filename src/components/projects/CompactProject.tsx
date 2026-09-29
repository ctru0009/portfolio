import { ProjectInterface } from "../../data/data";
import { linkClass } from "../mac/linkClass";

interface CompactProjectProps {
  project: ProjectInterface;
  onPreview: () => void;
}

const CompactProject = ({ project, onPreview }: CompactProjectProps) => {
  const hasLiveDemo = project.liveLink !== project.githubLink;

  return (
    <article
      data-project-id={project.id}
      className="grid gap-x-4 border-b border-ink/20 py-3 min-[600px]:grid-cols-[minmax(0,1fr)_auto] min-[600px]:items-center"
    >
      <div>
        <h3 className="text-11 font-bold">{project.title}</h3>
        <p className="mt-1 text-11 text-muted">{project.summary}</p>
      </div>

      <ul className="mt-1 flex flex-wrap items-center gap-x-3 min-[600px]:mt-0">
        <li>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[44px] items-center ${linkClass}`}
          >
            GitHub ↗
          </a>
        </li>
        {hasLiveDemo ? (
          <li>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-[44px] items-center ${linkClass}`}
            >
              Live ↗
            </a>
          </li>
        ) : null}
        <li>
          <button
            type="button"
            onClick={onPreview}
            aria-label={`Preview ${project.title}`}
            className={`inline-flex min-h-[44px] items-center ${linkClass}`}
          >
            Preview…
          </button>
        </li>
      </ul>
    </article>
  );
};

export default CompactProject;
