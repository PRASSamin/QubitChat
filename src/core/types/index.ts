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

export type NotificationPermissionStatus = "granted" | "denied" | "notDetermined";

export interface NotificationContextType {
  notificationPermissionStatus: NotificationPermissionStatus;
  requestPermission: () => Promise<void>;
  userPreference: boolean;
  setUserPreference: (value: boolean) => void;
}

export type {
  Channel as StreamChannelType,
  UserResponse as StreamUser,
} from "stream-chat";