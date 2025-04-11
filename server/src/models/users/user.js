const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  preferredLanguage: {
    type: String,
    enum: ["English", "Swahili", "Luo", "Kikuyu", "Kalenjin", "Luhya", "Other"],
    default: "English"
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
