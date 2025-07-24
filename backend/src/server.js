import express from "express"
import dotenv from "dotenv"
import { initDB } from "./config/db.js";

import transactionRoutes from './routes/transaction.route.js'
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//gpt said add this line for real ips
app.set("trust proxy", true);


app.use(rateLimiter);
app.use(express.json());



app.get("/",(req,res) => {
  res.send("It is working");
});

app.use("/api/transactions", transactionRoutes);



initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT: ", PORT)
  });
})