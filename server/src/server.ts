import { App } from "./app";
import container from "./config/container";
import { TYPES } from "./models/container.types";

const port = process.env.PORT || 3000;
const app = container.get<App>(TYPES.App).getApp();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
