import { CoursesDetails, CoursesDetailsSkeleton } from "@/components";
import { coursesApi } from "@/api/courses"; // ← твой coursesApi
import { useEffect, useState } from "react";

export const myCourses = [
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

// Тип для UI-курса (соответствует CourseCardProps)
interface UICourse {
  id: number;
  slug: string;
  title: string;
  description: string;
  status: "not started" | "in progress" | "completed";
  progress: number;
  tags: string[];
}

const CoursesIndex = () => {
  const [courses, setCourses] = useState<UICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesApi.getAllCourses({
          page: 0,
          size: 10,
          sort: ["createdAt,desc"],
        });
        console.log("[CoursesIndex] Fetched courses:", response);
        // Маппинг: API → UI

        let uiCourses: UICourse[] = response.content.map((course) => ({
          id: course.id,
          // slug: из URL-friendly title или course.slug, если есть в API
          slug: course.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // убираем спецсимволы
            .replace(/[-\s]+/g, "-"), // заменяем пробелы/дефисы на один дефис
          title: course.title,
          description: course.description,
          status: "not started", // пока заглушка — можно запросить прогресс отдельно
          progress: 0,
          tags: course.level ? [course.level] : ["General"],
        }));

        if (uiCourses.length === 0) {
          uiCourses = myCourses.map((x) => ({
            ...x,
            id: Number(x.id),
          }));
        }
        setCourses(uiCourses);
      } catch (err) {
        setError("Не удалось загрузить курсы");
        console.error("[CoursesIndex] Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []); // ← пустой deps — один раз при монтировании

  if (isLoading) {
    return <CoursesDetailsSkeleton />;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", color: "var(--color-error)" }}>
        {error}
      </div>
    );
  }

  return <CoursesDetails courses={courses} />;
};

export default CoursesIndex;
