import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { themes } from "@/src/core/constants/Theme";
import { ThemeType } from "@/src/core/types";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
} | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme as ThemeType);
        setColorScheme(storedTheme as ThemeType);
      } else {
        const defaultTheme =
          colorScheme ?? (Appearance.getColorScheme() as ThemeType) ?? "light";
        setTheme(defaultTheme);
        setColorScheme(defaultTheme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("theme", theme);
    setColorScheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View style={themes[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
