import "reflect-metadata";
import { App } from "./app";
import container from "./config/container";
import { TYPES } from "./models/container.types";

async function startServer() {
  const port = process.env.PORT || 3000;
  const app = container.get<App>(TYPES.App);

  await app.startApolloServer();

  app.getApp().listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
