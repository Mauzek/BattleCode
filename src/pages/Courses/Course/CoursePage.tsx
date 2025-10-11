import { SectionTabs } from "@/components";
import { Outlet, useParams } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const courseTabs = [
    { label: "Overview", path: `` },
    { label: "Assignments", path: `tasks` },
    { label: "Edit", path: `edit` },
  ];

  return (
    <main className="course-page">
      <SectionTabs tabs={courseTabs} label={`Course ${courseId}`} />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default CoursePage;
