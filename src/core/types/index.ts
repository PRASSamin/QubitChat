import type * as Svg from "react-native-svg";
import { UserResource } from "@clerk/types";

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
