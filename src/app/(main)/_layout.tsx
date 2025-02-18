import React from "react";
import ChatProvider from "@/src/core/providers/ChatProvider";
import { Slot } from "expo-router";
import { NotificationProvider } from "@/src/core/providers/NotificationProvider";
import { AppProvider } from "@/src/core/providers/AppProvider";

const MainScreenLayout = () => {
  return (
    <AppProvider>
      <ChatProvider>
        <NotificationProvider>
        <Slot />
        </NotificationProvider>
      </ChatProvider>
    </AppProvider>
  );
};

export default MainScreenLayout;
