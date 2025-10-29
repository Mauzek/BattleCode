import { Link } from "react-router-dom";
import styles from "./course-tasks.module.scss";

const mockTasks = [
  {
    id: "1",
    title: "Настройка статической маршрутизации",
    description:
      "Создайте топологию из трёх маршрутизаторов и настройте статические маршруты между ними.",
    status: "completed",
    deadline: "2025-11-10",
  },
  {
    id: "2",
    title: "Анализ трафика с Wireshark",
    description:
      "Захватите HTTP- и DNS-трафик, проанализируйте пакеты и опишите их структуру.",
    status: "in-progress",
    deadline: "2025-11-17",
  },
  {
    id: "3",
    title: "Настройка VLAN",
    description:
      "Разделите сеть на два VLAN на коммутаторе Cisco и обеспечьте меж-VLAN маршрутизацию.",
    status: "locked",
    deadline: "2025-11-24",
  },
];

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Выполнено";
    case "in-progress":
      return "В работе";
    case "locked":
      return "Недоступно";
    default:
      return "Новое";
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
  return (
    <div className={styles.tasks}>
      <div className={styles.tasks__list}>
        {mockTasks.map((task) => (
          <Link
            to={`${task.id}`}
            key={task.id}
            className={`${styles.tasks__item} ${
              task.status === "locked" ? styles["tasks__item_disabled"] : ""
            }`}
          >
            <div className={styles.tasks__header}>
              <h3 className={styles.tasks__itemTitle}>{task.title}</h3>
              <span
                className={`${styles.tasks__status} ${
                  styles[`tasks__status_${getStatusMod(task.status)}`]
                }`}
              >
                {getStatusText(task.status)}
              </span>
            </div>
            <p className={styles.tasks__description}>{task.description}</p>
            <div className={styles.tasks__meta}>
              Срок сдачи: {new Date(task.deadline).toLocaleDateString("ru-RU")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseTasks;
