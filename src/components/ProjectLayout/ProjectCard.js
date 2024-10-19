import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import "./ProjectCard.css";

export const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options); // 'en-GB' for dd/mm/yyyy format
};

const ProjectCard = ({
  id,
  projectLabel,
  fetchProjects, // Function to refresh project list after deletion
}) => {
  const { token } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasks, setTasks] = useState([]); // State to store tasks of the project
  const [tasksVisible, setTasksVisible] = useState(false); // State to toggle task visibility

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOptionClick = async (option) => {
    if (option === "delete") {
      await handleDelete(id);
    } else if (option === "display") {
      await fetchTaskData(id);
    }
    setMenuVisible(false);
  };

  const fetchTaskData = async (projectId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks/project/${projectLabel}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data); // Set tasks from response
      setTasksVisible(true); // Show tasks under the project
    } catch (error) {
      console.error(`Failed to fetch tasks for project ${projectId}:`, error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/delete/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Project ${projectId} deleted successfully`);
      fetchProjects(); // Refresh projects list after deletion
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="project-card">
      <div className="project-header">
        <span className="project-label">{projectLabel}</span>
        <div className="three-dots-menu" onClick={handleMenuToggle}>
          =
          {menuVisible && (
            <div className="menu-options">
              <div
                className="menu-option"
                onClick={() => handleOptionClick("delete")}
              >
                Delete
              </div>
              <div
                className="menu-option"
                onClick={() => handleOptionClick("display")}
              >
                Display Tasks
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display Tasks if available */}
      {tasksVisible && tasks.length > 0 && (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id}>
              <h4>{task.name}</h4>
              <p>{task.status}</p>
              <p>{task.priority}</p>
              <p>{formatDate(task.dueDate)}</p>
              <p>{task.time}</p>
            </div>
          ))}
        </div>
      )}
      <hr/>
    </div>
  );
};

export default ProjectCard;
