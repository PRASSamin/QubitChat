import {ActivityIndicator, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Chat, OverlayProvider, useTheme} from "stream-chat-expo";
import {useUser} from "@clerk/clerk-expo";
import {type TokenOrProvider} from "stream-chat";
import {StreamClient as client} from "@/src/core/constants/instances";
import {useColorScheme} from "nativewind";
import {ChatTheme} from "@/src/core/constants/ChatTheme";
import {Redirect} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {PickerProps} from "../types";

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [isClientReady, setIsClientReady] = useState(false);
  const { colorScheme } = useColorScheme();
  const [chatTheme, setChatTheme] = useState(ChatTheme(colorScheme));
  const { bottom, top } = useSafeAreaInsets();

  if (!user) {
    return <Redirect href={"/sign-in"} />;
  }

  useEffect(() => {
    setChatTheme(ChatTheme(colorScheme));
  }, [colorScheme]);

  const userObj = {
    id: user.id,
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    image: user.imageUrl,
  };

  useEffect(() => {
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
  }, [user.id]);

  if (!isClientReady) {
    return <ActivityIndicator className="flex-1" />;
  }

  return (
    <OverlayProvider
      ImageSelectorIcon={() => <PickerIcons selectedPicker="images" />}
      FileSelectorIcon={() => <PickerIcons selectedPicker="file" />}
      CameraSelectorIcon={() => <PickerIcons selectedPicker="camera" />}
      VideoRecorderSelectorIcon={() => <PickerIcons selectedPicker="video" />}
      AttachmentPickerIOSSelectMorePhotos={() => {
        return null;
      }}
      AttachmentPickerBottomSheetHandle={() => {
        return (
          <View className="h-5 rounded-t-2xl bg-muted flex items-center justify-center">
            <View className="h-1 w-20 bg-muted-foreground rounded-full"></View>
          </View>
        );
      }}
      bottomInset={bottom}
      topInset={top}
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
    <Ionicons
      name={Icon()}
      size={24}
      color={selectedPicker === "images" ? colors.accent_blue : colors.grey}
    />
  );
});
