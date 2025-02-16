import "expo-router/entry";
import messaging from "@react-native-firebase/messaging";
import { StreamClient as client } from "./src/core/constants/instances";
import notifee, {
  EventType,
  AndroidImportance,
  AndroidStyle,
} from "@notifee/react-native";
import { Linking, AppState } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import { getLocalUser } from "./src/core/utils/getLocalUser";
import { EstablishSocket } from "./src/core/tasks/EstablishSocket";
import "@/src/core/tasks/EstablishSocket";

// Background notification handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const user = await getLocalUser();
  if (!user) return;

  client._setToken({ id: user?.id }, user?.chatToken);

  const {
    message: { attachments, user: sender, ...message },
  } = await client.getMessage(remoteMessage.data?.id as string);

  const channel = await notifee.createChannel({
    id: "default",
    name: "Chat Messages",
    sound: "notification",
    importance: AndroidImportance.HIGH,
    vibration: false,
  });

  const { stream, ...rest } = remoteMessage.data ?? {};
  const data = {
    ...rest,
    ...((stream as unknown as Record<string, string> | undefined) ?? {}),
  };

  const content =
    message.text ||
    (attachments && attachments?.length > 0 ? "Attachment" : "New Message");

  await notifee.displayNotification({
    title: `${sender?.name}`,
    body: content,
    data,
    android: {
      sound: "notification",
      importance: AndroidImportance.HIGH,
      lightUpScreen: true,
      showTimestamp: true,
      style: {
        type: AndroidStyle.MESSAGING,
        person: {
          name: `${user.firstName} ${user.lastName}`,
          icon: user.image,
        },
        messages: [
          {
            person: {
              name: sender?.name as string,
              icon: sender?.image as string,
            },
            text: content,
            timestamp: new Date(message?.created_at!).getTime(),
          },
        ],
      },
      channelId: channel,
      pressAction: {
        id: "open_chat",
      },
      actions: [
        {
          title: "Mark as Read",
          pressAction: { id: "mark_as_read" },
        },
        {
          title: "Reply",
          pressAction: { id: "reply" },
          input: {
            allowFreeFormInput: true,
            placeholder: "Type your message",
          },
        },
      ],
    },
  });
});

// Handle notification actions
notifee.onBackgroundEvent(async ({ detail, type }) => {
  try {
    const user = await getLocalUser();
    if (!user) return;

    const { notification } = detail;
    if (!notification?.data) return;

    const { cid, message_id } = notification.data;

    if (type === EventType.PRESS) {
      console.log("Notification Pressed");
      if (cid) {
        console.log("Opening Channel", cid);
        Linking.openURL(`qubitchat://channel/${cid}`);
      }
    }

    if (
      type === EventType.ACTION_PRESS &&
      detail.pressAction?.id === "mark_as_read"
    ) {
      if (message_id) {
        const channels = await client.queryChannels({ cid: cid as string });
        if (channels.length > 0) {
          await channels[0].markRead({ user_id: user.id });
          await notifee.cancelNotification(notification.id!);
        }
      }
    }

    if (type === EventType.ACTION_PRESS && detail.pressAction?.id === "reply") {
      const replyText = detail.input;
      if (replyText && cid) {
        const channels = await client.queryChannels({ cid: cid as string });
        if (channels.length > 0) {
          await channels[0].markRead({ user_id: user.id });
          await channels[0].sendMessage({ text: replyText });
          await notifee.cancelNotification(notification.id!);
        }
      }
    }
  } catch (error) {
    console.error("Error handling notification action:", error);
  }
});

BackgroundFetch.registerTaskAsync("establish-websocket", {
  stopOnTerminate: false,
  startOnBoot: true,
});

AppState.addEventListener("change", (nextAppState) => {
  if (nextAppState === "background" || nextAppState === "inactive") {
    EstablishSocket();
  }
});
