import { Text, TouchableOpacity, View, Animated, Easing } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import { Axios } from "@/src/core/constants/instances";
import { StreamClient } from "@/src/core/constants/instances";
import axios from "axios";
import { Collage } from "@/src/components/Collage";
import { getMatrix } from "@/src/core/utils/metrix";
import { Spinner } from "@/src/components/Spinner";
import { StreamChannelType } from "@/src/core/types";
import { useUser } from "@clerk/clerk-expo";

const InviteScreen = () => {
  const { id } = useLocalSearchParams();
  const { width } = useSafeAreaFrame();
  const router = useRouter();
  const { user } = useUser();

  const [inviteData, setInviteData] = useState<Record<string, any> | null>(
    null
  );
  const [channel, setChannel] = useState<{
    images: string[];
    name: string;
    channel: StreamChannelType | null;
  }>({ images: [], name: "", channel: null });
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isPreLoading, setIsPreLoading] = useState<boolean>(false);

  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!id || typeof id !== "string") {
      setError("Invalid invite ID");
      return;
    }

    const fetchInviteData = async () => {
      setIsPreLoading(true);
      try {
        const { data } = await Axios.get(
          `${process.env.EXPO_PUBLIC_WEB_URL}/api/chat/invite`,
          { params: { id } }
        );
        setInviteData(data);
      } catch (error) {
        setError(
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Failed to load invite"
            : "An unexpected error occurred"
        );
      }
    };
    fetchInviteData();
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    if (inviteData?.channelId) {
      const fetchChannel = async () => {
        try {
          setIsPreLoading(true);
          const fetchedChannels = await StreamClient.queryChannels({
            id: inviteData.channelId,
          });
          if (!isMounted) return;

          const c = fetchedChannels[0];
          const users = c._client.state.users;
          if (c.data?.member_count === Object.keys(users).length - 1) {
            delete users[user?.id!];
          }
          setChannel({
            images: Object.values(users)
              .map((u) => u.image)
              .slice(0, 10) as string[],
            name: c.data?.name || "",
            channel: c,
          });
        } catch {
          setError("Failed to load channel details");
        } finally {
          setIsPreLoading(false);
        }
      };
      fetchChannel();
    } 
    return () => {
      isMounted = false;
    };
  }, [inviteData?.channelId, user?.id]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      if (channel.channel) {
        await channel.channel.addMembers([user?.id!]);
        router.replace(`/channel/${channel.channel.data?.cid}`);
      }
    } catch {
      setError("Failed to join the channel");
    } finally {
      setIsJoining(false);
    }
  };

  const handlePressIn = () =>
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  const handlePressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  const collageSize = Math.min(width * 0.2, 100);

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center">
      <Animated.View
        style={{
          borderRadius: 5,
          width: width - 50,
          height: width + 100,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="bg-muted border border-border rounded-lg items-center px-4 pt-10 pb-5 shadow-lg justify-between"
      >
        {error ? (
          <View className="items-center justify-center w-full h-full">
            <Text className="text-red-500 text-center">{error}</Text>
            <TouchableOpacity
              onPress={() => {
                setError(null);
                setIsPreLoading(true);
                setInviteData(null);
              }}
              className="mt-4 px-4 py-2 bg-primary/50 rounded-[5px]"
            >
              <Text className="text-white">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : isPreLoading ? (
          <View className="items-center justify-center w-full h-full">
            <Spinner />
          </View>
        ) : (
          <>
            <View className="items-center justify-center ">
              <Collage
                width={collageSize}
                height={collageSize}
                className="border border-white/20 rounded-[5px] overflow-hidden"
                images={channel.images ?? []}
                matrix={getMatrix(channel.images ?? [])}
              />
              <Text className="text-foreground font-Poppins-400 text-sm mt-4">
                You are invited to join
              </Text>
              <Text className="text-foreground font-Poppins-600 text-3xl mt-2">
                {channel.name}
              </Text>
            </View>
            <Animated.View
              style={{ transform: [{ scale: buttonScale }] }}
              className="w-full"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleJoin}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className="bg-primary/50 border border-primary/60 rounded-[4px] px-4 py-2 w-full mt-4"
              >
                <Text className="text-foreground font-Poppins-600 text-sm text-center">
                  {isJoining ? <Spinner size={17.5} color="white" /> : "Join"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default InviteScreen;
