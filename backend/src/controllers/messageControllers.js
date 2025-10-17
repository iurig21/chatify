import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("/api/messages/contacts endpoint failed :", error);
    res.status(500).json({ Message: "Internal server error" });
  }
};

export const getMessagesByUserID = async (req, res) => {
  try {
    const myId = req.user._id;

    const { id: userToChatId } = req.params;

    const Messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(Messages);
  } catch (error) {
    console.error("/api/messages/:id endpoint failed:", error);
    res.status(500).json({ Message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;

    const { text, image } = req.body;

    if (!text.trim() && !img.trim()) {
      return res.status(400).json({ message: "Text or image is required" });
    }

    const { id: receiverId } = req.params;

    let imageURL;

    if (image) {
      const uploadImage = await cloudinary.uploader.upload(img);
      imageURL = uploadImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("/api/messages/send/:id endpoint failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        {senderId: loggedInUserId},
        {receiverId: loggedInUserId}
      ]
    })

      const chatPartnersIds =[... new Set(messages.map((msg) => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))]

      const chatPartners = await User.find({_id : {$in: chatPartnersIds}}).select("-password") 

      res.status(200).json(chatPartners)
  } catch (error) {
    console.error("/api/messages/chats endpoint failed:",error)
    res.status(500).json({message: "Internal server error"})
  }
};
