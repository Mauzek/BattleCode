import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";
import { NotifButton } from "./notifButton";
import { ProfileButton } from "./profileButton";

const MOBILE_BREAKPOINT = 850;
const HEADER_HEIGHT = 50;

export const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const isHiddenRef = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.set(header, { y: 0, opacity: 1 });

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

      if (!isMobile) {
        if (isHiddenRef.current) {
          gsap.to(header, {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          });
          isHiddenRef.current = false;
        }
        lastScrollY.current = currentScroll;
        return;
      }

      const scrollingDown = currentScroll > lastScrollY.current;
      const pastHeader = currentScroll > HEADER_HEIGHT;

      if (scrollingDown && pastHeader && !isHiddenRef.current) {
        gsap.to(header, {
          y: "-100%",
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
        isHiddenRef.current = true;
      } else if (!scrollingDown && isHiddenRef.current) {
        gsap.to(header, {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        });
        isHiddenRef.current = false;
      }

      lastScrollY.current = currentScroll;
    };

    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestTick);
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <Link to="/" className={styles.header__logo}>
        <img
          src="/logo.svg"
          alt="BattleCode logo"
          className={styles.header__logoImage}
        />
        <h1 className={styles.header__title}>
          Battle<span className={styles.header__titleAccent}>Code</span>
        </h1>
      </Link>

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
            Dashboard
          </Link>
          <Link
            to="/courses"
            className={`${styles.header__link} ${
              pathname.startsWith("/courses") ? styles["header__link--active"] : ""
            }`}
          >
            Courses
          </Link>
          <Link
            to="/calendar"
            className={`${styles.header__link} ${
              pathname.startsWith("/calendar") ? styles["header__link--active"] : ""
            }`}
          >
            Calendar
          </Link>
        </nav>
      </div>

      <div className={styles.header__actions}>
        <div className={styles.header__sideActions}>
          <Link
            to="/courses/my"
            className={`${styles.header__action} ${styles["header__action--mycourses"]}`}
            data-label="Мои курсы"
          >
            <LuNotebookPen color="#fff" size={24} />
          </Link>
          <NotifButton />
        </div>
        <ProfileButton />
      </div>
    </header>
  );
};
