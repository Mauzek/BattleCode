import { GrAchievement } from "react-icons/gr";
import { LuStar, LuListCheck, LuTimer, LuInfo } from "react-icons/lu";
import { Link } from "react-router-dom";
import styles from "./homeDetails.module.scss";
import { useState } from "react";
import { ModalWrapper } from "../modalWrapper";
import { useTranslation } from "@/hooks";

interface BadgesProps {
  nearestDeadline?: string; 
  achievementProgress?: {
    current: number;
    total: number;
  };
  nextAchievement?: {
    name: string;
    current: number;
    total: number;
    description: string;
  };
  coursesProgress?: {
    current: number;
    total: number;
  };
}

export const Badges = ({
  nearestDeadline = "No deadlines",
  achievementProgress = { current: 0, total: 100 },
  nextAchievement = {
    name: "—",
    current: 0,
    total: 1,
    description: "Complete more tasks to unlock the next achievement."
  },
  coursesProgress = { current: 0, total: 50 }
}: BadgesProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const calcPercent = (current: number, total: number): number => {
    if (total <= 0) return 0;
    return Math.round((current / total) * 100);
  };

  const {t} = useTranslation();

  return (
    <div className={styles.homeDetails__badgesContainer}>
      <Link to="calendar" className={`${styles.badge} ${styles.badge_type_deadline}`}>
        <div className={styles.badge__content}>
          <h3 className={styles.badge__title}>{t("Nearest deadline")}</h3>
          <p className={styles.badge__value}>
            <LuTimer /> <span className={styles.badge__date}>{nearestDeadline}</span>
          </p>
        </div>
      </Link>

      <Link to="user/boby/badges" className={`${styles.badge} ${styles.badge_type_achievement}`}>
        <div className={styles.badge__content}>
          <h3 className={styles.badge__title}>{t("Achievement progress")}</h3>
          <p className={styles.badge__value}>
            <GrAchievement />{" "}
            <span>
              {achievementProgress.current} / {achievementProgress.total}
            </span>
          </p>
          <div
            className={styles.badge__xpBar}
            data-percent={`${calcPercent(achievementProgress.current, achievementProgress.total)}%`}
          >
            <div
              className={styles.badge__xpFill}
              style={{ width: `${calcPercent(achievementProgress.current, achievementProgress.total)}%` }}
            />
          </div>
        </div>
      </Link>

      <article className={`${styles.badge} ${styles.badge_type_next}`} onClick={toggleModal}>
        <div className={styles.badge__content}>
          <h3 className={styles.badge__title}>{t("Next achievement")}</h3>
          <p className={styles.badge__value}>
            <LuStar /> {nextAchievement.name}
          </p>
          <div
            className={styles.badge__xpBar}
            data-percent={`${calcPercent(nextAchievement.current, nextAchievement.total)}%`}
          >
            <div
              className={styles.badge__xpFill}
              style={{ width: `${calcPercent(nextAchievement.current, nextAchievement.total)}%` }}
            />
          </div>
        </div>
        <LuInfo className={styles.badge__infoIcon} />
      </article>

      <Link to="courses" className={`${styles.badge} ${styles.badge_type_courses}`}>
        <div className={styles.badge__content}>
          <h3 className={styles.badge__title}>{t("Courses progress")}</h3>
          <p className={styles.badge__value}>
            <LuListCheck />{" "}
            <span>
              {coursesProgress.current} / {coursesProgress.total}
            </span>
          </p>
          <div
            className={styles.badge__xpBar}
            data-percent={`${calcPercent(coursesProgress.current, coursesProgress.total)}%`}
          >
            <div
              className={styles.badge__xpFill}
              style={{ width: `${calcPercent(coursesProgress.current, coursesProgress.total)}%` }}
            />
          </div>
        </div>
      </Link>

      <ModalWrapper
        isOpen={isOpen}
        onClose={toggleModal}
        title={t("Next achievement")}
        variant="center"
      >
        <p>{nextAchievement.description}</p>
        <p>
          {t("Progress")}: {nextAchievement.current} {t("of")} {nextAchievement.total}
        </p>
      </ModalWrapper>
    </div>
  );
};