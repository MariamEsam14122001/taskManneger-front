// TaskColumn.js
import React from "react";
import TaskCard from "./TaskCard";
import "./TaskCard.css"; // External CSS file

export const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options); // 'en-GB' for dd/mm/yyyy format
};

const TaskColumn = ({ title, taskCount, tasks, fetchAllTasks }) => {
  return (
    <div className="column">
      <h2>
        {title} <span className="task-count">{taskCount}</span>
      </h2>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          id={task._id}
          projectLabel={task.projectName}
          taskTitle={task.name}
          description={`Due on: ${formatDate(task.dueDate)}, Time: ${task.time}`}
          priority={task.priority}
          status={task.status}
          fetchAllTasks={fetchAllTasks} // Pass fetchAllTasks to update task list after deletion or editing
        />
      ))}
    </div>
  );
};

export default TaskColumn;
