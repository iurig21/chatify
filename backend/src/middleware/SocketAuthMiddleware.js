import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const SocketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.error("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.error("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.error("Socket connection rejected: No user found");
      return next(new Error("User not found"));
    }

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`
    );
    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
