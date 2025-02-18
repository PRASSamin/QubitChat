import { Feather } from "@expo/vector-icons";
import React from "react";
import { ExpoFeatherIconType } from "@/src/core/types/icon";

const FeatherIcon: React.FC<ExpoFeatherIconType> = React.memo(
  ({ name, size, color, className, ...props }) => {
    return (
      <Feather
        name={name}
        size={size || 20}
        color={color || "white"}
        className={className}
        {...props}
      />
    );
  }
);

export { FeatherIcon, Feather };