import { Link } from "react-router-dom";
import styles from "./homeDetails.module.scss";
import { useTranslation } from "@/hooks";

export interface CourseProps {
  id: string | number;
  title: string;
  description: string;
  status: "not started" | "in progress" | "completed" | string;
  progress: number;
  tags: string[];
  slug?: string;
}

export const Course = ({
  id,
  title,
  description,
  status,
  progress,
  tags,
  slug = String(id),
}: CourseProps) => {
  const { t } = useTranslation();
  return (
    <Link to={`/courses/${slug}`} className={styles.course}>
      <div className={styles.course__content}>
        <div className={styles.course__header}>
          <h2 className={styles.course__title}>{title}</h2>
          <span className={styles.course__status}>{t(status)}</span>
        </div>

        <p className={styles.course__description}>{description}</p>

        <div className={styles.course__tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.course__tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.course__progress}>
          <div className={styles.course__progressBar}>
            <div
              className={styles.course__progressFill}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <span className={styles.course__progressText}>
            {progress}% {t("completed")}
          </span>
        </div>
      </div>
    </Link>
  );
};
