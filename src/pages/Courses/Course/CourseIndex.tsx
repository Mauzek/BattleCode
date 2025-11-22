import { useAppSelector } from "@/hooks/storeHooks";
import styles from "./course.module.scss";
import { Skeleton } from "@/components";

const CourseIndex = () => {
  const { currentCourse, error, status } = useAppSelector(app => app.course)



  if (status === "loading") {
    return (
      <div className={styles.course}>
          <Skeleton width="100%" height="500px" borderRadius={16}/>
      </div>
    );
  }

  if (error || !currentCourse) {
    return (
      <div className={styles.course}>
        <div className={styles.error}>
          <h2>Ошибка загрузки курса</h2>
          <p>{error || "Курс не найден"}</p>
        </div>
      </div>
    );
  }


  const uiCourse = {
    title: currentCourse.title,
    author: currentCourse.authorId || "—", 
    description: currentCourse.description,
    difficulty: currentCourse.level || "Не указано",
    duration: "8 недель", 
    rating: 4.8, 
    skills: currentCourse.tasks?.map(t => t.title) || [], 
    tags: [currentCourse.level],
  };

  console.log(uiCourse)

  return (
    <div className={styles.course}>
      <h1 className={styles.course__title}>{uiCourse.title}</h1>
      <p className={styles.course__author}>Автор: {uiCourse.author}</p>

      <div className={styles.course__meta}>
        <span className={styles.course__badge}>
          Сложность: {uiCourse.difficulty}
        </span>
        <span className={styles.course__badge}>
          Длительность: {uiCourse.duration}
        </span>
        <span className={styles.course__badge}>Рейтинг: ★ {uiCourse.rating}</span>
      </div>

      <section className={styles.course__section}>
        <h2 className={styles.course__sectionTitle}>Описание</h2>
        <p className={styles.course__description}>{uiCourse.description}</p>
      </section>

      {uiCourse.skills.length > 0 && (
        <section className={styles.course__section}>
          <h2 className={styles.course__sectionTitle}>Чему вы научитесь</h2>
          <ul className={styles.course__skills}>
            {uiCourse.skills.map((skill, idx) => (
              <li key={idx} className={styles.course__skillItem}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {uiCourse.tags.length > 0 && (
        <section className={styles.course__section}>
          <h2 className={styles.course__sectionTitle}>Теги</h2>
          <div className={styles.course__tags}>
            {uiCourse.tags.map((tag, idx) => (
              <span key={idx} className={styles.course__tag}>
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CourseIndex;