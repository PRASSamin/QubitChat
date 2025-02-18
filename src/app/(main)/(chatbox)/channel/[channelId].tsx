import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel } from "@/src/components/Stream/Channel";
import { MessageInput, MessageList, useChatContext } from "stream-chat-expo";
import { type Channel as StreamChannelType } from "stream-chat";
import { LoadingIndicator } from "@/src/components/LoadingIndicator";
import ChannelHeader from "@/src/components/Stream/ChannelHeader";

const ChatBoxScreen = () => {
  const { channelId }: { channelId: string } = useLocalSearchParams();
  const [activeChannel, setActiveChannel] = useState<StreamChannelType | null>(
    null
  );
  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({
        cid: channelId,
      });

      setActiveChannel(channels[0]);
    };

    fetchChannel();
  }, [channelId]);

  if (!activeChannel) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-col">
        <Channel channel={activeChannel}>
          <ChannelHeader channel={activeChannel} />
          <MessageList additionalFlatListProps={{ bounces: true }} />
          <MessageInput />
        </Channel>
      </View>
    </SafeAreaView>
  );
};

export default ChatBoxScreen;
