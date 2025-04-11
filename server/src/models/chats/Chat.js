const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  chatId: { type: String, unique: true, required: true }, // Unique ID per chat session
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      sender: { type: String, enum: ["user", "assistant"], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);
