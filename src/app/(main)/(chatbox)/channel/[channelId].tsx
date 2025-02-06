import {TouchableOpacity, TouchableOpacityProps, Vibration, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Channel, MessageInput, MessageList, MessageType, Thread, useChatContext} from "stream-chat-expo";
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
            asyncMessagesMultiSendEnabled audioRecordingEnabled
            StartAudioRecordingButton={({...props}) => <Voice {...props}/>}
            FileAttachmentIcon={({size}) => <MaterialIcons name="insert-drive-file" size={size} />} threadList={!!thread} thread={thread} channel={activeChannel}>
          {thread ? (
            <Thread  />
          ) : (
            <>
              <MessageList onThreadSelect={setThread} />
              <MessageInput />
            </>
          )}
        </Channel>
      </View>
    </SafeAreaView>
  );
};

export default ChatBoxScreen;


const SendButton: React.FC<TouchableOpacityProps> = ({ onPress, ...props }) => {
  console.log(props)
  return (
      <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          accessibilityLabel="Send Message"
          {...props}
      >
        <Ionicons name="send" size={24} color={hexThemes.dark.accent} />
      </TouchableOpacity>
  );
};

const Voice = ({...props}) => {
  const {showAlert} = useAlert()
  console.log(props)
  return <TouchableOpacity onPress={() => {
    Vibration.vibrate(50);
    showAlert({
      title: "Warning",
      message: "Please Hold The Button",
      buttonText: "Got It",
      onConfirm: () => console.log("Alert Confirmed!"),
    })
  }} onLongPress={props.startVoiceRecording} {...props}><MaterialIcons name="keyboard-voice" size={24} color="blue"/></TouchableOpacity>
}