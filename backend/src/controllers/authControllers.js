import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import generateToken from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must have at least 6 characters" });
    }

    // Check if the email is valid using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hashSync(password);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {

     await newUser.save();
     generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      try {
        await sendWelcomeEmail(newUser.email,newUser.fullName,process.env.CLIENT_URL)
      } catch (error) {
        console.error("Failed to send welcome email:",error)
      }

    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error("/api/auth/signup endpoint failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({message:"Email and password are required"})
    }

    try{

      const user = await User.findOne({email})

      if(!user){
        return res.status(400).json({message: "Invalid credentials"})
      }

      const isPasswordCorrect = await bcrypt.compareSync(password,user.password)

      if(!isPasswordCorrect){
         return res.status(400).json({message: "Invalid credentials"})
      }

      generateToken(user._id,res);

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic
      })

    }catch(err){
      console.error("/api/auth/login endpoint failed:",err);
      res.status(500).json({message: "Internal server error"})
    }
};

export const logout =  (_,res) => {
    res.cookie("jwt","",{
      maxAge:0
    })
    res.status(200).json({message: "Logged out succesfully"})
};

