import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useThemeSwitcher() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const darkMode = JSON.parse(Cookies.get("darkMode") ?? "false");
    if (darkMode) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  function toggleDarkMode() {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
      Cookies.set("darkMode", JSON.stringify(false));
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
      Cookies.set("darkMode", JSON.stringify(true));
    }
  }
  return {
    darkMode,
    toggleDarkMode,
  };
}
