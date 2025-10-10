import { SectionTabs } from "@/components";
import { Outlet, useParams } from "react-router-dom";

const TaskPage = () => {
  const { taskId } = useParams<{
    courseId: string;
    taskId: string;
  }>();

  const taskTabs = [
    { label: "Task", path: `` },
    { label: "Checks", path: `checks` },
  ];

  return (
    <main className="task-page">
      <SectionTabs tabs={taskTabs} label={`Task ${taskId}`} />
      <Outlet />
    </main>
  );
};


export default TaskPage;