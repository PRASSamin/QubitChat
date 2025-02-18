import React, { useEffect } from "react";
import { ViewProps, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Loading } from "stream-chat-expo";
import { hexThemes } from "../core/constants/Theme";
import { useColorScheme } from "nativewind";
import { StopProps } from "react-native-svg";

export interface SpinnerProps extends ViewProps {
  size?: number;
  color?: StopProps["stopColor"];
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 16,
  style,
  color,
  className,
  ...props
}) => {
  const rotation = useSharedValue(0);
  const { colorScheme } = useColorScheme();

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 800,
        easing: Easing.linear,
      }),
      -1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      className={`justify-center m-[5px] ${className}`}
      style={[animatedStyle, { width: size, height: size }, style]}
      {...props}
    >
      <Loading
        height={size}
        stopColor={color || hexThemes[colorScheme!].primary}
        width={size}
      />
    </Animated.View>
  );
};
