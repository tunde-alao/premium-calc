import React, { createContext, ReactNode, useContext, useState } from "react";
import { CalculatorTheme, THEMES } from "../constants/Colors";

interface ThemeContextType {
  currentTheme: CalculatorTheme;
  setTheme: (themeName: string) => void;
  availableThemes: CalculatorTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<CalculatorTheme>(
    THEMES.dark
  );

  const setTheme = (themeName: string) => {
    if (THEMES[themeName]) {
      setCurrentTheme(THEMES[themeName]);
    }
  };

  const availableThemes = Object.values(THEMES);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
