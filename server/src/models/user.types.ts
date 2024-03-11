interface UserDetail {
  avatarUrl: string;
}

/**
 * sample tsdoc
 */
interface ProfileData {
  id: string;
  name: string;
  email: string;
}

interface UserProfile extends UserDetail, ProfileData {}
