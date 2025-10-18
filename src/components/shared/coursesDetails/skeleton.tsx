import { Skeleton } from "@/components/ui";
import styles from "./coursesDetails.module.scss";

export const CoursesDetailsSkeleton = () => {
  return (
    <div className={styles.coursesDetails}>
      {Array.from({ length: 6 }, () => (
        <Skeleton width="100%" height={200} borderRadius={12}/>
      ))}
    </div>
  );
};
