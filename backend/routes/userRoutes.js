import { loginUser, registerUser, getProfile, updateProfile, bookAppointment, listAllAppointments, cancelAppointments} from "../controllers/userController.js";
import express from "express"
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/register", registerUser);

userRouter.get("/get-profile", userAuth, getProfile);

userRouter.post(
  "/update-profile",
  upload.single("image"),
  userAuth,
  updateProfile
);

userRouter.post("/book-appo",userAuth, bookAppointment);

userRouter.get("/all-appo", userAuth, listAllAppointments);

userRouter.post("/cancel-appo",userAuth, cancelAppointments);


export default userRouter