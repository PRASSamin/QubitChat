import { ExpoConfig } from "expo/config";

const pictorialmark =
  "https://cidxhvsaxjndcogbdgav.supabase.co/storage/v1/object/sign/PRAS/qubitchat/adaptive-pictorialmark.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJQUkFTL3F1Yml0Y2hhdC9hZGFwdGl2ZS1waWN0b3JpYWxtYXJrLnBuZyIsImlhdCI6MTc0MTA4NzQ0MSwiZXhwIjoyMDU2NDQ3NDQxfQ.CRnD3nNRzgeagg2oT59OEm0meBbNZHhdoE_cNOaxOTE";
const splash =
  "https://cidxhvsaxjndcogbdgav.supabase.co/storage/v1/object/sign/PRAS/qubitchat/splash-pictorialmark.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJQUkFTL3F1Yml0Y2hhdC9zcGxhc2gtcGljdG9yaWFsbWFyay5wbmciLCJpYXQiOjE3NDEwODUzMDcsImV4cCI6MjA1NjQ0NTMwN30.uSoSHg_xlal3i5G9qv5aSqkRvZgbsKoVHgA-NB5p4f4";

export default (): ExpoConfig => ({
  name: "Qubit Chat",
  slug: "qubitchat",
  primaryColor: "#00d5ff",
  githubUrl: "https://github.com/PRASSamin/qubitchat",
  version: "1.0.0",
  sdkVersion: "52.0.0",
  orientation: "portrait",
  icon: pictorialmark,
  scheme: "qubitchat",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  platforms: ["android"],
  ios: {
    bundleIdentifier: "com.pras.qubitchat",
    googleServicesFile: "./GoogleService-Info.plist",
  },
  splash: {},
  android: {
    package: "com.pras.qubitchat",
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      monochromeImage: pictorialmark,
      foregroundImage: pictorialmark,
      backgroundColor: "#120E1C",
    },
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
    "expo-asset",
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
        image: splash,
        imageWidth: 200,
        resizeMode: "cover",
        backgroundColor: "#FFFFFF",
        dark: {
          backgroundColor: "#120E1C",
          image: splash,
          imageWidth: 200,
          resizeMode: "cover",
        },
      },
    ],
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
