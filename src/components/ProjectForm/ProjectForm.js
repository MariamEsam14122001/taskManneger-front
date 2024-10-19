import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import "./TaskForm.css"; // Reuse the CSS for form styling

const ProjectForm = ({ onCancel }) => {
  const [projectName, setProjectName] = useState("");
  const [errors, setErrors] = useState({});
  const { token, user } = useAuth(); // Get the auth token and user info from AuthContext

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!projectName) {
      newErrors.projectName = "Project name is required.";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authorization
          "Content-Type": "application/json", // Ensure correct content type is set
        },
      };

      const data = {
        name: projectName, // Backend expects 'name'
      };

      const response = await axios.post(
        "http://localhost:5000/api/projects/add",
        data,
        config
      );

      alert(response.data.message); // Display success message
      setProjectName(""); // Reset form on successful submission
      onCancel(); // Close the form/modal if needed
    } catch (error) {
      console.error("Error adding project:", error.response || error.message);
      alert(
        error.response?.data?.message || "An error occurred while adding the project."
      );
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="header">
        <h1>Add Project</h1>
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
        />
        {errors.projectName && (
          <span className="error">{errors.projectName}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="save-btn">
          Add
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
