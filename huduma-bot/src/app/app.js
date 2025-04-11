require("dotenv").config();
const express = require("express");
const app = express();

// const Redis = require('ioredis');
// const redis = new Redis(process.env.REDIS_URL);

const cors = require("cors");
const { greetings } = require("../database/data");
const { saveMessageToDB } = require("../config/ChatSession");

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

let sessions = {};

app.post("/chat", async (req, res) => {
  const { userId, message } = req.body;

  if (!sessions[userId]) {
    sessions[userId] = {
      step: "initiate",
      messages: [],
    };
  }

  const session = sessions[userId];
  let reply = "";

  switch (session.step) {
    case "initiate":
      reply =
        "👋 Hi! Welcome to HudumaVoice.\n Choose Language:1. Kiswahili 2. Kikuyu 3. Luo 4. Kamba";
      session.step = "select_language";
      session.messages.push(
        { sender: "user", message },
        { sender: "assistant", message: reply }
      );
      break;

    case "select_language":
      if (parseInt(message) === 1 || message.toLowerCase() === "swahili") {
        session.language = "Kiswahili";
        session.step = "select_service";
        reply = `Karibu HudumaVoice.\nChagua Huduma:
                    1. Fedha
                    2. Afya
                    3. Kilimo
                    4. Usafiri`;
        session.messages.push(
          { sender: "user", message },
          { sender: "assistant", message: reply }
        );
      } else if (parseInt(message) === 2) {
        session.language = "Kikuyu";
        session.step = "select_service";
        reply = `CON Wîhîî HudumaVoice.\nTogora Mûtugo:
                    1. Wîra wa Mbeca
                    2. Mûtugo wa Thibitari
                    3. Wîra wa Mbembe
                    4. Mûtugo wa Mathîna`;
        session.messages.push(
          { sender: "user", message },
          { sender: "assistant", message: reply }
        );
      } else if (parseInt(message) === 3) {
        session.language = "Luo";
        session.step = "select_service";
        reply = `Karibu e HudumaVocie\nYer wach mar tich:
                    1. Mbesa
                    2. Chenro
                    3. Weche mag pokoth
                    4. Yiengni`;
        session.messages.push(
          { sender: "user", message },
          { sender: "assistant", message: reply }
        );
      } else if (parseInt(message) === 4) {
        session.language = "Kamba";
        session.step = "select_service";
        reply = `Wîî Kîla HudumaVoice\nTavanya Mbesa:
                    1. Mbesa
                    2. Muthee
                    3. Kilimo
                    4. Usafiri`;
        session.messages.push(
          { sender: "user", message },
          { sender: "assistant", message: reply }
        );
      } else {
        reply = "❗ Please select a valid language";
      }
      break;

    case "select_service":
      const choice = parseInt(message);
      switch (session.language) {
        case "Kiswahili":
          if (choice === 1) {
            reply =
              "💰 Umechagua huduma ya Fedha. Tafadhali eleza unachotaka kujua.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 2) {
            reply = "🏥 Umechagua huduma ya Afya. Tuambie tatizo lako.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 3) {
            reply =
              "🌱 Umechagua huduma ya Kilimo. Uliza swali lako kuhusu kilimo.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 4) {
            reply = "🚗 Umechagua huduma ya Usafiri. Eleza unahitaji nini.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else {
            reply =
              "❗ Chagua huduma halali: 1. Fedha 2. Afya 3. Kilimo 4. Usafiri";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          }
          break;

        case "Kikuyu":
          if (choice === 1) {
            reply = "💰 Wîra wa Mbeca. Wîhîî wega wendo waku.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 2) {
            reply = "🏥 Mûtugo wa Thibitari. Wîcîrîa ta wendo waku.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 3) {
            reply = "🌽 Wîra wa Mbembe. Wenda gûtirîa mbembe?";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 4) {
            reply = "🚗 Mûtugo wa Mathîna. Thitîrîa maûndû ma thîna.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else {
            reply =
              "❗ Togora mûtugo mûno: 1. Mbeca 2. Thibitari 3. Mbembe 4. Mathîna";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          }
          break;

        case "Luo":
          if (choice === 1) {
            reply = "💰 Iyer mbesa. Nyis wachni gi det.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 2) {
            reply = "🏥 Iyer chenro. Nyis wach mar rieko.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 3) {
            reply = "🌾 Iyer weche mag pokoth. Nyis weche mag kalo.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 4) {
            reply = "🚗 Iyer yiengni. Nyis kanyakla ma in gi dwaro.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else {
            reply =
              "❗ Yer wach mar tich maber: 1. Mbesa 2. Chenro 3. Pokoth 4. Yiengni";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          }
          break;

        case "Kamba":
          if (choice === 1) {
            reply = "💰 Mbesa niyo wasyoka. Ueleze unavyotaka kusaidiwa.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 2) {
            reply = "🏥 Muthee niyo wanuva. Tunyie ithasya yako.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 3) {
            reply = "🌱 Kilimo niyo wasyoka. Ueleze swali lako.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else if (choice === 4) {
            reply = "🚗 Usafiri niyo wanuva. Ueleze unahitaji nini.";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          } else {
            reply =
              "❗ Tavanya mbesa ilîyo îla: 1. Mbesa 2. Muthee 3. Kilimo 4. Usafiri";
            session.messages.push(
              { sender: "user", message },
              { sender: "assistant", message: reply }
            );
          }
          break;

        default:
          reply = "⚠️ Hatuelewi lugha yako. Tafadhali anza tena.";
          session.messages.push(
            { sender: "user", message },
            { sender: "assistant", message: reply }
          );
          session.step = "select_language";
          break;
      }
      break;

    default:
      reply = "⚠️ Something went wrong. Let's start again.";
      session.messages.push(
        { sender: "user", message },
        { sender: "assistant", message: reply }
      );
      sessions[userId] = { step: "initiate" }; // Reset session
      break;
  }

  await saveMessageToDB(
    userId,
    "user",
    message,
    session.step,
    session.language
  );
  await saveMessageToDB(
    userId,
    "assistant",
    reply,
    session.step,
    session.language
  );

  return res.status(200).json({
    messages: [
      { sender: "user", message },
      { sender: "assistant", message: reply },
    ],
  });

  return res.status(200).json({
    messages: [
      { sender: "user", message: message },
      { sender: "assistant", message: reply },
    ],
  });
});

