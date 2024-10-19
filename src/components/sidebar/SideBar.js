import React, { useState, useEffect } from "react";
import "./style.css";
import UserInfo from "../userinfo/UserInfo";
import TodoList from "../todolist/ToDoList";
import { useAuth } from "../../Context/AuthContext";

const Sidebar = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Ensure this is at the top level

  const fetchTodaysTasks = async () => {
    const today = new Date().toISOString().split("T")[0];

    if (!token) {
      setError("No token found, please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks/today", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: today }),
      });

      const data = await response.json();

      if (data.success) {
        setTasks(data.data);
        setError(null);
      } else {
        setError(data.message);
        setTasks([]);
      }
    } catch (err) {
      setError("An error occurred while fetching tasks.");
      console.error(err);
    }
  };

  // Fetch today's tasks when the component mounts
  useEffect(() => {
    fetchTodaysTasks();
  }, [token]); // Add token as a dependency if it changes

  return (
    <div id="sidebar">
      <UserInfo />
      <TodoList tasks={tasks} />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error if present */}
    </div>
  );
};

export default Sidebar;
