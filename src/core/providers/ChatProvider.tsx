import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Chat, OverlayProvider, Streami18n, useTheme } from "stream-chat-expo";
import { useUser } from "@clerk/clerk-expo";
import { type TokenOrProvider } from "stream-chat";
import { StreamClient as client } from "@/src/core/constants/instances";
import { useColorScheme } from "nativewind";
import { ChatTheme } from "@/src/core/constants/ChatTheme";
import { Redirect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PickerProps } from "../types";
import { LoadingIndicator } from "@/src/components/LoadingIndicator";
import { IonIcon } from "@/src/components/Icons/EV/IonIcon";

const streami18n = new Streami18n({
  language: "en",
});

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [isClientReady, setIsClientReady] = useState(false);
  const { colorScheme } = useColorScheme();
  const [chatTheme, setChatTheme] = useState(ChatTheme(colorScheme));
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    setChatTheme(ChatTheme(colorScheme));
  }, [colorScheme]);

  useEffect(() => {
    if (!user) return;

    const userObj = {
      id: user.id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      image: user.imageUrl,
    };

    const connectUser = async () => {
      try {
        await client.connectUser(
          userObj,
          user.publicMetadata.chatToken as TokenOrProvider
        );
        setIsClientReady(true);
      } catch (err) {
        console.error("Failed to connect user:", err);
      }
    };
    connectUser();

    return () => {
      if (isClientReady) {
        client.disconnectUser();
      }
      setIsClientReady(false);
    };
  }, [user?.id]);

  if (!user) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!isClientReady) {
    return <LoadingIndicator />;
  }

  return (
    <OverlayProvider
      ImageSelectorIcon={() => <PickerIcons selectedPicker="images" />}
      FileSelectorIcon={() => <PickerIcons selectedPicker="file" />}
      CameraSelectorIcon={() => <PickerIcons selectedPicker="camera" />}
      VideoRecorderSelectorIcon={() => <PickerIcons selectedPicker="video" />}
      i18nInstance={streami18n}
      AttachmentPickerIOSSelectMorePhotos={() => {
        return null;
      }}
      AttachmentPickerBottomSheetHandle={() => {
        return (
          <View className="h-5  bg-muted flex items-center justify-center">
            <View className="h-1 w-20 bg-muted-foreground rounded-full"></View>
          </View>
        );
      }}
      topInset={top}
      bottomInset={bottom}
      value={{ style: chatTheme }}
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

  const Icon = (): keyof typeof Ionicons.glyphMap => {
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
  };

  return (
    <IonIcon
      name={Icon()}
      size={24}
      color={selectedPicker === "images" ? colors.accent_blue : colors.grey}
    />
  );
});
