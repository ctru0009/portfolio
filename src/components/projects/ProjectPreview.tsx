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
      {project.image ? (
        <div className="border-2 border-ink shadow-hard-callout">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="block w-full"
          />
        </div>
      ) : null}

      <p className={`${project.image ? "mt-3" : ""} text-11`}>
        {project.description}
      </p>
    </MacDialog>
  );
};

export default ProjectPreview;
