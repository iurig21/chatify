import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {

  const {JWT_SECRET} = process.env

  if(!JWT_SECRET) throw new Error("JWT secret is not configured")

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  return token;
};

export default generateToken;
