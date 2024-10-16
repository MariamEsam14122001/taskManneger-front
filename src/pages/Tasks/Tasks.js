import Sidebar from "../../components/sidebar/SideBar"
import Header from "../../components/Header/Header"
import ProgressBar from "../../components/Progressbar/progressbar"
import CardLayout from "../../components/CardLayout/TaskCard";

const Tasks = () => {
    return(

    <div className="app-container">
    <Sidebar />
    <main className="main-content">
      <Header />
      <div>
      <ProgressBar current={25} total={50} />
      <CardLayout/>
      </div>
    </main>
  </div>
    );
};
export default Tasks;
