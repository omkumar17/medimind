import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  medicine: { type: String, required: true },
  time: { type: String, required: true },
  patientId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);
