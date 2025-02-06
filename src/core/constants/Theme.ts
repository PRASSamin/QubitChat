/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import {hslTohex} from "@/src/core/utils/hslTohex";
import {vars} from "nativewind";

const lightColorScheme = {
  "--background": "245 34% 100%",
  "--foreground": "245 58% 3%",
  "--muted": "215 17% 95%",
  "--muted-foreground": "215 12% 31%",
  "--popover": "245 34% 100%",
  "--popover-foreground": "245 58% 3%",
  "--card": "245 34% 100%",
  "--card-foreground": "245 58% 3%",
  "--border": "245 13% 95%",
  "--input": "245 13% 95%",
  "--primary": "245 41% 71%",
  "--primary-foreground": "245 41% 11%",
  "--secondary": "215 41% 71%",
  "--secondary-foreground": "215 41% 11%",
  "--accent": "275 41% 71%",
  "--accent-foreground": "275 41% 11%",
  "--destructive": "22 81% 29%",
  "--destructive-foreground": "22 81% 89%",
  "--ring": "245 41% 71%",
  "--radius": "0.5rem",
};

const darkColorScheme = {
  "--background": "245 59% 3%",
  "--foreground": "245 16% 99%",
  "--muted": "215 17% 5%",
  "--muted-foreground": "215 12% 69%",
  "--popover": "245 59% 3%",
  "--popover-foreground": "245 16% 99%",
  "--card": "245 59% 3%",
  "--card-foreground": "245 16% 99%",
  "--border": "245 13% 15%",
  "--input": "245 13% 15%",
  "--primary": "245 41% 71%",
  "--primary-foreground": "245 41% 11%",
  "--secondary": "215 41% 71%",
  "--secondary-foreground": "215 41% 11%",
  "--accent": "275 41% 71%",
  "--accent-foreground": "275 41% 11%",
  "--destructive": "22 81% 60%",
  "--destructive-foreground": "22 81% 0%",
  "--ring": "245 41% 71%",
  "--radius": "0.5rem",
};

export const themes = {
  light: vars(lightColorScheme),
  dark: vars(darkColorScheme),
};

export const hexThemes = {
  light: hslTohex(lightColorScheme),
  dark: hslTohex(darkColorScheme),
};
