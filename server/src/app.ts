import express, { Application } from "express";
import { TYPES } from "./models/container.types";
import { Logger } from "./models/logger.types";
import { inject, injectable } from "inversify";
import { UserControllerImpl } from "./controllers/userController";

@injectable()
export class App {
  private app: Application;

  constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.UserController) private userController: UserControllerImpl
  ) {
    this.app = express();
    this.setupRoute();
  }

  private setupRoute(): void {
    this.app.get("/", (req, res) => {
      this.logger.info("Received a request on the root route");
      res.sendStatus(200);
    });
    this.app.get("/users/:userId/profile", (req, res) =>
      this.userController.getUserProfile(req, res)
    );
  }

  public getApp(): Application {
    return this.app;
  }
}
