import { useState } from "react";
import { ProjectsData, ProjectInterface } from "../../data/data";
import StepTitle from "../mac/StepTitle";
import ProjectCard from "./ProjectCard";
import ProjectPreview from "./ProjectPreview";

const Projects = () => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);

  return (
    <div id="projects" className="px-[25px] py-6 min-[800px]:px-[30px]">
      <StepTitle number={4} label="Projects" />

      <p className="mb-4 text-12">
        Public work that shows how I bound AI inside ordinary software.
      </p>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {ProjectsData.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onPreview={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject ? (
        <ProjectPreview
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </div>
  );
};

export default Projects;
