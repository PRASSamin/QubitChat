import { StreamChat } from "stream-chat";
import { STREAM_API_KEY } from "./keys";
import axios from "axios";
import axiosRetry from "axios-retry";

export const StreamClient = StreamChat.getInstance(STREAM_API_KEY);

export const Axios = axios.create();
axiosRetry(Axios, {
  retries: 3,
  retryDelay: (retryCount) => 100 * 2 ** retryCount,
  retryCondition: (error) =>
    Boolean(
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response && error.response.status >= 500)
    ),
});
