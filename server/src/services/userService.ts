import { injectable } from "inversify";
import type { UserDetail, ProfileData } from "../models/user.types";

export interface UserService {
  getUserDetail(userId: string): Promise<UserDetail>;
}

@injectable()
export class UserServiceImpl implements UserService {
  public async getUserDetail(userId: string): Promise<UserDetail> {
    return {
      avatarUrl: "test-string",
    };
  }
}

export interface ProfileService {
  getProfileData(userId: string): Promise<ProfileData>;
}

@injectable()
export class ProfileServiceImpl implements ProfileService {
  async getProfileData(userId: string): Promise<ProfileData> {
    return {
      id: "test-id",
      name: "test-name",
      email: "test@email.com",
    };
  }
}
