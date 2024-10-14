import React from 'react';
import './progressbar.css'; // Importing the CSS for styling

const ProgressBar = ({ current, total }) => {
  // Calculate the width percentage for the progress bar
  const progressPercentage = (current / total) * 100;

return (
<div className="progress-container">
    <div className="task-meter">
    <span className="task-label">Task Meter</span>
    <span className="task-progress">{current}/{total}</span>
    </div>
    
    {/* Progress Bar */}
    <div className="progress-bar">
    <div
        className="progress-fill"
        style={{ width: `${progressPercentage}%` }}
    ></div>
    </div>


    <div className="good-job">
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f7bf11" viewBox="0 0 24 24">
    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
    </svg>

    <span className="good-job-text">Good Job!</span>
    </div>
</div>
);
};

export default ProgressBar;
