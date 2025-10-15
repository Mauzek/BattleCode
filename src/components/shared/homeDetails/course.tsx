import styles from "./homeDetails.module.scss";

export const Course = () => {
  return (
    <article className={styles.course}>
      <div className={styles.course__content}>
        <div className={styles.course__header}>
          <h2 className={styles.course__title}>Loops in Programming</h2>
          <span className={styles.course__status}>In progress</span>
        </div>

        <p className={styles.course__description}>
          Master the fundamentals of loops: for, while, and do-while. Learn to
          avoid infinite loops and optimize iterations.
        </p>

        <div className={styles.course__tags}>
          <span className={styles.course__tag}>JavaScript</span>
          <span className={styles.course__tag}>Beginner</span>
          <span className={styles.course__tag}>12 lessons</span>
        </div>

        <div className={styles.course__progress}>
          <div className={styles.course__progressBar}>
            <div
              className={styles.course__progressFill}
              style={{ width: "45%" }}
            />
          </div>
          <span className={styles.course__progressText}>45% completed</span>
        </div>
      </div>
    </article>
  );
};
