import { useTheme } from "@/hooks";
import type { RootState } from "@/store";
import { setLanguage } from "@/store/slices/localeSlice";
import { LuLanguages, LuMoon, LuSun } from "react-icons/lu";
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
            <LuSun /> Light
          </>
        ) : (
          <>
            <LuMoon /> Dark
          </>
        )}
      </button>
      <div style={{marginTop:50}}>

      <button onClick={toggleLanguage}>
        <LuLanguages />
        {language === "ru" ? "РУ" : "EN"}
      </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
