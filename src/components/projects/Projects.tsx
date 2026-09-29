import { useState } from "react";
import { ProjectsData, ProjectInterface } from "../../data/data";
import StepTitle from "../mac/StepTitle";
import ProjectCard from "./ProjectCard";
import CompactProject from "./CompactProject";
import ProjectPreview from "./ProjectPreview";

const Projects = () => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);
  const featuredProjects = ProjectsData.filter((project) => project.featured);
  const remainingProjects = ProjectsData.filter((project) => !project.featured);

  return (
    <div id="projects" className="px-[25px] py-6 min-[800px]:px-[30px]">
      <StepTitle number={4} label="Projects" />

      <p className="mb-4 max-w-prose text-13">
        Public work that shows how I bound AI inside ordinary software.
      </p>

      <section aria-label="Featured projects">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPreview={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      <section aria-label="More projects" className="mt-6">
        <h2 className="mb-1 text-16 font-bold">More projects</h2>
        {remainingProjects.map((project) => (
          <CompactProject
            key={project.id}
            project={project}
            onPreview={() => setSelectedProject(project)}
          />
        ))}
      </section>

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
