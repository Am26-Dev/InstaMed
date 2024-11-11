import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema({
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "userModel",
//     required: true,
//   },
//   doctorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "doctorModel",
//     required: true,
//   },
//   appointmentDate: {
//     type: Date,
//     required: true,
//   },
//   appointmentTime: {
//     type: String,
//     required: true,
//   },
//   appointmentType: {
//     type: String,
//     enum: ["online", "offline"],
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "cancelled"],
//     default: "pending",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   notes: {
//     type: String,
//     trim: true,
//   },
// });

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  docId: {
    type: String,
    required: true,
  },
  slotDate: {
    type: String,
    required: true,
  },
  slotTime: {
    type: String,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  docData: {
    type: Object,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
})


const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);

export default appointmentModel;