import { Skeleton } from "@/components/ui";
import styles from './homeDetails.module.scss';

export const HomeDetailsSkelenot = () => {
  return (
    <div className={styles.homeDetails}>
      <div className={styles.homeDetails__badgesContainer}>
        <Skeleton width="100%" height={100} borderRadius={16} />
        <Skeleton width="100%" height={100} borderRadius={16} />
        <Skeleton width="100%" height={100} borderRadius={16} />
        <Skeleton width="100%" height={100} borderRadius={16} />
      </div>

      <Skeleton width="100%" height={200} borderRadius={16} />

      <div className={styles.homeDetails__rankingContainer}>
        <Skeleton width="100%" height={500} borderRadius={16} />
        <Skeleton width="100%" height={500} borderRadius={16} />
        <Skeleton width="100%" height={500} borderRadius={16} />
      </div>
    </div>
  );
};