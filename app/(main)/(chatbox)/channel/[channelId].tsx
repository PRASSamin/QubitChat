import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Channel,
  useChatContext,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import { useEffect, useState } from "react";
import { type Channel as StreamChannel } from "stream-chat";

const ChatBoxScreen = () => {
  const { channelId }: { channelId: string } = useLocalSearchParams();
  const [activeChannel, setActiveChannel] = useState<StreamChannel | null>(
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
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Channel channel={activeChannel}>
          <MessageList />
        </Channel>
      </View>
    </SafeAreaView>
  );
};

export default ChatBoxScreen;

const styles = StyleSheet.create({});
