import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/storeHooks";
import styles from "./course-tasks.module.scss";

const getStatusText = (status: string) => {
  switch (status) {
    case "completed": return "Выполнено";
    case "in-progress": return "В работе";
    case "locked": return "Недоступно";
    default: return "Новое";
  }
};

const getStatusMod = (status: string) => {
  return status === "completed"
    ? "success"
    : status === "in-progress"
    ? "warning"
    : "disabled";
};

const CourseTasks = () => {
  const { currentCourse, status, error } = useAppSelector(state => state.course);


  if (status === 'loading' && !currentCourse) {
    return <div className={styles.tasks}>Загрузка заданий...</div>;
  }

  if (error) {
    return (
      <div className={styles.tasks}>
        <div className={styles.error}>Не удалось загрузить задания: {error}</div>
      </div>
    );
  }

  

  if (!currentCourse || !currentCourse.tasks || currentCourse.tasks.length === 0) {
    if (false)
    return <div className={styles.tasks}>В этом курсе пока нет заданий.</div>;
  }

  // 🔹 Берём реальные задачи из курса
  // const tasks = currentCourse.tasks; // ← тип: TaskPreview[]
  const tasks  = [
  {
    id: 1,
    title: "Основы синтаксиса",
    description: "Изучение базовых конструкций языка программирования: переменные, операторы, условия, циклы.",
    difficulty: "легкий",
    orderIndex: 1
  },
  {
    id: 2,
    title: "Структуры данных",
    description: "Работа с массивами, списками, словарями и другими фундаментальными структурами данных.",
    difficulty: "средний",
    orderIndex: 2
  },
  {
    id: 3,
    title: "Алгоритмы и сложность",
    description: "Анализ временной и пространственной сложности алгоритмов. Big O нотация.",
    difficulty: "средний",
    orderIndex: 3
  },
  {
    id: 4,
    title: "Объектно-ориентированное программирование",
    description: "Принципы ООП: инкапсуляция, наследование, полиморфизм, абстракция.",
    difficulty: "средний",
    orderIndex: 4
  },
  {
    id: 5,
    title: "Работа с базами данных",
    description: "SQL запросы, проектирование схемы БД, ORM системы.",
    difficulty: "средний",
    orderIndex: 5
  },
  {
    id: 6,
    title: "Веб-разработка",
    description: "Создание веб-приложений: фронтенд, бэкенд, HTTP протокол, REST API.",
    difficulty: "сложный",
    orderIndex: 6
  },
  {
    id: 7,
    title: "Мобильная разработка",
    description: "Разработка приложений для iOS и Android, кроссплатформенные решения.",
    difficulty: "сложный",
    orderIndex: 7
  },
  {
    id: 8,
    title: "Тестирование и QA",
    description: "Unit-тесты, интеграционное тестирование, TDD, инструменты автоматизации.",
    difficulty: "средний",
    orderIndex: 8
  },
  {
    id: 9,
    title: "DevOps и deployment",
    description: "CI/CD, контейнеризация, облачные платформы, мониторинг приложений.",
    difficulty: "сложный",
    orderIndex: 9
  },
  {
    id: 10,
    title: "Архитектура программного обеспечения",
    description: "Паттерны проектирования, микросервисная архитектура, принципы SOLID.",
    difficulty: "сложный",
    orderIndex: 10
  }
];; // ← тип: TaskPreview[]


  
  return (
    <div className={styles.tasks}>
      <div className={styles.tasks__list}>
        {tasks.map(task => {
          const status: "new" | "locked" = "new";

          return (
            <Link
              to={`${task.id}`} // task.id — number → string неявно
              key={task.id}
              className={`${styles.tasks__item} ${
                status !== "new" ? styles["tasks__item_disabled"] : ""
              }`}
            >
              <div className={styles.tasks__header}>
                <h3 className={styles.tasks__itemTitle}>{task.title}</h3>
                <span
                  className={`${styles.tasks__status} ${
                    styles[`tasks__status_${getStatusMod(status)}`]
                  }`}
                >
                  {getStatusText(status)}
                </span>
              </div>
              <p className={styles.tasks__description}>
                {task.description || "Описание отсутствует"}
              </p>
              {/* 🔹 Deadline: можно добавить estimatedMinutes или отдельное поле позже */}
              {/* <div className={styles.tasks__meta}>
                Примерное время: {task.estimatedMinutes} мин
              </div> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourseTasks;