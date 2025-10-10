import { SectionTabs } from "@/components";
import { useLocation } from "react-router-dom";

export const CoursesPage: React.FC = () => {
  const location = useLocation();

  const coursesTabs = [
    { label: "All Courses", path: "/courses" },
    { label: "My Courses", path: "/courses/my" },
    { label: "Completed", path: "/courses/completed" },
  ];

  const getPageContent = () => {
    if (location.pathname === "/courses/my") {
      return {
        title: "Мои курсы",
        description:
          "Курсы, на которые вы записаны. Здесь вы можете продолжить обучение, отслеживать прогресс и получать новые знания.",
      };
    } else if (location.pathname === "/courses/completed") {
      return {
        title: "Завершённые курсы",
        description:
          "Поздравляем! Эти курсы вы успешно завершили. Вы можете пересматривать материалы или поделиться достижениями.",
      };
    } else {
      return {
        title: "Все курсы",
        description:
          "Изучите полный каталог доступных курсов. Найдите то, что соответствует вашим интересам и целям, и начните обучение уже сегодня.",
      };
    }
  };

  const { title, description } = getPageContent();

  return (
    <main style={{ height: "2000px" }}>
      <SectionTabs tabs={coursesTabs} label="Courses" />
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
};
