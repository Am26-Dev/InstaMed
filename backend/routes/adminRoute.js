import express from "express";
import { createDoctor,adminLogin, allDoctors, appointmentsAdmin, cancelAppo, adminDash } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";
import { changeAvialability } from "../controllers/doctorController.js";

const adminRouter = express.Router();


adminRouter.post("/add-doctor", adminAuth, upload.single("image") ,  createDoctor)
adminRouter.post("/login", adminLogin)
adminRouter.post("/change-availability", adminAuth, changeAvialability)
adminRouter.post("/all-doctors",adminAuth, allDoctors)
adminRouter.get("/appointments",adminAuth, appointmentsAdmin)
adminRouter.post("/cancel-appo",adminAuth, cancelAppo)
adminRouter.get("/dashboard", adminAuth, adminDash)

export default adminRouter