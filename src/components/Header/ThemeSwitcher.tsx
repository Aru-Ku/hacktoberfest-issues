import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import MoonIcon from "../../icons/MoonIcon";
import SunIcon from "../../icons/SunIcon";
import { IconButton } from "../Button/IconButton";

export default function ThemeSwitcher() {
  const { darkMode, toggleDarkMode } = useThemeSwitcher();

  return (
    <button
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600  text-black dark:text-white "
      onClick={toggleDarkMode}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
