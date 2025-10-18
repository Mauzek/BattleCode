import { CoursesDetails, CoursesDetailsSkeleton } from "@/components";
import { useEffect, useState } from "react";

const allCourses = [
  {
    id: "course-013",
    slug: "nodejs-backend",
    title: "Node.js для фронтенд-разработчиков",
    description:
      "Создание REST API, работа с Express, middleware, аутентификация.",
    status: "not started" as const,
    progress: 0,
    tags: ["Node.js", "Backend", "API"],
  },
  {
    id: "course-014",
    slug: "docker-for-devs",
    title: "Docker для разработчиков",
    description:
      "Контейнеризация приложений, docker-compose, локальная разработка как в продакшене.",
    status: "not started" as const,
    progress: 0,
    tags: ["Docker", "DevOps", "Инструменты"],
  },
  {
    id: "course-015",
    slug: "cypress-e2e",
    title: "E2E-тестирование с Cypress",
    description:
      "Написание сквозных тестов, моки сетевых запросов, CI-интеграция.",
    status: "not started" as const,
    progress: 0,
    tags: ["Cypress", "Testing", "E2E"],
  },
  {
    id: "course-016",
    slug: "web-performance",
    title: "Производительность веб-приложений",
    description:
      "Оптимизация загрузки, ленивая подгрузка, Core Web Vitals, Lighthouse.",
    status: "not started" as const,
    progress: 0,
    tags: ["Performance", "Optimization", "Lighthouse"],
  },
  {
    id: "course-017",
    slug: "tailwind-css",
    title: "Tailwind CSS: утилитарный подход к стилям",
    description: "Быстрая разработка интерфейсов без написания CSS вручную.",
    status: "not started" as const,
    progress: 0,
    tags: ["Tailwind", "CSS", "UI"],
  },
  {
    id: "course-018",
    slug: "nextjs-ssr",
    title: "Next.js и серверный рендеринг",
    description:
      "SSR, SSG, API routes, динамические маршруты, оптимизация SEO.",
    status: "not started" as const,
    progress: 0,
    tags: ["Next.js", "SSR", "React", "SEO"],
  },
];

const CoursesIndex = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllCourses = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadAllCourses();
  }, []);

  return (
    <>
      {isLoading ? (
        <CoursesDetailsSkeleton />
      ) : (
        <CoursesDetails courses={allCourses} />
      )}
    </>
  );
};

export default CoursesIndex;
