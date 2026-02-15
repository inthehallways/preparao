import express from "express"
import { body } from "express-validator"
import { loginUser, registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post(
    "/register",
    [
        body("email")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),
        body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
        .trim(),
        body("name")
        .notEmpty().withMessage("Name is required")
        .trim()
        .escape()
    ], 
    registerUser
);

userRouter.post(
    "/login",
    [
        body("email")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),
        body("password")
        .notEmpty().withMessage("Password is required")
        .trim()
    ], 
    loginUser);

export default userRouter;