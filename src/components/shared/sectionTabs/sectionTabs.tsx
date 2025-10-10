import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiArrowLongLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import type { SectionTabsProps } from "./types";
import styles from "./sectionTabs.module.scss";

export const SectionTabs = ({
  tabs,
  label = "Section navigation",
}: SectionTabsProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const list = listRef.current;
    if (!list) return;
    const { scrollLeft, scrollWidth, clientWidth } = list;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scrollByAmount = (amount: number) => {
    listRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    checkScroll();
    list.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      list.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <section className={styles["section-tabs"]}>
      <div className={styles["section-tabs__header"]}>
        <NavLink
          to="/"
          className={styles["section-tabs__back"]}
          aria-label="Назад"
        >
          <HiArrowLongLeft />
        </NavLink>
        <h2 className={styles["section-tabs__title"]}>{label}</h2>
      </div>

      <div className={styles["section-tabs__scrollWrapper"]}>
        {canScrollLeft && (
          <button
            className={`${styles["section-tabs__arrow"]} ${styles["section-tabs__arrow--left"]}`}
            onClick={() => scrollByAmount(-200)}
            aria-label="Прокрутить влево"
          >
            <HiOutlineChevronLeft />
          </button>
        )}

        <nav className={styles["section-tabs__nav"]} aria-label={label}>
          <ul
            ref={listRef}
            className={`${styles["section-tabs__list"]} ${
              tabs.length >= 3 ? styles["section-tabs__list--scrollable"] : ""
            }`}
          >
            {tabs.map((tab) => (
              <li key={tab.path} className={styles["section-tabs__item"]}>
                <NavLink
                  to={tab.path}
                  end={true}
                  className={({ isActive }) =>
                    `${styles["section-tabs__link"]} ${
                      isActive ? styles["section-tabs__link--active"] : ""
                    }`
                  }
                >
                  {tab.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {canScrollRight && (
          <button
            className={`${styles["section-tabs__arrow"]} ${styles["section-tabs__arrow--right"]}`}
            onClick={() => scrollByAmount(200)}
            aria-label="Прокрутить вправо"
          >
            <HiOutlineChevronRight />
          </button>
        )}
      </div>
    </section>
  );
};
