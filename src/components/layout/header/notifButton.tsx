import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ModalWrapper } from "@/components/modalWrapper";

export const NotifButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsMenuOpen(true)}
        className={`${styles.header__action} ${styles["header__action--notification"]}`}
        data-label="Уведомления"
      >
        <IoNotificationsOutline color="#fff" size={24} />
        <span>81</span>
      </button>
      <ModalWrapper
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Notifications"
        variant="side"
      >
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/courses">Курсы</Link>
          <Link to="/user/boby">Профиль</Link>
          <Link to="/calendar">Календарь</Link>
        </nav>
      </ModalWrapper>
    </>
  );
};
