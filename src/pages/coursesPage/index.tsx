import { SectionTabs } from "@/components";
import { useLocation } from "react-router-dom";

export const CoursesPage: React.FC = () => {
  const location = useLocation();
  const isMyCourses = location.pathname === "/courses/my";

  const coursesTabs = [
    { label: "All Courses", path: "/courses" },
    { label: "My Courses", path: "/courses/my" },
  ];

  return (
    <main style={{ height: "2000px" }}>
      <SectionTabs tabs={coursesTabs} label="Courses" />
      <h1>{isMyCourses ? "Мои курсы" : "Все курсы"}</h1>
      {isMyCourses ? (
        <p>Здесь отображаются только ваши курсы</p>
      ) : (
        <p>Список всех доступных курсов</p>
      )}
    </main>
  );
};
