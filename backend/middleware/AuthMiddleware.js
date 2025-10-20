import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModels.js";
dotenv.config();
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decode;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const existUser = await User.findById(id);
    if (!existUser) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = existUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

export { authMiddleware, isAdmin };
