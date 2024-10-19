import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import "./TaskForm.css";

const TaskForm = ({ mode = "add", taskData = {}, onTaskSubmit, onCancel }) => {
  const [taskName, setTaskName] = useState(taskData.name || "");
  const [projectName, setProjectName] = useState(taskData.projectName || "");
  const [priority, setPriority] = useState(taskData.priority || "low");
  const [dueDate, setDueDate] = useState(taskData.dueDate || "");
  const [time, setDueTime] = useState(taskData.dueTime || "");
  const [status, setStatus] = useState(taskData.status || "to do");
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState({});
  const { token } = useAuth();

  // Fetch all projects for dropdown
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:5000/api/projects/getAllProjects",
          config
        );
        setProjects(response.data); // Assuming response.data is an array of projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [token]);

  // Handle form validation
  const validateForm = () => {
    const newErrors = {};
    if (!taskName) newErrors.taskName = "Task name is required";
    if (!projectName) newErrors.projectName = "Please select a project";
    if (!dueDate) newErrors.dueDate = "Please select a due date";
    if (!time) newErrors.dueTime = "Please select a due time"; // New validation for time

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTaskData = {
        name: taskName,
        projectName,
        priority,
        dueDate,
        time, // Add time to task data
        status,
        _id: taskData._id,
      };

      if (mode === "add") {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/tasks/add",
            newTaskData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Task added successfully!");
          if (onTaskSubmit) onTaskSubmit();
        } catch (error) {
          alert(
            "Error adding task: " +
              (error.response?.data?.message || error.message)
          );
        }
      } else if (mode === "edit") {
        try {
          const response = await axios.put(
            `http://localhost:5000/api/tasks/update/${taskData._id}`,
            newTaskData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Task updated successfully!");
          if (onTaskSubmit) onTaskSubmit();
        } catch (error) {
          alert(
            "Error updating task: " +
              (error.response?.data?.message || error.message)
          );
        }
      }
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="header">
        <h1>
          {mode === "add"
            ? "Add Task"
            : mode === "edit"
            ? "Edit Task"
            : "Task Details"}
        </h1>
        <button type="button" className="close-btn" onClick={onCancel}>
          &times;
        </button>
      </div>

      {/* Task Name */}
      <div className="form-group task-name">
        <label htmlFor="task-name">Name the Task</label>
        <input
          type="text"
          id="task-name"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={mode === "view"}
        />
        {errors.taskName && <span className="error">{errors.taskName}</span>}
      </div>

      {/* Project Name Dropdown */}
      <div className="form-group project-name">
        <label htmlFor="project-name">Project</label>
        <select
          id="project-name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          disabled={mode === "view"}
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
        {errors.projectName && (
          <span className="error">{errors.projectName}</span>
        )}
      </div>

      {/* Priority */}
      <div className="form-group priority">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={mode === "view"}
        >
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Due Date */}
      <div className="form-group due-date">
        <label htmlFor="due-date">Due Date:</label>
        <input
          type="date"
          id="due-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={mode === "view"}
        />
        {errors.dueDate && <span className="error">{errors.dueDate}</span>}
      </div>

      {/* Due Time */}
      <div className="form-group due-time">
        <label htmlFor="due-time">Time:</label>
        <input
          type="time"
          id="due-time"
          value={time}
          onChange={(e) => setDueTime(e.target.value)}
          disabled={mode === "view"}
        />
        {errors.dueTime && <span className="error">{errors.dueTime}</span>}
      </div>

      {/* Status */}
      <div className="form-group status">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={mode === "view"}
        >
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Form actions */}
      {mode !== "view" && (
        <div className="form-actions">
          <button type="submit" className="save-btn">
            {mode === "add" ? "Save Task" : "Update Task"}
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default TaskForm;
