import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Expecting: Authorization: Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user (needed for role-based access control)
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Attach user + keep your existing controller flow working
    req.user = user;
    req.body.userId = user._id.toString();

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// Role-based access control middleware
export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
};

export default authMiddleware;


