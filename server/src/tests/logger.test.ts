import "reflect-metadata";
import { Container } from "inversify";
import { Logger } from "../models/logger.types";
import { TYPES } from "../models/container.types";
import { LoggerImpl } from "../config/logger";
import {
  LoggerService,
  MockLoggerServiceImpl,
} from "../services/loggerService";

describe("Logger", () => {
  /**
   * TODO without beforeEach's binding and get
   */
  let container: Container;
  let logger: Logger;
  let loggerService: LoggerService;

  beforeEach(() => {
    container = new Container();
    container.bind<Logger>(TYPES.Logger).to(LoggerImpl);
    container
      .bind<LoggerService>(TYPES.LoggerService)
      .to(MockLoggerServiceImpl);
    logger = container.get<Logger>(TYPES.Logger);
    loggerService = container.get<LoggerService>(TYPES.LoggerService);
  });

  it("should log an info message", () => {
    const infoSpy = jest.spyOn(logger, "info");
    logger.info("Test info message");
    expect(infoSpy).toHaveBeenCalledWith("Test info message");
  });

  it("should log a warning message", () => {
    const warnSpy = jest.spyOn(logger, "warn");
    logger.warn("Test warning message");
    expect(warnSpy).toHaveBeenCalledWith("Test warning message");
  });

  it("should log an error message", () => {
    const errorSpy = jest.spyOn(logger, "error");
    logger.error("Test error message");
    expect(errorSpy).toHaveBeenCalledWith("Test error message");
  });
});
