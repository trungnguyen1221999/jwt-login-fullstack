import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./MongoBDConnect.js";
import userRouter from "./routers/userRouters.js";

dotenv.config();

// Kết nối MongoDB
connectDB();
const app = express();

// CORS configuration
app.use(cors()); // Cho phép tất cả origins với cấu hình mặc định

app.use(express.json());

const port = process.env.PORT || 5002;

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
