import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ExpoAntIconType } from "@/src/core/types/icon";

const AntIcon: React.FC<ExpoAntIconType> = React.memo(
  ({ name, size, color, className, ...props }) => {
    return (
      <AntDesign
        name={name}
        size={size || 20}
        color={color || "white"}
        className={className}
        {...props}
      />
    );
  }
);

export { AntIcon, AntDesign };
