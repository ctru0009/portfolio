import { ProjectInterface } from "../../data/data";
import MacDialog from "../mac/MacDialog";
import SquareButton from "../mac/SquareButton";
import SquareLink from "../mac/SquareLink";

interface ProjectPreviewProps {
  project: ProjectInterface;
  onClose: () => void;
}

const ProjectPreview = ({ project, onClose }: ProjectPreviewProps) => {
  return (
    <MacDialog
      title={`Preview — ${project.title}`}
      open
      onClose={onClose}
      className="min-[800px]:max-w-[860px]"
      footer={
        <>
          <SquareButton onClick={onClose}>Close</SquareButton>
          <SquareLink variant="dark" href={project.githubLink}>
            Open on GitHub ↗
          </SquareLink>
        </>
      }
    >
      <div className="border-2 border-ink shadow-hard-callout">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="block w-full"
          />
        ) : (
          <div className="mac-hatch aspect-[2.8/1] w-full" aria-hidden="true" />
        )}
      </div>

      <p className="mt-3 text-[11px] leading-[1.7]">{project.description}</p>
    </MacDialog>
  );
};

export default ProjectPreview;
