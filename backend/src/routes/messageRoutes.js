import express from 'express'
import { protectRoute } from '../middleware/authMiddleware.js';
import {getAllContacts} from '../controllers/messageController.js'

const router = express.Router()

router.use(protectRoute)

router.get("/contacts", getAllContacts );
//router.get("/chats", getChatPartners );
//router.get("/:id", getMessagesByUserID );
//router.post("/send/:id", sendMessage );

export default router;