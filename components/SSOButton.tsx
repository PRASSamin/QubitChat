import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { AuthProviderType } from "@/core/types";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

const SSOButton = ({
  provider,
  icon,
  label,
}: {
  provider: AuthProviderType;
  icon: JSX.Element;
  label: string;
}) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<AuthProviderType | null>(null);
  const { startOAuthFlow } = useOAuth({
    strategy: `oauth_${provider}`,
  });

  const onSSOPress = useCallback(
    async (provider: AuthProviderType) => {
      setIsLoading(provider);
      try {
        const { createdSessionId, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL("/", { scheme: "qubitchat" }),
        });

        if (createdSessionId) {
          setActive!({ session: createdSessionId });
          await user?.reload();
        }
      } catch (err) {
        console.error("SSO Error:", JSON.stringify(err, null, 2));
      } finally {
        setIsLoading(null);
      }
    },
    [startOAuthFlow]
  );

  return (
    <TouchableOpacity
      onPress={() => onSSOPress(provider)}
      activeOpacity={0.8}
      className="flex-row items-center justify-center gap-2.5 py-3.5 rounded-full w-full"
      style={styles[provider]}
      disabled={!!isLoading}
    >
      {isLoading === provider ? (
        <ActivityIndicator size={21} color="white" />
      ) : (
        icon
      )}
      <Text className="text-white font-semibold">{label}</Text>
    </TouchableOpacity>
  );
};

export default SSOButton;

const styles = StyleSheet.create({
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
