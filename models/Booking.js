import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  patientRegno: { type: String, required: true },
  doctorRegno: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g. "10:00 AM"
  status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
