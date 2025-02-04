import { Tabs } from "expo-router";
import { useUsername } from "@/core/hooks/useUsername";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hexThemes } from "@/core/constants/Theme";
import { useColorScheme } from "nativewind";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === "granted";
  }
  return true;
};

export default function Layout() {
  const { isLoaded, username } = useUsername();
  const { colorScheme } = useColorScheme();
  const theme = hexThemes[colorScheme || "light"];

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopWidth: 0,
            paddingTop: Platform.OS === "ios" ? 12 : 10,
            paddingBottom: Platform.OS === "ios" ? 20 : 12,
            height: Platform.OS === "ios" ? 85 : 70,
            ...(Platform.OS === "android"
              ? { elevation: 5 } // Adds shadow for Android
              : { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10 }), // Subtle shadow for iOS
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Chats",
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={size} name="chatbubble" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={size} name="settings-sharp" color={color} />
            ),
          }}
        />
      </Tabs>
  );
}
