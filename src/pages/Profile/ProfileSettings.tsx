import { useTheme } from "@/hooks"
import { LuMoon, LuSun } from "react-icons/lu";

const ProfileSettings = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <div>
      <h3>ProfileSettings</h3>
      <button onClick={toggleTheme}>{theme === "light" ? <><LuSun /> Light mode </>: <><LuMoon /> Dark mode</>}</button>
    </div>
  )
}

export default ProfileSettings
