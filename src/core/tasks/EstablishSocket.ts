import { AppState } from "react-native";
import { StreamClient as client } from "../constants/instances";
import { getLocalUser } from "../utils/getLocalUser";
import * as TaskManager from "expo-task-manager";
import { BackgroundFetchResult } from "expo-background-fetch";

export const EstablishSocket = async () => {
  const user = await getLocalUser();
  try {
    await client.connectUser({ id: user?.id! }, user?.chatToken);
    console.log("WebSocket connection established");
  } catch (error) {
    console.log("Failed to reconnect WebSocket", error);
  }
  return BackgroundFetchResult.NewData;
};

TaskManager.defineTask(
  "establish-websocket",
  async () => await EstablishSocket()
);
