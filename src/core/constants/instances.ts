import { StreamChat } from "stream-chat";
import { STREAM_API_KEY, STREAM_API_SECRET, CLERKPUBKEY } from "./keys";

export const StreamClient = StreamChat.getInstance(STREAM_API_KEY);
