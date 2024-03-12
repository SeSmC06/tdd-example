import { Container } from "inversify";
import "reflect-metadata";
import request from "supertest";
import { App } from "../app";
import { afterEach, beforeEach } from "node:test";
import { TYPES } from "../models/container.types";
import {
  LoggerService,
  MockLoggerServiceImpl,
} from "../services/loggerService";
import { UserControllerImpl } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService, ProfileService } from "../services/userService";
import { Logger } from "../models/logger.types";

describe("App", () => {
  let app: App;
  let container: Container;

  beforeEach(() => {
    container = new Container();
    container.bind<Logger>(TYPES.Logger).toConstantValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    });
    container.bind<UserRepository>(TYPES.UserRepository).toConstantValue({
      getUserProfile: jest.fn(),
    });
    container.bind<UserService>(TYPES.UserService).toConstantValue({
      getUserDetail: jest.fn(),
    });
    container.bind<ProfileService>(TYPES.ProfileService).toConstantValue({
      getProfileData: jest.fn(),
    });
    container
      .bind<UserControllerImpl>(TYPES.UserController)
      .to(UserControllerImpl);
    app = container.resolve(App);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create an instance of App", () => {
    expect(app).toBeDefined();
  });

  it("should respond with 200 on the root route", async () => {
    const response = await request(app.getApp()).get("/");
    expect(response.status).toBe(200);
  });

  it("should respond with user profile on /users/:userId/profile", async () => {
    const userId = "user123";
    const userProfile = {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
      profilePicture: "profile.jpg",
    };
    const userRepositoryMock = container.get<UserRepository>(
      TYPES.UserRepository
    );
    (userRepositoryMock.getUserProfile as jest.Mock).mockResolvedValue(
      userProfile
    );

    const response = await request(app.getApp()).get(
      `/users/${userId}/profile`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(userProfile);
    expect(userRepositoryMock.getUserProfile).toHaveBeenCalledWith(userId);
  });

  it("should respond with user profile on userProfile query", async () => {
    const userId = "user123";
    const userProfile = {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
      profilePicture: "profile.jpg",
    };
    const userRepositoryMock = container.get<UserRepository>(
      TYPES.UserRepository
    );
    (userRepositoryMock.getUserProfile as jest.Mock).mockResolvedValue(
      userProfile
    );

    const response = await request(app.getApp())
      .post("/graphql")
      .send({
        query: `
          query {
            userProfile(userRequestParam: { userId: "${userId}" }) {
              id
              name
              email
              profilePicture
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.userProfile).toEqual(userProfile);
    expect(userRepositoryMock.getUserProfile).toHaveBeenCalledWith(userId);
  });
});
