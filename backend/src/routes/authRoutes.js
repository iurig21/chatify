import express from 'express'
import { login, signup,logout,updateProfilePic } from '../controllers/authControllers.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile",protectRoute,updateProfilePic)
router.get("/check", protectRoute, (req,res) => res.status(200).json(req.user))

export default router
