import React from "react";
import { useAlert } from "@/src/core/hooks/useAlert";
import { MaterialIcons } from "@expo/vector-icons";
import { Linking, Text, TouchableOpacity, Vibration, View } from "react-native";
import {
  AudioRecordingButtonProps,
  CircleClose,
  Channel as StreamChannel,
  useMessageInputContext,
  useTheme,
  useTranslationContext,
  type ChannelProps,
} from "stream-chat-expo";

// Stream Channel Component Config
export const Channel: React.FC<ChannelProps & { children: React.ReactNode }> =
  React.memo(({ children, ...props }) => {
    return (
      <StreamChannel
        {...props}
        // Audio Controls
        asyncMessagesMinimumPressDuration={100}
        asyncMessagesMultiSendEnabled
        audioRecordingEnabled
        StartAudioRecordingButton={({ ...props }) => <Voice {...props} />}
        // Other
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
        messageContentOrder={["text", "gallery", "files", "attachments"]}
        Reply={() => {
          return null;
        }}
        DateHeader={() => {
          return null;
        }}
        InputReplyStateHeader={({ ...props }) => {
          return <ReplyHeader {...props} />;
        }}
      >
        {children}
      </StreamChannel>
    );
  });

// Audio Recording Button
const Voice: React.FC<AudioRecordingButtonProps> = React.memo(
  ({ ...props }) => {
    const { Alert } = useAlert();

    // Check Permissions
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

// Reply Header
const ReplyHeader = ({ ...props }) => {
  const { t } = useTranslationContext();
  const {
    clearQuotedMessageState: contextClearQuotedMessageState,
    resetInput: contextResetInput,
    quotedMessage,
  } = useMessageInputContext();

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
