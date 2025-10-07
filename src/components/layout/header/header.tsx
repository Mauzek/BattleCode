import toast from "react-hot-toast";
import styles from "./header.module.scss";
import { infoToast, promiseToast } from "@/components/ui";
import { FcCommandLine } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();
  const sendData = async (): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve("ok"), 3000));
  };

  const handleClick = () => {
    infoToast("Уведомляю шо ты чмо!");
    infoToast("Новые задания по С++ уже доступны!", {
      icon: <FcCommandLine size={25} />,
    });
    toast.success("Успех!");
    toast.error("Ошибка!");
    promiseToast(sendData, {
      loading: "Загрузка...",
      success: (data) => <div>{data}</div>,
      error: (err) => `${err}`,
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img
          src="/logo.svg"
          alt="BattleCode logo"
          className={styles.header__logoImage}
        />
        <h1 className={styles.header__title}>
          Battle<span className={styles.header__titleAccent}>Code</span>
        </h1>
      </div>

      <div
        className={styles.header__navContainer}
        aria-label="Основная навигация"
      >
        <nav className={styles.header__nav}>
          <Link
            to="/"
            className={`${styles.header__link} ${
              pathname === "/" ? styles["header__link--active"] : ""
            }`}
          >
            Main
          </Link>

          <Link
            to="/courses"
            className={`${styles.header__link} ${
              pathname === "/courses" ? styles["header__link--active"] : ""
            }`}
          >
            Courses
          </Link>

          <Link
            to="/calendar"
            className={`${styles.header__link} ${
              pathname === "/calendar" ? styles["header__link--active"] : ""
            }`}
          >
            Calendar
          </Link>
        </nav>
      </div>

      <div className={styles.header__actions}>
        <button
          type="button"
          className={styles.header__button}
          onClick={handleClick}
        >
          Пример
        </button>
      </div>
    </header>
  );
};
