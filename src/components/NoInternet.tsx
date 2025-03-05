import { View, Text, TouchableOpacity } from "react-native";
import { FeatherIcon } from "./Icons/EV/FeatherIcon";
import { useColorScheme } from "nativewind";
import { hexThemes } from "../core/constants/Theme";
import { StatusBar } from "react-native";

const NoInternetScreen = ({ onRetry }: { onRetry: () => void }) => {
  const { colorScheme } = useColorScheme();
  const theme = hexThemes[colorScheme!];

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 items-center justify-center px-6"
    >
      <StatusBar backgroundColor={theme.background} />
      {/* No Internet Icon */}
      <FeatherIcon name="wifi-off" size={80} color="#f43f5e" />

      {/* Title */}
      <Text
        style={{ color: theme.foreground }}
        className="text-2xl font-bold mt-4"
      >
        No Internet Connection
      </Text>

      {/* Description */}
      <Text
        style={{ color: theme.mutedForeground }}
        className="text-center mt-2"
      >
        Oops! You seem to be offline. Please check your connection and try
        again.
      </Text>

      {/* Retry Button */}
      <TouchableOpacity
        onPress={onRetry}
        activeOpacity={0.8}
        style={{ backgroundColor: theme.accent }}
        className="mt-6 px-6 py-3 rounded-[5px]"
      >
        <Text style={{ color: theme.cardForeground }} className="font-semibold">
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoInternetScreen;
