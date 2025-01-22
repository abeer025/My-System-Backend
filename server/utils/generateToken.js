// import jwt from "jsonwebtoken";

// export const generateToken = (res, user, message) => {
//   if (!process.env.JWT_SECRET) {
//     return res.status(500).json({
//       success: false,
//       message: "JWT_SECRET is not defined in the environment",
//     });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "1d", // 1 day expiration
//     algorithm: "HS256", // Specify the algorithm explicitly
//   });

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // Only use 'secure' in production
//     sameSite: "strict",
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//   });

//   res.status(200).json({
//     success: true,
//     message,
//     token,
//   });
// };

// => =>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>//

import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // 1 day expiration
    algorithm: "HS256", // Specify the algorithm explicitly
  });
};


