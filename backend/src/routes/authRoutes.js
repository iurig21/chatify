import express from 'express'

const router = express.Router();

router.get("/signup",(req,res) => {
    res.send("/api/auth/signup endpoint");
})

export default router
