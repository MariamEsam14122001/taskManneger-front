import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import "./TaskForm.css";

const TaskForm = ({ mode = "add", taskData = {}, onTaskSubmit, onCancel }) => {
  const [taskName, setTaskName] = useState(taskData.name || "");
  const [projectName, setProjectName] = useState(taskData.projectName || "");
  const [priority, setPriority] = useState(taskData.priority || "low"); // Default priority
  const [dueDate, setDueDate] = useState(taskData.dueDate || "");
  const [status, setStatus] = useState(taskData.status || "to do"); // Default status
  const [errors, setErrors] = useState({});
  const { token } = useAuth();

  // Handle form validation
  const validateForm = () => {
    const newErrors = {};
    if (!taskName) newErrors.taskName = "Task name is required";
    if (!projectName) newErrors.projectName = "Please select a project";
    if (!dueDate) newErrors.dueDate = "Please select a due date";

    const validPriorities = ["critical", "low", "high"];
    if (!validPriorities.includes(priority))
      newErrors.priority = "Invalid priority";

    const validStatuses = ["in progress", "done", "to do"];
    if (!validStatuses.includes(status)) newErrors.status = "Invalid status";

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
        status, // Make sure to include status
        _id: taskData._id, // Use taskData._id for update
      };

      if (mode === "add") {
        // Add task
        try {
          const response = await axios.post(
            "http://localhost:5000/api/tasks/add",
            newTaskData, // Use newTaskData instead of taskData
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Task added successfully!");
          console.log("Response:", response.data);
          if (onTaskSubmit) onTaskSubmit();
        } catch (error) {
          console.error(
            "Error adding task:",
            error.response?.data || error.message
          );
          alert(
            "Error adding task: " +
              (error.response?.data?.message || error.message)
          );
        }
      } else if (mode === "edit") {
        // Update task
        try {
          const response = await axios.put(
            `http://localhost:5000/api/tasks/update/${taskData._id}`, // Use taskData._id for update
            newTaskData, // Use newTaskData instead of taskData
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Task updated successfully!");
          console.log("Response:", response.data);
          if (onTaskSubmit) onTaskSubmit();
        } catch (error) {
          console.error(
            "Error updating task:",
            error.response?.data || error.message
          );
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

      <div className="form-group task-name">
        <label htmlFor="task-name">Name the Task</label>
        <input
          type="text"
          id="task-name"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={mode === "view"} // Disable input if view mode
        />
        {errors.taskName && <span className="error">{errors.taskName}</span>}
      </div>

      {/* Project Name */}
      <div className="form-group project-name">
        <label htmlFor="project-name">Project</label>
        <input
          type="text"
          id="project-name"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          disabled={mode === "view"}
        />
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

      {/* Status */}
      <div className="form-group status">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={mode === "view"}
        >
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
          <option value="to do">To Do</option>
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
