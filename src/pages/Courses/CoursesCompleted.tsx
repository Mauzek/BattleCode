import { CoursesDetails, CoursesDetailsSkeleton } from "@/components";
import { useEffect, useState } from "react";

const completedCourses = [
  {
    id: "course-001",
    slug: "html-css-basics",
    title: "HTML и CSS: основы веб-верстки",
    description:
      "Создание адаптивных и семантически правильных веб-страниц с нуля.",
    status: "completed" as const,
    progress: 100,
    tags: ["HTML", "CSS", "Верстка"],
  },
  {
    id: "course-002",
    slug: "javascript-fundamentals",
    title: "Основы JavaScript",
    description:
      "Переменные, функции, DOM, события, асинхронность — всё, что нужно для старта.",
    status: "completed" as const,
    progress: 100,
    tags: ["JavaScript", "DOM", "Frontend"],
  },
  {
    id: "course-003",
    slug: "testing-with-jest",
    title: "Тестирование на Jest и Playwright",
    description: "Пишем надёжные юнит- и E2E-тесты для фронтенд-приложений.",
    status: "completed" as const,
    progress: 100,
    tags: ["Jest", "Playwright", "Testing", "TDD"],
  },
  {
    id: "course-004",
    slug: "git-and-github",
    title: "Git и GitHub для разработчиков",
    description:
      "Работа с ветками, pull request’ами, конфликтами и командной разработкой.",
    status: "completed" as const,
    progress: 100,
    tags: ["Git", "GitHub", "Инструменты"],
  },
  {
    id: "course-005",
    slug: "responsive-design",
    title: "Адаптивный и мобильный дизайн",
    description:
      "Медиазапросы, flexbox, grid, mobile-first подход и кроссбраузерность.",
    status: "completed" as const,
    progress: 100,
    tags: ["CSS", "Адаптивность", "UI"],
  },
  {
    id: "course-006",
    slug: "eslint-prettier",
    title: "Качество кода: ESLint и Prettier",
    description:
      "Настройка линтеров и форматтеров для поддержания чистоты и стандартизации кода.",
    status: "completed" as const,
    progress: 100,
    tags: ["ESLint", "Prettier", "DevTools"],
  },
];

const CoursesCompleted = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompletedCourses = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadCompletedCourses();
  }, []);

  return (
    <>
      {isLoading ? (
        <CoursesDetailsSkeleton />
      ) : (
        <CoursesDetails courses={completedCourses} />
      )}
    </>
  );
};

export default CoursesCompleted;
