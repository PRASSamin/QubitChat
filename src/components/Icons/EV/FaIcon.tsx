import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ExpoFAIconType } from "@/src/core/types/icon";

const FaIcon: React.FC<ExpoFAIconType> = React.memo(
  ({ name, size, color, className, ...props }) => {
    return (
      <FontAwesome
        name={name}
        size={size || 20}
        color={color || "white"}
        className={className}
        {...props}
      />
    );
  }
);

export { FaIcon, FontAwesome };
