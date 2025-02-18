import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, { AuthorizationStatus } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { StreamClient as client } from "../constants/instances";
import { useUser } from "@clerk/clerk-expo";
import { LoadingIndicator } from "@/src/components/LoadingIndicator";
import {
  NotificationContextType,
  NotificationPermissionStatus,
} from "../types";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useUser();
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermissionStatus>("notDetermined");
  const [userPreference, setUserPreferenceState] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  useEffect(() => {
    if (notificationPermissionStatus !== "notDetermined") {
      loadUserPreference();
    }
  }, [notificationPermissionStatus]);

  const checkNotificationPermission = async () => {
    const settings = await notifee.getNotificationSettings();
    let status: NotificationPermissionStatus = "notDetermined";

    if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      status = "granted";
    } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      status = "denied";
    }

    setNotificationPermissionStatus(status);
  };

  const requestPermission = async () => {
    const settings = await notifee.requestPermission();
    let status: NotificationPermissionStatus = "notDetermined";

    if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      status = "granted";
    } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      status = "denied";
    }

    setNotificationPermissionStatus(status);
  };

  const loadUserPreference = async () => {
    const storedPreference = await AsyncStorage.getItem(
      "userNotificationPreference"
    );

    if (storedPreference !== null) {
      setUserPreferenceState(storedPreference === "true");
    } else {
      setUserPreferenceState(notificationPermissionStatus === "granted");
    }
  };

  const setUserPreference = async (value: boolean) => {
    setUserPreferenceState(value);
    await AsyncStorage.setItem("userNotificationPreference", value.toString());
  };

  useEffect(() => {
    const registerPushToken = async () => {
      const token = await messaging().getToken();
      const push_provider = "firebase";
      const push_provider_name = "QubitChat";
      client.addDevice(token, push_provider, user?.id, push_provider_name);
    };

    const init = async () => {
      await requestPermission();
      await registerPushToken();
    };

    init();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notificationPermissionStatus,
        requestPermission,
        userPreference: userPreference ?? false,
        setUserPreference,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
