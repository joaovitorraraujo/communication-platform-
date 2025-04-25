import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import cors from "cors";

const app: Express = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001", // permite só seu frontend
    credentials: true, // permite envio de cookies, headers etc.
  })
);

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log("server running on port 8000!");
});
