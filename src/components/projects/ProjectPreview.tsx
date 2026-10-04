import { ProjectInterface } from "../../data/data";
import MacDialog from "../mac/MacDialog";
import SquareButton from "../mac/SquareButton";
import SquareLink from "../mac/SquareLink";
import TagChip from "../mac/TagChip";

interface ProjectPreviewProps {
  project: ProjectInterface;
  imageSize?: { width: number; height: number };
  onClose: () => void;
}

const ProjectPreview = ({
  project,
  imageSize,
  onClose,
}: ProjectPreviewProps) => {
  const hasLiveDemo = project.liveLink !== project.githubLink;

  return (
    <MacDialog
      title={`Details — ${project.title}`}
      open
      onClose={onClose}
      className="min-[800px]:max-w-[720px]"
      footer={
        <>
          <SquareButton onClick={onClose}>Close</SquareButton>
          {hasLiveDemo ? (
            <SquareLink href={project.liveLink}>
              Live demo <span aria-hidden="true">↗</span>
            </SquareLink>
          ) : null}
          <SquareLink variant="dark" href={project.githubLink}>
            GitHub <span aria-hidden="true">↗</span>
          </SquareLink>
        </>
      }
    >
      {project.image && imageSize ? (
        <div className="border-2 border-ink shadow-hard-callout">
          <img
            src={project.image}
            width={imageSize.width}
            height={imageSize.height}
            alt={`Screenshot of ${project.title}`}
            className="block h-auto w-full"
          />
        </div>
      ) : null}

      <p className="mt-3 max-w-[80ch] text-11">{project.description}</p>

      <ul aria-label="Technologies" className="mt-2.5 flex flex-wrap gap-1">
        {project.technologies.map((technology) => (
          <li key={technology}>
            <TagChip>{technology}</TagChip>
          </li>
        ))}
      </ul>
    </MacDialog>
  );
};

export default ProjectPreview;
