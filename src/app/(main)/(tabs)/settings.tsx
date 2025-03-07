import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSection from "@/src/components/Settings/ProfileSection";
import PreferencesSection from "@/src/components/Settings/PreferencesSection";
import AccountSection from "@/src/components/Settings/AccountSection";
import { Text, View, ScrollView } from "react-native";
import SupportSection from "@/src/components/Settings/SupportSection";
import { metadata } from "@/meta";

const Settings = () => {
  return (
    <SafeAreaView className="flex-1 bg-background w-full h-full justify-between px-2.5">
      <ScrollView className="flex-1">
        <ProfileSection />
        <PreferencesSection />
        <AccountSection />
        <SupportSection />
      </ScrollView>
      <View>
        <Text className="text-muted-foreground text-center text-sm opacity-50 pb-4 font-Poppins-400">
          Version: {metadata.version} ({metadata.release_label})
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
