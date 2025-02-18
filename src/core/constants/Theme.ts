/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { hslTohex } from "@/src/core/utils/hslTohex";
import { vars } from "nativewind";
import { ThemeType } from "../types";
import { ThemeProps } from "../types/color";

const lightColorScheme = {
  "--background": "190 66% 100%",
  "--foreground": "190 53% 2%",
  "--muted": "160 13% 93%",
  "--deep-muted": "160 13% 93%",
  "--muted-foreground": "160 12% 38%",
  "--popover": "190 66% 100%",
  "--popover-foreground": "190 53% 2%",
  "--card": "190 66% 100%",
  "--card-foreground": "190 53% 2%",
  "--border": "190 6% 94%",
  "--input": "190 6% 94%",
  "--primary": "190 100% 50%",
  "--primary-foreground": "190 100% 10%",
  "--secondary": "160 100% 50%",
  "--secondary-foreground": "160 100% 10%",
  "--accent": "220 100% 50%",
  "--accent-foreground": "0 0% 100%",
  "--destructive": "15 99% 28%",
  "--destructive-foreground": "15 99% 88%",
  "--ring": "190 100% 50%",
  "--chart-1": "190 100% 50%",
  "--chart-2": "160 100% 50%",
  "--chart-3": "220 100% 50%",
  "--chart-4": "160 100% 53%",
  "--chart-5": "190 103% 50%",
  "--radius": "0.5rem",
};

const darkColorScheme = {
  "--background": "190 41% 1%",
  "--foreground": "190 34% 100%",
  "--muted": "160 13% 7%",
  "--deep-muted": "210 20% 8%",
  "--muted-foreground": "160 12% 62%",
  "--popover": "190 41% 1%",
  "--popover-foreground": "190 34% 100%",
  "--card": "190 41% 1%",
  "--card-foreground": "190 34% 100%",
  "--border": "190 6% 13%",
  "--input": "190 6% 13%",
  "--primary": "190 100% 50%",
  "--primary-foreground": "190 100% 10%",
  "--secondary": "160 100% 50%",
  "--secondary-foreground": "160 100% 10%",
  "--accent": "220 100% 50%",
  "--accent-foreground": "0 0% 100%",
  "--destructive": "15 99% 56%",
  "--destructive-foreground": "0 0% 0%",
  "--ring": "190 100% 50%",
  "--chart-1": "190 100% 50%",
  "--chart-2": "160 100% 50%",
  "--chart-3": "220 100% 50%",
  "--chart-4": "160 100% 53%",
  "--chart-5": "190 103% 50%",
  "--radius": "0.5rem",
};

export const themes = {
  light: vars(lightColorScheme),
  dark: vars(darkColorScheme),
};

export const hexThemes: Record<ThemeType, ThemeProps> = {
  light: hslTohex(lightColorScheme) as ThemeProps,
  dark: hslTohex(darkColorScheme) as ThemeProps,
};
