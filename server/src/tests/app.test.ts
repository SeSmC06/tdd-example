import { Container } from "inversify";
import "reflect-metadata";
import request from "supertest";
import { App } from "../app";
import { beforeEach } from "node:test";
import { TYPES } from "../models/container.types";
import { Logger } from "winston";
import {
  LoggerService,
  MockLoggerServiceImpl,
} from "../services/loggerService";

describe("Express App", () => {
  let app: App;
  let container: Container;

  beforeAll(() => {
    container = new Container();
    container.bind<Logger>(TYPES.Logger).toSelf();
    container
      .bind<LoggerService>(TYPES.LoggerService)
      .to(MockLoggerServiceImpl);
  });

  beforeEach(() => {
    app = container.resolve(App);
  });

  it("should respond with 200 on the root route ", async () => {
    const response = await request(app.getApp()).get("/");
    expect(response.status).toBe(200);
  });
});
