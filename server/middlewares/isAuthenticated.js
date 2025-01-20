import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(403)
        .json({ message: "No token provided", success: false });
    }
    console.log("Authorization Header:", req.headers.authorization);
    console.log("Extracted Token:", token);

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Token:", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    // Attach user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token", success: false });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", success: false });
    }

    // Generic error response
    res.status(500).json({
      message: "An error occurred during authentication",
      success: false,
      error: error.message,
    });
  }
};

export default isAuthenticated;
