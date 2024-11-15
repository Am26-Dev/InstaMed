import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "000000000",
    },
    image: {
      type: String,
      default:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOTgnIGhlaWdodD0nOTgnIHZpZXdCb3g9JzAgMCA5OCA5OCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48Y2lyY2xlIGN4PSc0OScgY3k9JzQ5JyByPSc0OScgZmlsbD0nI0Y1RjVGNScvPjxwYXRoIGQ9J000OS4xMDA4IDQ2LjEwMDFDNTIuNDQyMiA0Ni4xMDAxIDU1LjE1MDkgNDMuMzkxNCA1NS4xNTA5IDQwLjA1MDFDNTUuMTUwOSAzNi43MDg3IDUyLjQ0MjIgMzQgNDkuMTAwOCAzNEM0NS43NTk1IDM0IDQzLjA1MDggMzYuNzA4NyA0My4wNTA4IDQwLjA1MDFDNDMuMDUwOCA0My4zOTE0IDQ1Ljc1OTUgNDYuMTAwMSA0OS4xMDA4IDQ2LjEwMDFaJyBmaWxsPScjQUFBQUFBJy8+PHBhdGggb3BhY2l0eT0nMC41JyBkPSdNNjEuMjAwMiA1Ny40NDNDNjEuMjAwMiA2MS4yMDIxIDYxLjIwMDIgNjQuMjQ5MyA0OS4xMDAxIDY0LjI0OTNDMzcgNjQuMjQ5MyAzNyA2MS4yMDIxIDM3IDU3LjQ0M0MzNyA1My42ODQgNDIuNDE3NCA1MC42MzY3IDQ5LjEwMDEgNTAuNjM2N0M1NS43ODI4IDUwLjYzNjcgNjEuMjAwMiA1My42ODQgNjEuMjAwMiA1Ny40NDNaJyBmaWxsPScjQUFBQUFBJy8+PC9zdmc+",
    },
    address: {
      type: Object,
      default: {
        buildingnumber : "",
        locality: "",
        district: "",
        city: "",
        state: "",
        country: "",
      },
    },
    about: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Number,
      required: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
    fixedId: { // This ID is used to link a user to a socket
      type: String,
      unique: true,
      required: true,
    },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
