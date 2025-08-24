import express from "express";
import cors from "cors";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routing
app.get('/', (req, res)=>{
   res.json({message: "Sitaqur API is Running 🚀"});
});

export default app;