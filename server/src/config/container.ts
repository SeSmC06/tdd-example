import { Container } from "inversify";
import "reflect-metadata";
import { LoggerImpl } from "./logger";
import { TYPES } from "../models/container.types";
import { Logger } from "../models/logger.types";
import {
  LoggerService,
  MockLoggerServiceImpl,
} from "../services/loggerService";
import { App } from "../app";
import {
  ProfileService,
  ProfileServiceImpl,
  UserService,
  UserServiceImpl,
} from "../services/userService";
import {
  UserController,
  UserControllerImpl,
} from "../controllers/userController";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../repositories/userRepository";
import { UserResolverImpl } from "../resolvers/userResolver";

const container = new Container();

/**
 * have different containers with AppContainer loading different modules
 */
container.bind<Logger>(TYPES.Logger).to(LoggerImpl);
container.bind<LoggerService>(TYPES.LoggerService).to(MockLoggerServiceImpl);
container.bind<App>(TYPES.App).to(App);
container.bind<ProfileService>(TYPES.ProfileService).to(ProfileServiceImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<UserController>(TYPES.UserController).to(UserControllerImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<UserResolverImpl>(TYPES.UserResolver).to(UserResolverImpl);

export default container;
