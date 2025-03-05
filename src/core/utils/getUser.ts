import axios from "axios";
import { CLERKSECRET } from "../constants/keys";
import { User, UserQueryParams } from "../types/clerk";
import { prepareUrl } from "./prepareUrl";

/**
 * Fetches user details from Clerk API based on the provided query parameters.
 * @param params - Query parameters to filter the user list.
 * @returns A promise resolving to a user object or null if the request fails.
 */
export const getUser = async (
  params: UserQueryParams
): Promise<User[] | null> => {
  const baseUrl = "https://api.clerk.com/v1/users";
  try {
    const preparedUrl = prepareUrl(baseUrl, params);
    const { data } = await axios.get<User[]>(preparedUrl, {
      headers: { Authorization: `Bearer ${CLERKSECRET}` },
    });

    return data;
  } catch (error) {
    console.log("Error fetching user:", error);
    return null;
  }
};
