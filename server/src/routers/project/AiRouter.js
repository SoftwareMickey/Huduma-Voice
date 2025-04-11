// const express = require("express");
// const aiRouter = express.Router();
// const axios = require('axios');
// const Chat = require("../../models/chats/Chat");

// const { v4 : uuidv4 } = require('uuid')

// const messages = [
//     "Sure! How can I help you today?",
//     "That sounds interesting! Tell me more.",
//     "I'm not sure about that. Could you clarify?",
//     "Great choice! What would you like to do next?",
//     "Here’s something that might help!",
//     "I appreciate your patience.",
//     "Let me look into that for you.",
//     "That’s a fascinating perspective!",
//     "I see where you're coming from.",
//     "Can you provide more details?",
//     "That’s a great question!",
//     "Absolutely! Here’s what I found.",
//     "I can definitely assist with that.",
//     "It sounds like you're working on something exciting!",
//     "I’d love to help brainstorm ideas.",
//     "Let’s break this down step by step.",
//     "What’s your preferred approach?",
//     "I’ll make sure to simplify this for you.",
//     "Would you like more details on that?",
//     "I’m here whenever you need assistance!"
// ]

// aiRouter.post('/response', (req,res) => {
//     const random = Math.floor(Math.random() * 18 );

//     function getFormattedTime(){
//         const date = new Date();
//         let hours = date.getHours();
//         let minute = date.getMinutes().toString().padStart(2, '0');
//         const ampm = hours >= 12 ? 'PM' : 'AM';

//         hours = hours % 12 || 12;
//         return `${hours} : ${minute} ${ampm}`
//     }

//     try{
//         const msg = messages[random];
//         return res.status(200).json({
//             text : msg,
//             time : getFormattedTime(),
//             sender : "assistant",
//             isLoading : false
//         })
//     }catch(error){
//         return res.status(404).json({error : error})
//     }
// })

// // * Start a new chat session
// aiRouter.post("/chat/new", async (req, res) => {
//     try {
//       const { userId } = req.body;
//       const chatId = uuidv4(); // Generate a unique chat ID
  
//       const newChat = new Chat({ chatId, userId, messages: [] });
//       await newChat.save();
  
//       res.json({ message: "New chat created", chatId });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  

// // * Store new chat message
// aiRouter.post("/chat", async (req, res) => {
//     try {
//       const { chatId, userId, message } = req.body;

//       const random = Math.floor(Math.random() * 16)
  
//       // * Find chat session
//       let chat = await Chat.findOne({ chatId, userId });
//       if (!chat) return res.status(404).json({ error: "Chat not found" });
  
//       // * Store user message
//       chat.messages.push({ sender: "user", text: message });
  
//       const botResponse = messages[random];
//       chat.messages.push({ sender: "assistant", text: botResponse });
  
//       await chat.save();
  
//       res.json({ response: botResponse, chatHistory: chat.messages });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });

  
// // * Delete User Chat History
// aiRouter.delete("/delete-all-chats", async (req, res) => {

//     const { userId } = req.body;

//     try {
//       await Chat.deleteOne({ userId: userId });
//       return res.status(200).json({ message: "Chat history deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });


// // * get all chats
// aiRouter.post("/get-chats", async (req, res) => {

//     const { userId } = req.body;
//     try {
//       const chats = await Chat.find({ userId: userId });
//       return res.status(200).json({chats : chats});
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });
  
// aiRouter.delete("/delete-chat", async (req, res) => {

//     const { chatId } = req.body;

//     try {
//       await Chat.deleteOne({ chatId: chatId });
//       return res.status(200).json({ message: "Chat session deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });
  

// // * Prediction Endpoint
// // aiRouter.post("/predict", async (req, res) => {
// //   try {
// //       const userInput = req.body.text; // Get text input from request

// //       if (!userInput) {
// //           return res.status(400).json({ error: "Text input is required" });
// //       }

// //       // * TensorFlow Serving API URL (Replace `localhost` if needed)
// //       const TFSERVING_URL = "http://localhost:8501/v1/models/chatbot_model:predict";

// //       const response = await axios.post(TFSERVING_URL, {
// //           instances: [userInput], // * Sending input to the model
// //       });

// //       res.json({ response: response.data });
// //   } catch (error) {
// //       console.error("Error:", error.message);
// //       res.status(500).json({ error: `Failed to get prediction : ${error}` });
// //   }
// // });

// module.exports = { aiRouter };
