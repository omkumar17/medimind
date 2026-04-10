import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  notes: { type: String },
  patientId: { type: String, required: true },
  sharedWith: [{ type: String }], // Array of doctor emails
  date: { type: Date, default: Date.now },
  fileName: { type: String },
  fileType: { type: String },
  fileData: { type: Buffer }, // For storing file data
});

export default mongoose.models.Record || mongoose.model("Record", RecordSchema);
