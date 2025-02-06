import {useEffect, useState} from "react";
import {Appearance} from "react-native";
import {useColorScheme} from "nativewind";
import {setBackgroundColorAsync} from "expo-navigation-bar";
import {hexThemes} from "@/src/core/constants/Theme";
import {ThemeType} from "../types";

export function useTheme() {
  const { setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(
    (Appearance.getColorScheme() || "light") as ThemeType
  );

  useEffect(() => {
    if (theme) {
      setColorScheme(theme);
      setBackgroundColorAsync(hexThemes[theme].background);
    }
  }, [theme]);

  return { theme, setTheme };
}
