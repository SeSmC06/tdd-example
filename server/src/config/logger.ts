import { inject, injectable } from "inversify";
import { createLogger, format, transports } from "winston";
import { Logger } from "../models/logger.types";
import { TYPES } from "../models/container.types";
import { MockLoggerServiceImpl } from "../services/loggerService";

@injectable()
export class LoggerImpl implements Logger {
  private logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: "TDD Example" },
    transports: [
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combined.log" }),
    ],
  });

  constructor(
    @inject(TYPES.LoggerService) private loggerService: MockLoggerServiceImpl
  ) {
    this.setupLogger();
  }

  private async setupLogger(): Promise<void> {
    Promise.resolve("Hello world");
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
  error(message: string): void {
    this.logger.error(message);
  }
}
