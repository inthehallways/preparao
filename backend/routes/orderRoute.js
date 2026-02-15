import express from "express";
import { body } from "express-validator";
import authMiddleware, { authorizeRole } from "../middleware/auth.js";
import {
  placeOrder,
  userOrders,
  verifyOrder,
  listOrders,
  updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// User: place order
orderRouter.post(
  "/place",
  authMiddleware,
  [
    body("amount").isFloat({ min: 0 }).withMessage("Amount must be a valid number"),
    body("address").notEmpty().withMessage("Address is required")
  ],
  placeOrder
);

orderRouter.post(
  "/verify",
  [body("orderId").notEmpty().withMessage("Order ID is required").trim().escape()],
  verifyOrder
);

orderRouter.post("/userorders", authMiddleware, userOrders);

orderRouter.get("/list", authMiddleware, authorizeRole("admin"), listOrders);

orderRouter.post(
  "/status",
  authMiddleware,
  authorizeRole("admin"),
  [
    body("orderId").notEmpty().withMessage("Order ID is required").trim().escape(),
    body("status")
      .isIn(["Food Processing", "Out for Delivery", "Delivered"])
      .withMessage("Invalid order status")
  ],
  updateStatus
);

export default orderRouter;


