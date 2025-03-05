import { useEffect, useState } from "react";
import "./global.css";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { CLERKPUBKEY } from "@/src/core/constants/keys";
import { tokenCache } from "@/src/core/utils/cache";
import { ThemeProvider } from "@/src/core/providers/ThemeProvider";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AlertProvider } from "@/src/core/providers/AlertProvider";
import { ThemeProvider as StreamThemeProvider } from "stream-chat-expo";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import NetInfo from "@react-native-community/netinfo";
import NoInternetScreen from "../components/NoInternet";
import { Slot } from "expo-router";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

const RootLayout = () => {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [isConnected, setIsConnected] = useState(true);

  const checkConnection = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isInternetReachable ?? false);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isInternetReachable ?? false);
      });

      return () => unsubscribe();
    }
  }, [loaded]);

  if (!isConnected) {
    return <NoInternetScreen onRetry={checkConnection} />;
  }

  return (
    <AlertProvider>
      <GestureHandlerRootView className="flex-1 bg-background">
        <StreamThemeProvider>
          <ThemeProvider>
            <ClerkProvider
              signInUrl="/sign-in"
              tokenCache={tokenCache}
              publishableKey={CLERKPUBKEY}
            >
              <ClerkLoaded>
                <StatusBar className="bg-background" />
                <Slot />
              </ClerkLoaded>
            </ClerkProvider>
          </ThemeProvider>
        </StreamThemeProvider>
      </GestureHandlerRootView>
    </AlertProvider>
  );
};

export default RootLayout;
