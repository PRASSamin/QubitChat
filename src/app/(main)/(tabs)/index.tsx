import { useUser } from "@clerk/clerk-expo";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PRAS from "@/src/components/Icons/svg/Pras";
import { useColorScheme } from "nativewind";
import Wordmark from "@/src/components/Icons/svg/Wordmark";
import { ChannelList, useTheme } from "stream-chat-expo";
import { useRouter } from "expo-router";
import { LoadingIndicator } from "@/src/components/LoadingIndicator";
import { Collage } from "@/src/components/Collage";
import { getMatrix } from "@/src/core/utils/metrix";
import {
  getChannelMemberAvatars,
  getChannelMemberList,
} from "@/src/core/utils/stream";

const ChatHome = () => {
  const { user } = useUser();
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const {
    theme: {
      colors: { white_snow },
    },
  } = useTheme();

  const filters = { members: { $in: [user?.id!] } }; // TODO: add filter to channel before final release

  return (
    <SafeAreaView className="flex-1 bg-background w-full h-full">
      <View>
        <View className="flex-row items-center justify-start h-14 border-b border-slate-300 dark:border-slate-900 px-3">
          <Wordmark
            width={100}
            fill={colorScheme === "dark" ? "#fff" : "#000"}
            className=" bg-red-400 rounded-full shadow-md"
          />
          <View className="-mt-3">
            <PRAS width={30} fill={colorScheme === "dark" ? "#fff" : "#000"} />
          </View>
        </View>
      </View>
      <View className="flex-1 bg-background w-full h-full flex px-3">
        <ChannelList
          PreviewAvatar={({ size, channel }) => {
            const channelMembers = getChannelMemberList(channel);
            const channelAvatarImages = getChannelMemberAvatars(channel);
            return (
              <View className="relative">
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
                  width={40}
                  height={40}
                  images={channelAvatarImages ?? []}
                  matrix={getMatrix(channelAvatarImages ?? [])}
                  avatar={true}
                />
              </View>
            );
          }}
          LoadingIndicator={LoadingIndicator}
          filters={filters}
          onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatHome;
