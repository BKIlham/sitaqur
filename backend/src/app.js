import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

//Import modules
import logger, { morganStream } from "./utils/logger.js";
import requestId from "./utils/requestId.js";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./middleware/errorHandler.js";

//Import Configuration
import prisma from "./config/database.js";
import redis from "./config/redis.js";

const app = express();
logger.info("Express App initialized");

//Common middleware
app.use(express.json());

//Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

//Compression middleware and logging
app.use(compression());
app.use(requestId);
morgan.token("id", (req) => req.id);
const httpFormat = ":id :method :url :status - :response-time ms";
app.use(morgan(httpFormat, { stream: morganStream }));

//Main routing
app.get("/", (req, res) => {
  res.json({ message: "Sitaqur API is Running 🚀" });
});

// (async () => {
//   const test = await prisma.test.create({
//     data: { name: "Hello Prisma" }
//   });
//   console.log(test);
// })();
// (async () => {

// })();

app.get("/test-redis", async (req, res) => {
  try {
    await redis.set("ping", "pong");
    const value = await redis.get("ping");
    res.json({ redis: value });
  } catch (error) {
    req.status(500).json({ error: error.message });
  }
});

app.get("/error-test", (req, res, next) => {
  next(new ApiError(400, "Contoh Error Bad Request"));
});

//Error Handling middleware
app.use(errorHandler);

export default app;
