import { CourseCard } from "@/components";
import styles from "./coursesDetails.module.scss";
import type { CoursesDetailsProps } from "./types";

export const CoursesDetails = ({ courses }: CoursesDetailsProps) => {
  return (
    <section className={styles.coursesDetails}>
      {courses.map((item) => (
        <CourseCard
          id={item.id}
          slug={item.slug}
          title={item.title}
          description={item.description}
          status={item.status}
          progress={item.progress}
          tags={item.tags}
        />
      ))}
    </section>
  );
};
