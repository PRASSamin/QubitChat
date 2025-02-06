import {Button, Switch, Text, View} from "react-native";
import React, {useCallback, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {useTheme} from "@/src/core/hooks/useTheme";
import * as Notifications from "expo-notifications";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(theme === "dark");

  const toggleSwitch = useCallback(() => {
    const newTheme = !isEnabled ? "dark" : "light";
    setIsEnabled((prevState) => !prevState);
    setTheme(newTheme);
  }, [isEnabled, setTheme]);

  const TestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background w-full h-full px-2">
      <View>
        <Text className="text-muted-foreground font-medium text-lg">
          Preferences
        </Text>
        <View className="mt-3 flex-col">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={20}
                color="white"
                className="bg-indigo-600 rounded-full p-2"
              />
              <View className="flex-col">
                <Text className="text-foreground font-medium text-lg">
                  Dark Mode
                </Text>
                <Text className="text-muted-foreground text-sm">
                  Change theme
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: "#d1d1d1", true: "#4CAF50" }}
              thumbColor={isEnabled ? "#ffffff" : "#f1f1f1"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <Button onPress={TestNotification} title="Send"></Button>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
