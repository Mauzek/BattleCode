import { ModalWrapper, Skeleton } from "@/components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main style={{ height: "2000px" }}>
      <div className={styles.topInfo}>
        <div className={styles.topInfo__info}>
          <h1 className={styles.topInfo__name}>
            Boby <span className={styles.topInfo__level}>9 lvl</span>
          </h1>
          <div className={styles.topInfo__xpBar} data-xp={`${1923}xp`}>
            <div className={styles.topInfo__xpFill} style={{ width: "65%" }} />
          </div>
          <div className={styles.topInfo__badges}>
            <Skeleton width={100} height={30} borderRadius={16} />
            <Skeleton width={100} height={30} borderRadius={16} />
          </div>
        </div>
      </div>

      <section className="content">
        <button onClick={() => setIsMenuOpen(true)}>Открыть меню</button>
        <Skeleton width="100%" height={100} borderRadius={16} />
      </section>

      <ModalWrapper
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Test"
        variant="center"
      >
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/courses">Курсы</Link>
          <Link to="/user/boby">Профиль</Link>
          <Link to="/calendar">Календарь</Link>
        </nav>
      </ModalWrapper>
    </main>
  );
};
