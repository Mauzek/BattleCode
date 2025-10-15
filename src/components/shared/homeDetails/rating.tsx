import styles from "./homeDetails.module.scss";

export interface RatingUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  position: number;
  isCurrentUser?: boolean;
}

export interface RatingProps {
  title: string;
  topUsers: RatingUser[];
  currentUser?: {
    id: string;
    name: string;
    xp: number;
    position: number;
  };
}

export const Rating = ({ title, topUsers, currentUser }: RatingProps) => {
  const isCurrentUserInTop = currentUser
    ? topUsers.some((user) => user.id === currentUser.id)
    : false;

  return (
    <div className={styles.rating}>
      <h2 className={styles.rating__title}>{title}</h2>

      <div className={styles.rating__list}>
        {topUsers.map((user) => (
          <div
            key={user.id}
            className={`${styles.rating__item} ${
              currentUser?.id === user.id ? styles.rating__item_current : ""
            }`}
          >
            <span className={styles.rating__position}>#{user.position}</span>
            <div className={styles.rating__avatar}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{user.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <span className={styles.rating__name}>
              {currentUser?.id === user.id ? "You" : user.name}
            </span>
            <span className={styles.rating__xp}>
              {user.xp.toLocaleString()} XP
            </span>
          </div>
        ))}

        {currentUser && !isCurrentUserInTop && (
          <>
            <div className={styles.rating__divider} />
            <div
              className={`${styles.rating__item} ${styles.rating__item_current}`}
            >
              <span className={styles.rating__position}>
                #{currentUser.position}
              </span>
              <div className={styles.rating__avatar}>
                <span>Y</span>
              </div>
              <span className={styles.rating__name}>You</span>
              <span className={styles.rating__xp}>
                {currentUser.xp.toLocaleString()} XP
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
