import React from "react";
import "./style.css";
import TodoItem from "../todoitem/ToDoItem";

const TodoList = ({ tasks }) => {
  return (
    <div id="list-container">
      <div>
        <h3 style={{ display: "inline-block" }}>My To Do List</h3>
        <p id="date">Today 02/02/2022</p>
      </div>
      <div id="list">
        {tasks.map((task) => (
          <TodoItem key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};
export default TodoList;
