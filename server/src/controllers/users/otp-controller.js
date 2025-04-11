const crypto = require("crypto");
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();
app.use(bodyParser.json());

// * Twilio Config
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

// * Temporary storage for OTPs
const otpStore = {};

// * Generate OTP
function generateOTP(length) {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
}

// * Send OTP via SMS
async function sendOtp(phone, otp) {
  return twilioClient.messages.create({
    body: `Your Vaultix verification code is: ${otp}`,
    from: twilioNumber,
    to: phone,
  });
}

// * Route 1: Request OTP
async function httpGetOTP(req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  const otp = generateOTP(6); // * Generate a 6-digit OTP
  otpStore[phone] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // * Valid for 5 minutes

  try {
    await sendOtp(phone, otp);
    return res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send OTP." });
  }
}

// * Route 2: Verify OTP
async function httpVerifyOTP(req, res){
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: "Phone and OTP are required." });
  }

  const storedOtpData = otpStore[phone];

  if (!storedOtpData) {
    return res.status(400).json({ message: "OTP not requested or expired." });
  }

  if (storedOtpData.expires < Date.now()) {
    delete otpStore[phone];
    return res.status(400).json({ message: "OTP has expired." });
  }

  if (storedOtpData.otp === otp) {
    delete otpStore[phone]; // Clear OTP after successful verification
    return res.status(200).json({ message: "OTP verified successfully." });
  } else {
    return res.status(400).json({ message: "Invalid OTP." });
  }
}

module.exports = { httpSendOTP, httpVerifyOTP };