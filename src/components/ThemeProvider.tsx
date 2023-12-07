import { FC, useState, useEffect, createContext } from "react";

export const ThemeContext = createContext<null | {
  isLightTheme: boolean | null;
  setIsLightTheme: React.Dispatch<React.SetStateAction<boolean | null>>;
}>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState<boolean | null>(null);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "true" || localTheme === "false") {
      setIsLightTheme(localTheme === "true");
    } else {
      setIsLightTheme(true);
    }
  }, []);

  useEffect(() => {
    if (isLightTheme !== null) {
      document.documentElement.classList.toggle("dark", !isLightTheme);
      localStorage.setItem("theme", JSON.stringify(isLightTheme));
    }
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={{ isLightTheme, setIsLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
