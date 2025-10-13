import { useState, useRef, useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { LuMoon, LuLogOut, LuSun } from "react-icons/lu";
import styles from "./header.module.scss";
import { useTheme } from "@/hooks";

export const ProfileButton = () => {
  const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!dropdownRef.current) return;

    gsap.set(dropdownRef.current, {
      opacity: 0,
      scale: 0.8,
      transformOrigin: "top right",
      pointerEvents: "none",
    });

    tl.current = gsap.timeline({ paused: true });
    tl.current.to(dropdownRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power3.out",
      pointerEvents: "auto",
    });
  }, []);

  useEffect(() => {
    if (!tl.current) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (open) {
      tl.current.play();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      tl.current.reverse();
      tl.current.eventCallback("onReverseComplete", () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={styles.header__profileWrapper}>
      <div
        ref={buttonRef}
        className={`${styles.header__action} ${
          styles["header__action--profile"]
        } ${open && styles["header__action--active"]}`}
        data-label="Профиль"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MdMoreVert color="#fff" size={24} />
        <img
          className={styles.header__avatar}
          src="/noavatar.png"
          alt="Профиль"
        />
      </div>

      <div ref={dropdownRef} className={styles.profileDropdown}>
        <div className={styles.profileDropdown__user}>
          <p className={styles.profileDropdown__username}>Boby</p>
          <span className={styles.profileDropdown__level}>lvl 9</span>
        </div>

        <Link
          to="/user/boby"
          className={styles.profileDropdown__link}
          onClick={() => setOpen(false)}
        >
          Profile
        </Link>

        <Link
          to="/user/boby/settings"
          className={styles.profileDropdown__link}
          onClick={() => setOpen(false)}
        >
          Settigns
        </Link>

        <button className={styles.profileDropdown__button} onClick={toggleTheme}>
          <div className={styles.profileDropdown__theme}>
            <p className={styles.profileDropdown__themeLabel}>Switch theme</p>
            <p className={styles.profileDropdown__themeMode}>
              {theme === "light" ? <><LuSun /> Light mode </>: <><LuMoon /> Dark mode</>}
            </p>
          </div>
        </button>

        <div className={styles.profileDropdown__division} />

        <button
          className={`${styles.profileDropdown__button} ${styles["profileDropdown__button--logout"]}`}
        >
          <LuLogOut size={24} /> Log out
        </button>
      </div>
    </div>
  );
};
