import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { FeatherIcon } from "../Icons/EV/FeatherIcon";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcon } from "../Icons/EV/MaterialIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountSection = () => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const { signOut } = useAuth();

  return (
    <View className="flex-col gap-4 mb-10">
      <Text className="text-muted-foreground font-bold text-sm">Account</Text>
      <View className="flex felx-col gap-4">
        <View className="flex-col">
          <Pressable
            hitSlop={2}
            onPress={async () => {
              setIsLoggingOut(true);
              await signOut();
              await AsyncStorage.removeItem("user");
              setIsLoggingOut(false);
            }}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              {isLoggingOut ? (
                <MaterialIcon
                  name="loading"
                  size={18}
                  className="bg-cyan-600 p-2 animate-spin rounded-full"
                />
              ) : (
                <FeatherIcon
                  name="log-out"
                  size={18}
                  color="white"
                  className="bg-cyan-600 rounded-full p-2"
                />
              )}
              <View className="flex-col">
                <Text className="text-foreground font-medium text-md">
                  Logout Account
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AccountSection;

const styles = StyleSheet.create({});
