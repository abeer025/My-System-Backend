import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Attach user ID to request object for further processing
    req.id = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);

    // Send a 500 Internal Server Error if unexpected errors occur
    res.status(500).json({
      message: "An error occurred during authentication",
      success: false,
      error: error.message,
    });
  }
};

export default isAuthenticated;
