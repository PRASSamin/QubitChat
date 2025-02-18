import { Pressable, Switch, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useTheme } from "@/src/core/hooks/useTheme";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useNotifications } from "@/src/core/hooks/useNotifications";
import { MaterialIcon } from "@/src/components/Icons/EV/MaterialIcon";

const PreferencesSection = () => {
  const { theme, setTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(theme === "dark");
  const { userPreference, setUserPreference } = useNotifications();

  const toggleSwitch = useCallback(() => {
    const newTheme = !isEnabled ? "dark" : "light";
    setIsEnabled((prevState) => !prevState);
    setTheme(newTheme);
  }, [isEnabled, setTheme]);

  return (
    <View className="flex-col gap-4 mb-10">
      <Text className="text-muted-foreground font-bold text-sm">
        Preferences
      </Text>
      <View className="flex felx-col gap-4">
        <View className="flex-col">
          <Pressable
            onPress={toggleSwitch}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <MaterialIcon
                name="theme-light-dark"
                size={18}
                color="white"
                className="bg-indigo-600 rounded-full p-2"
              />
              <View className="flex-col">
                <Text className="text-foreground font-medium text-md">
                  Dark Mode
                </Text>
                <Text className="text-muted-foreground text-xs">
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
          </Pressable>
        </View>
        <View className="flex-col">
          <Pressable
            onPress={() => setUserPreference(!userPreference)}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <MaterialIcon
                name="bell"
                size={18}
                color="white"
                className="bg-green-500 rounded-full p-2"
              />
              <View className="flex-col">
                <Text className="text-foreground font-medium text-md">
                  Notifications
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: "#d1d1d1", true: "#4CAF50" }}
              thumbColor={userPreference ? "#ffffff" : "#f1f1f1"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setUserPreference(!userPreference);
              }}
              value={userPreference}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PreferencesSection;
