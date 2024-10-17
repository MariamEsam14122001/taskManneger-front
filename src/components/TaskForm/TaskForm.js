import React, { useState } from 'react';
import './TaskForm.css'; // Import the CSS file

const TaskForm = () => {
  // State for form visibility
    const [isVisible, setIsVisible] = useState(true);

  // State for form inputs
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [projectName, setProjectName] = useState('');
    const [priority, setPriority] = useState('Critical');
    const [dueDate, setDueDate] = useState('');
    const [startTime, setStartTime] = useState('11:00');
    const [endTime, setEndTime] = useState('13:00');
    const [notifications, setNotifications] = useState(false);
    const [errors, setErrors] = useState({});

  // Validate inputs before form submission
    const validateForm = () => {
    const newErrors = {};

    if (!taskName) newErrors.taskName = 'Task name is required';
    if (!taskDescription) newErrors.taskDescription = 'Task description is required';
    if (!projectName) newErrors.projectName = 'Please select a project';
    if (!dueDate) newErrors.dueDate = 'Please select a due date';
    if (startTime >= endTime) newErrors.time = 'End time must be later than start time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

  // Handle form submission
    const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert('Task saved successfully!');
    }
    };

  // Handle close button click
    const handleClose = () => {
    setIsVisible(false); // Hide the form
    };

  // Return nothing if the form is not visible
    if (!isVisible) return null;
    return (
    <form className="task-form" onSubmit={handleSubmit}>
        <div className="header">
        <h1>Add Task</h1>
        <span className="date">Today 02/02/2022</span>
        <button type="button" className="close-btn" onClick={handleClose}>&times;</button>
        </div>

        <div className="form-group task-name">
        <label htmlFor="task-name">Name the Task</label>
        <input
            type="text"
            id="task-name"
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
        />
        {errors.taskName && <span className="error">{errors.taskName}</span>}
        </div>

        <div className="form-group task-description">
        <label htmlFor="task-description">Describe the Task</label>
        <input
            type="text"
            id="task-description"
            placeholder="Task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
        />
        {errors.taskDescription && <span className="error">{errors.taskDescription}</span>}
        </div>

        <div className="form-group">
        <label htmlFor="project-name">Choose Project</label>
        <select
            id="project-name"
            name="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
        >
            <option value="">Select Project</option>
            <option>Project Alpha</option>
            <option>Project Beta</option>
        </select>
        {errors.projectName && <span className="error">{errors.projectName}</span>}
        </div>

        <div className="form-group">
        <label htmlFor="priority">Task Priority</label>
        <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
        >
            <option>Critical</option>
            <option>High</option>
            <option>Low</option>
        </select>
        </div>

        <div className="form-group">
        <label htmlFor="due-date">Due Date/Time</label>
        <input
            type="date"
            id="due-date"
            name="due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        <div className="time-inputs">
            <input
            type="time"
            id="start-time"
            name="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            />
            <span>-</span>
            <input
            type="time"
            id="end-time"
            name="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            />
        </div>
        {errors.time && <span className="error">{errors.time}</span>}
        </div>

        <div className="form-group">
        <label htmlFor="notifications">Activate Notifications</label>
        <label className="switch">
            <input
            type="checkbox"
            id="notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            />
            <span className="slider round"></span>
        </label>
        <span className="notification-info">Task reminder will be sent to you</span>
        </div>

        <div className="form-actions">
        <button type="submit" className="save-btn">Save</button>
        <button type="button" className="cancel-btn">Cancel</button>
        </div>
    </form>
    );
};

export default TaskForm;
