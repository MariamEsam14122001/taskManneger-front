import React from "react";
import "./style.css";

const TodoItem = ({
  name,
  projectName,
  dueDate,
  time,
  priority,
  status,
  index,
}) => {
  // Function to format date in dd/mm/yy format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    return `${day}/${month}/${year}`; // Return formatted date
  };

  return (
    <div className="list-item-container">
      <div className="list-item">
        <time>{time}</time>
        <div className="number-hr-container">
          <p className="number">{index + 1}</p>
          <hr />
        </div>
        <div className="task">
          <h4 className="project-name">{projectName}</h4>
          <h4 className="title">{name}</h4>
          <p className="details">{formatDate(dueDate)}</p> 
          <div className="critical">{status}</div>
          <div className="progress">{priority}</div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;