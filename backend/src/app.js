import express from "express";
import cors from "cors";
import morgan from "morgan";

import prisma from "./config/database.js";
import redis from "./config/redis.js";
import requestId from "./utils/requestId.js";
import logger, { morganStream } from "./utils/logger.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use(requestId);
morgan.token("id", (req) => req.id);
const httpFormat = ':id :method :url :status - :response-time ms';
app.use(morgan(httpFormat, { stream:morganStream }));

logger.info("Express App initialized");

//routing
app.get('/', (req, res)=>{
   res.json({message: "Sitaqur API is Running 🚀"});
});


(async () => {
  const test = await prisma.test.create({
    data: { name: "Hello Prisma" }
  });
  console.log(test);
})();
(async () => {
  
})();

app.get("/test-redis", async (req,res) => {
  try {
    await redis.set("ping","pong")
    const value = await redis.get("ping")
    res.json({redis:value})
  } catch (error) {
    req.status(500).json({error: error.message})
  }
})

export default app;