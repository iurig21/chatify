import Message from "../models/Message.js"
import User from "../models/User.js"

export const getAllContacts = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("/api/messages/contacts endpoint failed :",error)
        res.status(500).json({Message: "Error fetching contacts"})
    }
}