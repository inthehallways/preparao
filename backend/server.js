import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectDB } from "./config/db.js";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import errorHandler from "./middleware/errorHandler.js"; 

// app config
const app = express();
const port = 4000;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"] 
      }
    }
  })
);

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


