import styles from "./course.module.scss";

const CourseIndex = () => {
  const course = {
    title: "Основы сетевой инженерии",
    author: "Иван Петров",
    description:
      "Этот курс охватывает ключевые концепции сетевой инженерии: от модели OSI до настройки маршрутизаторов и коммутаторов. Вы научитесь проектировать, настраивать и защищать корпоративные сети, а также работать с реальными инструментами вроде Cisco Packet Tracer и Wireshark.",
    difficulty: "Начинающий",
    duration: "8 недель",
    rating: 4.8,
    skills: [
      "TCP/IP",
      "Маршрутизация",
      "Коммутация",
      "Безопасность сетей",
      "Subnetting",
    ],
    tags: ["Сети", "Cisco", "IT", "Инфраструктура"],
  };

  return (
    <div className={styles.course}>
      <h1 className={styles.course__title}>{course.title}</h1>
      <p className={styles.course__author}>Автор: {course.author}</p>

      <div className={styles.course__meta}>
        <span className={styles.course__badge}>
          Сложность: {course.difficulty}
        </span>
        <span className={styles.course__badge}>
          Длительность: {course.duration}
        </span>
        <span className={styles.course__badge}>Рейтинг: ★ {course.rating}</span>
      </div>

      <section className={styles.course__section}>
        <h2 className={styles.course__sectionTitle}>Описание</h2>
        <p className={styles.course__description}>{course.description}</p>
      </section>

      <section className={styles.course__section}>
        <h2 className={styles.course__sectionTitle}>Чему вы научитесь</h2>
        <ul className={styles.course__skills}>
          {course.skills.map((skill, idx) => (
            <li key={idx} className={styles.course__skillItem}>
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.course__section}>
        <h2 className={styles.course__sectionTitle}>Теги</h2>
        <div className={styles.course__tags}>
          {course.tags.map((tag, idx) => (
            <span key={idx} className={styles.course__tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseIndex;
