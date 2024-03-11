import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "../models/container.types";
import { UserRepositoryImpl } from "../repositories/userRepository";

export interface UserController {
  getUserProfile: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class UserControllerImpl implements UserController {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepositoryImpl
  ) {}

  async getUserProfile(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;

    try {
      const userProfile = await this.userRepository.getUserProfile(userId);
      res.json(userProfile);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
