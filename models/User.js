import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  regno: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  profileImage: { type: String },
  bloodGroup: { type: String },
  role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
  hospital: { type: String },
  specialization: { type: String },
  experience: { type: Number },
  consultationFee: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
