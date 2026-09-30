import { useState } from "react";
import { ProjectsData, ProjectInterface } from "../../data/data";
import StepTitle from "../mac/StepTitle";
import ProjectCard from "./ProjectCard";
import ProjectPreview from "./ProjectPreview";

// Intrinsic dimensions of each project image, read from the source files. They
// are reserved at render time so image loading cannot shift the layout;
// `data.ts` carries no image metadata, so the catalogue lives here.
const projectImageDimensions: Record<
  string,
  { width: number; height: number }
> = {
  "AI-Powered Resource Planning System": { width: 1870, height: 992 },
  "AI Product Data Enrichment Pipeline": { width: 2818, height: 976 },
  "VenueOps Lite": { width: 1600, height: 572 },
  "LLM-Assisted Catalogue QA": { width: 1600, height: 572 },
  "TradeFlow — Electrical Enquiry Intake": { width: 1600, height: 571 },
  ccswap: { width: 1260, height: 450 },
  "Expense Report Management System": { width: 1600, height: 572 },
  "Invoice Approval Dashboard": { width: 1600, height: 572 },
};

const featuredProjects = ProjectsData.filter((project) => project.featured);
const compactProjects = ProjectsData.filter((project) => !project.featured);

const Projects = () => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);

  return (
    <div id="projects" className="px-[25px] py-6 min-[800px]:px-[30px]">
      <StepTitle number={2} label="Projects" />

      <p className="mb-4 text-12">
        Public work that shows how I bound AI inside ordinary software.
      </p>

      <h3
        id="featured-projects-heading"
        className="mb-2 text-11 uppercase tracking-[1px] text-muted"
      >
        Featured
      </h3>
      <ul
        aria-labelledby="featured-projects-heading"
        className="grid grid-cols-1 gap-3.5 min-[1000px]:grid-cols-2"
      >
        {featuredProjects.map((project, index) => (
          <li
            key={project.title}
            className={index === 0 ? "min-[1000px]:col-span-2" : undefined}
          >
            <ProjectCard
              project={project}
              featured
              imageSize={projectImageDimensions[project.title]}
              onDetails={() => setSelectedProject(project)}
            />
          </li>
        ))}
      </ul>

      <h3
        id="other-projects-heading"
        className="mb-1 mt-6 text-11 uppercase tracking-[1px] text-muted"
      >
        Other projects
      </h3>
      <ul
        aria-labelledby="other-projects-heading"
        className="divide-y-2 divide-ink border-y-2 border-ink"
      >
        {compactProjects.map((project) => (
          <li key={project.title}>
            <ProjectCard
              project={project}
              featured={false}
              imageSize={projectImageDimensions[project.title]}
              onDetails={() => setSelectedProject(project)}
            />
          </li>
        ))}
      </ul>

      {selectedProject ? (
        <ProjectPreview
          project={selectedProject}
          imageSize={projectImageDimensions[selectedProject.title]}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </div>
  );
};

export default Projects;
