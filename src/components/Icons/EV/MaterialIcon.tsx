import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ExpoMatIconType } from "@/src/core/types/icon";

const MaterialIcon: React.FC<ExpoMatIconType> = React.memo(
  ({ name, size, color, className, ...props }) => {
    return Object.keys(MaterialCommunityIcons.glyphMap).includes(name) ? (
      <MaterialCommunityIcons
        // @ts-ignore
        name={name}
        size={size || 20}
        color={color || "white"}
        className={className}
        {...props}
      />
    ) : (
      <MaterialIcons
        // @ts-ignore
        name={name}
        size={size || 20}
        color={color || "white"}
        className={className}
        {...props}
      />
    );
  }
);

export { MaterialIcon, MaterialCommunityIcons };
