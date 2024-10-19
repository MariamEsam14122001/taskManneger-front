import React, { useState } from "react";
import axios from "axios";
import TaskForm from "../TaskForm/TaskForm"; // Make sure this is correctly imported
import { useAuth } from "../../Context/AuthContext";
import "./TaskCard.css";

const TaskCard = ({
  id,
  projectLabel,
  taskTitle,
  description,
  priority,
  status,
  fetchAllTasks,
}) => {
  const { token } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskMode, setTaskMode] = useState("");
  const [task, setTask] = useState(null);

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOptionClick = async (option) => {
    if (option === "delete") {
      await handleDelete(id);
    } else if (option === "display" || option === "edit") {
      await fetchTaskData(id, option);
    }
    setMenuVisible(false);
  };

  const fetchTaskData = async (taskId, mode) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask(response.data); // This should now include _id
      setTaskMode(mode);
      setIsModalOpen(true);
    } catch (error) {
      console.error(`Failed to fetch task ${taskId}:`, error);
    }
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      if (taskMode === "edit") {
        await axios.put(
          `http://localhost:5000/api/tasks/update/${task.id}`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Task updated successfully");
      }
      setIsModalOpen(false);
      fetchAllTasks();
    } catch (error) {
      console.error("Failed to submit task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Task ${taskId} deleted successfully`);
      fetchAllTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <span className="project-label">{projectLabel}</span>
        <h3>{taskTitle}</h3>
        <div className="three-dots-menu" onClick={handleMenuToggle}>
          ⋮
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
                Display
              </div>
              <div
                className="menu-option"
                onClick={() => handleOptionClick("edit")}
              >
                Edit
              </div>
            </div>
          )}
        </div>
      </div>
      <p>{description}</p>
      <div className="task-footer">
        <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
      </div>

      {/* TaskForm Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TaskForm
              mode={taskMode} // "view" or "edit"
              taskData={task} // Pre-filled task data
              onTaskSubmit={handleTaskSubmit} // Pass the submit handler
              onCancel={() => setIsModalOpen(false)} // Close modal on cancel
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
