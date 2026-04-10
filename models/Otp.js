import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  code: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // Expires after 10 minutes
});

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
