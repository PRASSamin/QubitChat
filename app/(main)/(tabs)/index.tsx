import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import PRAS from "@/components/svg/Pras";
import { useColorScheme } from "nativewind";
import Wordmark from "@/components/svg/Wordmark";
import { ChannelList } from "stream-chat-expo";
import { useRouter } from "expo-router";

const ChatHome = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background w-full h-full">
      <View className="px-3">
        <View className="flex-row items-center justify-start h-14 border-b border-slate-300 dark:border-slate-900">
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
      <View className="flex-1">
        <ChannelList
          onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatHome;
