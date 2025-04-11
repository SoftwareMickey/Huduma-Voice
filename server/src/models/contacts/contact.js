const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
  },
  services: {
    type: [String], // Array of selected services
    enum: [
      "App Development",
      "Web Development",
      "Management System",
      "Bulk SMS",
      "USSD Applications",
    ],
    required: true,
  },
  message: {
    type: String,
    required: false,
    trim: true,
    maxlength: 1000, // Limit message length
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
