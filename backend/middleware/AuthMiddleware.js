import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModels.js";
import { generalAccessToken } from "../helper/jwtGenerateToken.js";
dotenv.config();
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    // Thử verify access token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decode;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const existUser = await User.findById(id);
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = existUser;
    next();
  } catch (error) {
    // Nếu access token hết hạn, thử refresh tự động
    if (error.name === "TokenExpiredError") {
      try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          return res.status(401).json({
            success: false,
            message: "Access token expired and no refresh token found",
            needLogin: true,
          });
        }

        // Verify refresh token
        const refreshDecoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );
        const user = await User.findById(refreshDecoded.id);

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found",
            needLogin: true,
          });
        }

        // Tạo access token mới

        const newAccessToken = generalAccessToken(user);

        // Gửi token mới về client (kèm Bearer prefix)
        res.setHeader("X-New-Access-Token", `Bearer ${newAccessToken}`);
        req.user = user;
        next();
      } catch (refreshError) {
        return res.status(401).json({
          success: false,
          message: "Both tokens expired. Please login again",
          needLogin: true,
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

// Middleware để verify refresh token
const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired. Please login again",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

export { authMiddleware, isAdmin, verifyRefreshToken };
