import { FC } from "react";

interface ProjectDetailsProps {
  title: string;
  description: string;
  technologies: string[];
}

const ProjectDetails: FC<ProjectDetailsProps> = ({
  title,
  description,
  technologies,
}) => (
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="bg-gray-700 text-gray-300 px-2 py-1 rounded"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

export default ProjectDetails;
