import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom"; // Import useLocation for detecting the current page
import TaskForm from "../TaskForm/TaskForm";
import ProjectForm from "../ProjectForm/ProjectForm";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation(); // Detects the current route

  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Determine button text and modal form based on the current path
  const isTasksPage = location.pathname === "/dashboard";
  const isProjectsPage = location.pathname === "/projects";
  const modalContent = isTasksPage ? (
    <TaskForm mode="add" onCancel={toggleModal} />
  ) : (
    <ProjectForm mode="add" onCancel={toggleModal} />
  );

  const buttonLabel = isTasksPage
    ? "+ Add Task"
    : isProjectsPage
    ? "+ Add Project"
    : "";

  return (
    <header className="app-header">
      <div className="nav-items">
        <button className={`nav-btn ${isTasksPage ? "active" : ""}`}>
          <Link to="/dashboard">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
              />
            </svg>
            Tasks
          </Link>
        </button>
        <button className={`nav-btn ${isProjectsPage ? "active" : ""}`}>
          <Link to="/projects">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"
              />
            </svg>
            Projects
          </Link>
        </button>
        <button
          className={`nav-btn ${
            location.pathname === "/reports" ? "active" : ""
          }`}
        >
          <Link to="/reports">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
              />
            </svg>
            Reports
          </Link>
        </button>
      </div>

      {/* Conditionally render the button and modal content */}
      {buttonLabel && (
        <button className="add-task-btn" onClick={toggleModal}>
          {buttonLabel}
        </button>
      )}

      {/* Hamburger menu for mobile */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Collapsible mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <button className={`nav-btn ${isTasksPage ? "active" : ""}`}>
            Tasks
          </button>
          <button className={`nav-btn ${isProjectsPage ? "active" : ""}`}>
            Projects
          </button>
          <button
            className={`nav-btn ${
              location.pathname === "/reports" ? "active" : ""
            }`}
          >
            Reports
          </button>
          {buttonLabel && (
            <button className="add-task-btn mobile" onClick={toggleModal}>
              {buttonLabel}
            </button>
          )}
        </div>
      )}

      {/* Add Task/Project Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">{modalContent}</div>
        </div>
      )}
    </header>
  );
};

export default Header;
