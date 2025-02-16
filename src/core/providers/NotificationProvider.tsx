import messaging from "@react-native-firebase/messaging";
import { useState, useEffect, PropsWithChildren } from "react";
import { StreamClient as client } from "../constants/instances";
import { useUser } from "@clerk/clerk-expo";
import { LoadingIndicator } from "@/src/components/LoadingIndicator";

const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
};

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useUser();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Register FCM token with stream chat server.
    const registerPushToken = async () => {
      const token = await messaging().getToken();
      const push_provider = "firebase";
      const push_provider_name = "QubitChat";
      client.addDevice(token, push_provider, user?.id, push_provider_name);
    };

    const init = async () => {
      await requestPermission();
      await registerPushToken();

      setIsReady(true);
    };

    init();
  }, []);

  if (!isReady) {
    return <LoadingIndicator />;
  }

  return <>{children}</>;
};
