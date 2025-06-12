import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function toggleTheme() {
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      {!isDarkMode ? <span className="w-4">🌞</span> : <span className="w-4" />}
      <Switch checked={isDarkMode} onCheckedChange={() => toggleTheme()} />
      {isDarkMode ? <span className="w-4">🌙</span> : <span className="w-4" />}
    </div>
  );
};

export default ThemeSwitcher;
