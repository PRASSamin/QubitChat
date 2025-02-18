import type { DeepPartial, MarkdownStyle, Theme } from "stream-chat-expo";
import { hexThemes } from "./Theme";
import { ThemeType } from "../types";

const _Markdown = (scheme?: ThemeType): DeepPartial<MarkdownStyle> => {
  const {
    primary,
    muted,
    mutedForeground,
    primaryForeground,
    accentForeground,
    foreground,
    border,
    destructive,
    accent,
    secondary,
  } = hexThemes[scheme || "light"];
  return {
    autolink: {
      color: accent,
      textDecorationLine: "underline",
    },
    blockQuoteBar: { backgroundColor: border, width: 4 },
    blockQuoteSection: {
      backgroundColor: muted,
      padding: 10,
    },
    blockQuoteSectionBar: { backgroundColor: border },
    blockQuoteText: {
      color: mutedForeground,
      fontStyle: "italic",
    },
    br: { height: 10 },
    codeBlock: {
      backgroundColor: muted,
      color: foreground,
      padding: 10,
      borderRadius: 5,
      fontFamily: "monospace",
    },
    del: {
      textDecorationLine: "line-through",
      color: destructive,
    },
    em: { fontStyle: "italic", color: foreground },
    heading: { fontWeight: "bold", color: foreground },
    heading1: { fontSize: 24 },
    heading2: { fontSize: 22 },
    heading3: { fontSize: 20 },
    heading4: { fontSize: 18 },
    heading5: { fontSize: 16 },
    heading6: { fontSize: 14 },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: border,
      marginVertical: 10,
    },
    image: { borderRadius: 8 },
    inlineCode: {
      backgroundColor: muted,
      color: foreground,
      padding: 4,
      borderRadius: 4,
      fontFamily: "monospace",
    },
    list: { marginVertical: 5 },
    listItem: { flexDirection: "row", alignItems: "center" },
    listItemBullet: { color: primary, fontSize: 16 },
    listItemNumber: { color: primary, fontSize: 16 },
    listItemText: { color: foreground },
    listRow: { marginVertical: 5 },
    mailTo: {
      color: accentForeground,
      textDecorationLine: "underline",
    },
    mentions: { color: secondary, fontWeight: "bold" },
    newline: { height: 10 },
    noMargin: { margin: 0 },
    paragraph: { color: foreground, marginVertical: 5 },
    paragraphCenter: { textAlign: "center" },
    paragraphWithImage: { flexDirection: "row", alignItems: "center" },
    strong: { fontWeight: "bold", color: foreground },
    sublist: { paddingLeft: 10 },
    table: { borderWidth: 1, borderColor: border },
    tableHeader: { backgroundColor: muted },
    tableHeaderCell: {
      fontWeight: "bold",
      color: foreground,
      padding: 5,
    },
    tableRow: {
      backgroundColor: muted + "80",
      borderBottomWidth: 1,
      borderBottomColor: border,
    },
    tableRowCell: { padding: 5, color: foreground },
    tableRowLast: { borderBottomWidth: 0 },
    text: { color: foreground },
    u: { textDecorationLine: "underline", color: primary },
  };
};

const _Theme = (scheme?: ThemeType): DeepPartial<Theme> => {
  const {
    background,
    muted,
    border,
    accent,
    foreground,
    mutedForeground,
    deepMuted,
  } = hexThemes[scheme || "light"];
  return {
    colors: {
      black: foreground,
      white_snow: background,
      white: deepMuted,
      grey_whisper: scheme === "dark" ? border : mutedForeground + "50",
      targetedMessageBackground: muted,
      light_gray: muted,
      light_blue: accent + "60",
      code_block: muted,
      grey_gainsboro: "transparent",
      accent_blue: accent, // indicators, icons,
      blue_alice: accent + "60", // card,
      transparent: "transparent",
      border: border,
      accent_red: accent,
      overlay: scheme === "dark" ? "#ffffffCC" : "#000000CC",
      white_smoke: muted,
    },
    messageInput: {
      replyContainer: {
        paddingBottom: 0,
        paddingHorizontal: 0,
      },
    },
    messageSimple: {
      gallery: {
        image: {
          borderRadius: 10, // Fix overflow issues
        },
        moreImagesContainer: {
          margin: 0,
        },
      },
      unreadUnderlayColor: background,
      content: {
        markdown: _Markdown(scheme),
      },
      reactionListTop: {
        container: {
          backgroundColor: scheme === "dark" ? "#161616" : "#c5c5c5",
          top: -10,
        },
      },
    },
    attachmentSelectionBar: {
      container: {
        backgroundColor: muted, // attachment selection bar background color
      },
    },
    attachmentPicker: {
      imageOverlaySelectedComponent: {
        check: {
          backgroundColor: muted, // selected image checked icon background color
        },
      },
      bottomSheetContentContainer: {
        backgroundColor: muted,
      },
    },
    imageGallery: {
      footer: {
        imageCountText: {
          display: "none",
        },
      },
    },
    reply: {
      container: {
        display: "none",
      },
    },
  };
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

export const ChatTheme = (scheme?: ThemeType): DeepPartial<Theme> =>
  _Theme(scheme);
