import {ActivityIndicator} from "react-native";
import React, {useEffect, useState} from "react";
import {Chat, OverlayProvider} from "stream-chat-expo";
import {useUser} from "@clerk/clerk-expo";
import {type TokenOrProvider} from "stream-chat";
import {StreamClient as client} from "@/src/core/constants/instances";
import {useColorScheme} from "nativewind";
import {ChatTheme} from "@/src/core/constants/ChatTheme";

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [isClientReady, setIsClientReady] = useState(false);
  const { colorScheme } = useColorScheme();
  const [chatTheme, setChatTheme] = useState(ChatTheme(colorScheme));

  if (!user) {
    return null;
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

  console.log("Chat Theme: ", chatTheme);

  return (
    <OverlayProvider value={{ style: chatTheme }}>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
