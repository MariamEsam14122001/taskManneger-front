import React from "react";
import TaskStats from "../../components/Statistics/TaskStats";
import Dashboard from "../../components/Dashboard/Dashboard";

import ProgressBar from "../../components/Progressbar/progressbar";

function Reports() {
  return (
    <div>
      <ProgressBar current={25} total={50} />
      <TaskStats />
      <Dashboard />
    </div>
  );
}

export default Reports;
