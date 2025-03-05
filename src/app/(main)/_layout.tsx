import ChatProvider from "@/src/core/providers/ChatProvider";
import { Slot } from "expo-router";
import { NotificationProvider } from "@/src/core/providers/NotificationProvider";

const MainScreenLayout = () => {
  return (
    <ChatProvider>
      <NotificationProvider>
        <Slot />
      </NotificationProvider>
    </ChatProvider>
  );
};

export default MainScreenLayout;