// Process incoming message based on user state
async function processMessage(senderId, text, userState) {
  const cachedData = await getCachedSiteData();
  console.log(`Offers -> ${cachedData.data.offers}`);

  const offersList = cachedData.data.offers.map(
    (offer, index) => `${index + 1}. ${offer.name} - ${offer.price}`
  );

  console.log(`Offer List : ${offersList}`);
  console.log(`Offer List Length : ${offersList.length}`);

  let to = senderId;
  console.log(`SenderId : ${to}`);

  if (userState.step === "greeting") {
    if (greetings.includes(text)) {
      await updateSession(senderId, { step: "data_offers" });
      sendMessage(
        to,
        "Here are our current data bundles:\n" + offersList.join("\n")
      );
      return {
        status: 200,
        msg: `Hello! Here are our current data bundles:\n" ${offersList.join(
          "\n"
        )}`,
      };
    } else {
      await updateSession(senderId, { step: "data_offers" });
      sendMessage(to, "Sorry, I only handle data bundle requests now.");
      return {
        status: 200,
        msg: `Sorry, I only handle data bundle requests now.Here are our current data bundles:\n" ${offersList.join(
          "\n"
        )}`,
      };
    }
  } else if (userState.step === "data_offers") {
    const selectedOfferIndex = parseInt(text);

    if (
      !isNaN(selectedOfferIndex) &&
      selectedOfferIndex >= 1 &&
      selectedOfferIndex <= cachedData.data.offers.length
    ) {
      const selectedOffer = cachedData.data.offers[selectedOfferIndex - 1];

      await updateSession(senderId, { step: "payment", offer: selectedOffer });

      const responseMessage = `Great choice! You selected: ${selectedOffer.name}. Please enter PIN when prompted to complete the payment.Then type 'paid' and send after payment.`;
    } else {
      sendMessage(
        to,
        `Invalid choice. Please select a valid option (1-${cachedData.data.offers.length}).`
      );
      return { status: 400, msg: "Invalid option selected." };
    }
  } else if (userState.step === "payment") {
    if (text.toLowerCase().includes("paid")) {
      await deleteSession(senderId); // * End session
      sendMessage(
        to,
        "Payment confirmed! Your data will be activated shortly. Thank you!"
      );
      return {
        status: 200,
        msg: "Payment confirmed! Your data will be activated shortly. Thank you!",
      };
    } else {
      await sendMessage(
        to,
        "Please confirm payment by replying 'paid'. You have 5 minutes before your session resets."
      );

      // Start a timer to reset the session after 5 minutes
      setTimeout(async () => {
        if (userState.step === "payment") {
          // If still in payment state, reset
          await deleteSession(senderId);
          await sendMessage(
            to,
            "Session expired! Restarting the process. Please request again."
          );
        }
      }, 3 * 60 * 1000); // 5 minutes

      return {
        status: 200,
        msg: "Awaiting payment confirmation.Please confirm payment by replying 'paid'. You have 3 minutes before your session resets.",
      };
    }
  }
}

// * Function to send messages
async function sendMessage(to, message) {}

// * Session management using Redis
async function getSession(senderId) {}

async function updateSession(senderId, data) {}

async function deleteSession(senderId) {}

module.exports = { app };
