import express from "express";
import { body } from "express-validator";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware, { authorizeRole } from "../middleware/auth.js";

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Allow images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

// Admin only: add food
foodRouter.post(
  "/add",
  authMiddleware,
  authorizeRole("admin"),
  upload.single("image"),
  [
    body("name").notEmpty().withMessage("Food name is required").trim().escape(),
    body("description").notEmpty().withMessage("Description is required").trim().escape(),
    body("category").notEmpty().withMessage("Category is required").trim().escape(),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a valid number")
  ],
  addFood
);

// Public: list food
foodRouter.get("/list", listFood);

// Admin only: remove food
foodRouter.post(
  "/remove",
  authMiddleware,
  authorizeRole("admin"),
  [body("id").notEmpty().withMessage("Food ID is required").trim().escape()],
  removeFood
);

export default foodRouter;


