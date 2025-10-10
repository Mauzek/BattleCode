import { SectionTabs } from "@/components";
import { useLocation, useParams } from "react-router-dom";

export const CoursePage: React.FC = () => {
  const location = useLocation();
  const { courseId } = useParams<{ courseId: string }>();

  const getPageContent = () => {
    if (location.pathname === `/courses/${courseId}/assignments`) {
      return {
        title: "Задания курса",
        description:
          "Список всех заданий по курсу. Выполните их, чтобы закрепить знания и продвинуться дальше.",
      };
    } else if (location.pathname === `/courses/${courseId}/edit`) {
      return {
        title: "Редактирование курса",
        description:
          "Здесь вы можете изменить название, описание, материалы и настройки курса.",
      };
    } else {
      return {
        title: `Курс #${courseId}`,
        description:
          "Добро пожаловать на страницу курса! Здесь вы найдёте лекции, задания и другую полезную информацию.",
      };
    }
  };

  const { title, description } = getPageContent();

  const courseTabs = [
    { label: "Обзор", path: `/courses/${courseId}` },
    { label: "Задания", path: `/courses/${courseId}/assignments` },
    { label: "Редактировать", path: `/courses/${courseId}/edit` },
  ];

  return (
    <main style={{ padding: "20px", minHeight: "100vh" }}>
      <SectionTabs tabs={courseTabs} label="Курс" />
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
};
