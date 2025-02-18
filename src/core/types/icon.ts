import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  AntDesign,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

export interface ExpoMatIconType
  extends IconProps<
    | keyof (typeof MaterialCommunityIcons)["glyphMap"]
    | keyof (typeof MaterialIcons)["glyphMap"]
  > {}

export interface ExpoIonIconType
  extends IconProps<keyof (typeof Ionicons)["glyphMap"]> {}

export interface ExpoAntIconType
  extends IconProps<keyof (typeof AntDesign)["glyphMap"]> {}

export interface ExpoFAIconType
  extends IconProps<keyof (typeof FontAwesome)["glyphMap"]> {}


export interface ExpoFeatherIconType
  extends IconProps<keyof (typeof Feather)["glyphMap"]> {}