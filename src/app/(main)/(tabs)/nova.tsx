import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NovaAvatar } from "@/src/core/constants/Images";
import { useColorScheme } from "nativewind";
import { hexThemes } from "@/src/core/constants/Theme";
import { useEffect, useRef } from "react";

const Nova = () => {
  const { colorScheme } = useColorScheme();
  const theme = hexThemes[colorScheme!];

  // Animation values
  const fadeTitle = useRef(new Animated.Value(0)).current; // Fade for title
  const fadeSubtitle = useRef(new Animated.Value(0)).current; // Fade for subtitle
  const fadeTeaser = useRef(new Animated.Value(0)).current; // Fade for teaser
  const pulseAvatar = useRef(new Animated.Value(1)).current; // Pulse for avatar
  const spinAvatar = useRef(new Animated.Value(0)).current; // Spin for avatar
  const bounceTeaser = useRef(new Animated.Value(0)).current; // Bounce for teaser

  useEffect(() => {
    // Staggered fade-in sequence
    Animated.stagger(300, [
      Animated.timing(fadeTitle, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeSubtitle, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeTeaser, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Avatar spin and pulse
    Animated.sequence([
      Animated.parallel([
        Animated.timing(spinAvatar, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAvatar, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(pulseAvatar, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Loop subtle pulse after spin
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAvatar, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAvatar, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // Teaser bounce and glow loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceTeaser, {
          toValue: 8,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(bounceTeaser, {
          toValue: 0,
          friction: 4,
          tension: 50,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [
    fadeTitle,
    fadeSubtitle,
    fadeTeaser,
    pulseAvatar,
    spinAvatar,
    bounceTeaser,
  ]);

  // Spin interpolation for avatar rotation
  const spin = spinAvatar.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.background }}
      className={`flex-1 `}
    >
      <Animated.View className="flex-1 justify-center items-center px-5">
        {/* Nova Avatar with Pulse and Spin */}
        <Animated.Image
          source={{ uri: NovaAvatar }}
          className="w-28 h-28 rounded-full mb-6 border-2"
          style={{
            borderColor: theme.primary,
            transform: [{ scale: pulseAvatar }, { rotate: spin }],
          }}
        />

        {/* Title with Fade */}
        <Animated.Text
          className="text-3xl font-bold text-center mb-3"
          style={{ color: theme.foreground, opacity: fadeTitle }}
        >
          Meet Nova
        </Animated.Text>

        {/* Subtitle with Fade */}
        <Animated.Text
          className="text-base text-center opacity-70 max-w-[280px] leading-5 mb-4"
          style={{ color: theme.mutedForeground, opacity: fadeSubtitle }}
        >
          Your future chat companion is almost here. Stay tuned for an enhanced
          experience!
        </Animated.Text>

        {/* Teaser with Bounce and Glow */}
        <Animated.Text
          className="text-sm font-semibold uppercase tracking-wider shadow-md"
          style={{
            color: theme.primary,
            opacity: fadeTeaser,
            transform: [{ translateY: bounceTeaser }],
            textShadowColor: theme.primary,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 8,
          }}
        >
          Coming Soon
        </Animated.Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Nova;
