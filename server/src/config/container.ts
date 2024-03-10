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

const container = new Container();

container.bind<Logger>(TYPES.Logger).to(LoggerImpl);
container.bind<LoggerService>(TYPES.LoggerService).to(MockLoggerServiceImpl);
container.bind<App>(TYPES.App).to(App);

export default container;
