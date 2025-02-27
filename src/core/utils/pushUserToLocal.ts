import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

export const pushUserToLocalStorage = async (user: User) => {
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
