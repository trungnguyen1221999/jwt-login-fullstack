import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generalAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generalRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export { generalAccessToken, generalRefreshToken };
