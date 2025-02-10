import * as Clipboard from "expo-clipboard";

const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);
};

const getClipboard = async () => {
  const text = await Clipboard.getStringAsync();
  return text;
};

export { copyToClipboard, getClipboard };

export default Clipboard;
