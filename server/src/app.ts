import express, { Application, Request } from "express";
import { TYPES } from "./models/container.types";
import { Logger } from "./models/logger.types";
import { inject, injectable } from "inversify";
import { UserControllerImpl } from "./controllers/userController";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userTypeDefs } from "./graphql/schema";
import { UserResolverImpl } from "./resolvers/userResolver";

@injectable()
export class App {
  private app: Application;
  private apolloServer: ApolloServer;

  constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.UserController) private userController: UserControllerImpl,
    @inject(TYPES.UserResolver) private userResolver: UserResolverImpl
  ) {
    this.app = express();
    const schema = makeExecutableSchema({
      typeDefs: [userTypeDefs],
      resolvers: this.userResolver.resolvers,
    });
    this.setupRoute();
    this.apolloServer = new ApolloServer({ schema });
  }

  private setupRoute(): void {
    this.app.get("/", (req, res) => {
      this.logger.info("Received a request on the root route");
      res.sendStatus(200);
    });
    this.app.get("/users/:userId/profile", (req, res) =>
      this.userController.getUserProfile(req, res)
    );
  }

  public async start(): Promise<void> {
    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({ app: this.app });
    //   this.app.use(
    //     "/graphql",
    //     expressMiddleware(this.apolloServer, {
    //       context: async(({ req }) => ({ req })),
    //     })
    //   );
  }

  public getApp(): Application {
    return this.app;
  }
}
