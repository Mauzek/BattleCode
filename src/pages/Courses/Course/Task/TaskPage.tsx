import { SectionTabs } from "@/components";
import { useTranslation } from "@/hooks";
import { Outlet, useParams } from "react-router-dom";

const TaskPage = () => {
  const { taskId } = useParams<{
    courseId: string;
    taskId: string;
  }>();
  const {t} = useTranslation();

  const taskTabs = [
    { label: t("Task"), path: `` },
    { label: t("Checks"), path: `checks` },
  ];

  return (
    <main className="task-page">
      <SectionTabs tabs={taskTabs} label={`${t("Task")} ${taskId}`} />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default TaskPage;
