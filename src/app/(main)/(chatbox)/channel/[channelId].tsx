import {Linking, TouchableOpacity, Vibration, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  type AudioRecordingButtonProps,
  Channel,
  MessageInput,
  MessageList,
  MessageType,
  SendButtonProps,
  Thread,
  useChatContext
} from "stream-chat-expo";
import {type Channel as StreamChannel} from "stream-chat";
import {LoadingIndicator} from "@/src/components/LoadingIndicator";
import Ionicons from '@expo/vector-icons/Ionicons';
import {hexThemes} from "@/src/core/constants/Theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useAlert} from "@/src/core/hooks/useAlert";

const ChatBoxScreen = () => {
  const { channelId }: { channelId: string } = useLocalSearchParams();
  const [activeChannel, setActiveChannel] = useState<StreamChannel | null>(
    null
  );
  const [thread, setThread] = useState<MessageType | null>(null);
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
      <View>
        <Channel
            asyncMessagesMinimumPressDuration={100}
            asyncMessagesMultiSendEnabled audioRecordingEnabled
            StartAudioRecordingButton={({...props}) => <Voice {...props}/>}
            FileAttachmentIcon={({size}) => <MaterialIcons name="insert-drive-file" size={size} />} threadList={!!thread} thread={thread} channel={activeChannel}>
          {thread ? (
            <Thread  />
          ) : (
            <>
              <MessageList onThreadSelect={setThread} />
              <MessageInput SendButton={({...props}) => <SendButton {...props} />} />
            </>
          )}
        </Channel>
      </View>
    </SafeAreaView>
  );
};

export default ChatBoxScreen;


const SendButton: React.FC<SendButtonProps> = ({ ...props }) => {
  console.log(props)
  const Send = async () => {
    await props.sendMessage!()
  }
  return (
      <TouchableOpacity
          onPress={Send}
          activeOpacity={0.7}
          accessibilityLabel="Send Message"
          {...props}
      >
        <Ionicons name="send" size={24} color={hexThemes.dark.accent} />
      </TouchableOpacity>
  );
};

const Voice: React.FC<AudioRecordingButtonProps> = React.memo(({ ...props }) => {
  const { Alert } = useAlert();

  const checkPermissions = () => {
    if (!props.permissionsGranted) {
      Alert({
        title: "Warning",
        message: "Please allow Audio permissions in settings.",
        buttonText: "Open Settings",
        onConfirm: () => {
          Linking.openSettings();
        },
      });
      return false;
    }
    return true;
  };

  return (
      <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(50);
            if (checkPermissions()) {
              Alert({
                title: "Warning",
                message: "Please Hold to start recording.",
                buttonText: "Got It",
              });
            }
          }}
          delayLongPress={100}
          onLongPress={() => {
            if (checkPermissions()) {
              props.startVoiceRecording!();
            }
          }}
          {...props}
      >
        <MaterialIcons name="keyboard-voice" size={30} color="gray" />
      </TouchableOpacity>
  );
});