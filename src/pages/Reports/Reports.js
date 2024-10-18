import React from 'react';
import TaskStats from '../../components/Statistics/TaskStats';
import Dashboard from '../../components/Dashboard/Dashboard';
import Sidebar from '../../components/sidebar/SideBar';
import Header from '../../components/Header/Header';
import ProgressBar from '../../components/Progressbar/progressbar';


function Reports() {
return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
            <Header />
            <div>
            <ProgressBar current={25} total={50} />
            <TaskStats/>
            <Dashboard/>
            </div>
            </main>
        </div>
        );

}

export default Reports;
