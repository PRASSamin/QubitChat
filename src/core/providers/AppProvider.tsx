import React, { PropsWithChildren } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Asset } from "expo-asset";
import { pushUserToLocalStorage } from "../utils/pushUserToLocal";
import { User } from "../types";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isSignedIn, user } = useUser();

  const preLoadIcons = async () => {
    await Asset.loadAsync([
      require("@expo/vector-icons/AntDesign"),
      require("@expo/vector-icons/FontAwesome"),
      require("@expo/vector-icons/Ionicons"),
      require("@expo/vector-icons/MaterialCommunityIcons"),
      require("@expo/vector-icons/MaterialIcons"),
    ]);
  };

  useEffect(() => {
    preLoadIcons();
  }, []);

  useEffect(() => {
    if (user) {
      pushUserToLocalStorage(user as User);
    }
  }, [isSignedIn]);

  return <>{children}</>;
};
