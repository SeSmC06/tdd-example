import express from "express";
import container from "./config/container";
import { TYPES } from "./models/container.types";
import { Logger } from "./models/logger.types";

export const app = express();
app.get("/", (req: express.Request, res: express.Response) => {
  const logger = container.get<Logger>(TYPES.Logger);
  logger.info("Received a request on the root route");
  res.sendStatus(200);
});
