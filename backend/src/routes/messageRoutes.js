import express from 'express'

const router = express.Router()

router.get("/send", (req,res) => {
    res.send("/api/messages/send endpoint")
})

export default router;