// package imports
import React, { useMemo } from "react";
import { useAlert } from "@/src/core/hooks/useAlert";
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

// local imports
import { getDateString } from "@/src/core/utils/dateString";
import { MaterialIcon } from "../Icons/EV/MaterialIcon";
import { MessageSimple } from "./MessageSimple";
import { Gallery } from "./Gallery";
import { MessageContent } from "./MessageContent";
import { Reply } from "./Reply";

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
        // MessageList Controls
        MessageSimple={MessageSimple}
        Gallery={Gallery}
        MessageContent={MessageContent}
        giphyEnabled={false}
        CommandsButton={() => null}
        InlineDateSeparator={({ date }) => {
          const dateString = useMemo(() => getDateString(date!), [date]);
          return (
            <View className="w-full flex items-center justify-center">
              <Text className="text-foreground bg-muted rounded-full text-sm px-3 py-1">
                {dateString}
              </Text>
            </View>
          );
        }}
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
        Reply={Reply}
        DateHeader={() => null}
        // MessageInput Controls
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
          which: "alert",
          alert: {
            title: "Warning",
            message: "Please allow Audio permissions in settings.",
            buttonText: "Open Settings",
            onConfirm: () => {
              Linking.openSettings();
            },
          },
        });
        return false;
      }
      return true;
    };

    return (
      <TouchableOpacity
        hitSlop={2}
        onPress={() => {
          Vibration.vibrate(50);
          if (checkPermissions()) {
            Alert({
              which: "alert",
              alert: {
                title: "Warning",
                message: "Please Hold to start recording.",
                buttonText: "Got It",
              },
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
        <MaterialIcon name="keyboard-voice" size={30} color="gray" />
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
          hitSlop={2}
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
