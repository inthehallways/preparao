import express from "express"
import { body } from "express-validator"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post(
    "/add",
     authMiddleware,
     [
        body("foodId")
        .notEmpty().withMessage("Food ID is required")
        .trim()
        .escape(),
        body("quantity")
        .isInt({ min: 1 }).withMessage("Quantity must be at least 1")
    ],
     addToCart
    );

cartRouter.post(
    "/remove",
     authMiddleware,
     [
        body("foodId")
        .notEmpty().withMessage("Food ID is required")
        .trim()
        .escape()
    ],
     removeFromCart
    );

cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;