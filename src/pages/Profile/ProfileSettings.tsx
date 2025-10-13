import { useTheme } from "@/hooks";
import type { RootState } from "@/store";
import { setLanguage } from "@/store/slices/localeSlice";
import { LuMoon, LuSun } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const ProfileSettings = () => {
  const { theme, toggleTheme } = useTheme();

  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.locale);

  const toggleLanguage = () => {
    const newLang = language === "ru" ? "en" : "ru";
    dispatch(setLanguage(newLang));
  };

  return (
    <div>
      <h3>ProfileSettings</h3>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <>
            <LuSun /> Light mode{" "}
          </>
        ) : (
          <>
            <LuMoon /> Dark mode
          </>
        )}
      </button>
      <div style={{marginTop:50}}>

      <button onClick={toggleLanguage}>
        {language === "ru" ? "Русский язык" : "English language"}
      </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
