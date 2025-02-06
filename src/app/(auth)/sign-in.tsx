import React from "react";
import * as WebBrowser from "expo-web-browser";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {useColorScheme} from "nativewind";
// Local imports
import {onBoarding} from "@/src/core/constants/Images";
import {hexThemes} from "@/src/core/constants/Theme";
import SSOButton from "@/src/components/SSOButton";
// Type definition for auth providers

// Custom hook for browser warmup
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    const prepareBrowser = async () => {
      try {
        await WebBrowser.warmUpAsync();
      } catch (error) {
        console.warn("Browser warmup failed:", error);
      }
    };

    prepareBrowser();
    return () => {
      WebBrowser.coolDownAsync().catch((error) =>
        console.warn("Browser cooldown failed:", error)
      );
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  useWarmUpBrowser();
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-5">
          <View style={styles.imageContainer}>
            <Image
              source={onBoarding}
              style={styles.image}
              alt="onboarding"
              fadeDuration={500}
              resizeMode="contain"
            />
            <LinearGradient
              locations={[0.2, 0.9]}
              colors={[
                "transparent",
                hexThemes[colorScheme === "dark" ? "dark" : "light"].background,
              ]}
              style={styles.gradient}
            />
          </View>

          <View style={styles.content}>
            <View className="flex-col gap-2.5 items-center">
              <Text className="text-md font-Poppins-400 text-foreground">
                Welcome To PRAS
              </Text>
              <Text className="text-3xl font-Poppins-700 text-center text-foreground">
                Chat, discuss, and collaborate with{" "}
                <Text className="text-emerald-500 dark:text-emerald-300">
                  Pras Samin
                </Text>
              </Text>
              <Text className="text-lg font-Poppins-500 text-foreground">
                Let's Connect & Chat!
              </Text>
            </View>

            <View className="flex-col gap-2.5 w-full items-center">
              <SSOButton
                provider="google"
                icon={<AntDesign name="google" size={20} color="white" />}
                label="Continue with Google"
              />

              <SSOButton
                provider="github"
                icon={<AntDesign name="github" size={20} color="white" />}
                label="Continue with Github"
              />

              <SSOButton
                provider="facebook"
                icon={<FontAwesome name="facebook" size={20} color="white" />}
                label="Continue with Facebook"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    gap: 40,
    paddingVertical: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    borderRadius: 9999,
    width: "100%",
  },
  google: {
    backgroundColor: "#DB4437",
  },
  github: {
    backgroundColor: "#333",
  },
  facebook: {
    backgroundColor: "#1877F2",
  },
});
