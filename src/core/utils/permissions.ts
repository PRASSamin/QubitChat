import notifee, { AuthorizationStatus } from "@notifee/react-native";

export const requestNotificationPermission = async () => {
  try {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      console.log("Notification permissions granted");
      return true;
    } else if (
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
    ) {
      console.log("Notification permissions granted with provisional status");
      return true;
    } else {
      console.log("Notification permissions denied");
      return false;
    }
  } catch (error) {
    console.log("Error requesting permission:", error);
    return false;
  }
};
