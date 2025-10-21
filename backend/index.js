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
    origin: function (origin, callback) {
      // origin = null khi request từ Postman hoặc curl
      if (!origin) return callback(null, true);

      // Chỉ cho phép các origin từ localhost
      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      // Nếu không đúng, từ chối
      callback(new Error("Not allowed by CORS"));
    },
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
