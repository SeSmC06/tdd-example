import { inject, injectable } from "inversify";
import { TYPES } from "../models/container.types";
import { ProfileService, UserService } from "../services/userService";
import { UserProfile } from "../models/user.types";

export interface UserRepository {
  getUserProfile: (userId: string) => Promise<UserProfile>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.ProfileService) private profileService: ProfileService
  ) {}

  async getUserProfile(userId: string): Promise<UserProfile> {
    const userDetail = await this.userService.getUserDetail(userId);
    const profileData = await this.profileService.getProfileData(userId);

    /**
     * error handling here is probably necessary
     * check with be
     */
    const userProfile: UserProfile = {
      ...userDetail,
      ...profileData,
    };
    return userProfile;
  }
}
