import "reflect-metadata";
import { Container } from "inversify";
import { Logger } from "../models/logger.types";
import { TYPES } from "../models/container.types";
import { LoggerImpl } from "../config/logger";

describe("Logger", () => {
  let container: Container;
  let logger: Logger;

  beforeEach(() => {
    container = new Container();
    container.bind<Logger>(TYPES.Logger).to(LoggerImpl);
    logger = container.get<Logger>(TYPES.Logger);
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
