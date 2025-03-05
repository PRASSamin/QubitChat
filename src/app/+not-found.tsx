import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FeatherIcon } from "../components/Icons/EV/FeatherIcon";

const NotFoundScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <FeatherIcon name="alert-triangle" size={64} color={"#f43f5e"} />
      <Text className="text-2xl font-bold text-foreground mt-4">
        Page Not Found
      </Text>
      <Text className="text-muted-foreground text-center mt-2">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </Text>
      <TouchableOpacity
        onPress={() => router.replace("/")}
        activeOpacity={0.8}
        className="mt-6 px-6 py-3 bg-accent rounded-[5px]"
      >
        <Text className="text-white font-semibold">Go Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;
