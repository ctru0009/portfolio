
import { ProjectsData } from "../../data/data"; 
import ProjectCard from "./ProjectCard";
const Projects = () => {
  const projects = ProjectsData;

  return (
    <div id="projects" className="section-light py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-100 mb-4">Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            ProjectCard({ project, index })
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects