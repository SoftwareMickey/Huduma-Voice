require("dotenv").config();
const PORT = 5000;
const { app } = require("./src/app/app");

const http = require("http");
const connectToDatabase = require("./src/config/connect-to-db");

const server = http.createServer(app);

// * Check if running inside Vercel
const isVercel =
  process.env.VERCEL === "1" || process.env.NOW_REGION !== undefined;

console.log("Vercel Environment Variables:");
console.log("VERCEL:", process.env.VERCEL);
console.log("NOW_REGION:", process.env.NOW_REGION);
console.log("VERCEL_ENV:", process.env.VERCEL_ENV);

(async () => {
  await connectToDatabase(); // * Ensures DB connects before starting the server

  // * Start the server only if NOT running on Vercel
  if (!isVercel) {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 CHAT BOT SERVER RUNNING ON PORT ${PORT}`);
    });
  } else {
    console.log("Vercel connection...");
  }
})();

module.exports = app;
