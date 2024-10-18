import React, { useState } from 'react';
import TaskForm from './TaskForm/TaskForm'; // Import the TaskForm component
import TaskBoard from './CardLayout/TaskCard'; // Import the TaskBoard component

const TaskManager = () => {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]); // Add the new task to the list of tasks
  };

  return (
    <div>
      {/* Render TaskForm and pass down addTask function */}
      <TaskForm addTask={addTask} />
      
      {/* Render TaskBoard and pass down the tasks */}
      <TaskBoard tasks={tasks} />
    </div>
  );
};

export default TaskManager;
