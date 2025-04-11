const ChatSession = require("../model/ChatSession"); // Path to your model

async function saveMessageToDB(
  userId,
  sender,
  message,
  step,
  language,
  service = null
) {
  let session = await ChatSession.findOne({ userId });

  const newMessage = {
    sender,
    message,
    timestamp: new Date(),
  };

  if (session) {
    session.messages.push(newMessage);
    session.step = step;
    session.language = language;
    session.service = service;
    await session.save();
  } else {
    session = new ChatSession({
      userId,
      language,
      step,
      service,
      messages: [newMessage],
    });
    await session.save();
  }

  return session;
}

module.exports = { saveMessageToDB };
