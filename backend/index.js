import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./MongoBDConnect.js";
import userRouter from "./routers/userRouters.js";
import cookieParser from "cookie-parser";

dotenv.config();

// Kết nối MongoDB
connectDB();
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://transcendent-cupcake-185c5a.netlify.app/",
    credentials: true, // gửi cookie
  })
);
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5002;

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
