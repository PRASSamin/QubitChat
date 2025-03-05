/**
 * Selected types from Clerk's API reference:
 * https://clerk.com/docs/reference/backend-api/tag/Users#operation/GetUserList
 *
 * This file includes only the types relevant to this application.
 * If additional types are needed in the future, they can be added from the link above.
 */

import { ExternalAccountJSON } from "@clerk/types";

export type EmailVerification = {
  status: string;
  strategy: boolean;
};

export type LinkedAccount = {
  type: string;
  id: string;
};

export interface EmailAddress {
  id: string;
  object: string;
  email_address: string;
  reserved: boolean;
  verification: EmailVerification;
  linked_to: LinkedAccount[];
  matches_sso_connection: boolean;
  created_at: number;
  updated_at: number;
}

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string;
  has_image: boolean;
  primary_email_address_id: string;
  email_addresses: EmailAddress[];
  external_accounts: ExternalAccountJSON[];
  public_metadata: Record<string, unknown>;
  private_metadata: Record<string, unknown>;
  unsafe_metadata: Record<string, unknown>;
  last_sign_in_at: number | null;
  created_at: number | null;
  updated_at: number | null;
  last_active_at: number | null;
  profile_image_url: string;
}

export interface UserQueryParams {
  email_address?: string[];
  phone_number?: string[];
  username?: string[];
  user_id?: string[];
  email_address_query?: string;
  phone_number_query?: string;
  username_query?: string;
  name_query?: string;
  offset?: number;
  limit?: number;
  order_by?:
    | "+created_at"
    | "-created_at"
    | "+updated_at"
    | "-updated_at"
    | "+last_active_at"
    | "-last_active_at"
    | "+last_sign_in_at"
    | "-last_sign_in_at";
}
