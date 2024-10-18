import React from "react";
import { FaTasks, FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import './TaskStats.css';

const TaskStats = () => {
const stats = {
todo: 5,
inProgress: 3,
completed: 7,
late: 2
};

return (
<div className="task-stats-container">
    <div className="card todo">
    <div className="card-header">
        <FaTasks className="icon1" />
        <h3>To Do</h3>
    </div>
    <p>{stats.todo} tasks</p>
    </div>
    <div className="card in-progress">
    <div className="card-header">
        <FaSpinner className="icon2" />
        <h3>In Progress</h3>
    </div>
    <p>{stats.inProgress} tasks</p>
    </div>
    <div className="card completed">
    <div className="card-header">
        <FaCheckCircle className="icon3" />
        <h3>Done</h3>
    </div>
    <p>{stats.completed} tasks</p>
    </div>
    <div className="card late">
    <div className="card-header">
        <FaExclamationTriangle className="icon-late" />
        <h3>Late</h3>
    </div>
    <p>{stats.late} tasks</p>
    </div>
</div>
);
};

export default TaskStats;
