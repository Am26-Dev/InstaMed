import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    
  const [atoken, setAToken] = useState(localStorage.getItem("atoken") ? localStorage.getItem("atoken") : "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)


  const getAllDoctors = async () => {
    try {

      const {data} = await axios.post(backendUrl + "/admin/all-doctors", {}, {headers :{ atoken}})
      if(data){
        setDoctors(data.doctors)
        console.log(data.doctors)
      }else{
        toast.error(data.message)
      }


    } catch (e) {
       toast.error(e.message)
       console.log(e)
    }
  }

  const changeAvailability = async (docId) => {


    try {
      
      const {data} = await axios.post(backendUrl + "/admin/change-availability", {docId}, {headers: {atoken}})

      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
      }else{
        toast.error(data.message)
      }

    } catch (e) {
      toast.error(e.message)
      console.log(e)
    }


  }


  const getAllAppointments = async () => {

    try {

      const {data} = await axios.get(backendUrl + "/admin/appointments", {headers: {atoken}})

      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments)
      }else{
        toast.error(data.message)
      }

    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }

  }

  const cancelAppointment = async (appointmentId) => {

    try {
      
      const {data} = await axios.post(backendUrl + "/admin/cancel-appo", {appointmentId}, {headers: {atoken}})
      
      if (data.success) {
        toast.success(data.message)
        getAllAppointments()
      }else{
        toast.error(data.message)
      }

    } catch (e) {
      console.log(e)
    } 

  }

  const getDashData = async () => {

    try {

      const {data} = await axios.get(backendUrl + "/admin/dashboard", {headers: {atoken}})

      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData)
      }else{
        toast.error(data.message)
      }

    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }

  }


  const value = {
    atoken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
