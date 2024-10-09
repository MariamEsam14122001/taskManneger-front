import React from "react";
import "./style.css";
import UserInfo from "../userinfo/UserInfo";
import TodoList from "../todolist/ToDoList";

const Sidebar = () => {
  const tasks = [
    {
      id: 1,
      time: "10:00 AM",
      number: 1,
      projectName: "Project Alpha",
      title: "Brainstorming",
      details:
        "Brainstorming brings team members' diverse experience into play.",
      critical: "low",
      progress: "Completed",
    },
    {
      id: 2,
      time: "11:00 AM",
      number: 2,
      projectName: "Project Beta",
      title: "Design Review",
      details: "Review the design mockups and gather feedback.",
      critical: "medium",
      progress: "In Progress",
    },
    {
      id: 3,
      time: "12:00 PM",
      number: 3,
      projectName: "Project Gamma",
      title: "Team Sync",
      details: "Discuss project updates and team priorities.",
      critical: "high",
      progress: "Pending",
    },
  ];
  return (
    <div id="sidebar">
      <UserInfo />
      <TodoList tasks={tasks} />
    </div>
  );
};
export default Sidebar;
