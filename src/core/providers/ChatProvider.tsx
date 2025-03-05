import React, { useEffect, useState, useMemo } from "react";
import { Chat, OverlayProvider, Streami18n, useTheme } from "stream-chat-expo";
import { useUser } from "@clerk/clerk-expo";
import { type TokenOrProvider } from "stream-chat";
import { StreamClient as client } from "@/src/core/constants/instances";
import { useColorScheme } from "nativewind";
import { ChatTheme } from "@/src/core/constants/ChatTheme";
import { Redirect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PickerProps, User } from "../types";
import { IonIcon } from "@/src/components/Icons/EV/IonIcon";
import { useRouter } from "expo-router";
import { LoadingIndicator } from "@/src/components/LoadingIndicator";
import { getLocalUser } from "../utils/getLocalUser";
import { pushUserToLocalStorage } from "../utils/pushUserToLocal";

const streami18n = new Streami18n({ language: "en" });

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [isClientReady, setIsClientReady] = useState(false);
  const { colorScheme } = useColorScheme();
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  // Poll for chatToken until available
  useEffect(() => {
    if (!user || user.publicMetadata.chatToken) return;

    const pollForToken = async () => {
      const interval = setInterval(async () => {
        try {
          await user.reload();
          if (user.publicMetadata.chatToken) {
            clearInterval(interval);
          }
        } catch (err) {
          console.log("Error reloading user:", err);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    };

    pollForToken();

    return () => {};
  }, [user?.publicMetadata.chatToken]);

  // Connect to Stream Chat once chatToken is available
  useEffect(() => {
    if (!user || !user?.publicMetadata.chatToken) return;

    const userObj = {
      id: user.id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      image: user.imageUrl,
    };

    const connectUser = async () => {
      const localUser = await getLocalUser();
      if (
        !localUser?.chatToken ||
        localUser?.chatToken !== user.publicMetadata.chatToken
      ) {
        await pushUserToLocalStorage(user as User);
      }

      try {
        if (client.userID && client.userID !== user.id) {
          await client.disconnectUser();
        }
        await client.connectUser(
          userObj,
          user.publicMetadata.chatToken as TokenOrProvider
        );
        setIsClientReady(true);
      } catch (err) {
        console.log("Failed to connect user:", err);
      }
    };

    connectUser();

    return () => {
      if (isClientReady) {
        client.disconnectUser().catch(console.log);
        setIsClientReady(false);
      }
    };
  }, [user?.publicMetadata.chatToken]);

  // Event listener
  useEffect(() => {
    if (!client) return;

    const handleEvent = (event: any) => {
      setRefreshKey((prev) => prev + 1);
    };

    client.on("notification.added_to_channel", handleEvent);

    return () => {
      client.off("notification.added_to_channel", handleEvent);
    };
  }, [client, router]);

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  if (!isClientReady) {
    return <LoadingIndicator />;
  }

  return (
    <OverlayProvider
      key={refreshKey}
      ImageSelectorIcon={() => <PickerIcons selectedPicker="images" />}
      FileSelectorIcon={() => <PickerIcons selectedPicker="file" />}
      CameraSelectorIcon={() => <PickerIcons selectedPicker="camera" />}
      VideoRecorderSelectorIcon={() => <PickerIcons selectedPicker="video" />}
      i18nInstance={streami18n}
      topInset={top}
      bottomInset={bottom}
      value={{ style: ChatTheme(colorScheme) }}
    >
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;

const PickerIcons: React.FC<PickerProps> = React.memo(({ selectedPicker }) => {
  const {
    theme: { colors },
  } = useTheme();

  const iconName: keyof typeof Ionicons.glyphMap = useMemo(() => {
    switch (selectedPicker) {
      case "images":
        return "images";
      case "file":
        return "file-tray-stacked";
      case "camera":
        return "camera";
      case "video":
        return "videocam";
      default:
        return "images";
    }
  }, [selectedPicker]);

  return (
    <IonIcon
      name={iconName}
      size={24}
      color={selectedPicker === "images" ? colors.accent_blue : colors.grey}
    />
  );
});
