import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDarkMode: true,
  theme: "dark",
  toggleDarkMode: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      body.classList.remove("dark");
      body.classList.add("light");
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.warn("Unable to save theme to localStorage", e);
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleTheme = toggleDarkMode;

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: theme === "dark",
        theme,
        toggleDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
