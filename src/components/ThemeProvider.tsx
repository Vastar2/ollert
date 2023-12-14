import { FC, useState, useEffect, createContext } from "react";

export const ThemeContext = createContext<null | {
  currentTheme: string | null;
  setCurrentTheme: React.Dispatch<React.SetStateAction<string | null>>;
}>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setCurrentTheme(localTheme);
    } else {
      setCurrentTheme("light");
    }
  }, []);

  useEffect(() => {
    if (currentTheme !== null) {
      document.documentElement.classList.toggle(
        "dark",
        currentTheme === "dark"
      );
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
