import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalUser } from "../types";

export const getLocalUser = async (): Promise<LocalUser | null> => {
  const storedUser = await AsyncStorage.getItem("user");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};
