import React from 'react';
import './TaskForm.css'; // Import the CSS file

const TaskForm = () => {
return (
    <div className="container">
        <div className="form-container">
            <form className="task-form">
                <div className="header">
                    <h1>Add Task</h1>
                    <span className="date">Today 02/02/2022</span>
                    <button type="button" className="close-btn">&times;</button>
                </div>

                <div className="form-group task-name">
                    <label htmlFor="task-name">Name the Task</label>
                    <input type="text" id="task-name" placeholder="Task name" />
                </div>

                <div className="form-group">
                    <label htmlFor="project-name">Choose Project</label>
                    <select id="project-name" name="project-name">
                    <option>Project Name</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Task Priority</label>
                    <select id="priority" name="priority">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Low</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="due-date">Due Date/Time</label>
                    <input type="date" id="due-date" name="due-date" />
                    <div className="time-inputs">
                        <input type="time" id="start-time" name="start-time" defaultValue="11:00" />
                        <span>-</span>
                        <input type="time" id="end-time" name="end-time" defaultValue="13:00" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="notifications">Activate Notifications</label>
                    <label className="switch">
                    <input type="checkbox" id="notifications" />
                    <span className="slider round"></span>
                    </label>
                    <span className="notification-info">Task reminder will be sent to you</span>
                </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
