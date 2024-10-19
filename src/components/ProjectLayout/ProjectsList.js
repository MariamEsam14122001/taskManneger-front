import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsList = ({ projects, fetchProjects }) => {
  return (
    <div className="column">
      <h2>Projects</h2>
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          projectLabel={project.name} // Assuming 'name' is the label for the project
          fetchProjects={fetchProjects} // Pass the fetch function to ProjectCard
        />
      ))}
    </div>
  );
};

export default ProjectsList;
