import { SectionTabs } from "@/components";
import { Outlet } from "react-router-dom";

const CoursesPage = () => {
  const coursesTabs = [
    { label: "All Courses", path: "" },
    { label: "My Courses", path: "my" },
    { label: "Completed", path: "completed" },
  ];

  return (
    <main className="courses-page">
      <SectionTabs tabs={coursesTabs} label="Courses" />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default CoursesPage;
