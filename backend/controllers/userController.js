import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
// import { sendEmail } from "../utils/sendEmail.js";
// import razorpay from "razorpay"

const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: "No such user exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 7 * 24 * 60 * 60,
            })
            return res.json({ success: true, token });
        }else {
            return res.json({ success: false, message: "Invalid credentials" });
          }


    } catch (e) {
        console.log(e)
    }

}


const registerUser = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({email});


        if(!name || !email || !password){
            return res.json({success: false, message: "Fill details"})
        }

// ==================CHECKING USER ALREADY EXISTS==========

        if (exists) {
            return res.json({success: false, message: "User already exists"})
        }

// ===============VALIDATING EMAIL FORMAT & STRONG PASSWORD=============

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a vlaid email"})
        }
        
        if (password.length < 7) {
            return res.json({success: false, message: "Enter a strong password"})
        }

// ================ HASHING USER PASSWORD ===============

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        }) 

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 7* 24 * 60 * 60,
        })
        res.json({success: true, token})

    } catch (e) {
        console.log(e);
        res.json({success: false, message: e.message})
    }
}


// ------------get user profile -----------------
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId).select('-password')
        res.json({success: true, userData})


    } catch (e) {
        console.log(e)
        return res.json({success: false, message: e.message})
    }
}

// ---------------update user profile-------------
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "data missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({success: true, message: "profile updated"})
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e.message });
  }
};


// -------------book appointment----------
const bookAppointment = async (req, res) => {
    try {
        
        const  { userId, docId, slotDate, slotTime, appointmentType } = req.body

       const docData = await doctorModel.findById(docId).select("-password")

        if(!docData.available) {
            return res.json({success: false, message: "Doctor not available"})
        }

        let slots_booked = docData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: "slot not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')


// -----removing it as we don't want the history of the past booked data
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
            appointmentType: appointmentType || "in-person",
            
        }


        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: "Appointment booked"})



    } catch (e) {
        console.log(e)
        return res.json({success: false, message: e.message})
    }
}

// Schedule online appointment reminders function
// const scheduleOnlineAppointmentReminders = () => {
//     setInterval(async () => {
//       const now = new Date();
//       const upcomingAppointments = await appointmentModel.find({
//         appointmentType: "online",
//         date: { $gte: now, $lte: new Date(now.getTime() + 15 * 60 * 1000) } // 15 mins before
//       });
  
//       upcomingAppointments.forEach(async (appointment) => {
//         try {
//           const user = await userModel.findById(appointment.userId); // Fetch user by userId
//           if (user && user.email) {
//             await sendEmail({
//               to: user.email,
//               subject: "Online Appointment Reminder",
//               text: `This is a reminder for your online appointment scheduled at ${appointment.date}.`,
//             });
//           }
//         } catch (error) {
//           console.error("Error sending reminder email:", error);
//         }
//       });
//     }, 5 * 60 * 1000); // Run every 5 minutes
//   };

// ----------------listing all appointment for user to see upcoming and previous appointments
const listAllAppointments = async (req, res) => {
    try {
        
        const { userId } = req.body;

        const appointments = await appointmentModel.find({userId})

        res.json({success: true, appointments})

    } catch (e) {
        console.log(e)
        return res.json({success: false, message: e.message})
    }
}


// -----------cancel appointment
const cancelAppointments = async (req, res) => {
    try {
        
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData.userId !== userId) {
            return  res.json({success: false, message: "unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true } )

        // as the appointment is cancelled here changing doctor slots_booked

        const {docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked})
        res.json({success: true, message:"appointment cancelled"})

    } catch (e) {
        console.log(e)
        return res.json({success: false, message: e.message})
    }
}

// const razorparInstance = new razorpay({
//     key_id: "" ,
//     key_secret: "" ,
// })

// payment method using razorpay
// const paymentRazorpay = async (req, res) => {

//     const { appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId)

//     if(!appointmentData || appointmentData.cancelled){
//         return res.json({success: false, message: "Appointment Cancelled or not found"})
//     }

//     const options = {
        
//     }


// }

export {loginUser, registerUser, getProfile, updateProfile, bookAppointment, cancelAppointments, listAllAppointments};