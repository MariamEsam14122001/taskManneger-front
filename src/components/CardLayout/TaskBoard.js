// TaskBoard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import { useAuth } from "../../Context/AuthContext";
import "./TaskCard.css";

const TaskBoard = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchTasksByStatus = async (status) => {
    try {
      if (!token) {
        console.warn("No token found. Cannot fetch tasks.");
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/api/tasks/status/${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const fetchAllTasks = async () => {
    setLoading(true);
    try {
      const todoData = await fetchTasksByStatus("to do");
      const inProgressData = await fetchTasksByStatus("in progress");
      const doneData = await fetchTasksByStatus("done");

      setTodoTasks(todoData || []); // Fallback to empty array if no data
      setInProgressTasks(inProgressData || []);
      setDoneTasks(doneData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, [token]); // Refetch tasks when token changes

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-board">
      <TaskColumn
        title="To Do"
        taskCount={todoTasks.length}
        tasks={todoTasks}
        fetchAllTasks={fetchAllTasks}
      />
      <TaskColumn
        title="In Progress"
        taskCount={inProgressTasks.length}
        tasks={inProgressTasks}
        fetchAllTasks={fetchAllTasks}
      />
      <TaskColumn
        title="Done"
        taskCount={doneTasks.length}
        tasks={doneTasks}
        fetchAllTasks={fetchAllTasks}
      />
    </div>
  );
};

export default TaskBoard;
