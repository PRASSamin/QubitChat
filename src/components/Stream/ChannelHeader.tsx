import { Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "stream-chat-expo";
import { type Channel as StreamChannelType } from "stream-chat";
import { Collage } from "../Collage";
import { type UserResponse as StreamUser } from "stream-chat";
import { getMatrix } from "@/src/core/utils/metrix";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useAlert } from "@/src/core/hooks/useAlert";
import { copyToClipboard } from "@/src/core/utils/clipboard";
import { SafeAreaView } from "react-native-safe-area-context";

type ChannelProps = {
  channel: StreamChannelType;
};

const ChannelHeader: React.FC<ChannelProps> = ({ channel }) => {
  const [channelMembers, setChannelMembers] = useState<
    { user: StreamUser; isOnline: boolean }[]
  >([]);
  const [channelAvatarImages, setChannelAvatarImages] = useState<
    string[] | null
  >(null);
  const [inviteLink] = useState<string>(
    `https://pras.me/${channel?.data?.metadata?.inviteToken}`
  );

  const { user } = useUser();
  const router = useRouter();
  const { Alert } = useAlert();

  const {
    theme: {
      colors: { white_snow, black, accent_blue },
    },
  } = useTheme();

  useEffect(() => {
    if (channel.state.members) {
      setChannelMembers(
        Object.values(channel.state.members).map((member) => ({
          user: member.user as StreamUser,
          isOnline: !!member.user!.online,
        }))
      );
    }
  }, [channel.state.members]);

  useEffect(() => {
    if (channelMembers.length > 0) {
      setChannelAvatarImages(
        channelMembers
          .map((member) => member.user?.image as string)
          .slice(0, 10)
      );
    }
  }, [channelMembers]);

  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: white_snow }}
        className="h-20 flex flex-row items-center justify-between gap-3 px-6 py-2"
      >
        <View className="flex flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.push("/(main)/(tabs)")}>
            <Ionicons
              className="mr-3"
              name="arrow-back-outline"
              size={24}
              color={accent_blue}
            />
          </TouchableOpacity>
          <View className="relative min-w-[30px]">
            {channelMembers.length > 0 &&
              channelMembers.some(
                (member) => member.user.id !== user?.id && member.isOnline
              ) && (
                <View
                  className="absolute -bottom-[1px] -right-[1px] bg-green-500 rounded-full w-3 h-3 z-50"
                  style={{ borderWidth: 2, borderColor: white_snow }}
                />
              )}
            <Collage
              width={30}
              height={30}
              images={channelAvatarImages ?? []}
              matrix={getMatrix(channelAvatarImages ?? [])}
              avatar={true}
            />
          </View>
          <Text style={{ color: black }} className="font-Poppins-400">
            {channel.data?.name}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-5">
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="call" size={22} color={accent_blue} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="videocam" size={22} color={accent_blue} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              Alert({
                title: "Invite",
                message: inviteLink,
                buttonText: "Copy",
                onConfirm() {
                  copyToClipboard(inviteLink);
                },
              });
            }}
          >
            <Ionicons name="person-add" size={22} color={accent_blue} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChannelHeader;
