import express from "express";
import { getAllDoctors, loginDoctor, getDoctorAppointments, appoCancel, appoComplete, docDashboard, getDoctorProfile, updateDoctorProfile } from "../controllers/doctorController.js";
import doctorAuth from "../middlewares/doctorAuth.js";

const doctorRouter = express.Router();


doctorRouter.get("/list", getAllDoctors)
doctorRouter.post("/login", loginDoctor)
doctorRouter.get("/appointments", doctorAuth, getDoctorAppointments)
doctorRouter.post("/complete-appointment", doctorAuth, appoComplete)
doctorRouter.post("/cancel-appointment", doctorAuth, appoCancel)
doctorRouter.get("/dashboard", doctorAuth, docDashboard)
doctorRouter.get("/profile", doctorAuth, getDoctorProfile)
doctorRouter.post("/update-profile", doctorAuth, updateDoctorProfile)

export default doctorRouter