import jwt from 'jsonwebtoken'
import User from "../models/User.js";
import "dotenv/config"

export const protectRoute = async (req,res,next) => {
    try{    

        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message: "Unauthorized - No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
             return res.status(401).json({message: "Unauthorized - invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(401).json({message: "User not found"})
        }

        req.user = user;

        next();

    }catch(err){
        console.error("Error in protectRoute middleware:",err);
        res.status(500).json({message: "Internal server error"})

    }
}