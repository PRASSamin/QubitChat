/**
 * iOS Configuration for this app.
 *
 * Currently, iOS support is removed from the Expo configuration as I don't have a Mac to test the app on iOS.
 * However, this file is retained for future reference.
 *
 * If iOS support needs to be added later, this configuration can be used in the actual app.json file.
 */
module.exports = {
  expo: {
    platforms: ["android", "ios"],
    ios: {
      supportsTablet: true,
      bitcode: false,
      bundleIdentifier: "com.pras.qubitchat",
      googleServicesFile: "./google-services-qubitchat.json",
    },
  },
};
