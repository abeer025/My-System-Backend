import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    // Retrieve Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or invalid.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found in Authorization header.",
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token has expired. Please log in again.",
          });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            success: false,
            message: "Malformed token. Please log in again.",
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Invalid token.",
          });
        }
      }

      req.user = decoded; // Attach decoded payload to `req.user`
      req._id = decoded.id; // Attach user ID to `req._id`
      next(); // Continue to the next middleware/route
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export default isAuthenticated;
