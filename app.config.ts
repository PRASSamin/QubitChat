import { ExpoConfig } from "expo/config";
import { metadata } from "./meta";

export default (): ExpoConfig => ({
  name: metadata.name,
  slug: metadata.slug,
  primaryColor: "#00d5ff",
  githubUrl: metadata.repository?.url,
  version: metadata.version,
  sdkVersion: "52.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/pictorialmark.png",
  scheme: metadata.slug,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  platforms: metadata.platforms,
  ios: {
    bundleIdentifier: metadata.package,
    googleServicesFile: "./GoogleService-Info-qubitchat.plist",
  },
  android: {
    package: metadata.package,
    googleServicesFile: "./google-services-qubitchat.json",
    permissions: [
      // 📢 Microphone for voice messages & calls
      "android.permission.RECORD_AUDIO",

      // 📸 Camera for video calls & media sharing
      "android.permission.CAMERA",

      // 📁 Storage access for media sharing
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE",

      // 📍 Location for sharing live location
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.ACCESS_COARSE_LOCATION",

      // 📞 Phone state for call status & VoIP
      "android.permission.READ_PHONE_STATE",

      // 🎤 Modify audio settings (optional, for better call handling)
      "android.permission.MODIFY_AUDIO_SETTINGS",

      // 🔔 Notifications for messages & calls
      "android.permission.POST_NOTIFICATIONS",

      // 🔥 Internet (implicitly granted, but good to ensure)
      "android.permission.INTERNET",

      // ⚡ Keep the app awake for real-time messaging
      "android.permission.WAKE_LOCK",

      // 📬 Retrieve accounts (if using Google sign-in)
      "android.permission.GET_ACCOUNTS",

      // 🆔 Unique device identifier (for push notifications & analytics)
      "android.permission.READ_PHONE_NUMBERS",
    ],
  },
  plugins: [
    "expo-router",
    [
      "expo-build-properties",
      {
        android: {
          extraMavenRepos: [
            "../../node_modules/@notifee/react-native/android/libs",
          ],
        },
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/pictorialmark.png",
        imageWidth: 200,
        resizeMode: "contain",
      },
    ],
    "expo-font",
    [
      "expo-av",
      {
        microphonePermission:
          "$(PRODUCT_NAME) would like to use your microphone for voice recording.",
      },
    ],
    [
      "expo-image-picker",
      {
        cameraPermission:
          "$(PRODUCT_NAME) would like to use your camera to share image in a message.",
        photosPermission:
          "$(PRODUCT_NAME) would like to use your device gallery to attach image in a message.",
      },
    ],
    [
      "expo-media-library",
      {
        photosPermission:
          "$(PRODUCT_NAME) would like access to your photo gallery to share image in a message.",
        savePhotosPermission:
          "$(PRODUCT_NAME) would like to save photos to your photo gallery after downloading from a message.",
      },
    ],
    "@react-native-firebase/messaging",
    "@react-native-firebase/app",
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "3ef9adfb-4ff6-4552-9e97-1e932bd05ab9",
    },
  },
  owner: "prassamin",
});
