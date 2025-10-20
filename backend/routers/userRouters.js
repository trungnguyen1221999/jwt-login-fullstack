
import { Router } from "express";
import { deleteUser, getAllUserProfile, updateUserProfile, userLogin, userRegister } from "../controllers/userControllers.js";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";

const userRouter = Router();

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.get("/profile", authMiddleware, isAdmin, getAllUserProfile);

userRouter.put("/profile/:id", authMiddleware, isAdmin, updateUserProfile);

userRouter.delete("/delete/:id", authMiddleware, isAdmin, deleteUser);

export default userRouter;