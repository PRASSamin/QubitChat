export interface CreateUserParams {
  /**
   * The display name of the user (optional)
   */
  name?: string;
  /**
   * URL to the user's profile picture (optional)
   */
  pictureUrl?: string;
  /**
   * User's profile information (optional)
   */
  profile?: string;
  /**
   * Unique identifier for the user (optional)
   */
  id?: string;
}

export interface GetOrCreateUserParams {
  /**
   * The display name of the user (optional)
   */
  name?: string;
  /**
   * URL to the user's profile picture (optional) 
   */
  pictureUrl?: string;
  /**
   * User's profile information (optional)
   */
  profile?: string;
}

export interface GetConversationParams {
  /**
   * Unique identifier of the conversation
   */
  id: string;
}

export interface DeleteConversationParams {
  /**
   * Unique identifier of the conversation to delete
   */
  id: string;
}

export interface CreateConversationParams {
  /**
   * Unique identifier for the new conversation (optional)
   */
  id?: string;
}

export interface ListConversationsParams {
  /**
   * Optional pagination token for fetching subsequent pages (optional)
   */
  nextToken?: string;
}

export interface GetOrCreateConversationParams {
  /**
   * Unique identifier of the conversation
   */
  id: string;
}

export interface ListenConversationParams {
  /**
   * Unique identifier of the conversation to listen to
   */
  id: string;
}

export interface ListMessagesParams {
  /**
   * Identifier of the target conversation
   */
  conversationId: string;
  /**
   * Optional pagination token for fetching subsequent pages (optional)
   */
  nextToken?: string;
}

export interface AddParticipantParams {
  /**
   * Identifier of the target conversation
   */
  conversationId: string;
  /**
   * Identifier of the user to add
   */
  userId: string;
}

export interface ListParticipantsParams {
  /**
   * Identifier of the target conversation
   */
  conversationId: string;
  /**
   * Optional pagination token for fetching subsequent pages
   */
  nextToken?: string;
}

export interface RemoveParticipantParams {
  /**
   * Identifier of the target conversation
   */
  conversationId: string;
  /**
   * Identifier of the user to remove
   */
  userId: string;
}

export interface GetParticipantParams {
  /**
   * Identifier of the target conversation
   */
  conversationId: string;
  /**
   * Identifier of the target user
   */
  userId: string;
}

export interface GetMessageParams {
  /**
   * Unique identifier of the message
   */
  id: string;
}

export interface DeleteMessageParams {
  /**
   * Unique identifier of the message to delete
   */
  id: string;
}

export interface UpdateUserParams {
  /**
   * Updated display name for the user
   */
  name?: string;
  /**
   * Updated URL of the user's profile picture
   */
  pictureUrl?: string;
  /**
   * Updated profile information
   */
  profile?: string;
}

export interface GetEventParams {
  /**
   * Unique identifier of the event
   */
  id: string;
}

export interface CreateEventParams {
  /**
   * Identifier of the target conversation
   */
  conversationId: string;
  /**
   * Array of key-value pairs containing event data
   */
  payload: Record<string, string>[];
}

export interface CreateMessageParams {
  /**
   * Identifier of the target conversation
   */
  conversationId: string;
  /**
   * Message content payload of various possible types
   */
  payload:
    | Option1Params
    | Option2Params
    | Option3Params
    | Option4Params
    | Option5Params
    | Option6Params
    | Option7Params
    | Option8Params
    | Option9Params
    | Option10Params;
}

type Option1Params = {
  /**
   * URL to the audio file
   */
  audioUrl: string;
  /**
   * Must be set to "audio"
   */
  text: "audio";
};

type Option2Params = {
  /**
   * Title of the card
   */
  title: string;
  /**
   * Optional subtitle for the card
   */
  subtitle?: string;
  /**
   * Optional URL for the card's image
   */
  imageUrl?: string;
  /**
   * Interactive actions for the card
   */
  actions: {
    /**
     * Type of action to perform
     */
    action: "postback" | "url" | "say";
    /**
     * Display text for the action
     */
    label: string;
    /**
     * Value/payload for the action
     */
    value: string;
  }[];
  /**
   * Must be set to "card"
   */
  type: "card";
};

type Option3Params = {
  /**
   * Array of items to display in the carousel
   */
  items: {
    /**
     * Title of the carousel item
     */
    title: string;
    /**
     * Optional subtitle for the carousel item
     */
    subtitle?: string;
    /**
     * Optional URL for the item's image
     */
    imageUrl?: string;
    /**
     * Interactive actions for the carousel item
     */
    actions: {
      /**
       * Type of action to perform
       */
      action: "postback" | "url" | "say";
      /**
       * Display text for the action
       */
      label: string;
      /**
       * Value/payload for the action
       */
      value: string;
    }[];
  }[];
  /**
   * Must be set to "carousel"
   */
  type: "carousel";
};

type Option4Params = {
  /**
   * Message text to display
   */
  text: string;
  /**
   * Available choices for the user
   */
  options: {
    /**
     * Display text for the choice
     */
    label: string;
    /**
     * Value/identifier for the choice
     */
    value: string;
  }[];
  /**
   * Must be set to "choice"
   */
  type: "choice";
};

type Option5Params = {
  /**
   * Message text to display
   */
  text: string;
  /**
   * Available options in the dropdown
   */
  options: {
    /**
     * Display text for the option
     */
    label: string;
    /**
     * Value/identifier for the option
     */
    value: string;
  }[];
  /**
   * Must be set to "dropdown"
   */
  type: "dropdown";
};

type Option6Params = {
  /**
   * URL to the file
   */
  fileUrl: string;
  /**
   * Optional title for the file
   */
  title?: string;
  /**
   * Must be set to "file"
   */
  type: "file";
};

type Option7Params = {
  /**
   * URL to the image
   */
  imageUrl: string;
  /**
   * Must be set to "image"
   */
  type: "image";
};

type Option8Params = {
  /**
   * Markdown-formatted text content
   */
  markdown: string;
  /**
   * Must be set to "markdown"
   */
  type: "markdown";
};

type Option9Params = {
  /**
   * Plain text content of the message
   */
  text: string;
  /**
   * Must be set to "text"
   */
  type: "text";
};

type Option10Params = {
  /**
   * URL to the video
   */
  videoUrl: string;
  /**
   * Must be set to "video"
   */
  type: "video";
};
