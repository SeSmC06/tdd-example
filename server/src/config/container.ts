import { Container } from "inversify";
import "reflect-metadata";
import { LoggerImpl } from "./logger";
import { TYPES } from "../models/container.types";
import { Logger } from "../models/logger.types";

const container = new Container();

container.bind<Logger>(TYPES.Logger).to(LoggerImpl);

export default container;
