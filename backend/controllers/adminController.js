import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import doctorModel from "../models/doctorModel.js";
import {v2 as cloudinary} from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


// -------------------ROUTE FOR ADMIN LOGIN-------------------------
const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = jwt.sign(email + password, process.env.JWT_SECRET);
        res.json({ success: true, token });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (e) {
      console.log(e);
      res.json({ success: false, message: e.message });
    }
  };

// Create a new doctor
const createDoctor = async (req, res) => {
    try {
      const { name, email, password,  speciality, about,  address, fees , degree, experience } = req.body;
      
      const imageFile = req.file;

      if(!name || !email || !password || !speciality ||  !address || !degree || !fees ||!about){
        return res.json({success: false, message: "Fill all details"})
      }

      if(!validator.isEmail(email)){
        return res.json({success: false, message: "enter a valid email"})
      }

      if (password.length < 7) {
        return res.json({ success: false, message: "enter a strong passowrd" });
      } 

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      })
      const imageUrl = imageUpload.secure_url;


      const newDoctor = new doctorModel({
        name,
        email,
        password: hashedPassword,
        image: imageUrl,
        speciality,
        about,
        address: JSON.parse(address),
        degree,
        experience,
        fees,
        date: Date.now(),
      });

      await newDoctor.save();
      res.status(201).json({success: true ,message: 'Doctor created successfully' });
    } catch (error) {
      res.status(500).json({success:false, message:error.message });
    }
};

// -----to show all the doctors on admin panel-------
const allDoctors = async (req, res) => {

  try {

      const doctors = await doctorModel.find({}).select('-password')
      res.json({success: true, doctors})

  } catch (e) {
    console.log(e)
    res.json({success: false, message: e.message})
  }

}


const appointmentsAdmin = async (req, res) => {
  try {
    
    const appointments = await appointmentModel.find({})
    res.json({success: true, appointments})

  } catch (e) {
    console.log(e)
    res.json({success: false, message: e.message})
  }
}



const cancelAppo = async (req, res) => {
  try {
      
      const { appointmentId } = req.body;

      const appointmentData = await appointmentModel.findById(appointmentId)


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

// ==================dasboard data for admin panel=================
const adminDash = async (req, res) => {
  try {
    
    const doctors = await doctorModel.find({})
    const users  = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,5),
    }


    res.status(200).json({
      success: true,
      dashData
    });
    
    
  } catch (e) {
    console.log(e)
    res.json({success: false, message: e.message})
  }
}





export {createDoctor, adminLogin, allDoctors, appointmentsAdmin, cancelAppo, adminDash}