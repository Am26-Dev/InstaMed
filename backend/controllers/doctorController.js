import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Fetch all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

const changeAvialability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablility changed" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

const loginDoctor = async (req, res) => {

  try {
      const {email, password} = req.body;
      const doctor = await doctorModel.findOne({email});

      if (!doctor) {
          return res.json({success: false, message: "Enter valid credentials"})
      }

      const isMatch = await bcrypt.compare(password, doctor.password)

      if (isMatch) {
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
          expiresIn: 7 * 24 * 60 * 60,
        });
        return res.json({ success: true, token });
      } else {
        return res.json({ success: false, message: "Invalid credentials" });
      }


  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }

}


// Fetch all appointments for a specific doctor
const getDoctorAppointments = async (req, res) => {
  try {

    const { docId } = req.body

    const appointments = await appointmentModel.find({ docId });

    res.json({success: true, appointments})


  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};


// ==========to mark appo completed==============
const appoComplete = async (req, res) => {
  try { 
    const { docId, appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: "Appointment completed" });
    }else{
      return res.json({ success: true, message: "Mark failed" });
    }


  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
}


// to cancel appo from doctor panel
const appoCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {

      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      return res.json({ success: true, message: "Appointment cancelled" });

    } else {

      return res.json({ success: true, message: "Cancelllation failed" });

    }

  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};


// ========dashboard data for doctor panel========
const docDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({docId})

    let earnings = 0;

    appointments.map((item)=>{
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })

    let patients = []

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId)
      }
    })


    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }

    res.json({success: true, dashData})

  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};
  

// Fetch a single doctor by ID
const getDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    const profileData = await doctorModel
      .findById(docId)
      .select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(e);
    return res.json({ success: false, message: e.message });
  }
};

// Update an doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      available,
    });

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(e);
    return res.json({ success: false, message: e.message });
  }
};




export { changeAvialability, getAllDoctors, loginDoctor, getDoctorAppointments, appoCancel, appoComplete, docDashboard, updateDoctorProfile, getDoctorProfile }
