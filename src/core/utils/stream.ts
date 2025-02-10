import type {
  Channel as StreamChannelType,
  UserResponse as StreamUser,
} from "stream-chat";

/**
 * Extracts a list of channel members along with their online status.
 * @param channel The Stream channel object.
 * @returns An array of objects containing user details and online status.
 */
const getChannelMemberList = (
  channel: StreamChannelType
): { user: StreamUser; isOnline: boolean }[] => {
  if (!channel.state.members) return [];

  return Object.values(channel.state.members).map((member) => ({
    user: member.user as StreamUser,
    isOnline: Boolean(member.user?.online),
  }));
};

/**
 * Retrieves up to 10 profile images from the channel members.
 * @param channel The Stream channel object.
 * @param limit The maximum number of profile images to retrieve.
 * @returns An array of profile image URLs.
 */
const getChannelMemberAvatars = (
  channel: StreamChannelType,
  limit?: number
): string[] => {
  if (!channel.state.members) return [];

  const images = Object.values(channel.state.members)
    .map((member) => member.user?.image || "")
    .filter(Boolean); // Remove any empty strings

  return images.slice(0, limit || images.length) as string[];
};

export { getChannelMemberList, getChannelMemberAvatars };
