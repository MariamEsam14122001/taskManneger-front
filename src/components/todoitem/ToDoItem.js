import React from "react";
import "./style.css";

const TodoItem = ({ time, number, projectName, title, details, critical, progress }) => (
    <div className="list-item-container">
      <div className="list-item">
        <time>{time}</time>
        <div className="number-hr-container">
          <p className="number">{number}</p>
          <hr />
        </div>
        <div className="task">
          <h4 className="project-name">{projectName}</h4>
          <h4 className="title">{title}</h4>
          <p className="details">{details}</p>
          <div className="critical">{critical}</div>
          <div className="progress">{progress}</div>
        </div>
      </div>
    </div>
  );

  export default TodoItem;