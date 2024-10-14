import React from 'react';
import './TaskCard.css'; // Import the CSS file for styling

const Card = ({ projectName, title, description, status }) => {
return (
<div className="card">
    <div className="card-header">
    <span className={`status-dot ${status}`}></span>
    <h4>{projectName}</h4>
    <div className="three-dots-menu">⋮</div>
    </div>
    <div className="card-body">
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="status-badges">
        <span className="badge-live">low</span>
        <span className="badge-completed">Completed</span>
    </div>
    </div>
    <div className="card-footer"></div>
</div>
);
};

const TaskBoard = () => {
const cards = [
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'todo',
},
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'inprogress',
},
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'done',
},
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'todo',
},
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'inprogress',
},
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'done',
},
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'todo',
},
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'inprogress',
},
{
    projectName: 'Project name',
    title: 'Brainstorming',
    description: "Brainstorming brings team members' diverse experience into play.",
    status: 'done',
},
// Add more cards as needed
];

// Separate the cards based on status
const todoCards = cards.filter(card => card.status === 'todo');
const inProgressCards = cards.filter(card => card.status === 'inprogress');
const doneCards = cards.filter(card => card.status === 'done');

return (
<div className="task-board">
    {/* Headers for the columns with colored underlines */}
    <div className="column-header todo">To Do</div>
    <div className="column-header inprogress">In Progress</div>
    <div className="column-header done">Done</div>

    {/* First column for "To Do" */}
    <div className="task-column">
    {todoCards.map((card, index) => (
        <Card key={index} {...card} />
    ))}
    </div>

    {/* Second column for "In Progress" */}
    <div className="task-column">
    {inProgressCards.map((card, index) => (
        <Card key={index} {...card} />
    ))}
    </div>

    {/* Third column for "Done" */}
    <div className="task-column">
    {doneCards.map((card, index) => (
        <Card key={index} {...card} />
    ))}
    </div>
</div>
);
};

export default TaskBoard;
