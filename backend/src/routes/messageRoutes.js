import express from 'express'
import { protectRoute } from '../middleware/authMiddleware.js';
import {getAllContacts,getMessagesByUserID,sendMessage,getChatPartners} from '../controllers/messageControllers.js'
import { arcjetProtection } from '../middleware/arcjetMiddleware.js';

const router = express.Router()


// The middlewares are executed in order
router.use(arcjetProtection,protectRoute)

router.get("/contacts", getAllContacts );
router.get("/chats", getChatPartners );
router.get("/:id", getMessagesByUserID );
router.post("/send/:id", sendMessage );

export default router;