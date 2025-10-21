import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generalAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generalRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export { generalAccessToken, generalRefreshToken };
