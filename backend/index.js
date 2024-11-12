import express from "express";
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js";
import { connectCloudinary } from "./config/cloud.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
// import { scheduleOnlineAppointmentReminders } from "./controllers/userController.js";

const app = express();
const port = 8080;
connectDB()
connectCloudinary()
// scheduleOnlineAppointmentReminders()

app.use(express.json())
app.use(cors())



// =================API ENDPOINTS================
app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/doctor", doctorRouter)



app.get("/", (req, res) => {
    res.send("Running")
})



app.listen(port, () => {
    console.log("Server running on http://localhost:8080/")
})