import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
    // Debug log
    console.log("[ThemeToggle] theme:", theme, "html.classList:", document.documentElement.className);
  }, [theme]);

  return [theme, setTheme];
}
