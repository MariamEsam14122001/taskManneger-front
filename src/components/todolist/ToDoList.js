import React from "react";
import "./style.css";
import TodoItem from "../todoitem/ToDoItem";

const TodoList = ({ tasks }) => {
  return (
    <div id="list-container">
      <div>
        <h3 style={{ display: "inline-block" }}>My To Do List</h3>
        <p id="date">{new Date().toLocaleDateString()}</p>{" "}
       
      </div>
      <div id="list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TodoItem key={task._id} {...task} index={index} />
          ))
        ) : (
          <p>No tasks available for today.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
