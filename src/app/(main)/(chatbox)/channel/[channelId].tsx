import {
  Keyboard,
  Linking,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  type AudioRecordingButtonProps,
  Channel,
  CircleClose,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
  useChatContext,
  useMessageInputContext,
  useTheme,
  useTranslationContext,
} from "stream-chat-expo";
import { type Channel as StreamChannel } from "stream-chat";
import { LoadingIndicator } from "@/src/components/LoadingIndicator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { hexThemes } from "@/src/core/constants/Theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAlert } from "@/src/core/hooks/useAlert";

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
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Channel
          // Audio Controls
          asyncMessagesMinimumPressDuration={100}
          asyncMessagesMultiSendEnabled
          audioRecordingEnabled
          StartAudioRecordingButton={({ ...props }) => <Voice {...props} />}
          loadingMore={true}
          enforceUniqueReaction={true}
          allowThreadMessagesInChannel={false}
          messageActions={({
            isMyMessage,
            copyMessage,
            editMessage,
            deleteMessage,
            markUnread,
            quotedReply,
          }) =>
            !isMyMessage
              ? [quotedReply, markUnread, copyMessage]
              : [quotedReply, editMessage, copyMessage, deleteMessage]
          }
          channel={activeChannel}
          messageContentOrder={["text", "gallery", "files", "attachments"]}
        >
          <MessageList additionalFlatListProps={{ bounces: true }} />
          <MessageInput
            Reply={() => {
              return null;
            }}
            InputReplyStateHeader={({ ...props }) => {
              return <ReplyHeader {...props} />;
            }}
          />
        </Channel>
      </View>
    </SafeAreaView>
  );
};

export default ChatBoxScreen;

const Voice: React.FC<AudioRecordingButtonProps> = React.memo(
  ({ ...props }) => {
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
  }
);

const ReplyHeader = ({ ...props }) => {
  const { t } = useTranslationContext();
  const {
    clearQuotedMessageState: contextClearQuotedMessageState,
    resetInput: contextResetInput,
    quotedMessage,
  } = useMessageInputContext();
  // console.log(useMessageInputContext());
  const {
    theme: {
      colors: { black, grey },
      messageInput: {
        editingStateHeader: { editingBoxHeader, editingBoxHeaderTitle },
      },
    },
  } = useTheme();

  const clearQuotedMessageState =
    props.clearQuotedMessageState || contextClearQuotedMessageState;
  const resetInput = props.resetInput || contextResetInput;

  return (
    <View className="pb-2.5">
      <View
        className={`flex flex-row justify-between items-center`}
        style={[editingBoxHeader]}
      >
        <Text
          className={`text-sm font-bold`}
          style={[{ color: black }, editingBoxHeaderTitle]}
        >
          {t<string>("Reply to Message")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (resetInput) {
              resetInput();
            }
            if (clearQuotedMessageState) {
              clearQuotedMessageState();
            }
          }}
          testID="close-button"
        >
          <CircleClose pathFill={grey} />
        </TouchableOpacity>
      </View>
      {quotedMessage && (
        <Text className="text-xs" style={[{ color: grey }]}>
          {quotedMessage.text || "attachment"}
        </Text>
      )}
    </View>
  );
};
