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
    return <div className={styles.tasks}>В этом курсе пока нет заданий.</div>;
  }

  // 🔹 Берём реальные задачи из курса
  const tasks = currentCourse.tasks; // ← тип: TaskPreview[]

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