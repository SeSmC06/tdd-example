import request from "supertest";
import { app } from "../app";

describe("Express App", () => {
  it("should respond with 200 on the root route ", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
