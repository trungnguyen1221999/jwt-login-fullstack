import { Router } from "express";
import {
  deleteUser,
  getAllUserProfile,
  updateUserProfile,
  userLogin,
  userRegister,
  refreshAccessToken,
  userLogout,
} from "../controllers/userControllers.js";
import {
  authMiddleware,
  isAdmin,
  verifyRefreshToken,
} from "../middleware/AuthMiddleware.js";

const userRouter = Router();

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.post("/refresh-token", verifyRefreshToken, refreshAccessToken);

userRouter.post("/logout", userLogout);

userRouter.get("/profile", authMiddleware, isAdmin, getAllUserProfile);

userRouter.put("/profile/:id", authMiddleware, isAdmin, updateUserProfile);

userRouter.delete("/delete/:id", authMiddleware, isAdmin, deleteUser);

export default userRouter;
