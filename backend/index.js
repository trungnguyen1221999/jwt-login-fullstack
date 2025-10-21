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
  cors(
    { credentials: true } // <– rất quan trọng để gửi cookie
  )
); // Cho phép tất cả origins với cấu hình mặc định

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5002;

app.use("/api/users", userRouter);
app.get("/check-cookie", (req, res) => {
  console.log("Cookies received:", req.cookies);
  res.json(req.cookies);
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
