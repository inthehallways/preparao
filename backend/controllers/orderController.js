import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { validationResult } from "express-validator";
import { encryptField, decryptField } from "../config/crypto.js";


// =======================
// PLACE ORDER (AUTO PAID)
// =======================
const placeOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }


  try {
    // 🔐 Encrypt address before saving
    const encryptedAddress = encryptField(
      JSON.stringify(req.body.address)
    );


    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: encryptedAddress,
      payment: true // ✅ AUTO MARK AS PAID
    });


    await newOrder.save();


    // Clear cart after order
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {}
    });


    res.json({
      success: true,
      message: "Order placed and marked as paid"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// =======================
// VERIFY ORDER (OPTIONAL)
// =======================
// kept only for compatibility — not required anymore
const verifyOrder = async (req, res) => {
  return res.json({
    success: true,
    message: "Payment already confirmed"
  });
};


// =======================
// USER ORDERS (DECRYPT)
// =======================
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      userId: req.body.userId
    });


    const safeOrders = orders.map((order) => {
      const obj = order.toObject();
      const decrypted = decryptField(obj.address);


      try {
        obj.address = JSON.parse(decrypted);
      } catch {
        obj.address = decrypted;
      }


      return obj;
    });


    res.json({
      success: true,
      data: safeOrders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});


    const safeOrders = orders.map((order) => {
      const obj = order.toObject();
      const decrypted = decryptField(obj.address);


      try {
        obj.address = JSON.parse(decrypted);
      } catch {
        obj.address = decrypted;
      }


      return obj;
    });


    res.json({
      success: true,
      data: safeOrders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status
    });


    res.json({
      success: true,
      message: "Status Updated"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
};