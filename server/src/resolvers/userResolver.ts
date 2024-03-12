import { inject, injectable } from "inversify";
import { IResolvers } from "@graphql-tools/utils";
import { TYPES } from "../models/container.types";
import { UserRepository } from "../repositories/userRepository";
@injectable()
export class UserResolverImpl {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}
  /**
   * IResolvers will need to be replaced by generated types
   */
  public resolvers: IResolvers = {
    Query: {
      userProfile: async (
        _: any,
        { userRequestParam }: { userRequestParam: { userId: string } }
      ) => {
        const { userId } = userRequestParam;

        return this.userRepository.getUserProfile(userId);
      },
    },
  };
}
