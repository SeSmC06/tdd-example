export interface UserDetail {
  /**
   * jsdoc for url
   */
  avatarUrl: string;
}

/**
 * sample tsdoc
 */
export interface ProfileData {
  id: string;
  name: string;
  email: string;
}

export interface UserProfile extends UserDetail, ProfileData {}
