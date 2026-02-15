import foodModel from "../models/foodModel.js";
import fs from "fs";
import { validationResult } from "express-validator";

// add food
const addFood = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const food = new foodModel({
      name: req.body.name.trim(),
      description: req.body.description?.trim(),
      price: req.body.price,
      category: req.body.category?.trim(),
      image: req.file?.filename
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// list food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addFood, listFood, removeFood };


