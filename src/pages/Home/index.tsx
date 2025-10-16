import { ModalWrapper, MdViewer, MdEditor, Skeleton, HomeDetails, HomeDetailsSkelenot } from "@/components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mdContent, setMdContent] = useState<string>("## Биби боба");
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const loadHomeDetails = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadHomeDetails();
  }, []);

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
        {isLoading ? <HomeDetailsSkelenot /> : <HomeDetails />}

        <button
          onClick={() => setIsMenuOpen(true)}
          style={{ marginBottom: "16px" }}
        >
          Открыть меню
        </button>
        <MdEditor value={mdContent} onChange={setMdContent} height={250} />
        <MdViewer content={mdContent} />
      </section>

      <ModalWrapper
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Навигация"
        variant="center"
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link to="/">Главная</Link>
          <Link to="/courses">Курсы</Link>
          <Link to="/user/boby">Профиль</Link>
          <Link to="/calendar">Календарь</Link>
        </nav>
      </ModalWrapper>
    </main>
  );
};