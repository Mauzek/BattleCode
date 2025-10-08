import { NavLink } from "react-router-dom";
import styles from "./mobileNavBar.module.scss";
import { LuHouse, LuBook, LuUser, LuCalendar, LuLayers } from "react-icons/lu";

interface Tab {
  icon: React.ReactNode;
  path: string;
  end?: boolean;
}

export const MobileNavBar: React.FC = () => {
  const tabs: Tab[] = [
    { icon: <LuHouse />, path: "/", end: true },
    { icon: <LuBook />, path: "/courses", end: true },
    { icon: <LuUser />, path: "/user/boby", end: true },
    { icon: <LuCalendar />, path: "/calendar", end: true },
    { icon: <LuLayers />, path: "/courses/my" },
  ];

  return (
    <div className={styles.navBar}>
      <nav className={styles.navBar__nav}>
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.path}
            end={tab.end}
            onClick={() => window.scrollTo(0,0)}
            className={({ isActive }) =>
              `${styles.navBar__tab} ${
                isActive ? styles["navBar__tab--active"] : ""
              }`
            }
          >
            {tab.icon}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
