import type * as Svg from "react-native-svg";
import { EmailAddressResource, UserResource } from "@clerk/types";
import { ImageProps, ViewProps } from "react-native";
import { ImageSourcePropType } from "react-native";
import { Hex, Hsl } from "./color";

export type AuthProviderType = "google" | "github" | "facebook";
export type ThemeType = "light" | "dark";
export type SvgType = React.ComponentType<
  Svg.SvgProps & {
    size?: number;
  }
>;

export interface User extends UserResource {
  publicMetadata: {
    chatToken: string;
    role?: "admin" | "user";
  };
}

export interface LocalUser {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  chatToken: string;
  emailAddresses: EmailAddressResource[];
}

export type PickerProps = {
  selectedPicker?: "images" | "file" | "camera" | "video";
};

export interface CollageProps extends ViewProps {
  images: (string | ImageSourcePropType)[];
  matrix: number[][];
  width: number;
  height: number;
  imageOptions?: ImageProps;
  seperatorOptions?: ViewProps;
  avatar?: boolean;
}

export type {
  Channel as StreamChannelType,
  UserResponse as StreamUser,
} from "stream-chat";

export interface ThemeProps {
  background: Hex | Hsl;
  foreground: Hex | Hsl;
  muted: Hex | Hsl;
  deepMuted: Hex | Hsl;
  mutedForeground: Hex | Hsl;
  popover: Hex | Hsl;
  popoverForeground: Hex | Hsl;
  card: Hex | Hsl;
  cardForeground: Hex | Hsl;
  border: Hex | Hsl;
  input: Hex | Hsl;
  primary: Hex | Hsl;
  primaryForeground: Hex | Hsl;
  secondary: Hex | Hsl;
  secondaryForeground: Hex | Hsl;
  accent: Hex | Hsl;
  accentForeground: Hex | Hsl;
  destructive: Hex | Hsl;
  destructiveForeground: Hex | Hsl;
  ring: Hex | Hsl;
  chart1: Hex | Hsl;
  chart2: Hex | Hsl;
  chart3: Hex | Hsl;
  chart4: Hex | Hsl;
  chart5: Hex | Hsl;
  radius: string;
}
