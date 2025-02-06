import {Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@/src/core/hooks/useTheme";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <View className="flex-row justify-center space-x-4 p-4">
      <TouchableOpacity onPress={() => setTheme("light")}>
        <Text className={`px-4 py-2 rounded text-foreground`}>Light</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setTheme("dark")}>
        <Text className={`px-4 py-2 rounded text-foreground`}>Dark</Text>
      </TouchableOpacity>
    </View>
  );
}
