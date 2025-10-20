
import { Router } from "express";
import { deleteUser, getUserProfile, updateUserProfile, userLogin, userRegister } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.get("/profile", getUserProfile);

userRouter.put("/profile", updateUserProfile);

userRouter.delete("/:id", deleteUser);

export default userRouter;