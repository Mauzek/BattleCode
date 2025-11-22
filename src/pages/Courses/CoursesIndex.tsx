import { CoursesDetails, CoursesDetailsSkeleton } from "@/components";
import { coursesApi } from "@/api/courses"; // ← твой coursesApi
import { useEffect, useState } from "react";

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
        const uiCourses: UICourse[] = response.content.map((course) => ({
          id: course.id,
          // slug: из URL-friendly title или course.slug, если есть в API
          slug: course.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // убираем спецсимволы
            .replace(/[-\s]+/g, '-'), // заменяем пробелы/дефисы на один дефис
          title: course.title,
          description: course.description,
          status: "not started", // пока заглушка — можно запросить прогресс отдельно
          progress: 0,
          tags: course.level ? [course.level] : ["General"],
        }));

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