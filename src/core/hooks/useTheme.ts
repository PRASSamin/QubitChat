import { useContext, useEffect } from "react";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { ThemeContext } from "@/src/core/providers/ThemeProvider";
import { hexThemes } from "@/src/core/constants/Theme";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider />");
  }

  const { theme, setTheme } = context;

  useEffect(() => {
    setBackgroundColorAsync(hexThemes[theme].background);
  }, [theme]);

  return { theme, setTheme };
}
