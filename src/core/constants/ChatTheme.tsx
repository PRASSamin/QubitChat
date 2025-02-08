import type { DeepPartial, Theme } from "stream-chat-expo";
import { hexThemes } from "./Theme";

const _LightTheme: DeepPartial<Theme> = {
  colors: {
    black: "#000000",
  },
};

const _DarkTheme: DeepPartial<Theme> = {
  // channelPreview: {
  //   container: {
  //     backgroundColor: hexThemes.dark.background,
  //     height: "100%",
  //   },
  // },
  // channelListMessenger: {
  //   flatList: {
  //     backgroundColor: hexThemes.dark.background,
  //   },
  //   flatListContent: {
  //     backgroundColor: hexThemes.dark.background,
  //   },
  // },
  // channelListSkeleton: {
  //   container: {
  //     backgroundColor: hexThemes.dark.background,
  //     height: "100%",
  //   },
  //   background: {
  //     backgroundColor: hexThemes.dark.background,
  //   },
  // },
  // channelListLoadingIndicator: {
  //   container: {
  //     backgroundColor: hexThemes.dark.background,
  //   }
  // },
  colors: {
    black: "#fff",
    white_snow: hexThemes.dark.background,
    white: hexThemes.dark.muted,
    grey_whisper: hexThemes.dark.border,
    targetedMessageBackground: hexThemes.dark.muted,
  },
  messageInput: {
    replyContainer: {
      paddingBottom: 0,
      paddingHorizontal: 0,
    },
  },
  messageSimple: {
    gallery: {},
  },
  
};

const Colors = {
  accent_blue: "#005FFF",
  accent_dark_blue: "#005DFF",
  accent_error: "#FF3842",
  accent_green: "#20E070",
  accent_info: "#1FE06F",
  accent_red: "#FF3742",
  bg_gradient_end: "#F7F7F7",
  bg_gradient_start: "#FCFCFC",
  bg_user: "#F7F7F8",
  black: "#000000",
  blue_alice: "#E9F2FF",
  border: "#00000014", // 14 = 8% opacity; top: x=0, y=-1; bottom: x=0, y=1
  code_block: "#DDDDDD",
  disabled: "#B4BBBA",
  grey: "#7A7A7A",
  grey_dark: "#72767E",
  grey_gainsboro: "#DBDBDB",
  grey_whisper: "#ECEBEB",
  icon_background: "#FFFFFF",
  label_bg_transparent: "#00000033", // 33 = 20% opacity
  light_blue: "#E0F0FF",
  light_gray: "#E9EAED",
  modal_shadow: "#00000099", // 99 = 60% opacity; x=0, y= 1, radius=4
  overlay: "#000000CC", // CC = 80% opacity
  shadow_icon: "#00000040", // 40 = 25% opacity; x=0, y=0, radius=4
  static_black: "#000000",
  static_white: "#ffffff",
  targetedMessageBackground: "#302D22", // dark mode = #302D22
  text_high_emphasis: "#080707",
  text_low_emphasis: "#7E828B",
  transparent: "transparent",
  white: "#FFFFFF",
  white_smoke: "#F2F2F2",
  white_snow: "#FCFCFC",
};

export const ChatTheme = (scheme?: string): DeepPartial<Theme> =>
  scheme === "dark" ? _DarkTheme : _LightTheme;
