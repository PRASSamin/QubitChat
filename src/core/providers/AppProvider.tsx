import React, { PropsWithChildren } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Asset } from "expo-asset";

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
    const pushUserToLocalStorage = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedUser && user) {
        const {
          id,
          firstName,
          lastName,
          imageUrl,
          emailAddresses,
          publicMetadata: { chatToken },
        } = user;

        const userInfo = {
          id,
          firstName,
          lastName,
          image: imageUrl,
          emailAddresses,
          chatToken,
        };

        await AsyncStorage.setItem("user", JSON.stringify(userInfo));
      }
    };

    pushUserToLocalStorage();
  }, [isSignedIn]);

  return <>{children}</>;
};
