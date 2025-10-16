import { Link } from "react-router-dom";
import styles from "./homeDetails.module.scss";
import { useTranslation } from "@/hooks";

export interface RatingUser {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
}

export interface RatingProps {
  title: string;
  unit: string;
  topUsers: RatingUser[];
  currentUser?: {
    id: string;
    name: string;
    avatar: string | null;
    value: number;
    position: number;
  };
}

export const Rating = ({ title, unit, topUsers, currentUser }: RatingProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.rating}>
      <h2 className={styles.rating__title}>{t(title)}</h2>

      <div className={styles.rating__list}>
        {topUsers.map((user, index) => (
          <Link
            to={`user/${user.name}`}
            key={user.id}
            className={`${styles.rating__item} ${
              currentUser?.id === user.id ? styles.rating__item_current : ""
            }`}
          >
            <span className={styles.rating__position}>#{index + 1}</span>
            <div className={styles.rating__avatar}>
              <img src={user.avatar ?? "/noavatar.png"} alt={user.name} />
            </div>
            <span className={styles.rating__name}>{user.name}</span>
            <span className={styles.rating__xp}>
              {user.value.toLocaleString()} {unit}
            </span>
          </Link>
        ))}

        {currentUser && (
          <>
            <div className={styles.rating__divider} />
            <div
              className={`${styles.rating__item} ${styles.rating__item_current}`}
            >
              <span className={styles.rating__position}>
                #{currentUser.position}
              </span>
              <div className={styles.rating__avatar}>
                <img src={currentUser.avatar ?? "/noavatar.png"} alt="You" />
              </div>
              <span className={styles.rating__name}>You</span>
              <span className={styles.rating__xp}>
                {currentUser.value.toLocaleString()} {unit}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
