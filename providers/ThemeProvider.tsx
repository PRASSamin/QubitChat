import React, { createContext } from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { themes } from "@/core/constants/Theme";
import { ThemeType } from "@/core/types";

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeContext = createContext<{
  theme: ThemeType;
}>({
  theme: "light",
});
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeContext.Provider value={{ theme: colorScheme! }}>
      <View style={themes[colorScheme!]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
