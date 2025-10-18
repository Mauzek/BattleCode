import { CoursesDetails, CoursesDetailsSkeleton } from "@/components";
import { useEffect, useState } from "react";

const myCourses = [
  {
    id: "course-007",
    slug: "react-s-nulya",
    title: "React с нуля",
    description:
      "Современная разработка интерфейсов: компоненты, хуки, маршрутизация, состояние.",
    status: "in progress" as const,
    progress: 42,
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    id: "course-008",
    slug: "typescript-in-depth",
    title: "TypeScript в глубину",
    description:
      "Типы, интерфейсы, дженерики, утилиты, интеграция с React и Node.js.",
    status: "in progress" as const,
    progress: 68,
    tags: ["TypeScript", "Frontend", "Typing"],
  },
  {
    id: "course-009",
    slug: "react-router",
    title: "Маршрутизация в React с React Router",
    description:
      "Динамические маршруты, вложенные роуты, навигация, защита страниц.",
    status: "in progress" as const,
    progress: 30,
    tags: ["React", "React Router", "SPA"],
  },
  {
    id: "course-010",
    slug: "state-management",
    title: "Управление состоянием: Context, Redux, Zustand",
    description:
      "Сравнение подходов к глобальному состоянию в современных React-приложениях.",
    status: "in progress" as const,
    progress: 55,
    tags: ["React", "Redux", "Zustand", "State"],
  },
  {
    id: "course-011",
    slug: "vite-and-rollup",
    title: "Сборка проектов на Vite и Rolldown",
    description:
      "Быстрая сборка, плагины, оптимизация и эксперименты с новыми инструментами.",
    status: "in progress" as const,
    progress: 25,
    tags: ["Vite", "Rolldown", "Build Tools"],
  },
  {
    id: "course-012",
    slug: "accessibility-a11y",
    title: "Доступность (a11y) в вебе",
    description:
      "Как делать интерфейсы удобными для всех, включая людей с ограниченными возможностями.",
    status: "in progress" as const,
    progress: 15,
    tags: ["a11y", "UI", "Inclusive Design"],
  },
];

const CoursesMy = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMyCourses = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadMyCourses();
  }, []);

  return (
    <>
      {isLoading ? (
        <CoursesDetailsSkeleton />
      ) : (
        <CoursesDetails courses={myCourses} />
      )}
    </>
  );
};

export default CoursesMy;
