import React, {useEffect} from "react";
import "./global.css";
import {useFonts} from "expo-font";
import {Slot, SplashScreen} from "expo-router";
import {ClerkLoaded, ClerkProvider} from "@clerk/clerk-expo";
import {CLERKPUBKEY} from "@/src/core/constants/keys";
import {tokenCache} from "../core/utils/cache";
import {ThemeProvider} from "@/src/core/providers/ThemeProvider";
import {StatusBar} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {AlertProvider} from "@/src/core/providers/AlertProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
      <AlertProvider>
        <GestureHandlerRootView className="flex-1">
        <ThemeProvider>
          <ClerkProvider
              signInUrl="/sign-in"
              tokenCache={tokenCache}
              publishableKey={CLERKPUBKEY}
          >
            <ClerkLoaded>
              <StatusBar
                  translucent
                  className="bg-background"
                  showHideTransition={"fade"}
                  animated
              />
              <Slot/>
            </ClerkLoaded>
          </ClerkProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
      </AlertProvider>
  );
};

export default RootLayout;
