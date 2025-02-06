import React from "react";
import ChatProvider from "@/src/core/providers/ChatProvider";
import {Slot} from "expo-router";

const MainScreenLayout = () => {
  return (
    <ChatProvider>
      <Slot />
    </ChatProvider>
  );
};

export default MainScreenLayout;
