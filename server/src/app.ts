import express from "express";

export const app = express();
app.get("/", (req, res) => {
  res.sendStatus(200);
});
