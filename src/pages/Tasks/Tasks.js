
import ProgressBar from "../../components/Progressbar/progressbar";
import CardLayout from "../../components/TaskLayout/TaskBoard";

const Tasks = () => {
  return (
    <div>
      <ProgressBar current={25} total={50} />
      <CardLayout />
    </div>
  );
};
export default Tasks;
