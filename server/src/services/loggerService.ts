import { injectable } from "inversify";

interface LoggerConfig {
  token: string;
}

export interface LoggerService {
  getLoggerConfig: () => Promise<LoggerConfig>;
}

/**
 * fetches from external service
 * to bind first: container.bind<LoggerService>(TYPES.LoggerService).to(MockLoggerServiceImpl)
 * use: container.get<LoggerService)(TYPES.LoggerService)
 */
@injectable()
export class MockLoggerServiceImpl implements LoggerService {
  public async getLoggerConfig(): Promise<LoggerConfig> {
    return {
      token: "test-token",
    };
  }
}
