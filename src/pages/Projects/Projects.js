import React, { useEffect, useState } from "react";
import ProgressBar from "../../components/Progressbar/progressbar";
import ProjectsList from "../../components/ProjectLayout/ProjectsList";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const Projects = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/projects/getAllProjects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]); // Refetch projects when token changes

  return (
    <div>
      <ProgressBar current={25} total={50} />
      <ProjectsList projects={projects} fetchProjects={fetchProjects} />
    </div>
  );
};

export default Projects;
