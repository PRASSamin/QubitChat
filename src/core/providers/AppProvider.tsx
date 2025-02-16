import React, { PropsWithChildren } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isSignedIn, user } = useUser();
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
