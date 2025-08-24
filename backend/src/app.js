import express from "express";
import cors from "cors";
import prisma from "./config/database.js";
import redis from "./config/redis.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

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

export default app;