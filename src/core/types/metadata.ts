export interface AppMetadata extends Record<string, unknown> {
  /**
   * General application details
   * @field name - The name of the application.
   * @field slug - A unique identifier or short URL for the app.
   * @field version - The current version of the app (e.g., "1.0.0").
   * @field description - A brief description of the app's purpose and features.
   * @field releaseDate - The official release date of the app.
   * @field lastUpdated - The last date when the app was updated.
   * @field supportEmail - An email address for user support or inquiries.
   */
  name: string;
  slug: string;
  version?: string;
  release_label?: string;
  description?: string;
  releaseDate?: string;
  lastUpdated?: string;
  supportEmail?: string;

  /**
   * Author & Developer Information
   * @field author - Information about the app's author or development team.
   * @field name - The name of the author or development team.
   * @field email - Contact email of the author/developer.
   * @field website - Personal or company website.
   * @field github - GitHub profile or repository link.
   * @field twitter - Twitter handle for communication.
   * @field linkedin - LinkedIn profile link.
   * @field contactNumber - Author's contact phone number.
   * @field address - Author's physical contact address.
   * @field organization - The name of the author's organization.
   */
  author?: {
    name?: string;
    email?: string;
    website?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
    contactNumber?: string;
    address?: string;
    organization?: string;
  };

  /**
   * Repository Information
   * @field repository - Information about the repository hosting the app's code.
   * @field type - The repository type (e.g., "git").
   * @field url - The URL of the repository.
   * @field branch - The specific branch of the repository (if applicable).
   */
  repository?: {
    type?: "git";
    url?: string;
    branch?: string;
  };

  /**
   * App Links & Support
   * @field links - Various URLs related to the app, such as official website or documentation.
   * @field website - Official website of the app.
   * @field documentation - Link to the app's documentation or user guide.
   * @field privacyPolicy - Link to the app's privacy policy.
   * @field termsOfService - Link to the app's terms of service.
   * @field faq - Frequently Asked Questions (FAQ) link for user help.
   * @field changelog - Link to the changelog or version history of the app.
   * @field releaseNotes - Link to release notes for updates and improvements.
   */
  links?: {
    website?: string;
    documentation?: string;
    privacyPolicy?: string;
    termsOfService?: string;
    faq?: string;
    changelog?: string;
    releaseNotes?: string;
  };

  /**
   * Supported platforms for the app.
   * @platforms android - Indicates support for Android devices.
   * @platforms ios - Indicates support for iOS devices.
   * @field platforms - List of platforms that the app supports (e.g., "android", "ios").
   */
  platforms?: ("android" | "ios")[];

  /**
   * App package name or identifier.
   * @field package - The package name used for identifying the app (e.g., "com.example.myapp").
   */
  package?: string;
}
