import { GrAchievement } from "react-icons/gr";
import { LuStar, LuListCheck, LuTimer, LuInfo } from "react-icons/lu";
import { Link } from "react-router-dom";
import styles from "./homeDetails.module.scss";
import { useState } from "react";
import { ModalWrapper } from "../modalWrapper";

export const Badges = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.homeDetails__badgesContainer}>

      <Link to="calendar" className={`${styles.badge} ${styles.badge_type_deadline}`}>
        <div className={styles.badge__content}>
          <h3 className={styles.badge__title}>Nearest deadline</h3>
          <p className={styles.badge__value}>
            <LuTimer /> <span className={styles.badge__date}>30.10.2025</span>
          </p>
        </div>
      </Link>

      <Link to="user/boby/badges" className={`${styles.badge} ${styles.badge_type_achievement}`}>
        <div className={styles.badge__content}>
          <h3 className={styles.badge__title}>Achievement progress</h3>
          <p className={styles.badge__value}>
            <GrAchievement /> <span>62 / 120</span>
          </p>
          <div className={styles.badge__xpBar} data-percent={`${Math.round((62 / 120) * 100)}%`}>
            <div
              className={styles.badge__xpFill}
              style={{ width: `${Math.round((62 / 120) * 100)}%` }}
            />
          </div>
        </div>
      </Link>

      <article className={`${styles.badge} ${styles.badge_type_next}`} onClick={toggleModal}>
        <div className={styles.badge__content}>
          <h3 className={styles.badge__title}>Next achievement</h3>
          <p className={styles.badge__value}>
            <LuStar /> Warrior
          </p>
          <div className={styles.badge__xpBar} data-percent={`${Math.round((1 / 3) * 100)}%`}>
            <div
              className={styles.badge__xpFill}
              style={{ width: `${Math.round((1 / 3) * 100)}%` }}
            />
          </div>
        </div>
        <LuInfo className={styles.badge__infoIcon} />
      </article>

      <Link to="courses" className={`${styles.badge} ${styles.badge_type_courses}`}>
        <div className={styles.badge__content}>
          <h3 className={styles.badge__title}>Courses progress</h3>
          <p className={styles.badge__value}>
            <LuListCheck /> <span>7 / 86</span>
          </p>
          <div className={styles.badge__xpBar} data-percent={`${Math.round((7 / 86) * 100)}%`}>
            <div
              className={styles.badge__xpFill}
              style={{ width: `${Math.round((7 / 86) * 100)}%` }}
            />
          </div>
        </div>
      </Link>

      <ModalWrapper
        isOpen={isOpen}
        onClose={toggleModal}
        title="Next achievement"
        variant="center"
      >
        <p>Инфа про то как получить ачивку.</p>
        <p>Выиграть 3 боя против бомжей!</p>
        <p>Прогресс: 1 из 3</p>
      </ModalWrapper>
    </div>
  );
};