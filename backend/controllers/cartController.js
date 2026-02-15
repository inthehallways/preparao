import userModel from "../models/userModel.js";
import { validationResult } from "express-validator";

// add items to cart
const addToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const itemId = req.body.foodId;

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// remove items from cart
const removeFromCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const itemId = req.body.foodId;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get cart
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, removeFromCart, getCart };


