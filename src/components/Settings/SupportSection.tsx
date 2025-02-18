import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcon } from "../Icons/EV/MaterialIcon";
import { AntIcon } from "../Icons/EV/AntIcon";
import { Linking } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { FaIcon } from "../Icons/EV/FaIcon";
import { FeatherIcon } from "../Icons/EV/FeatherIcon";
import { useAlert } from "@/src/core/hooks/useAlert";
import { useColorScheme } from "nativewind";
import { hexThemes } from "@/src/core/constants/Theme";

const SupportSection = () => {
  const { Alert } = useAlert();
  return (
    <View className="flex-col gap-4 mb-10">
      <Text className="text-muted-foreground font-bold text-sm">Support</Text>
      <View className="flex felx-col gap-4">
        <Pressable
          onPress={() => {
            Alert({
              which: "bottomSheet",
              bottomSheet: {
                minHeight: "50%",
                children: <CreatorAccounts />,
              },
            });
          }}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-3">
            <AntIcon
              name="codepen"
              size={18}
              color="white"
              className="bg-emerald-500 rounded-full p-2"
            />
            <View className="flex-col">
              <Text className="text-foreground font-medium text-md">
                Developer
              </Text>
              <Text className="text-muted-foreground text-xs">PRASSamin</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SupportSection;

const CreatorAccounts = () => {
  const { colorScheme } = useColorScheme();
  const { foreground, mutedForeground } = hexThemes[colorScheme!];
  return (
    <View className="flex felx-col gap-5">
      <Pressable
        onPress={() => {
          Linking.openURL("https://github.com/PRASSamin");
        }}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <AntIcon
            name="github"
            size={18}
            color="white"
            className="bg-purple-800 rounded-full p-2"
          />
          <View className="flex-col">
            <Text style={{ color: foreground }} className="font-medium text-md">
              Github
            </Text>
            <Text style={{ color: mutedForeground }} className="text-xs">
              @PRASSamin
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          Linking.openURL("https://discord.gg/MVpwUpxMgg");
        }}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <FontAwesome6
            name="discord"
            size={15}
            color="white"
            className="bg-blue-600 rounded-full p-2"
          />
          <View className="flex-col">
            <Text style={{ color: foreground }} className="font-medium text-md">
              Discord
            </Text>
            <Text style={{ color: mutedForeground }} className="text-xs">
              @prassamin
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          Linking.openURL("https://www.facebook.com/prassamin7/");
        }}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <MaterialIcon
            name="facebook"
            size={18}
            color="white"
            className="bg-blue-800 rounded-full p-2"
          />
          <View className="flex-col">
            <Text style={{ color: foreground }} className="font-medium text-md">
              Facebook
            </Text>
            <Text style={{ color: mutedForeground }} className="text-xs">
              @prassamin7
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          Linking.openURL("https://www.instagram.com/imprassamin/");
        }}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <FeatherIcon
            name="instagram"
            size={18}
            color="white"
            className="bg-pink-600 rounded-full p-2"
          />
          <View className="flex-col">
            <Text style={{ color: foreground }} className="font-medium text-md">
              Instagram
            </Text>
            <Text style={{ color: mutedForeground }} className="text-xs">
              @imprassamin
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          Linking.openURL("https://linkedin.com/in/prassamin/");
        }}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <FaIcon
            name="linkedin-square"
            size={18}
            color="white"
            className="bg-blue-500 rounded-full py-2 px-[9px]"
          />
          <View className="flex-col">
            <Text style={{ color: foreground }} className="font-medium text-md">
              LinkedIn
            </Text>
            <Text style={{ color: mutedForeground }} className="text-xs">
              @prassamin
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          Linking.openURL("https://pras.me/");
        }}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <FaIcon
            name="globe"
            size={18}
            color="white"
            className="bg-gray-700 rounded-full px-2.5 py-2"
          />
          <View className="flex-col">
            <Text style={{ color: foreground }} className="font-medium text-md">
              Website
            </Text>
            <Text style={{ color: mutedForeground }} className="text-xs">
              pras.me
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
