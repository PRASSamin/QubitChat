import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hexThemes } from "@/src/core/constants/Theme";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { requestNotificationPermission } from "@/src/core/utils/permissions";
import { NovaIcon } from "@/src/components/Icons/svg/NovaIcon";
import { useChatContext } from "stream-chat-expo";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  const theme = hexThemes[colorScheme || "light"];
  const { client } = useChatContext();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (client?.user?.total_unread_count) {
      setUnreadCount(Number(client.user?.total_unread_count));
    }
  }, [client?.user?.total_unread_count]);

  useEffect(() => {
    if (!client) return;

    const handleNewMessage = (event: any) => {
      setUnreadCount(Number(event.total_unread_count));
    };

    const handleHealthCheck = (event: any) => {
      if (event?.me?.total_unread_count) {
        setUnreadCount(Number(event.me.total_unread_count));
      }
    };

    client.on("message.new", handleNewMessage);
    client.on("health.check", handleHealthCheck);

    return () => {
      client.off("message.new", handleNewMessage);
      client.off("health.check", handleHealthCheck);
    };
  }, [client]);

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
            ? { elevation: 5 }
            : { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10 }),
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
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      <Tabs.Screen
        name="nova"
        options={{
          title: "Nova",
          tabBarIcon: ({ color, size }) => <NovaIcon color={color} />,
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
