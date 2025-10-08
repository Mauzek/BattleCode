import { NavLink } from "react-router-dom";
import styles from "./mobileNavBar.module.scss";
import { LuHouse, LuBook, LuCalendar } from "react-icons/lu";
import { LuNotebookPen } from "react-icons/lu";

interface Tab {
  icon?: React.ReactNode;
  path: string;
  end?: boolean;
  avatar?: string;
}

export const MobileNavBar: React.FC = () => {
  const userPhoto: string | null = null;
  const avatar = userPhoto ?? "/noavatar.png";

  const tabs: Tab[] = [
    { icon: <LuHouse />, path: "/", end: true },
    { icon: <LuBook />, path: "/courses", end: true },
    { path: "/user/boby", end: true, avatar },
    { icon: <LuCalendar />, path: "/calendar", end: true },
    { icon: <LuNotebookPen />, path: "/courses/my" },
  ];

  return (
    <div className={styles.navBar}>
      <nav className={styles.navBar__nav}>
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.path}
            end={tab.end}
            onClick={() => window.scrollTo(0, 0)}
            className={({ isActive }) =>
              `${styles.navBar__tab} ${
                isActive ? styles["navBar__tab--active"] : ""
              }`
            }
          >
            {tab.avatar ? (
              <img
                src={tab.avatar}
                alt="Avatar"
                className={styles.navBar__avatar}
              />
            ) : (
              tab.icon
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
