import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  medicines: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
  advice: { type: String },
  doctorId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Prescription || mongoose.model("Prescription", PrescriptionSchema);
