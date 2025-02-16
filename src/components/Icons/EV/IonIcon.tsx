import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ExpoIonIconType } from "@/src/core/types/icon";

const IonIcon: React.FC<ExpoIonIconType> = React.memo(
  ({ name, size, color, className, ...props }) => {
    return (
      <Ionicons
        name={name}
        size={size || 20}
        color={color || "white"}
        className={className}
        {...props}
      />
    );
  }
);

export { IonIcon, Ionicons };
