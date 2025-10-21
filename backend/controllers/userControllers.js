import {
  generalAccessToken,
  generalRefreshToken,
} from "../helper/jwtGenerateToken.js";
import sessionSchema from "../models/sessionSchema.js";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const userRegister = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, username, email, password });
    const hashPassword = await bcrypt.hash(password, 10);
    newUser.password = hashPassword;
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existUser = await User.findOne({ username });
    if (!existUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = generalAccessToken(existUser);

    const refreshToken = generalRefreshToken(existUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    await sessionSchema.create({
      userId: existUser._id,
      refreshToken,
      expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUserProfile = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "User profiles retrieved successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) res.status(400).json({ message: "User ID is required" });
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) res.status(400).json({ message: "User ID is required" });
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh Access Token
const refreshAccessToken = async (req, res) => {
  try {
    const user = req.user; // Từ verifyRefreshToken middleware

    // Tạo access token mới
    const newAccessToken = generalAccessToken(user);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while refreshing token",
    });
  }
};

// Logout - Xóa refresh token
const userLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    console.log("Logout refreshToken:", refreshToken);
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token not found",
      });
    }
    res.clearCookie("refreshToken");

    await sessionSchema.deleteOne({ refreshToken });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

export {
  userRegister,
  userLogin,
  getAllUserProfile,
  updateUserProfile,
  deleteUser,
  refreshAccessToken,
  userLogout,
};
